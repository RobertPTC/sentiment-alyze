module.exports = (function() {

var dict = require('./afinn_sync.js'),
    stopWords = require('./stop_words.js'),
    negatives = ['not', 'no', 'nor'],
    porter = require('./lib/porter.js');

  function parsePunc (phrase) {
      var punc = /['!"#$%&\\'()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}~']/g;
      return phrase.replace(punc,'');
  };

  function lowercase (phrase) {
    return phrase.toLowerCase();
  };

  function wordArray (phrase) {
    return phrase.split(' ');
  };

  function parsePhrase(phrase) {
    var phrase0 = parsePunc(phrase),
        phrase1 = lowercase(phrase0),
        phrase2 = wordArray(phrase1);
    return phrase2;
  };

  function createScore (phrase) {
    var parsedPhrase = parsePhrase(phrase),
        score = 0;
    for (var i in parsedPhrase) {
      if (parsedPhrase[i] in dict) {
        score += dict[parsedPhrase[i]];
        }
      }
    return score;
  };

  function createScoreNegatives (phrase) {
    var parsedPhrase = parsePhrase(phrase),
        score = 0,
        nein = false;
    for (var i in parsedPhrase) {
      if (negatives.indexOf(parsedPhrase[i]) !== -1) {
        nein = true;
      }
      if (parsedPhrase[i] in dict) {
        score += nein ? -1 * dict[parsedPhrase[i]] : dict[parsedPhrase[i]];
        nein = false;
        }
      }
    return score;
  };

  function termFrequencyNoStopWords (phrase, TF) {
    for (var i in phrase) {
      if (TF[phrase[i]]) {
        TF[phrase[i]]++;
      }
      else if (stopWords.indexOf(phrase[i]) === -1) {
        TF[phrase[i]] = 1;
        }
      }
      return TF;
    };

  function termFrequencyAllWords (phrase, TF) {
    for (var i in phrase) {
      if (TF[phrase[i]]) {
        TF[phrase[i]]++;
      }
      else {
        TF[phrase[i]] = 1;
      }
    }
      return TF;
  };

  function porterize (TF) {
    var stemmedTF = {};
    for (var i in TF) {
      var stemmedWord = porter(i);
      if (stemmedTF[stemmedWord]) {
        stemmedTF[stemmedWord]++;
      }
      else {
        stemmedTF[stemmedWord] = 1;
      }
    }
    return stemmedTF;
  };

  var api =  {

  sentimentalyze: function(phrase, options) {
    if (options && options.negate === 'yes') {
      return createScoreNegatives(phrase);
    }
    else {
      return createScore(phrase);
    }
  },

  termFrequency: function(phrase, options) {
        var parsedPhrase = parsePhrase(phrase),
          TF = {};
          if (options) {
            if (options.stopWords === 'no') {
              if (options.stem === 'yes') {
                TF = termFrequencyNoStopWords(parsedPhrase, TF);
                TF = porterize(TF);
                return TF;
              }
              else {
                TF = termFrequencyNoStopWords(parsedPhrase, TF);
                return TF;
              }
            }
            else if (options.stem === 'yes') {
              TF = termFrequencyAllWords(parsedPhrase, TF);
              TF = porterize(TF);
              return TF;
              }
            else {
              TF = termFrequencyAllWords(parsedPhrase, TF);
              return TF;
            }
          }
        else {
          TF = termFrequencyAllWords(parsedPhrase, TF);
          return TF;
          }
        }
  };
  /*test code*/
  api._parsePunc = parsePunc;
  api._lowercase = lowercase;
  api._wordArray = wordArray;
  api._parsePhrase = parsePhrase;
  api._createScore = createScore;
  api._createScoreNegatives = createScoreNegatives;
  /* end-test-code */

  return api;
})();
