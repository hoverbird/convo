require("colors")
var prompt = require('prompt')
prompt.message = ">>".green
prompt.start()

var _ = require("underscore")
var fs = require('fs')
var arguments = process.argv.splice(2)

var conv = JSON.parse(fs.readFileSync(arguments[0], 'utf8'))

function askQuestions(n) {
  responses = n.children.map(function(i) {
    return i.name
  })

  var question = {
    name: n.name,
    message: _.flatten([n.name.magenta, responses]).join('\n')
  }

  prompt.get([question], function (err, result) {
    if (err) { return onErr(err) }
    var selection = result[n.name]

    var choice = n.children.filter(function(i) {
      return i.name.trim() == selection
    })

    if (choice.length == 1) {
      var whatsNext = choice[0].children[0]

      if (whatsNext.children.length) {
        askQuestions(whatsNext)
      } else {
        convoOver(whatsNext.name)
      }
    } else {
      throw "Not a valid choice"
    }
  })
}

function convoOver(message) {
  console.log(message.magenta)
  return 1
}

function onErr(err) {
  console.log("ERROR!!".red, err)
  return 0
}

// Start it off
askQuestions(conv)
