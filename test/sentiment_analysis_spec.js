var expect = require('chai').expect,
    sA = require('../index.js');

describe('Sentiment score analyzer', function() {
  it('should remove all punctuation from a phrase', function() {
    var phrase = 'This is a phrase. This is an awesome phrase!',
        analyzedPhrase = sA.parsePunc(phrase);
    expect(analyzedPhrase).to.equal('This is a phrase This is an awesome phrase');
  });

  it('should convert all letters of phrase to lowercase', function() {
    var phrase = 'ThIs iS a PhrASE ok',
        lowercasedPhrase = sA.lowercase(phrase);
    expect(lowercasedPhrase).to.equal('this is a phrase ok');
  });

  it('should convert phrase into an array of words', function() {
    var phrase = "this is a phrase",
        phraseArray = sA.wordArray(phrase);
    expect(phraseArray).to.eql(['this', 'is', 'a', 'phrase']);
  });

  it('should calculate sentiment score', function() {
    var phrase = "This is awesome, bastard!",
        sentimentScore = sA.sentimentalyze(phrase);
    expect(sentimentScore).to.equal(1);
  });
});
