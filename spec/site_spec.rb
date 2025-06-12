require 'open3'
require 'html-proofer'

RSpec.describe 'Jekyll blog' do
  it 'builds the site without errors' do
    stdout, stderr, status = Open3.capture3('bundle exec jekyll build --quiet')
    expect(status.success?).to be true, "Jekyll build failed:\nSTDOUT: #{stdout}\nSTDERR: #{stderr}"
  end

  it 'has no broken internal links or HTML issues' do
    options = {
      assume_extension: true,  # /about -> /about/index.html
      disable_external: true,  # skip external links to speed up CI
      check_html: true
    }

    expect {
      HTMLProofer.check_directory('./_site', options).run
    }.not_to raise_error, 'HTMLProofer reported issues in the generated site'
  end
end 