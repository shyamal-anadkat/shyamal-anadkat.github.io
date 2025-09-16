[![pages-build-deployment](https://github.com/shyamal-anadkat/shyamal-anadkat.github.io/actions/workflows/pages/pages-build-deployment/badge.svg?branch=main)](https://github.com/shyamal-anadkat/shyamal-anadkat.github.io/actions/workflows/pages/pages-build-deployment)
[![CodeQL](https://github.com/shyamal-anadkat/shyamal-anadkat.github.io/actions/workflows/codeql-analysis.yml/badge.svg?branch=main)](https://github.com/shyamal-anadkat/shyamal-anadkat.github.io/actions/workflows/codeql-analysis.yml)


served at https://www.shyamal.me

Overview
--------
- Static site and blog built with Jekyll, deployed via GitHub Pages.
- Uses the `pages-themes/minimal` remote theme with custom layouts, styles, and scripts.
- Nice-to-haves: dark mode toggle, instant search, reading progress bar, related posts, tags index, RSS feed, sitemap, and share buttons.

Getting Started
---------------
- Prereqs: Ruby and Bundler installed.
- Install gems: `bundle install`
- Serve locally: `bundle exec jekyll serve` then open `http://localhost:4000`
- Convenience targets:
  - `make run`: kill anything on port 4000, install, and serve
  - `make serve`: serve using `arch -x86_64` (useful on Apple Silicon if needed)
  - `make setup`: clean lock/vendor and reinstall using Rosetta, then serve

Content & Structure
-------------------
- Posts live in `_posts/` as `YYYY-MM-DD-title.md` and use YAML front matter.
- Key files and folders:
  - `_config.yml`: site metadata, theme, plugins, permalink format
  - `_layouts/default.html` and `_layouts/post.html`: site frame and post view
  - `_includes/`: shared snippets (e.g., share buttons, analytics head)
  - `assets/css/theme.css`: custom styles, including dark mode
  - `search.json`: static search index used by the header search box
  - `tags/index.html`: tag directory page
  - `index.html`: homepage with Featured + All Posts

Writing a Post
--------------
- Create `_posts/YYYY-MM-DD-my-title.md` with at least:

```
---
layout: post
title: "My Post Title"
tags:
- TagOne
- TagTwo
# Optional to feature on homepage
# featured: true
# Optional social/OG image (relative path or absolute URL)
# image: assets/img/cover.png
---

Your Markdown content here.
```

SEO, Feed, and Sitemaps
-----------------------
- `jekyll-seo-tag` outputs standard meta tags; set defaults in `_config.yml`.
- RSS feed at `/feed.xml` (via `jekyll-feed`).
- Sitemap at `/sitemap.xml`.

Deployment
----------
- Pushing to `main` triggers the GitHub Pages build and deploy (see badge above).
- Custom domain configured via `CNAME` (`shyamal.me`).

Troubleshooting
---------------
- Port busy on 4000: use `make run` to kill and restart the local server.
- Apple Silicon issues with native gems: try `make serve` or `make setup` to run via Rosetta.

Notes
-----
- This is a personal site; contributions are not expected. For small fixes, open a PR.
