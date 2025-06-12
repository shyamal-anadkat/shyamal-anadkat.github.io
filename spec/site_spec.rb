require 'spec_helper'

RSpec.describe "Site Building" do
  before(:all) do
    @config = Jekyll.configuration({
      'source' => File.expand_path('..', __dir__),
      'destination' => File.expand_path('../_site', __dir__),
      'quiet' => true
    })
    @site = Jekyll::Site.new(@config)
  end

  describe "Jekyll Configuration" do
    it "loads the configuration file" do
      expect(File.exist?('_config.yml')).to be true
    end

    it "has required configuration keys" do
      config = YAML.load_file('_config.yml')
      expect(config).to have_key('title')
      expect(config).to have_key('url')
      expect(config).to have_key('author')
      expect(config).to have_key('description')
    end

    it "has valid URL format" do
      config = YAML.load_file('_config.yml')
      expect(config['url']).to match(/^https?:\/\//)
    end
  end

  describe "Site Building" do
    it "builds successfully without errors" do
      expect { @site.process }.not_to raise_error
    end

    it "generates _site directory" do
      @site.process
      expect(Dir.exist?('_site')).to be true
    end

    it "generates index.html" do
      @site.process
      expect(File.exist?('_site/index.html')).to be true
    end

    it "generates 404.html" do
      @site.process
      expect(File.exist?('_site/404.html')).to be true
    end
  end

  describe "Essential Files" do
    it "has robots.txt" do
      expect(File.exist?('robots.txt')).to be true
    end

    it "has sitemap.xml" do
      expect(File.exist?('sitemap.xml')).to be true
    end

    it "has CNAME file for custom domain" do
      expect(File.exist?('CNAME')).to be true
    end
  end
end 