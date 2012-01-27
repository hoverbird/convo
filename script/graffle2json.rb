#!/usr/local/bin/macruby

framework "ScriptingBridge"
require 'json'
class GraffleConverter
  def initialize
    puts 000
    @graffle = SBApplication.applicationWithBundleIdentifier("com.omnigroup.OmniGraffle")
  end

  def to_hash
    puts 111
    @shape_list = []

    @graffle.windows[0].document.canvases[0].layers[0].shapes.select do |s|
      puts 222
      @shape_list << s
      s.incomingLines.length == 0 and s.outgoingLines.length > 1
    end.collect { |root| process_node(root) }
  end

  # ==========
  # {
  #   'name':'node name',
  #   'children': [
  #     {...}, {...}
  #   ]
  # }
  # ==========

  private
  def process_node(shape)
    children = []

    shape.outgoingLines.each do |line|
      # destination is a graphic, not a shape, was having some issues working with shapes
      next_shape = @shape_list.detect { |d| d.valueForKey("id") == line.destination.valueForKey("id") }
      children << process_node(next_shape)
    end

    { :children => children, :name => shape.text.get.to_s }
  end
end

puts GraffleConverter.new.to_hash.to_json