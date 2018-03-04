module.exports = (function() {

var dict = require('./afinn_sync.js'),
    stopWords = require('./stop_words.js'),
    negatives = ['not', 'no', 'nor', 'never'],
    porter = require('./lib/porter.js'),
    api;

  function parsePunc (phrase) {
      var punc = /['!"#$%&\\'()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}~']/g;
      return phrase.replace(punc,'');
  }

  function lowercase (phrase) {
    return phrase.toLowerCase();
  }

  function wordArray (phrase) {
    return phrase.split(' ');
  }

  function parsePhrase(phrase) {
    var phrase0 = parsePunc(phrase),
        phrase1 = lowercase(phrase0),
        phrase2 = wordArray(phrase1);
    return phrase2;
  }

  function phraseArray(phrases) {
    var objectArray = [];
    for (var i in phrases) {
      var sentimentObject = {},
        phrase = phrases[i];
        switch (arguments[1]) {
          case 'score':
            sentimentObject[phrase] = createScore(phrase);
            break;
          case 'negScore':
            sentimentObject[phrase] = createScoreNegatives(phrase);
            break;
        }
        objectArray.push(sentimentObject);
      }
      return objectArray;
  }

  function createScore (phrase) {
    if (typeof phrase === 'object') { return phraseArray(phrase, 'score'); }
    var parsedPhrase = parsePhrase(phrase),
        score = 0;
    for (var i in parsedPhrase) {
      if (parsedPhrase[i] in dict) {
        score += dict[parsedPhrase[i]];
        }
      }
    return score;
  }

  function createScoreNegatives (phrase) {
    if (typeof phrase === 'object') { return phraseArray(phrase, 'negScore'); }
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
  }

  function wordCountNoStopWords (phrase, TF) {
    TF.PHRASE_LENGTH = 0;
    for (var i in phrase) {
      if (TF[phrase[i]]) {
        TF.PHRASE_LENGTH++;
        TF[phrase[i]].count++;
      }
      else if (stopWords.indexOf(phrase[i]) === -1) {
        TF.PHRASE_LENGTH++;
        TF[phrase[i]] = {};
        TF[phrase[i]].count = 1;
      }
    }
    for (var term in TF) {
      TF[term].tf = TF[term].count/TF.PHRASE_LENGTH;
    }
    return TF;
  }

  function wordCountAllWords (phrase, TF) {
    TF.PHRASE_LENGTH = 0;
    for (var i in phrase) {
      TF.PHRASE_LENGTH++;
      if (TF[phrase[i]]) {
        TF[phrase[i]].count++;
      }
      else {
        TF[phrase[i]] = {};
        TF[phrase[i]].count = 1;
      }
    }
    for (var term in TF) {
      TF[term].tf = TF[term].count/TF.PHRASE_LENGTH;
    }
    return TF;
  }

  function porterize (TF) {
    var stemmedTF = {};
    for (var i in TF) {
      var stemmedWord = porter(i);
      if (stemmedTF[stemmedWord]) {
        stemmedTF[stemmedWord].count++;
      }
      else {
        stemmedTF[stemmedWord] = {};
        stemmedTF[stemmedWord].tf = i.tf;
        stemmedTF[stemmedWord].count = 1;
      }
    }
    return stemmedTF;
  }

  function getBaseLog (x, y) {
    return Math.log(y)/Math.log(x);
  }

  api =  {

    sentimentalyze: function(phrase, options) {
      if (options && options.negate === 'yes') {
        return createScoreNegatives(phrase);
      }
      else {
        return createScore(phrase);
      }
    },

    tfIDF: function(phrases, options) {
      var tfIDF = {},
          documentCount = {},
          corpus = phrases.length;
      for (var i = 0; i < corpus; i++) {
        var TF = this.termFrequency(phrases[i], options);
        tfIDF[i] = {};
        for (var term in TF) {
          if (documentCount[term]) {
            documentCount[term].count++;
          } else {
            documentCount[term] = {};
            documentCount[term].tfIDF = 0;
            documentCount[term].count = 1;
          }
          tfIDF[i][term] = TF[term];
        }
      }
      for (var doc in tfIDF) {
        for (var tf in tfIDF[doc]) {
          var termDocumentCount = documentCount[tf].count;
          var termFrequency = tfIDF[doc][tf];
          if (typeof termFrequency === 'object') {
            var idf = getBaseLog(10, (corpus / termDocumentCount));
            termFrequency.tfIDF = termFrequency.tf * idf;
            documentCount[tf].tfIDF += termFrequency.tfIDF;
          }
        }
      }
      return documentCount;
    },

    termFrequency: function(phrase, options) {
        var parsedPhrase = parsePhrase(phrase),
            phraseLength = parsedPhrase.length,
            TF = {};
        if (options) {
          if (options.stopWords === 'no') {
            if (options.stem === 'yes') {
              TF = wordCountNoStopWords(parsedPhrase, TF);
              TF = porterize(TF);
              return TF;
            }
            else {
              TF = wordCountNoStopWords(parsedPhrase, TF);
              return TF;
            }
          }
          else if (options.stem === 'yes') {
            TF = wordCountAllWords(parsedPhrase, TF);
            TF = porterize(TF);
            return TF;
          }
          else {
            TF = wordCountAllWords(parsedPhrase, TF);
            return TF;
          }
        }
        else {
          TF = wordCountAllWords(parsedPhrase, TF);
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
  api._getBaseLog = getBaseLog;
  /* end-test-code */

  return api;
})();
