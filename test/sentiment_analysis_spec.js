var expect = require('chai').expect,
    sA = require('../index.js');

describe('Sentiment score analyzer', function() {
  it('should remove all punctuation from a phrase', function() {
    var phrase = 'This is a phrase. This is an awesome phrase!',
        analyzedPhrase = sA.parsePunc(phrase),
        parsed = ['This is a phrase',
                  'This is an awesome phrase'].join(' ');
    expect(analyzedPhrase).to.equal(parsed);
  });

  it('should convert all letters of phrase to lowercase', function() {
    var phrase = 'ThIs iS a PhrASE ok',
        lowercasedPhrase = sA.lowercase(phrase);
    expect(lowercasedPhrase).to.equal('this is a phrase ok');
  });

  it('should convert phrase into an array of words', function() {
    var phrase = 'this is a phrase',
        phraseArray = sA.wordArray(phrase);
    expect(phraseArray).to.eql(['this', 'is', 'a', 'phrase']);
  });

  it('should calculate sentiment score', function() {
    var phrase = 'This is awesome, bastard!',
        sentimentScore = sA.sentimentalyze(phrase);
    expect(sentimentScore).to.equal(-1);
  });
describe('Term frequency', function() {
  it('should count the frequency of terms in a string', function() {
    var phrase = 'This is an awesome awesome awesome string string!',
        termFrequency = sA.termFrequency(phrase),
        totalCount = termFrequency.awesome + termFrequency.string;
        totalCount += termFrequency.this;
        totalCount += termFrequency.is;
        totalCount += termFrequency.an;
    expect(totalCount).to.equal(8);
    });
  it('should filter out stop words when option is passed', function() {
    var phrase = 'This is an awesome string!',
        termFrequency = sA.termFrequency(phrase, {stopWords: 'no'});
    var totalCount = termFrequency.awesome + termFrequency.string;
        if (termFrequency.this) totalCount += termFrequency.this;
        if (termFrequency.is) totalCount += termFrequency.is;
        if (termFrequency.an) totalCount += termFrequency.an;
    expect(totalCount).to.equal(2);
    });
  });
});
