"""Assemble the initial graph from Graphify extraction artifacts."""
import json
from pathlib import Path

from graphify.analyze import god_nodes, suggest_questions, surprising_connections
from graphify.build import build_from_json
from graphify.cache import save_semantic_cache
from graphify.cli import _stamped_manifest_files
from graphify.cluster import cluster, score_all
from graphify.detect import detect, save_manifest
from graphify.diagnostics import diagnose_extraction, format_diagnostic_report
from graphify.export import to_json
from graphify.report import generate

root = Path(__file__).resolve().parent.parent
out = root / 'graphify-out'
read = lambda name: json.loads((out / name).read_text(encoding='utf-8'))
write = lambda name, data: (out / name).write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding='utf-8')
ast = read('.graphify_ast.json')
sem = read('.graphify_chunk_01.json')
spec = Path.home() / '.codex/skills/graphify/skills/codex/references/extraction-spec.md'
detection = detect(root)
save_semantic_cache(sem['nodes'], sem['edges'], sem.get('hyperedges', []), root=root,
                    allowed_source_files=detection['files']['document'], prompt_file=spec)
nodes = {n['id']: n for n in ast['nodes']}
for node in sem['nodes']:
    nodes.setdefault(node['id'], node)
extraction = dict(nodes=list(nodes.values()), edges=ast['edges'] + sem['edges'],
                  hyperedges=sem.get('hyperedges', []), input_tokens=0, output_tokens=0)
write('.graphify_extract.json', extraction)
write('.graphify_detect.json', detection)
graph = build_from_json(extraction, root=str(root))
if not graph.number_of_nodes():
    raise RuntimeError('Empty graph')
communities = cluster(graph)
cohesion = score_all(graph, communities)
labels_path = out / '.graphify_labels.json'
labels = {int(k): v for k, v in read('.graphify_labels.json').items()} if labels_path.exists() else {
    k: f'Community {k}' for k in communities}
gods = god_nodes(graph)
surprises = surprising_connections(graph, communities)
questions = suggest_questions(graph, communities, labels)
if not to_json(graph, communities, str(out / 'graph.json'), community_labels=labels):
    raise RuntimeError('Graph shrink guard rejected export')
diagnostics = diagnose_extraction(extraction, directed=False, root=str(root))
(out / 'GRAPH_HEALTH.txt').write_text(format_diagnostic_report(diagnostics), encoding='utf-8')
report = generate(graph, communities, cohesion, labels, gods, surprises, detection,
                  {'input': 0, 'output': 0}, str(root), suggested_questions=questions)
report = report.replace('Token cost: 0 input · 0 output',
                        'Token cost: unavailable (sub-agent usage was not exposed).')
report += '\n\n## Scope and measurement notes\n\n'
report += ('This map includes source/config files and documentation, including design proposals. '
           'Images, environment files, generated build/dependency folders and lockfiles are excluded. '
           'CSS is not structurally indexed. Verify current source files before editing.\n\n'
           'The zero token counters above are unmeasured placeholders: sub-agent token usage was '
           'not exposed by the execution tool. They do not mean this build used zero tokens. '
           'AST extraction runs locally without LLM calls.\n\n'
           'See GRAPH_HEALTH.txt for unresolved endpoints, self-loops and relationships merged '
           'by Graphify. Use .graphify_extract.json when distinct raw relationships matter.\n')
(out / 'GRAPH_REPORT.md').write_text(report, encoding='utf-8')
write('.graphify_analysis.json', dict(communities=communities, cohesion=cohesion, gods=gods,
                                    surprises=surprises, questions=questions))
stamped = _stamped_manifest_files(detection['files'], extraction, root)
save_manifest(stamped, manifest_path=str(out / 'manifest.json'), root=root,
              scan_corpus={f for files in detection['files'].values() for f in files})
write('cost.json', {'measurement_status': 'unavailable', 'input_tokens': None, 'output_tokens': None})
print(f'{graph.number_of_nodes()} nodes, {graph.number_of_edges()} edges, {len(communities)} communities')
print(json.dumps({k: [graph.nodes[n].get('label', n) for n in members[:10]]
                  for k, members in communities.items()}, ensure_ascii=False, indent=2))
