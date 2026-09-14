export { parseSerial } from "@/lib/serial/parse";
export type {
  ParsedSerial,
  ParseError,
  ParseResult,
  ParseErrorCode,
} from "@/lib/serial/parse";

export { patterns, patternsById } from "@/lib/serial/patterns";
export type { PatternDefinition } from "@/lib/serial/patterns";

export { scoreSerial, COMBO_BONUS, STAR_BONUS } from "@/lib/serial/score";
export type {
  SerialScore,
  PatternMatch,
  ScoreLine,
  Tier,
} from "@/lib/serial/score";

export {
  estimateValue,
  valueCell,
  valuePatternUniverse,
  ENGINE_TO_VALUE_PATTERN,
  VALUE_PATTERN_LABELS,
  CONDITION_LABELS,
  ALL_CONDITIONS,
  VALUE_UPDATED,
} from "@/lib/serial/value";
export type { ValueResult, ValueCell, ValueBand } from "@/lib/serial/value";
