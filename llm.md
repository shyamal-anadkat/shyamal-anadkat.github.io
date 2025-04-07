High‑level view  
---------------  
This repo is **the source for the static web‑site https://shyamal.me**.  
The site is generated with Jekyll, the static‑site generator that powers GitHub Pages, and published automatically from the *main* branch.

Folder / file tour  
------------------  
• `_config.yml` – central Jekyll configuration  
  • points to the GitHub Pages “minimal” remote‑theme (`pages‑themes/minimal@v0.2.0`)  
  • sets site metadata (title, author, GA id, permalink style, etc.)  

• `Gemfile` – declares Ruby gems; `github‑pages` brings Jekyll + the plug‑ins that GitHub Pages allows, `jekyll‑seo‑tag` is added explicitly.  
  The gems are vendored into `vendor/bundle` by Bundler.

• `Makefile` – tiny convenience wrapper  
  • `make run`  ➜ kill anything on :4000, install gems, `jekyll serve`  
  • `make serve` and `make setup` helpers (the `arch -x86_64` bits are there so the commands also work on Apple Silicon).

• `_posts/` – all blog posts in Markdown (`YYYY‑MM‑DD‑title.md`) with YAML front‑matter. Jekyll turns every file into `/blog/<title>/index.html`.

• `assets/` – user‑supplied static files  
  • `css/theme.css` – overrides the remote theme; adds the dark / light colour‑scheme, custom fonts and the switch styling.  
  • `img/`, `html/`, … – images and one‑off pages.

• `_layouts/` – layouts that extend / override the remote theme  
  • `default.html` – the frame every page inherits.  
    – Adds the dark/light toggle (remembered in `localStorage`).  
    – Pulls in `jekyll-seo-tag`, Google Analytics code, Lyket applause widget, etc.  
  • `post.html` – used for every entry in `_posts/` (shows date, author, share buttons, tags).  

• `_includes/` – reusable snippets injected by the layouts  
  • `head-custom-google-analytics.html` – GA + “applause” button.  
  • `share-buttons.html` – small CSS/HTML block that creates Twitter/LinkedIn copy‑link share buttons.

• `_site/` – the compiled output of `jekyll build`. It is **not needed for development** but has been committed so the rendered files are visible in the repo.

• `.github/workflows/`  
  • `codeql-analysis.yml` – weekly CodeQL static analysis for the Ruby code (mainly the Jekyll build scripts).  
  GitHub Pages itself takes care of building & deploying the site; therefore the pages workflow file lives in the project settings, not in this repo.

How the site is built & served locally  
--------------------------------------  
1. `bundle install`                       # install the gems into `vendor/bundle`  
2. `bundle exec jekyll serve` or `make run`  
   Jekyll reads `_config.yml`, merges in the remote theme, processes everything in `_posts`, applies the layouts, copies `assets`, and serves the result on http://localhost:4000.

Interesting implementation details  
----------------------------------  
• Dark / light theme – purely client‑side:  
  – CSS in `assets/css/theme.css` defines both palettes.  
  – A small inlined JS snippet in `default.html` applies the correct class on `body` based on `localStorage` or the OS colour‑scheme and updates it when the toggle is clicked.

• Social / applause / analytics scripts are kept out of the Markdown posts and injected globally via `_includes`.

• Because the repo relies on the GitHub‑hosted theme, the codebase stays very small; only the pieces that differ from the upstream theme live here.

In short  
--------  
The codebase is a minimal Jekyll blog:

1. `_posts` contains the content.  
2. `_layouts` + `_includes` tweak the look & add functionality (dark mode, share buttons, GA).  
3. `assets` holds custom CSS, images, standalone HTML.  
4. Bundler + Makefile make local development easy; GitHub Pages handles production builds, and a CodeQL action adds basic security scanning.