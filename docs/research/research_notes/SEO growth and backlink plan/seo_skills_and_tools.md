# SEO skills, agents, plugins and free SEO tools for thefreetools.eu (researched 2026-09-26)

## What is skills.sh, how does /find-skills work, and which SEO/GEO skills are listed?

### Takeaway
skills.sh is Vercel's open directory of agent skills (installed with `npx skills add owner/repo`); "find-skills" is itself a skill that searches the directory and installs skills for you. SEO packs are listed there, but install counts for most SEO packs are small, and quality varies. Each skill page shows third-party security scan results, which you should read before installing.

### Cited Findings
- skills.sh calls itself "The Open Agent Skills Ecosystem". It is "Made with care by Vercel". Skills are open source on GitHub and install with `npx skills add <owner/repo>`. — [skills.sh](https://skills.sh/)
- The site has an "/audits" section for security audits. — [skills.sh](https://skills.sh/)
- find-skills (repo vercel-labs/skills) is the #1 skill, with about 3.6M installs over 8 weeks and 32.5K GitHub stars. It was first seen on 26 Jan 2026. — [skills.sh find-skills](https://skills.sh/vercel-labs/skills/find-skills)
- How find-skills works: it activates when the user asks "how do I do X" or "find a skill for X". It runs `npx skills find [query]` (interactive search, checking the skills.sh leaderboard first) and `npx skills add <package>` to install. — [skills.sh find-skills](https://skills.sh/vercel-labs/skills/find-skills)
- The find-skills page shows three security scans: Gen Agent Trust Hub (Pass), Socket (Pass) and Snyk (Warn). — [skills.sh find-skills](https://skills.sh/vercel-labs/skills/find-skills)
- The most-installed SEO skill on the leaderboard is "seo-audit" from coreyhaines31/marketingskills (#266, about 214.5K installs). "copywriting" from the same repo has about 208.5K installs. — [skills.sh](https://skills.sh/)
- seranking/seo-skills: 32 skills and about 1.6K total installs (top skills have roughly 52–59 installs each). Skills include seo-geo, seo-keyword-cluster, seo-technical-audit, seo-schema, seo-page, seo-backlink-gap and seo-ai-search-share-of-voice. Install with `npx skills add seranking/seo-skills`. — [skills.sh seranking](https://www.skills.sh/seranking/seo-skills)
- autom8minds/seo-skills: 7 skills, including seo-schema-structured-data, seo-off-page-backlinks and seo-on-page-optimization. — [skills.sh autom8minds](https://www.skills.sh/autom8minds/seo-skills)

### Inferences
- The seranking pack comes from a vendor (SE Ranking), so some skills likely expect SE Ranking data or an API. This is not verified.
- coreyhaines31/marketingskills (seo-audit) has by far the most adoption of any SEO skill on skills.sh. It is the best-proven "general SEO skill" option there. For this site it would largely overlap with the existing local seo-auditor agent.
- find-skills is useful for discovery, but it installs straight from GitHub. The user should review each proposed skill before letting it install.

### Gaps
- I did not verify the last-commit dates, or whether an API key is required, for seranking, autom8minds or coreyhaines31/marketingskills.
- I did not open the skills.sh /audits page for the SEO packs, so their per-skill scan results are unknown.

## What does aaron-he-zhu/seo-geo-claude-skills contain?

### Takeaway
The original repo is now only a signpost. The 16 active SEO/GEO skills moved into the larger "aaron-marketing-skills" bundle (v20.1.0, 120 skills, Apache-2.0). The old standalone 20-skill version is archived at tag v9.9.12 and no longer updated. The bundle runs without API keys, and data connectors are optional.

### Cited Findings
- The repo is now a signpost. The 16 SEO/GEO skills moved to aaron-he-zhu/aaron-marketing-skills, and the standalone 20-skill version is archived at tag `v9.9.12` without updates. License: Apache-2.0. About 209 stars and 26 forks. — [GitHub seo-geo-claude-skills](https://github.com/aaron-he-zhu/seo-geo-claude-skills)
- The 16 skills, by workflow stage:
  - Research: keyword-research, competitor-analysis, serp-analysis, content-gap-analysis
  - Build: content-writer, geo-content-optimizer, serp-markup-builder, page-play-builder
  - Optimize: content-quality-auditor, technical-seo-checker, on-page-seo-checker, site-structure-optimizer
  - Monitor: domain-authority-auditor, rank-tracker, performance-monitor, offsite-signal-analyzer

  — [GitHub seo-geo-claude-skills](https://github.com/aaron-he-zhu/seo-geo-claude-skills)
- The umbrella bundle is at v20.1.0 (442 commits), Apache 2.0, with 120 skills across 7 areas: narrative, SEO/GEO, social, email, paid ads, influencer and launch. — [GitHub aaron-marketing-skills](https://github.com/aaron-he-zhu/aaron-marketing-skills)
- Install in Claude Code with `/plugin marketplace add aaron-he-zhu/aaron-marketing-skills` then `/plugin install aaron-marketing@aaron`. Other agents use `npx skills add aaron-he-zhu/aaron-marketing-skills`. The SEO entrypoint is `/aaron-marketing:seo-geo`. — [GitHub aaron-marketing-skills](https://github.com/aaron-he-zhu/aaron-marketing-skills)
- "No API keys required": Tier 1 works without keys, and connectors are optional. The repo includes Python scripts (validation, smoke tests, bot generation, a local HTML dashboard builder). — [GitHub aaron-marketing-skills](https://github.com/aaron-he-zhu/aaron-marketing-skills)
- The repo itself states the release is engineering-validated, but "real-project outcomes remain unvalidated". — [GitHub aaron-marketing-skills](https://github.com/aaron-he-zhu/aaron-marketing-skills)

### Inferences
- Useful for a tools site: keyword-research, content-gap-analysis, serp-markup-builder (schema), site-structure-optimizer (internal linking and hubs), geo-content-optimizer (AI-answer visibility) and content-quality-auditor.
- Less useful: rank-tracker and domain-authority-auditor. Without a paid data connector they rely on Claude's estimates, not real data.
- Installing the whole 120-skill bundle adds a lot of irrelevant skills (ads, influencer, email). Two cheaper options: install only the SEO skills (if the host allows a subset), or copy the few skills you want into `.claude/skills/` after review.

### Gaps
- I could not check whether a single discipline can be installed without the full bundle.
- The date of the latest commit was not shown.

## What does the SearchFit SEO plugin do?

### Takeaway
SearchFit SEO is a free, MIT-licensed Claude Code plugin with 11 skills, 3 agents and 6 commands. It is listed in Anthropic's knowledge-work-plugins marketplace. No account or API key is needed. It also serves as the entry point to SearchFit.ai's paid SaaS.

### Cited Findings
- Skills: SEO Audit, Technical SEO, On-Page SEO, Broken Links, Internal Linking, Schema Markup, Content Strategy, Content Brief, Keyword Clustering, AI Visibility, Content Translation. — [GitHub searchfit-seo](https://github.com/searchfit/searchfit-seo)
- Agents: SEO Auditor, Content Strategist, Competitor Analyzer. — [GitHub searchfit-seo](https://github.com/searchfit/searchfit-seo)
- Commands: `/create-topic`, `/create-content`, `/translate-content`, `/seo-check`, `/generate-schema`, `/keyword-cluster`. — [GitHub searchfit-seo](https://github.com/searchfit/searchfit-seo)
- License is MIT. "No SearchFit account or API key needed for the free toolkit". The repo had only about 9 GitHub stars when fetched. — [GitHub searchfit-seo](https://github.com/searchfit/searchfit-seo)
- It is listed in the anthropics/knowledge-work-plugins marketplace, with a page on claude.com. — [claude.com/plugins/searchfit-seo](https://claude.com/plugins/searchfit-seo); [claudemarketplaces.com](https://claudemarketplaces.com/plugins/anthropics-knowledge-work-plugins/searchfit-seo)
- It reportedly has over 6,000 installs. It is described as "the free doorway into the SearchFit.ai ecosystem", which is also a separate paid SaaS. — [creacosas.com](https://www.creacosas.com/en/blogs/technology/searchfit-seo-plugin-claude-code) (secondary source)
- Auto-update is off by default for the knowledge-work-plugins marketplace, unlike claude-plugins-official. — [Claude Code docs: discover plugins](https://code.claude.com/docs/en/discover-plugins)

### Inferences
- For thefreetools.eu, the most valuable parts are Content Translation / `/translate-content` (a multilingual site), Schema Markup / `/generate-schema`, Internal Linking, Broken Links and Keyword Clustering.
- Its SEO Auditor agent overlaps with the existing local seo-auditor agent. Keep one of them, or use SearchFit's as a second opinion.
- Its "AI Visibility" and "Competitor Analyzer" features cannot see real SERP or LLM data without a data source. Their output will be reasoning-based estimates.

### Gaps
- The last-update date of the repo was not shown.
- I did not verify whether any skill calls SearchFit.ai endpoints.

## Other Claude Code SEO skills, agents and MCP servers (official vs community, pricing)

### Takeaway
The most useful additions are data connectors: a Google Search Console MCP server (community-built, free, uses your own Google OAuth), a PageSpeed Insights MCP server (community-built, free Google API), and optionally DataForSEO's official MCP (pay-as-you-go, $50 minimum deposit). There is no Google-official Search Console MCP. Google does publish an analytics-mcp for GA4.

### Cited Findings
- Search Console MCP servers are all community-built:
  - AminForou/mcp-gsc (Python). — [GitHub mcp-gsc](https://github.com/AminForou/mcp-gsc)
  - charlesdove977/search-console-mcp (described as pairing with Google's analytics-mcp). — [GitHub search-console-mcp](https://github.com/charlesdove977/search-console-mcp)
  - Hosted options: Composio and Windsor.ai. — [Composio](https://composio.dev/toolkits/google_search_console/framework/claude-code); [Windsor.ai](https://windsor.ai/how-to-send-google-search-console-data-to-claude/)
- These GSC MCP servers pull search analytics, inspect URLs, check indexing and manage sitemaps. Setup needs a Google Cloud project with the Search Console API enabled, plus OAuth. — [Suganthan guide](https://suganthan.com/blog/google-search-console-mcp-server/); [Trevor Lasn](https://www.trevorlasn.com/blog/google-search-console-mcp-claude-code)
- PageSpeed Insights / Lighthouse MCP servers are also community-built:
  - ruslanlap/pagespeed-insights-mcp: 6 tools covering PSI and the Chrome UX Report APIs. — [GitHub ruslanlap](https://github.com/ruslanlap/pagespeed-insights-mcp)
  - Adam Silverstein's Lighthouse/PSI server. — [PulseMCP](https://www.pulsemcp.com/servers/adamsilverstein-lighthouse-pagespeed-insights)
  - Hosted and paid-plan options: Insightful Pipe and Markifact. — [Insightful Pipe](https://github.com/Insightful-Pipe/pagespeed-mcp-server); [Markifact](https://www.markifact.com/pagespeed-insights-mcp)
- DataForSEO has an official MCP server. The server itself is free; you pay DataForSEO's pay-as-you-go API rates. Minimum deposit is $50 and credits don't expire. New accounts get a $1 trial credit. Example costs: about $0.0006 per standard-queue SERP request; Related Keywords costs $0.012 per task plus $0.00012 per keyword. — [DataForSEO MCP](https://dataforseo.com/model-context-protocol); [ContextBolt](https://contextbolt.com/blog/dataforseo-mcp-pricing/)
- Claude Code plugins can bundle hooks and MCP servers. The official docs say to "read the pane before you install" and point to the Plugin security page. — [Claude Code docs](https://code.claude.com/docs/en/discover-plugins)

### Inferences
- Recommended priority for this site:
  1. A GSC MCP server (real query and indexing data per language). This is the highest value.
  2. A PSI MCP server. This is optional, because the local perf-auditor agent already covers much of it.
  3. DataForSEO only if paid keyword volumes become necessary. At $50 it is far cheaper than a Semrush or Ahrefs subscription for occasional multilingual keyword pulls.
- Semrush and Ahrefs MCP connectors almost certainly need paid plans or API units, so they don't fit a $0 budget. This is not verified; see Gaps.

### Gaps
- My search for Semrush, Ahrefs, Similarweb and OpenRush MCP requirements and pricing failed (it timed out), so these are unverified. Check the vendor pages before relying on them.
- I did not compare GitHub stars or maintenance status of the individual GSC and PSI MCP repos.

## Best free SEO tools in 2026 for a new site (current free-tier limits)

### Takeaway
A $0 stack is enough:
- Google Search Console and Bing Webmaster Tools (including Bing's free keyword research with volumes)
- Ahrefs Free (formerly Ahrefs Webmaster Tools): site audit with 5,000 crawl credits per project per month, plus backlinks and keywords for your own verified sites
- Screaming Frog free (500 URLs per crawl)
- PageSpeed Insights and the Rich Results Test
- Keyword Surfer (free)
- Google Trends

The Semrush free tier (10 requests/day), AnswerThePublic free tier (3 searches/day) and Glimpse free tier (about 10/month) are only for occasional spot checks.

### Cited Findings
- Ahrefs Free (the new name for Ahrefs Webmaster Tools / AWT):
  - Includes Site Audit (170+ issues checked), Site Explorer for your own verified sites (backlinks and rankings), and Ahrefs Web Analytics.
  - Allows unlimited verified sites and is free forever with no card.
  - Site Audit gets 5,000 crawl credits per verified project per month.

  — [Ahrefs Webmaster Tools](https://ahrefs.com/webmaster-tools); [Ahrefs Free](https://ahrefs.com/free); [AllAble](https://www.allable.ai/blog/ahrefs-webmaster-tools/)
- Semrush free account limits: 10 reports/requests per day, 10 results per report, 1 project, position tracking for 10 keywords, site audit of about 100 pages per month, and limited AI Visibility features. These numbers come from secondary sources; the official subscription KB was not fetched. — [Costbench](https://costbench.com/software/ai-seo-tools/semrush-ai/free-plan/); [Exploding Topics](https://explodingtopics.com/blog/semrush-free-vs-pro); [Semrush KB](https://www.semrush.com/kb/1011-subscriptions)
- Screaming Frog free edition: 500 URLs per crawl, with no time limit. — [Toolradar](https://toolradar.com/guides/best-free-seo-tools); [checkthat.ai](https://checkthat.ai/brands/screaming-frog/pricing)
- AnswerThePublic free plan: 3 searches per day. — [Search Engine Watch](https://searchenginewatch.com/best-free-seo-tools/); [growthmanager.ai](https://growthmanager.ai/vs/answerthepublic-vs-screaming-frog)
- Bing Webmaster Tools includes a free Keyword Research feature. It shows search volume, trends, a per-country breakdown, newly relevant keywords and related questions. — [Bing Webmaster help](https://www.bing.com/webmasters/help/keyword-research-628070b6); [Search Engine Watch](https://searchenginewatch.com/bing-webmaster-tools-keyword-research/)
- The Keyword Surfer Chrome extension's core features are free with no credit limits. — [eesel AI](https://www.eesel.ai/blog/surfer-seo-chrome-extension); [Chrome Web Store](https://chromewebstore.google.com/detail/keyword-surfer/bafijghppfhdpldihckdcadbcobikaca)
- Glimpse (a Google Trends add-on) offers about 10 free searches per month. Paid plans start around $99/month. This is from a secondary source. — [search summary via eesel/aitoolsreport results](https://aitoolsreport.ai/surfer-seo-free-version/)

### Inferences
- For a multilingual EU site, Bing's per-country keyword volumes are the best free source of real volume numbers per language market.
- The Ahrefs Free per-project crawl budget is enough for thefreetools.eu at its current size. If total URLs across all languages exceed 500, Screaming Frog free cannot crawl the whole site in one pass, so crawl one language subfolder at a time.
- These tools are already free and well documented, so I did not re-verify Google Search Console, PageSpeed Insights, the Rich Results Test or Google Trends. They have no paid tiers.

### Gaps
- I did not fetch Semrush's official KB for the exact free-tier numbers. The Glimpse and Keyword Surfer limits come from secondary sources.

## Security guidance for installing third-party skills and plugins

### Takeaway
Skills and plugins can run code: bundled scripts, hooks and MCP servers. Before installing one:
1. Read its files.
2. Check the skills.sh security scans.
3. Pin a tag or commit.
4. Keep auto-update off for third-party marketplaces (it already is by default).
5. Prefer local or project scope.
6. Uninstall what you don't use, since plugins also cost context tokens on every turn.

### Cited Findings
- "A plugin can run hooks and MCP servers, so read the pane before you install." The install pane lists the commands, agents, skills, hooks and MCP servers a plugin adds. — [Claude Code docs](https://code.claude.com/docs/en/discover-plugins)
- A marketplace can be pinned to a branch or tag with `#ref`, for example `/plugin marketplace add your-org/plugins#v1.2.0`. — [Claude Code docs](https://code.claude.com/docs/en/discover-plugins)
- Auto-update is on by default only for official marketplaces (except knowledge-work-plugins and first-party-plugins). It is off for community and third-party marketplaces. — [Claude Code docs](https://code.claude.com/docs/en/discover-plugins)
- Install scopes are user, project (committed `.claude/settings.json`) and local (`.claude/settings.local.json`). `claude plugin details <name>` shows the always-on token cost, and `/plugin` flags plugins that haven't been used recently. — [Claude Code docs](https://code.claude.com/docs/en/discover-plugins)
- skills.sh shows Gen Agent Trust Hub, Socket and Snyk scan results per skill. Even the most popular skill, find-skills, gets a Snyk "Warn". — [skills.sh find-skills](https://skills.sh/vercel-labs/skills/find-skills)
- The aaron-marketing-skills bundle includes executable Python scripts. — [GitHub aaron-marketing-skills](https://github.com/aaron-he-zhu/aaron-marketing-skills)

### Inferences
- A practical rule for this project:
  1. Prefer copying reviewed SKILL.md files into `.claude/skills/` over live installs.
  2. For plugins, install at local scope and pin with `#tag`.
  3. For MCP servers that use Google OAuth, grant read-only Search Console scope. Store tokens outside the repo, and never commit credentials.
  4. Run `npx skills` only for repos you have reviewed.

### Gaps
- I did not fetch the dedicated Claude Code "Plugin security and trust" page (/docs/en/plugins/security), so its full checklist is not captured here.
