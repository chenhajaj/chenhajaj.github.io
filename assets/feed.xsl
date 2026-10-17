<?xml version="1.0" encoding="utf-8"?>
<!--
  Shows /feed.xml as a readable page when opened in a browser.
  Feed readers ignore this file and read the feed itself.
-->
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" encoding="utf-8" indent="yes" doctype-system="about:legacy-compat"/>

  <xsl:template match="/atom:feed">
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>Feed: <xsl:value-of select="atom:title"/></title>
        <style>
          :root { --paper:#f6f7f9; --ink:#141a2b; --ink2:#4a5367; --rule:#dfe3ea; --cobalt:#2443c9; --night:#101a4d; }
          @media (prefers-color-scheme: dark) {
            :root { --paper:#0d1321; --ink:#eef1f8; --ink2:#a9b2c6; --rule:#252e44; --cobalt:#8ea2ff; }
          }
          * { box-sizing: border-box; }
          body { margin: 0; background: var(--paper); color: var(--ink);
                 font: 17px/1.6 "Source Serif 4", Georgia, serif; }
          .wrap { max-width: 760px; margin: 0 auto; padding: 0 20px; }
          header { background: var(--night); color: #f3f5ff; padding: 40px 0 32px; }
          header .kicker { font: 600 12px/1.4 system-ui, sans-serif; letter-spacing: .08em;
                           text-transform: uppercase; color: #c3cbef; margin: 0 0 8px; }
          header h1 { font: 760 30px/1.15 system-ui, sans-serif; margin: 0 0 10px; }
          header p { margin: 0; color: #c3cbef; font-size: 16px; }
          .how { margin: 24px 0 8px; padding: 14px 16px; border: 1px solid var(--rule);
                 border-radius: 12px; font: 15px/1.5 system-ui, sans-serif; color: var(--ink2); }
          .how code { background: var(--rule); padding: 1px 6px; border-radius: 6px; color: var(--ink); }
          ol { list-style: none; padding: 0; margin: 16px 0 48px; }
          li { padding: 18px 0; border-bottom: 1px solid var(--rule); }
          .meta { font: 13px/1.4 system-ui, sans-serif; color: var(--ink2); margin: 0 0 4px; }
          .tag { display: inline-block; margin-right: 8px; padding: 1px 8px; border-radius: 999px;
                 background: color-mix(in srgb, var(--cobalt) 14%, transparent); color: var(--cobalt); font-weight: 600; }
          h2 { font: 650 18px/1.35 system-ui, sans-serif; margin: 0; }
          a { color: var(--cobalt); }
          h2 a { color: var(--ink); text-decoration: none; }
          h2 a:hover { text-decoration: underline; text-decoration-color: var(--cobalt); }
        </style>
      </head>
      <body>
        <header>
          <div class="wrap">
            <p class="kicker">News feed</p>
            <h1><xsl:value-of select="atom:title"/></h1>
            <p><xsl:value-of select="atom:subtitle"/></p>
          </div>
        </header>
        <main class="wrap">
          <p class="how">
            This is a feed. Paste <code><xsl:value-of select="atom:link[@rel='self']/@href"/></code>
            into a feed reader (such as Feedly, Inoreader or NetNewsWire) to get new papers and notes as they appear.
            <a href="{atom:link[@rel='alternate']/@href}">Back to the website</a>.
          </p>
          <ol>
            <xsl:for-each select="atom:entry">
              <li>
                <p class="meta">
                  <span class="tag"><xsl:value-of select="atom:category/@term"/></span>
                  <xsl:value-of select="substring(atom:published, 1, 10)"/>
                </p>
                <h2><a href="{atom:link/@href}"><xsl:value-of select="atom:title"/></a></h2>
              </li>
            </xsl:for-each>
          </ol>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
