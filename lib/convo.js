//  convo.js
// v 0.0.1

require("colors")
var _ = require("underscore")

var convo = {VERSION: '0.0.1'}

convo.prompt = require('prompt')
convo.prompt.message = "\n"

convo.askQuestions = function(n) {
  if (!this.prompt.started) this.prompt.start();

  responses = _.map(n.children, function(answer, index) {
    return (index + 1 + ":   ").blue + answer.name
  })

  var question = {
    name: n.name,
    message: _.flatten([n.name.magenta, responses, '']).join('\n')
  }

  convo.prompt.get([question], function (err, result) {
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

      if (whatsNext && whatsNext.children && whatsNext.children.length) {
        convo.askQuestions(whatsNext)
      } else {
        convo.convoOver(whatsNext)
      }
    } else {
      convoOver({name : "... that was not an option"})
    }
  })
}

convo.convoOver = function(lastNode) {
  if (lastNode && lastNode.name) {
    console.log(lastNode.name.magenta)
  } else {
    console.log("Game over, man".magenta)
  }
  return 1
}

convo.onErr = function(err) {
  console.log("ERROR!!".red, err)
  return 0
}


var isHeadless = false;
if (typeof module !== 'undefined') {
  isHeadless = true;
}

if (!isHeadless) {
  var exports = convo
  var module = {}
  exports.mode = "browser"
} else {
  exports.mode = "console"
  var fs = require('fs')
  var arguments = process.argv.splice(2)
  if(arguments[0]) {
    var conversation = JSON.parse(fs.readFileSync(arguments[0], 'utf8'))[0]
  }
  convo.askQuestions(conversation)
}

