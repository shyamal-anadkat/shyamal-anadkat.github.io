require 'open3'

RSpec.configure do |config|
  # Build the Jekyll site once before the test suite runs so specs can
  # work against the generated output in the _site directory.
  config.before(:suite) do
    puts 'Building Jekyll site for tests…'
    stdout, stderr, status = Open3.capture3('bundle exec jekyll build --quiet')

    unless status.success?
      warn "Jekyll build failed during test setup:\nSTDOUT: #{stdout}\nSTDERR: #{stderr}"
      # Fail fast if the site cannot be built.
      exit 1
    end
  end
end 