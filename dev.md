# Developing this blog

This repository contains the source for [shyamal.me](https://www.shyamal.me),
a static site built with [Jekyll](https://jekyllrb.com/) and deployed on
[GitHub Pages](https://pages.github.com/).

Content lives under `_posts` and uses the [`pages-themes/minimal`](https://github.com/pages-themes/minimal)
remote theme. Site‑wide settings (title, author, etc.) are configured in
`_config.yml`. Posts are Markdown files following the standard
`YEAR-MONTH-DAY-title.md` Jekyll convention and must include YAML front matter.

Static assets such as images live in `assets/`. To override or extend the theme,
place partials in `_includes` or custom layouts in `_layouts`.

## Building and serving locally

1. Make sure you have [Ruby](https://www.ruby-lang.org/en/) and
   [Bundler](https://bundler.io/) installed.
2. Install gem dependencies:

   ```
   bundle install
   ```

   By default, gems are installed into `vendor/bundle` as configured by Bundler.
3. Build and serve the site locally:

   ```
   bundle exec jekyll serve
   ```

   This will build the site and serve it at <http://localhost:4000>. Modify the
   `--port` flag if you need to run on a different port.

There is also a `Makefile` with convenience targets:

```sh
# installs gems and runs `jekyll serve` after killing any existing process on port 4000
make run
```

## Deployment

GitHub Pages picks up the `main` branch and runs Jekyll using the same
`Gemfile`. Pushing to `main` triggers the Pages build (see the badge in
`README.md`).

See the [GitHub Pages documentation](https://docs.github.com/en/pages/using-github-pages-with-your-projects-site) and
the [Jekyll docs](https://jekyllrb.com/docs/) for more on customizing and extending
your site.
