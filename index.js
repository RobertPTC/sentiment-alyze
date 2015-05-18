var dict = require('./afinn_sync.js'),
    stopWords = require('./stop_words.js');
module.exports = {

  parsePunc: function(phrase) {
    var punc = /['!"#$%&\\'()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}~']/g;
    return phrase.replace(punc,'');
  },

  lowercase: function(phrase) {
    return phrase.toLowerCase();
  },

  wordArray: function(phrase) {
    return phrase.split(' ');
  },

  parsePhrase: function(phrase) {
    var phrase0 = this.parsePunc(phrase),
        phrase1 = this.lowercase(phrase0),
        phrase2 = this. wordArray(phrase1);
    return phrase2;
  },

  sentimentalyze: function(phrase) {
    var parsedPhrase = this.parsePhrase(phrase),
        score = 0;
    for (var i in parsedPhrase) {
      if (parsedPhrase[i] in dict) {
        score += dict[parsedPhrase[i]];
      }
    }
    return score;
  },

  termFrequency: function(phrase, options) {
      var parsedPhrase = this.parsePhrase(phrase),
          TF = {};
          for (var i in parsedPhrase) {
            if (TF[parsedPhrase[i]]) {
              TF[parsedPhrase[i]]++;
            }
            else {
              if (options && options.stopWords === 'no') {
                if (stopWords.indexOf(parsedPhrase[i]) === -1) {
                  TF[parsedPhrase[i]] = 1;
                }
              }
              else {
                TF[parsedPhrase[i]] = 1;
              }
            }
        }
    return TF;
  }
};
