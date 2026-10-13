import { authorDetails } from "@/config/site";

export function AuthorDetails() {
  const { credentials, memberships, reviewedBy } = authorDetails;
  if (!credentials.length && !memberships.length && !reviewedBy) return null;
  return <section aria-label="Author qualifications" className="space-y-3">
    {credentials.length > 0 && <div><h2 className="text-h3">Credentials</h2><ul>{credentials.map(item => <li key={item}>{item}</li>)}</ul></div>}
    {memberships.length > 0 && <div><h2 className="text-h3">Memberships</h2><ul>{memberships.map(item => <li key={item}>{item}</li>)}</ul></div>}
    {reviewedBy && <p>Reviewed by {reviewedBy}</p>}
  </section>;
}
