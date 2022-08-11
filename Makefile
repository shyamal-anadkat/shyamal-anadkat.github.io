run:
	lsof -ti:4000 | xargs kill -9 && bundle install && bundle exec jekyll serve