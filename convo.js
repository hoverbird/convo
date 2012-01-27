var prompt = require('prompt')
var _ = require("underscore")
require("colors")

conv =
{
    "children": [
        {
            "children": [
                {
                    "children": [
                        {
                            "children": [
                                {
                                    "children": [
                                        {
                                            "children": [
                                                {
                                                    "children": [],
                                                    "name": "Let's be friends"
                                                }
                                            ],
                                            "name": "Yes"
                                        },
                                        {
                                            "children": [
                                                {
                                                    "children": [],
                                                    "name": "Let's be friends"
                                                }
                                            ],
                                            "name": "No"
                                        },
                                        {
                                            "children": [
                                                {
                                                    "children": [],
                                                    "name": "You're dead to me."
                                                }
                                            ],
                                            "name": "sorta\n"
                                        }
                                    ],
                                    "name": "do you like the Smiths?\n"
                                }
                            ],
                            "name": "I'm from Sacramento"
                        }
                    ],
                    "name": "Then why do you say hella all the time?"
                }
            ],
            "name": "I'm from NYC"
        },
        {
            "children": [
                {
                    "children": [
                        {
                            "children": [
                                {
                                    "children": [],
                                    "name": "Let's be friends"
                                }
                            ],
                            "name": "Yes"
                        },
                        {
                            "children": [
                                {
                                    "children": [],
                                    "name": "Let's be friends"
                                }
                            ],
                            "name": "No"
                        },
                        {
                            "children": [
                                {
                                    "children": [],
                                    "name": "You're dead to me."
                                }
                            ],
                            "name": "sorta\n"
                        }
                    ],
                    "name": "do you like the Smiths?\n"
                }
            ],
            "name": "I'm from Sacramento"
        }
    ],
    "name": "Where do you come from?"
}
prompt.message = ">>".green;
prompt.start();

askQuestions(conv);

function askQuestions(n) {
  responses = n.children.map(function(i) {
    return i.name
  });

  var question = {
    name: n.name,
    message: _.flatten([n.name.magenta, responses]).join('\n')
  }

  prompt.get([question], function (err, result) {
    if (err) { return onErr(err); }
    var selection = result[n.name];

    var choice = n.children.filter(function(i) {
      return i.name.trim() == selection
    })

    if (choice.length == 1) {
      var whatsNext = choice[0].children[0];

      if (whatsNext.children.length) {
        askQuestions(whatsNext)
      } else {
        convoOver(whatsNext.name);
      }
    } else {
      throw "Not a valid choice"
    }

  });
}

function convoOver(message) {
  console.log(message.magenta)
  return 1;
}

function onErr(err) {
  console.log("ERROR!!".red, err);
  return 1;
}
