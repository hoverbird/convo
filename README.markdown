Convo.js
=====

Convo is a tiny conversation tree interface in Node.js

What it do
----------------------------

* Runs a JSON representation of a conversation tree as a multiple-choice dialog, Adventure Game style
  * check out the examples directory for what the format looks like
  * there's also a macruby script provided (in /script) that will take a hierarchical graph from Omnigraffle and turn it into the correct JSON
  * with convo, adventure game dialog is you!
* Nothing else

How it run
----------------------------

First install dependencies:
`npm install`

Then pass it a JSON file:
`node convo examples/dialogue_tree.json`

You can then either type you responses out, or enter in the corresponding digit.

Generate your own dialog trees
----------------------------

* In omnigraffle, make a new doc from the "hierarchical" template.
* Make sure you have MacRuby installed (it is a Ruby for Scottish people)
* `macruby script/graffle2json`
* the script will pull the data out of the foremost document open in graffle- no file paths required!
* you'll find your translated JSON file in the convo root dir