var fs = require('fs'),
    // path = require('path'),
    // root = path.dirname(require.main.filename),
    file = 'AFINN-111.txt';
module.exports = (function() {
    text = fs.readFileSync(file).toString();
    text = text.toString().split(" ");
    text = text[0].split("\n");
    dict = {};
    text.forEach(function(el) {
      elArray = el.split("\t");
      dict[elArray[0]] = parseInt(elArray[1]);
    });
    return dict;
  }
)();
