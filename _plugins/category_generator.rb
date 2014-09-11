module Jekyll
  # Represents a specific category page
  class CategoryPage < Page
    MATCHER = /^(.+\/)*(\d+)-(.*)(\.[^.]+)$/
    
    def initialize(site, source, dir, name)
      @site = site
      @base = self.containing_dir(source, dir)
      @dir = dir
      @name = name
      self.process @name
      self.read_yaml(@base, @name)
      
      self.data['category'] = @basename
      self.data['layout'] = 'category'
    end
    
    # Get the full path to the directory containing the post files
    def containing_dir(source, dir)
      return File.join(source, dir, '_categories')
    end
    
    # The template of the permalink.
    #
    # Returns the template String.
    def template
      "/:path/:basename/"
    end
    
    def self.valid?(name)
      name =~ MATCHER
    end
    
    # Extract information from the post filename.
    #
    # name - The String filename of the post file.
    #
    # Returns nothing.
    def process(name)
      m, cats, order, basename, ext = *name.match(MATCHER)
      self.basename = basename
      self.ext = ext
    rescue ArgumentError
      raise FatalException.new("Post #{name} does not have a valid date.")
    end
  end

  # Generate a page for every category
  class CategoryPageGenerator < Generator
    safe true

    def generate(site)
      @site = site
      
      categoryPages = read_categories
      
      unless categoryPages.empty?
        dir = @site.config['category_dir'] || ''
        categoryPages.each do |categoryPage|
          write_category_page(dir, categoryPage)
        end
      end
    end

    private

    def write_category_page(dir, categoryPage)
      categoryPage.render(@site.layouts, @site.site_payload)
      categoryPage.write(@site.dest)
      @site.pages << categoryPage
    end
    
    # Read all the files in <source>/<dir>/_posts and create a new Post
    # object with each one.
    #
    # dir - The String relative path of the directory to read.
    #
    # Returns nothing.
    def read_categories(dir = '')
      categoryPages = @site.read_content(dir, '_categories', CategoryPage)
   end
  end
end
