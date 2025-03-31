run:
	lsof -ti:4000 | xargs kill -9 && bundle install && bundle exec jekyll serve

setup:
	rm -rf vendor/bundle && rm Gemfile.lock && arch -x86_64 bundle install && arch -x86_64 bundle exec jekyll serve

serve:
	arch -x86_64 bundle exec jekyll serve
