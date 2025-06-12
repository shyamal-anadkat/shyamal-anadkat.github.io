require 'spec_helper'

RSpec.describe "HTML and Link Validation" do
  before(:all) do
    # Build the site first
    config = Jekyll.configuration({
      'source' => File.expand_path('..', __dir__),
      'destination' => File.expand_path('../_site', __dir__),
      'quiet' => true
    })
    site = Jekyll::Site.new(config)
    site.process
    @site_dir = '_site'
  end

  describe "HTML Structure" do
    it "builds site successfully" do
      expect(Dir.exist?(@site_dir)).to be true
    end

    it "generates valid HTML files" do
      html_files = Dir.glob("#{@site_dir}/**/*.html")
      expect(html_files).not_to be_empty
      
      html_files.each do |file|
        content = File.read(file)
        doc = Nokogiri::HTML(content)
        expect(doc.errors).to be_empty, "HTML errors in #{file}: #{doc.errors.map(&:message)}"
      end
    end
  end

  describe "SEO and Meta Tags" do
    let(:index_html) { File.read("#{@site_dir}/index.html") }
    let(:index_doc) { Nokogiri::HTML(index_html) }

    it "has title tag" do
      title = index_doc.at_css('title')
      expect(title).not_to be_nil
      expect(title.text.strip).not_to be_empty
    end

    it "has meta description" do
      meta_desc = index_doc.at_css('meta[name="description"]')
      expect(meta_desc).not_to be_nil
      expect(meta_desc['content']).not_to be_nil
      expect(meta_desc['content'].strip).not_to be_empty
    end

    it "has viewport meta tag" do
      viewport = index_doc.at_css('meta[name="viewport"]')
      expect(viewport).not_to be_nil
    end

    it "has charset declaration" do
      charset = index_doc.at_css('meta[charset]')
      expect(charset).not_to be_nil
    end

    it "has canonical URL if configured" do
      canonical = index_doc.at_css('link[rel="canonical"]')
      if canonical
        expect(canonical['href']).to match(/^https?:\/\//)
      end
    end
  end

  describe "Performance and Accessibility" do
    let(:html_files) { Dir.glob("#{@site_dir}/**/*.html") }

    it "doesn't have excessive inline styles" do
      html_files.each do |file|
        content = File.read(file)
        doc = Nokogiri::HTML(content)
        
        inline_styles = doc.css('[style]')
        expect(inline_styles.length).to be < 10, 
          "Too many inline styles in #{file} (#{inline_styles.length})"
      end
    end

    it "has alt attributes for images" do
      html_files.each do |file|
        content = File.read(file)
        doc = Nokogiri::HTML(content)
        
        images = doc.css('img')
        images.each do |img|
          # Allow images without alt if they have aria-hidden or are decorative
          unless img['aria-hidden'] == 'true' || img['role'] == 'presentation'
            expect(img['alt']).not_to be_nil, 
              "Image missing alt attribute in #{file}: #{img}"
          end
        end
      end
    end
  end

  describe "Internal Link Validation" do
    it "validates internal links using HTMLProofer" do
      # Skip external link checking for faster CI, focus on internal links
      options = {
        check_external_hash: false,
        check_html: true,
        check_img_http: false,
        enforce_https: false,
        disable_external: true,
        allow_hash_href: true,
        ignore_status_codes: [0, 200, 301, 302, 403, 999]
      }

      expect {
        HTMLProofer.check_directory(@site_dir, options).run
      }.not_to raise_error
    end
  end

  describe "Content Structure" do
    let(:blog_posts) { Dir.glob("#{@site_dir}/blog/**/*.html") }

    it "generates blog post pages" do
      expect(blog_posts).not_to be_empty
    end

    blog_posts.each do |post_file|
      context "Post: #{File.basename(post_file, '.html')}" do
        let(:content) { File.read(post_file) }
        let(:doc) { Nokogiri::HTML(content) }

        it "has proper heading structure" do
          headings = doc.css('h1, h2, h3, h4, h5, h6')
          expect(headings).not_to be_empty
          
          # Should have at least one h1 (title)
          h1s = doc.css('h1')
          expect(h1s.length).to be >= 1
        end

        it "has readable content" do
          body_text = doc.css('body').text.strip
          word_count = body_text.split.length
          expect(word_count).to be > 50, "Post seems too short (#{word_count} words)"
        end
      end
    end
  end
end 