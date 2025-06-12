# 🧪 Blog Testing Guide

This document explains the comprehensive testing setup for your Jekyll blog, designed to run both locally and in CI/CD environments.

## 📋 Test Overview

The testing suite includes:

- **Content Validation** - Ensures blog posts have proper front matter and valid markdown
- **Site Building** - Verifies Jekyll can build the site successfully
- **HTML Validation** - Checks generated HTML for validity and accessibility
- **Link Checking** - Validates internal links work correctly
- **SEO Validation** - Ensures proper meta tags and SEO elements
- **Performance Checks** - Basic performance and file size validation

## 🚀 Quick Start

### Prerequisites

```bash
# Install Ruby (if not already installed)
# On macOS with Homebrew:
brew install ruby

# Install bundler
gem install bundler

# Install dependencies
bundle install
```

### Running Tests

```bash
# Quick tests (recommended for development)
./scripts/test.sh quick

# Full test suite
./scripts/test.sh full

# Include external link checking (slow)
./scripts/test.sh external

# Performance checks
./scripts/test.sh perf
```

### Using Rake Tasks

```bash
# Run all tests
bundle exec rake test

# Run specific test types
bundle exec rake test_posts    # RSpec tests
bundle exec rake test_site     # Site building
bundle exec rake test_html     # HTML validation

# Development helpers
bundle exec rake serve         # Start local server
bundle exec rake clean         # Clean build artifacts
bundle exec rake perf          # Performance check
```

## 📊 Test Details

### 1. Content Validation (`spec/posts_spec.rb`)

Tests every blog post for:

- **File Naming**: Follows `YYYY-MM-DD-title.md` convention
- **Front Matter**: Valid YAML with required fields (`layout`, `title`)
- **Content Quality**: Reasonable length, no trailing whitespace
- **Markdown Syntax**: Balanced brackets, proper image links
- **Tags**: Valid format if present

### 2. Site Building (`spec/site_spec.rb`)

Validates:

- **Configuration**: Valid `_config.yml` with required keys
- **Building**: Jekyll builds without errors
- **Output**: Generates required files (`index.html`, `404.html`)
- **Essential Files**: `robots.txt`, `sitemap.xml`, `CNAME`

### 3. HTML Validation (`spec/html_spec.rb`)

Checks:

- **HTML Structure**: Valid HTML5 markup
- **SEO Elements**: Title tags, meta descriptions, canonical URLs
- **Accessibility**: Alt attributes for images
- **Performance**: No excessive inline styles
- **Links**: Internal link validation with HTMLProofer

## 🔧 CI/CD Integration

### GitHub Actions

The workflow (`.github/workflows/test.yml`) runs:

1. **Matrix Testing**: Tests with Ruby 3.1 and 3.2
2. **Dependency Caching**: Speeds up builds
3. **Comprehensive Testing**: All test suites
4. **Performance Monitoring**: Basic performance checks
5. **Lighthouse Testing**: Performance auditing on PRs
6. **Security Scanning**: Checks for sensitive data
7. **Artifact Upload**: Saves test results

### Triggering Tests

Tests run automatically on:

- **Push** to `main`/`master` branch
- **Pull Requests** to `main`/`master`
- **Daily Schedule** (6 AM UTC) for dependency health checks

## 🛠️ Configuration

### Test Configuration

Edit `spec/spec_helper.rb` to modify RSpec settings.

### HTMLProofer Settings

Customize link checking in `Rakefile`:

```ruby
options = {
  check_external_hash: false,
  check_html: true,
  disable_external: true,  # Set to false to check external links
  allow_hash_href: true,
  ignore_status_codes: [0, 200, 301, 302, 403, 999]
}
```

### Jekyll Configuration

Ensure `_config.yml` has required fields:

```yaml
title: "Your Blog Title"
url: "https://yourdomain.com"
author: "Your Name"
description: "Your blog description"
```

## 🐛 Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Check Jekyll configuration
   bundle exec jekyll doctor
   
   # Build with verbose output
   bundle exec jekyll build --trace
   ```

2. **Test Failures**
   ```bash
   # Run specific test
   bundle exec rspec spec/posts_spec.rb
   
   # Run with detailed output
   bundle exec rspec --format documentation
   ```

3. **HTMLProofer Issues**
   ```bash
   # Test with external links disabled
   bundle exec rake test_html
   
   # Test external links separately
   bundle exec rake test_external_links
   ```

### Local Development

```bash
# Setup development environment
bundle exec rake setup

# Create new post
bundle exec rake dev:new_post["My New Post"]

# Check all post front matter
bundle exec rake dev:check_posts

# Clean and rebuild
bundle exec rake clean
bundle exec rake build
```

## 📈 Performance Monitoring

The test suite includes basic performance checks:

- **File Size Monitoring**: Warns about files > 1MB
- **Site Statistics**: Total files and size
- **Lighthouse Integration**: Performance auditing on PRs

### Performance Thresholds

- HTML files: < 1MB
- CSS files: < 500KB
- JS files: < 500KB
- Total site size: Monitored and reported

## 🔍 Test Reports

### Local Reports

```bash
# Generate detailed test report
bundle exec rspec --format html --out tmp/test_report.html

# Performance report
bundle exec rake perf
```

### CI Reports

- Test results are uploaded as GitHub artifacts
- Performance metrics are commented on PRs
- Lighthouse reports are generated for PRs

## 📚 Adding New Tests

### Adding Content Tests

Add new tests to `spec/posts_spec.rb`:

```ruby
it "has valid custom field" do
  if front_matter['custom_field']
    expect(front_matter['custom_field']).to be_a(String)
  end
end
```

### Adding Site Tests

Add new tests to `spec/site_spec.rb`:

```ruby
it "generates custom page" do
  @site.process
  expect(File.exist?('_site/custom.html')).to be true
end
```

### Adding HTML Tests

Add new tests to `spec/html_spec.rb`:

```ruby
it "has proper schema markup" do
  schema = doc.at_css('[itemtype]')
  expect(schema).not_to be_nil if schema
end
```

## 🎯 Best Practices

1. **Run Tests Frequently**: Use `./scripts/test.sh quick` during development
2. **Fix Issues Early**: Don't let technical debt accumulate
3. **Monitor Performance**: Keep an eye on site size and speed
4. **Update Dependencies**: Regular `bundle update`
5. **Test Before Merging**: Ensure all tests pass before merging PRs

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review test output for specific error messages
3. Run tests with verbose output for more details
4. Check GitHub Actions logs for CI failures

---

*This testing setup ensures your blog maintains high quality, performance, and reliability. Happy blogging! 🎉* 