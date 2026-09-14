# Task: Integrate Waline Comment System into Existing Next.js Website

## Context
Ye ek existing Next.js website hai jo Vercel pe deployed hai. Structure/design phase complete hai,
ab content + interactive features add ho rahe hain. Ek comment system chahiye jo serialworth.com
jaisa kaam kare — har page (specific $2 bill series ya pattern page) ke neeche ek comment box ho
jahan users apni serial number query likh sakein aur admin/owner reply de sake.

## Requirements (non-negotiable)
1. **No user login/signup required** — commenters guest ki tarah comment karein, koi account nahi banana
2. **No custom admin panel banana** — Waline apna khud ka moderation dashboard deta hai, wahi use karna hai
3. **Instant publish** — normal comments turant dikhein, koi manual approval na chahiye har comment ke liye
4. **Anti-spam** — built-in spam filtering enabled honi chahiye. **Important:** spam filter ko tune karte waqt dhyan rakho ke legitimate comments false-positive spam na ban jayein — is site ke normal/expected comments mein ye cheezein hongi: users apni bill/note ki price puchenge (jaise serial numbers, dollar amounts, "hi i have question about value of 100 dollar bills i have serial pe 95555554b pe95555555 pe95555556b and lb95555555q also would these be at the upper range of the runs 96000000? thanks bill,
I have a 2021 $1 note. Serial # L77993300B.
Not mint condition but in good shape,
My coworker had a 100 dollar bill that the top border looked thicker than the bottom border. Would that be more valuable than just its face value?,
B06413188*—-B06413181*
" etc, type queries), website ke tools/features ke baare mein sawal karenge, ya kisi specific note/pattern ke baare mein discuss karenge. Ye sab **normal, legitimate use-case hai, spam nahi** — filter ko is tarah configure/tune karo ke numbers-heavy ya "value/price/worth" jaisे keywords wale comments automatically flag na ho jayein sirf isliye ke unmein numbers/currency-related words hain
5. **Free tier only** — koi paid service use nahi karni
6. **Name field mandatory** — user comment likhne se pehle apna naam (nick) zaroor likhe, ye field required hona chahiye, khaali/anonymous submit na ho sake. Email/website fields optional reh sakte hain, sirf naam required hai. Waline ke config mein `requiredMeta` (ya jo bhi current version ka equivalent option ho) use karke sirf `nick` ko required karo, `mail` aur `link` ko optional rakho — docs mein exact option name verify kar lena kyunki version ke sath badal sakta hai.

## Where to place comments (placement guidance)
- **Tool/lookup pages** (serial checker, star note lookup, series & pattern value pages): comment box result section ke turant neeche, taake user apni specific query discuss kar sake — serialworth.com jaisa Q&A-style use-case
- **Blog/article pages**: comment box content ke end mein, standard discussion ke liye
- **Har page pe mat lagao** — sirf un pages pe lagao jahan engagement/SEO value zyada hai. High-traffic tool pages aur main blog posts pe zaroor lagao; har chhoti/low-traffic sub-page (jaise har individual series ya pattern ki deep sub-page) pe abhi mat lagao — isse dono cheezein bachti hain: (1) site performance (widget na load hone wale pages pe bilkul zero cost), (2) moderation load jo site grow hone ke sath manageable rahe
- Rollout: pehle sirf highest-traffic 5-10 pages pe enable karo (main $2-bill-value page, main tool pages, top blog posts), data dekh kar baad mein zaroorat ke hisaab se expand karo

## Performance / optimal loading requirements (critical)
1. **Lazy-load the comment widget** — Waline script/component ko page ke initial load ke sath mat load karo. Ye tabhi load ho jab:
   - User comment section ke paas scroll kare (Intersection Observer use karo — jab comment section viewport ke 50% ke andar aaye tabhi widget initialize/mount karo), YA
   - User manually "Load comments" button click kare (agar Intersection Observer implement karna complex lage, ye simpler fallback hai)
   - Next.js mein ye `next/dynamic` import ke sath `ssr: false` aur custom lazy trigger (Intersection Observer hook) combine karke karo
2. **Rest of the page (tool/blog content) is not blocked** — comment widget ka load kabhi bhi main content, tool functionality, ya Core Web Vitals (LCP, CLS) ko affect nahi karna chahiye. Widget completely separate/deferred chunk ki tarah load ho
3. **No layout shift** — jab tak comment widget load ho raha hai, uski jagah pe ek fixed-height placeholder/skeleton rakho taake page layout achanak shift na ho (CLS score kharab na ho)
4. **Text-only comments — no image uploads** — Waline config mein image upload feature disable karo (agar Waline mein available ho to `imageUploader` ya similar option ko off/null set karo). Users sirf plain text (aur agar Waline markdown support deta hai to basic markdown allowed rakh sakte ho, lekin image embedding specifically disable karo) comment kar sakein. Ye page weight aur moderation complexity dono kam rakhega
5. **Bundle size check** — Waline client ka lazy-loaded chunk final production build mein separate/async chunk ki tarah verify karo (Next.js build output mein check karo), taake confirm ho sake ye main bundle mein bundle nahi ho raha

## Tech stack to use
- **Comment system:** Waline (https://waline.js.org)
- **Storage backend:** LeanCloud free tier (sabse simple, no SQL management, Waline docs mein recommended free option) — agar LeanCloud available na ho user ke region mein, to Vercel Postgres (Neon) free tier fallback use karo
- **Server deployment:** Waline ka server component Vercel par separate serverless deployment ki tarah deploy karo (Waline ka official Vercel one-click template use karo agar available ho)
- **Client:** `@waline/client` npm package Next.js app mein integrate karo

## Steps to follow

1. Waline server deploy karo Vercel par (separate project ke tor pe, ya existing site ke ek API route ke through — jo bhi Waline ke current official docs recommend karte hain, unka latest guide check karo kyunki setup steps change ho sakte hain)

2. LeanCloud pe free account bana kar App ID, App Key, aur Master Key generate karo, Waline server ke environment variables mein add karo

3. Waline server URL milne ke baad, Next.js app mein `@waline/client` install karo:
   ```
   npm install @waline/client
   ```

4. Ek reusable `Comments` component banao jo:
   - Waline ka `init()` function call kare with server URL
   - Anonymous commenting enabled rakhe (login/signup options hide kar do agar Waline UI mein available hon)
   - Site ke existing design system (colors, fonts, spacing) ke sath visually match kare — Waline ka CSS theme customize karo taake ye "plugin jaisa" na lage, native feature jaisa lage

5. Is component ko har relevant page pe add karo (jaise `/2-dollar-bill-value/[series]` ya pattern pages), page ke bottom mein, content ke baad

6. Admin ke liye: Waline apna khud ka moderation dashboard URL deta hai (server deploy ke sath milta hai) — us URL ko safely note kar lo, koi custom admin UI banane ki zaroorat nahi

7. Anti-spam settings Waline ke config mein default enabled rakho; agar profanity/bad-word filter chahiye to Waline ke `forbiddenWords` config option use karo (agar available ho current version mein) — nahi to check karo alternative built-in moderation options

8. Test karo:
   - Anonymous comment post ho raha hai bina login ke
   - Comment turant publish ho raha hai (na ke pending approval mein ja raha)
   - Spam-jaisa comment (jaise sirf links wala) automatically flag/hold ho raha hai
   - Mobile responsive hai comment widget

## Important notes for the AI doing this task
- Waline ke official docs (waline.js.org) ko hamesha check karo latest setup steps ke liye, kyunki deployment process version-to-version change hota hai
- Agar koi step Waline ke current docs mein different ho jo yahan likha hai, docs ko priority do is prompt ke steps se
- Environment variables (App ID, App Key, Master Key) ko `.env.local` mein rakho, kabhi bhi code mein hardcode mat karo ya git mein commit mat karo
- Deploy karne se pehle `.env.local` ko `.gitignore` mein confirm karo ke already added hai
