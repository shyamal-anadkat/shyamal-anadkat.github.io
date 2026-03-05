export PATH := /opt/homebrew/opt/ruby@3.3/bin:$(PATH)

BUNDLE := /opt/homebrew/opt/ruby@3.3/bin/bundle

run:
	lsof -ti:4000 | xargs kill -9 && $(BUNDLE) install && $(BUNDLE) exec jekyll serve

setup:
	rm -rf vendor/bundle && rm -f Gemfile.lock && $(BUNDLE) install && $(BUNDLE) exec jekyll serve

serve:
	$(BUNDLE) exec jekyll serve
