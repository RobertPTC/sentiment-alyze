var fs = require('fs');
module.exports = (function() {
    text = fs.readFileSync(__dirname + '/AFINN-111.txt').toString();
    text = text.toString().split(" ");
    text = text[0].split("\n");
    dict = {};
    text.forEach(function(el) {
      elArray = el.split("\t");
      dict[elArray[0]] = parseInt(elArray[1]);
    });
    delete dict[''];
    return dict;
  }
)();
