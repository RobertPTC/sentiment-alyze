var dict = require('./file_sync.js'),
    fs   = require('fs');

module.exports = {

  parsePunc: function(phrase) {
    return phrase.replace(/['!"#$%&\\'()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}~']/g,"");
  },

  lowercase: function(phrase) {
    return phrase.toLowerCase();
  },

  wordArray: function(phrase) {
    return phrase.split(' ');
  },

  sentimentalyze: function(phrase) {
    var phrase = this.parsePunc(phrase),
        phrase = this.lowercase(phrase),
        phrase = this.wordArray(phrase),
        dict = this.dict(),
        score = 0;
    for (i in phrase) {
      if (phrase[i] in dict) {
        score += dict[phrase[i]];
      }
    }
    return score;
  }
};
