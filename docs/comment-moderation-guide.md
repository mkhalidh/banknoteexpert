# Comment Moderation Guide — Waline

How the comment system works, where it lives, and how to moderate it day to day.

## What this is

Every comment box on the site is [Waline](https://waline.js.org), an open-source
guest comment system. There's no separate admin panel to learn — Waline ships its
own moderation dashboard, reachable from any browser once you're registered.

- **Where it runs:** as an API route inside this same Next.js app
  (`src/pages/api/[...all].ts`), so it lives on your own domain — no
  third-party service, no separate deployment to manage.
- **Where the data lives:** a small Postgres database on
  [Neon](https://console.neon.tech) (free tier), project `banknoteexpert-waline`.
- **Where it appears on the site:** the home page, the $2 bill value guide, the
  $2 bill serial lookup, the star note lookup, the fancy-serial price guide, and
  the fancy-serial pattern hub — the six highest-traffic pages. Not every page has
  one; see "Adding it to another page" below.

## One-time setup: register as admin

The first account ever created on a Waline install automatically becomes the
admin. Do this once, right after the first deploy:

1. Visit `https://banknoteexpert.com/api/ui/register`
2. Fill in your name, email, and a password — this becomes your login for the
   dashboard, and is separate from anything else (LeanCloud, Vercel, Neon).
3. You're now the admin. Bookmark **`https://banknoteexpert.com/api/ui`**
   — that's the dashboard for everything below.

## Daily moderation

Open the dashboard and go to **Comment** in the sidebar.

- **Comments publish instantly** — nobody is stuck waiting on you. You're
  moderating *after the fact*, not gatekeeping every message.
- Each comment shows: the name given, the page it's on, the message, and a
  status. Click a comment to **reply** (your reply shows with an "Author" badge
  so readers know it's really you), **mark as spam**, or **delete**.
- **Spam filtering happens automatically before you ever see most of it.**
  Waline uses [Akismet](https://akismet.com) (the same spam engine behind most
  of WordPress) with its free built-in key — comments it flags land in a
  separate **Spam** tab instead of going live, and you can skim that
  occasionally to rescue anything wrongly caught, or just leave it.

## Why "spammy-looking" legitimate comments won't get flagged

This site's normal comments are full of things that a naive keyword filter
would mistake for spam: serial numbers, dollar amounts, words like "worth" or
"price." **Deliberately, there is no keyword-based filter here** — no
`forbiddenWords` list, nothing that reacts to numbers or currency terms. Akismet
judges spam by pattern (link-stuffing, known spam-content fingerprints, sender
behavior), not by vocabulary, so a comment like

> "hi i have a serial L77993300B on a 2021 $1 note, is it worth anything?"

reads to it exactly like what it is: a real question. If you ever do want to
add a keyword filter later (Waline supports one via the dashboard's word-filter
setting), avoid anything matching numbers, "$", "price," "worth," or "value" —
that's the entire vocabulary of a legitimate comment on this site.

## Blocking a specific person

If someone is genuinely abusive rather than just an on-topic question:

1. Find one of their comments in the dashboard.
2. Use **Block** (by IP) or delete their comments individually.
3. For a repeat offender, Waline's dashboard has a user-management view where
   you can ban an identity outright.

## What commenters see

- A name is required to post; email and website are optional (configured via
  `requiredMeta: ["nick"]` in `src/components/comments/Comments.tsx`).
- No account or login needed — genuinely anonymous, "guest" commenting.
- No image uploads — text (and basic Markdown) only, kept deliberately simple.
- The box only loads once a reader scrolls down to it, so it never slows down
  the page above it.

## Adding it to another page

Comments are opt-in per page on purpose (keeps low-traffic pages fast and keeps
your moderation queue from growing faster than you can keep up with). To add
one:

```tsx
import { Comments } from "@/components/comments/Comments";

// near the bottom of the page, after the main content:
<Comments path={content.meta.path} />
```

Use the page's own path as `path` — that's how Waline keeps each page's
comments separate. Check traffic in your analytics before adding it to more
pages; there's no upside to a comment box nobody will ever read.

## Where the credentials live

- `.env.local` (never committed — it's in `.gitignore`) holds the database
  connection details for local development.
- The same values are set as **Environment Variables** in the Vercel project
  dashboard for production. If you ever need to rotate the database password,
  update it in both places and redeploy (Waline's docs are explicit that env
  var changes require a redeploy to take effect).
- Nothing about comments requires a LeanCloud account — this setup uses Neon
  Postgres instead, which is what Waline's own docs now recommend as the
  default free-tier path.

## If something looks broken

- **A comment box never loads, just sits on "Comments load when you scroll
  here":** open the browser console on that page — a fetch error there usually
  means the database connection is down (check Neon hasn't auto-suspended on
  the free tier, or that env vars are still correct in Vercel).
- **You can't reach the dashboard:** the URL is always
  `<your-domain>/api/ui`, not a separate site.
