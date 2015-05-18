var fs = require('fs'),
    file = './AFINN-111.txt';
module.exports = (function() {
    text = fs.readFileSync(file).toString();
    text = text.toString().split(" ");
    text = text[0].split("\n");
    dict = {};
    text.forEach(function(el) {
      elArray = el.split("\t");
      dict[elArray[0]] = parseInt(elArray[1]);
    });
    console.log(dict);
    return dict;
  }
)();
