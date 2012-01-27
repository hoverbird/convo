var prompt = require('prompt');
require("colors");


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
            "name": "I'm from SF"
        }
    ],
    "name": "Where do you come from?"
}
// console.log(process.argv);
prompt.message = ">>".green;
// prompt.delimiter = "><".green;

prompt.start();
// var children = conv.children

askQuestions(conv);

function askQuestions(n) {
  // console.log("askQuestions!".green, n)
  responses = n.children.map(function(i) {
    return i.name
  });

  var question = {
    name: n.name,
    message: n.name.magenta + "\n" + responses.join('\n')
  }

  prompt.get([question], function (err, result) {
    if (err) { return onErr(err); }
    var selection = result[n.name];

    // console.log("result", result);
    // console.log("selection", selection.blue);

    var choice = n.children.filter(function(i) {
      // console.log('compare'.green, i.name, selection, i.name == selection)
      return i.name.trim() == selection
    })

    // console.log('choice', choice)
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
