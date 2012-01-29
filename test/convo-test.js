// convo-test.js

var path = require('path'),
    vows = require('vows'),
    assert = require('assert'),
    gently = new (require('gently')),
    winston = require('winston'),
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
  },

  'interacting with the prompt': {
    topic: function () {
      winston.info('These prompt tests are interactive');
      winston.info('Not following instructions will result in test failure');

      convo.askQuestions({
        "name": "What is yr business, stranger?",
        "children": [{"name": "Whatsit to you, copper?", "children": [{"name": "Yr under arrest."}]}]
      })

      return null;
    },

    ".askQuestions": {
      "when passed a node with no children": {
        topic: function () {
          winston.info('When prompted, enter: 1 [enter]');
          gently.expect(convo, 'convoOver', function(msg) {
             assert.equal(msg.name, "Yr under arrest.")
           })
          convo.prompt.getInput('1', this.callback);
        },
        "gets user input and then ends the convo ": function (err, result) {
          assert.isNull(err);
          assert.equal(result, '1');
        }
      }
    }
  }
}).exportTo(module);


