//  convo.js
// v 0.0.1

require("colors")
var prompt = require('prompt')
prompt.message = ">>".green
prompt.delimeter = "_"

var _ = require("underscore")
var fs = require('fs')

exports.prompt = prompt;


// var arguments = process.argv.splice(2)
// var conv = JSON.parse(fs.readFileSync(arguments[0], 'utf8'))[0]

var isHeadless = false;

if (typeof module !== 'undefined') {
  isHeadless = true;
}

if (!isHeadless) {
  var exports = {};
  var module = {};
  var convo = exports;
  exports.mode = "browser";
} else {
  exports.mode = "console";
}

exports.askQuestions = function(n) {
  responses = _.map(n.children, function(answer, index) {
    return (index + 1 + ":   ").blue + answer.name
  })

  var question = {
    name: n.name,
    message: _.flatten([n.name.magenta, responses, '']).join('\n')
  }

  exports.prompt.get([question], function (err, result) {
    if (err) { return onErr(err) }
    var selection = result[n.name]

    // Is it a number, or are they typing in the full response?
    if (_.isNumber(+selection) && !_.isNaN(+selection)) {
      var choice = n.children[selection - 1]
    } else {
      var choice = n.children.find(function(i) {
        return i.name.trim() == selection
      })
    }

    if (_.isObject(choice)) {
      var whatsNext = choice.children[0]

      if (whatsNext && whatsNext.children.length) {
        askQuestions(whatsNext)
      } else {
        convoOver(whatsNext)
      }
    } else {
      convoOver({name : "... that was not an option"})
    }
  })
}

exports.convoOver = function(lastNode) {
  if (lastNode && lastNode.name) {
    console.log(lastNode.name.magenta)
  } else {
    console.log("Game over, man".magenta)
  }
  return 1
}

exports.onErr = function(err) {
  console.log("ERROR!!".red, err)
  return 0
}

exports.prompt.start()

// Current version.
exports.VERSION = '0.0.1';
