require 'rspec/core/rake_task'
require 'html-proofer'
require 'jekyll'

# Default task
task default: [:test]

# Test tasks
desc "Run all tests"
task test: [:test_posts, :test_site, :test_html]

desc "Run RSpec tests"
RSpec::Core::RakeTask.new(:test_posts) do |t|
  t.pattern = 'spec/**/*_spec.rb'
  t.rspec_opts = '--format documentation'
end

desc "Build Jekyll site"
task :build do
  puts "Building Jekyll site..."
  config = Jekyll.configuration({
    'source' => '.',
    'destination' => '_site',
    'quiet' => false
  })
  site = Jekyll::Site.new(config)
  site.process
  puts "✅ Site built successfully"
end

desc "Test site building"
task test_site: [:build] do
  puts "✅ Site builds without errors"
end

desc "Test HTML with HTMLProofer"
task test_html: [:build] do
  puts "Running HTMLProofer..."
  options = {
    check_external_hash: false,
    check_html: true,
    check_img_http: false,
    enforce_https: false,
    disable_external: true,
    allow_hash_href: true,
    ignore_status_codes: [0, 200, 301, 302, 403, 999]
  }
  
  HTMLProofer.check_directory('_site', options).run
  puts "✅ HTML validation passed"
end

desc "Test external links (slow)"
task :test_external_links do
  puts "Testing external links (this may take a while)..."
  options = {
    check_external_hash: true,
    check_html: true,
    check_img_http: true,
    enforce_https: false,
    disable_external: false,
    allow_hash_href: true,
    ignore_status_codes: [999, 403, 0],
    typhoeus: {
      timeout: 10,
      connecttimeout: 5
    }
  }
  
  HTMLProofer.check_directory('_site', options).run
  puts "✅ External link validation passed"
end

desc "Serve site locally"
task :serve do
  puts "Starting Jekyll server..."
  system('bundle exec jekyll serve --livereload')
end

desc "Clean build artifacts"
task :clean do
  puts "Cleaning build artifacts..."
  FileUtils.rm_rf('_site')
  FileUtils.rm_rf('.sass-cache')
  FileUtils.rm_rf('.jekyll-cache')
  FileUtils.rm_rf('tmp')
  puts "✅ Clean completed"
end

desc "Setup development environment"
task :setup do
  puts "Setting up development environment..."
  system('bundle install')
  puts "✅ Development environment ready"
  puts "Run 'rake test' to run tests"
  puts "Run 'rake serve' to start local server"
end

desc "Quick test (fast subset for development)"
task :quick_test do
  puts "Running quick tests..."
  Rake::Task['test_posts'].invoke
  Rake::Task['test_site'].invoke
  puts "✅ Quick tests completed"
end

desc "Performance check"
task perf: [:build] do
  puts "Checking site performance..."
  
  # Check file sizes
  large_files = []
  Dir.glob('_site/**/*').each do |file|
    if File.file?(file) && File.size(file) > 1_000_000  # 1MB
      large_files << "#{file}: #{(File.size(file) / 1024.0 / 1024.0).round(2)}MB"
    end
  end
  
  if large_files.any?
    puts "⚠️  Large files found:"
    large_files.each { |file| puts "  #{file}" }
  else
    puts "✅ No large files found"
  end
  
  # Site statistics
  total_files = Dir.glob('_site/**/*').select { |f| File.file?(f) }.length
  total_size = `du -sh _site`.split.first
  
  puts "📊 Site statistics:"
  puts "  Total files: #{total_files}"
  puts "  Total size: #{total_size}"
end

# Development helpers
namespace :dev do
  desc "Create a new blog post"
  task :new_post, [:title] do |t, args|
    title = args[:title] || 'New Post'
    slug = title.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
    date = Time.now.strftime('%Y-%m-%d')
    filename = "_posts/#{date}-#{slug}.md"
    
    if File.exist?(filename)
      puts "❌ Post already exists: #{filename}"
      exit 1
    end
    
    content = <<~CONTENT
      ---
      layout: post
      title: "#{title}"
      tags:
      - 
      ---
      
      Your content here...
    CONTENT
    
    File.write(filename, content)
    puts "✅ Created new post: #{filename}"
  end
  
  desc "Check post front matter"
  task :check_posts do
    Dir.glob('_posts/*.md').each do |file|
      content = File.read(file)
      if content =~ /\A---\s*\n(.*?)\n---\s*\n/m
        front_matter = YAML.load($1)
        puts "📄 #{File.basename(file)}: #{front_matter['title']}"
      else
        puts "❌ #{File.basename(file)}: No front matter found"
      end
    end
  end
end 