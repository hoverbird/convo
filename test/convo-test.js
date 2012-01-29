// convo-test.js

var path = require('path'),
    vows = require('vows'),
    assert = require('assert'),
    gently = new (require('gently')),
    convo = require('convo')

vows.describe('Convo').addBatch({
  '.askQuestions': {
    topic : [{
        "name": "What is yr business, stranger?",
        "children": [{"name": "Whatsit to you, copper?", "children": []}]
    }],


    'passes an Array containing a question object to the prompt': function (convoData) {
      gently.expect(convo.prompt, 'get', function(msg) {
        assert.isArray(msg)
        var question = msg[0]
        assert.isObject(question)

        assert.match(question.name, /What is yr business, stranger?/)
        assert.match(question.message, /What is yr business, stranger?/)
        assert.match(question.message, /Whatsit to you, copper?/)
      });

      convo.askQuestions(convoData[0])
    }
  }
}).exportTo(module);


