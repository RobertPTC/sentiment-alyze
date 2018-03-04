var expect = require('chai').expect,
    sA = require('../index.js');

describe('Sentiment score analyzer', function() {
  it('should remove all punctuation from a phrase', function() {
    var phrase = 'This is a phrase. This is an awesome phrase!',
        analyzedPhrase = sA._parsePunc(phrase),
        parsed = ['This is a phrase',
                  'This is an awesome phrase'].join(' ');
    expect(analyzedPhrase).to.equal(parsed);
  });

  it('should convert all letters of phrase to lowercase', function() {
    var phrase = 'ThIs iS a PhrASE ok',
        lowercasedPhrase = sA._lowercase(phrase);
    expect(lowercasedPhrase).to.equal('this is a phrase ok');
  });

  it('should convert phrase into an array of words', function() {
    var phrase = 'this is a phrase',
        phraseArray = sA._wordArray(phrase);
    expect(phraseArray).to.eql(['this', 'is', 'a', 'phrase']);
  });

  it('should calculate sentiment score', function() {
    var phrase = 'This is awesome, bastard!',
        sentimentScore = sA.sentimentalyze(phrase);
    expect(sentimentScore).to.equal(-1);
  });

  it('should reverse the score of words that follow a negative', function() {
    var phrase = 'This is not awesome, bastard!',
        sentimentScore = sA.sentimentalyze(phrase, {negate: 'yes'});
    expect(sentimentScore).to.equal(-9);
  });

  it('should return an array of objects for multiple documents', function() {
    var phrases = ['This is one awesome string'];
        phrases.push('This is the second awesome string');
        phrases.push('This is the third awesome string');
    var sentimentScores = sA.sentimentalyze(phrases);
    expect(sentimentScores).to.have.length(3);
  });

describe('Word count', function() {
  it('should count the occurence of terms in a string', function() {
    var phrase = 'This is an awesome awesome awesome string string!',
        termFrequency = sA.termFrequency(phrase),
        totalCount = termFrequency.awesome.count + termFrequency.string.count;
        totalCount += termFrequency.this.count;
        totalCount += termFrequency.is.count;
        totalCount += termFrequency.an.count;
    expect(totalCount).to.equal(8);
    });
  it('should filter out stop words when option is passed', function() {
    var phrase = 'This is an awesome string!',
        termFrequency = sA.termFrequency(phrase, {stopWords: 'no'});
    var totalCount = termFrequency.awesome.count + termFrequency.string.count;
        if (termFrequency.this) totalCount += termFrequency.this.count;
        if (termFrequency.is) totalCount += termFrequency.is.count;
        if (termFrequency.an) totalCount += termFrequency.an.count;
    expect(totalCount).to.equal(2);
    });
  it('should stem words if option is passed', function() {
    var phrase = 'He is running he runs he will run and go shopping',
        options = {
                    stopWords: 'no',
                    stem: 'yes'
                  },
        termFrequency = sA.termFrequency(phrase, options);
    expect(termFrequency.run.count + termFrequency.shop.count).to.equal(4);
  });
  it('should contain the length of the phrase with no stop words', function() {
    var phrase = 'This is an awesome string!',
        termFrequency = sA.termFrequency(phrase, {stopWords: 'no'});
    var totalCount = termFrequency.PHRASE_LENGTH;
    expect(totalCount).to.equal(2);
  });
  it('should contain the length of the phrase with stop words', function() {
    var phrase = 'This is an awesome awesome awesome string string!',
        termFrequency = sA.termFrequency(phrase),
        totalCount = termFrequency.PHRASE_LENGTH;
    expect(totalCount).to.equal(8);
  });
});
describe('TF-IDF', function() {
  it('should calculate term frequency-inverse document frequency', function() {

  var phrases = ['Virginia Woolf was an author and wrote To the Lighthouse.'];
      phrases = phrases.concat('Woolf was an English author from London.');
      phrases = phrases.concat('Woolf lived in London. She loved London.');
      phrases = phrases.concat('She was a wonderful author.');
  var dictionary = sA.tfIDF(phrases, { stopWords: 'no' });
  var getBaseLog = function(x,y) {
    return Math.log(y)/Math.log(x);
  };

  expect(dictionary.wonderful.tfIDF).to.equal(0.30102999566398114);
});
  });
});
