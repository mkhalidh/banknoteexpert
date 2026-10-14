/** Waline renders this string with Nunjucks when it sends a reply notification. */
export const replyEmailTemplate = `
<div style="margin:0;padding:32px 12px;background:#f4efe6;font-family:Arial,Helvetica,sans-serif;color:#172b23;">
  <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;margin:0 auto;border-collapse:collapse;background:#ffffff;border:1px solid #e4dcd0;">
    <tr><td style="padding:24px 32px;background:#0f382a;color:#fdfaf2;font-size:20px;font-weight:700;letter-spacing:.02em;">{{site.name | escape}}</td></tr>
    <tr><td style="padding:32px;">
      <p style="margin:0 0 8px;color:#8b681f;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;">Comment reply</p>
      <h1 style="margin:0 0 16px;color:#172b23;font-size:26px;line-height:1.25;">Someone replied to your comment</h1>
      <p style="margin:0 0 24px;color:#58645c;font-size:15px;line-height:1.6;">Hi {{parent.nick | escape}}, here is the conversation on {{site.name | escape}}.</p>
      <p style="margin:0 0 8px;color:#58645c;font-size:13px;font-weight:700;">Your comment</p>
      <div style="padding:16px 18px;background:#f4efe6;border-left:3px solid #c59b27;color:#172b23;font-size:15px;line-height:1.6;white-space:pre-wrap;word-break:break-word;">{{parent.comment | striptags | escape}}</div>
      <p style="margin:24px 0 8px;color:#58645c;font-size:13px;font-weight:700;">{{self.nick | escape}} replied</p>
      <div style="padding:16px 18px;background:#e8f0eb;border-left:3px solid #0f382a;color:#172b23;font-size:15px;line-height:1.6;white-space:pre-wrap;word-break:break-word;">{{self.comment | striptags | escape}}</div>
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px 0 0;border-collapse:collapse;"><tr><td style="background:#0f382a;border-radius:4px;"><a href="{{site.postUrl | escape}}" style="display:inline-block;padding:14px 22px;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;">Read the reply</a></td></tr></table>
      <p style="margin:18px 0 0;color:#58645c;font-size:13px;line-height:1.6;">Button not working? <a href="{{site.postUrl | escape}}" style="color:#0f382a;text-decoration:underline;">Open the conversation</a>.</p>
    </td></tr>
    <tr><td style="padding:20px 32px;border-top:1px solid #e4dcd0;color:#58645c;font-size:12px;line-height:1.5;">You received this email because someone replied to your comment on <a href="{{site.url | escape}}" style="color:#0f382a;">{{site.name | escape}}</a>.</td></tr>
  </table>
</div>`;
