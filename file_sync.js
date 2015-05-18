var fs = require('fs'),
    file = './AFINN-111.txt';
(function() {
    text = fs.readFileSync(file).toString();
    text = text.toString().split("\t");
    dict = {};
    text.forEach(function(el) {
      elArray = el.split("\n");
      dict[elArray[1]] = parseInt(elArray[0]);
    });
    return dict;
  }
)();
