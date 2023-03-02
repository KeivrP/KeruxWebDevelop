ENV["BUNDLE_GEMFILE"] ||= File.expand_path("../Gemfile", __dir__)
ENV['NLS_LANG']='AMERICAN_AMERICA.UTF8' #Para oracle
require "bundler/setup" # Set up gems listed in the Gemfile.
