require 'spec_helper'

RSpec.describe "Blog Posts" do
  let(:posts_dir) { '_posts' }
  let(:post_files) { Dir.glob("#{posts_dir}/*.md") }

  describe "Post Files" do
    it "has at least one blog post" do
      expect(post_files).not_to be_empty
    end

    it "follows naming convention (YYYY-MM-DD-title.md)" do
      post_files.each do |file|
        filename = File.basename(file)
        expect(filename).to match(/^\d{4}-\d{2}-\d{2}-.+\.md$/)
      end
    end
  end

  describe "Front Matter Validation" do
    post_files.each do |post_file|
      context "Post: #{File.basename(post_file)}" do
        let(:content) { File.read(post_file) }
        let(:front_matter) do
          if content =~ /\A---\s*\n(.*?)\n---\s*\n/m
            YAML.load($1)
          else
            nil
          end
        end

        it "has valid YAML front matter" do
          expect(front_matter).not_to be_nil
          expect(front_matter).to be_a(Hash)
        end

        it "has required front matter fields" do
          expect(front_matter).to have_key('layout')
          expect(front_matter).to have_key('title')
        end

        it "has 'post' layout" do
          expect(front_matter['layout']).to eq('post')
        end

        it "has non-empty title" do
          expect(front_matter['title']).to be_a(String)
          expect(front_matter['title'].strip).not_to be_empty
        end

        it "has valid tags format if present" do
          if front_matter['tags']
            expect(front_matter['tags']).to be_a(Array)
            front_matter['tags'].each do |tag|
              expect(tag).to be_a(String)
              expect(tag.strip).not_to be_empty
            end
          end
        end

        it "has valid date format in filename" do
          filename = File.basename(post_file)
          date_match = filename.match(/^(\d{4})-(\d{2})-(\d{2})/)
          expect(date_match).not_to be_nil
          
          year, month, day = date_match[1].to_i, date_match[2].to_i, date_match[3].to_i
          expect(year).to be_between(2019, 2030)
          expect(month).to be_between(1, 12)
          expect(day).to be_between(1, 31)
        end
      end
    end
  end

  describe "Content Validation" do
    post_files.each do |post_file|
      context "Post: #{File.basename(post_file)}" do
        let(:content) { File.read(post_file) }
        let(:body) do
          if content =~ /\A---\s*\n.*?\n---\s*\n(.*)/m
            $1
          else
            content
          end
        end

        it "has content after front matter" do
          expect(body.strip).not_to be_empty
        end

        it "doesn't have trailing whitespace on lines" do
          lines_with_trailing_whitespace = body.lines.select { |line| line =~ /\s+\n$/ }
          expect(lines_with_trailing_whitespace).to be_empty, 
            "Found lines with trailing whitespace: #{lines_with_trailing_whitespace.map(&:chomp)}"
        end

        it "doesn't have multiple consecutive blank lines" do
          expect(body).not_to match(/\n\s*\n\s*\n/)
        end

        it "has reasonable content length" do
          word_count = body.split.length
          expect(word_count).to be > 10, "Post seems too short (#{word_count} words)"
        end
      end
    end
  end

  describe "Markdown Validation" do
    post_files.each do |post_file|
      context "Post: #{File.basename(post_file)}" do
        let(:content) { File.read(post_file) }

        it "has balanced markdown link syntax" do
          open_brackets = content.scan(/\[/).length
          close_brackets = content.scan(/\]/).length
          expect(open_brackets).to eq(close_brackets)
        end

        it "has properly formatted image links" do
          image_links = content.scan(/!\[.*?\]\(.*?\)/)
          image_links.each do |link|
            expect(link).to match(/!\[.*?\]\(.+\)/)
          end
        end

        it "doesn't have broken markdown headers" do
          headers = content.scan(/^#+\s/)
          headers.each do |header|
            expect(header).to match(/^#{1,6}\s/)
          end
        end
      end
    end
  end
end 