#!/usr/local/bin/macruby

framework "ScriptingBridge"
require 'json'

class GraffleConverter
  def initialize
    @graffle = SBApplication.applicationWithBundleIdentifier("com.omnigroup.OmniGraffle")
  end

  def to_hash
    @shape_list = []

    @graffle.windows[0].document.canvases[0].layers[0].shapes.select do |s|
      @shape_list << s
      s.incomingLines.length == 0 and s.outgoingLines.length > 1
    end.compact.collect { |root| process_node(root) }
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
    puts shape.text.get
    raise ArgumentError, "No shape passed" unless shape

    children = []

    shape.outgoingLines.each do |line|
      # destination is a graphic, not a shape, was having some issues working with shapes
      next_shape = @shape_list.detect { |d| d.valueForKey("id") == line.destination.valueForKey("id") }
      children << process_node(next_shape)
    end

    { :children => children, :name => shape.text.get.to_s }
  end
end

json = GraffleConverter.new.to_hash.to_json
File.open('new_convo.json', 'w') {|f| f.write json }
