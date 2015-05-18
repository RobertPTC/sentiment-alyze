# sentiment-alyze
Node package for conducting textual analysis. The sentimentalyze method takes a string as its argument and returns a sentiment score calculated using AFINN-111. The termFrequency method also takes a string as its argument and returns an object with the count of words in that string. Filtering out English stop-words is optional.

##Installation:
npm install --save sentiment-alyze

##Usage:
var sA = require('sentiment-alyze'),
    string = 'This string is super awesome!',
    sentimentScore = sA.sentimentalyze(string),
    termFrequency  = sA.termFrequency(string),
    termFrequencyNoStopWords = sA.termFrequency(string, {stopWords: 'no'});
    
console.log('sentiment score ', sentimentScore, 'term frequency, all words ', termFrequency, 'term frequency, no stop words ', termFrequencyNoStopWords);

##Tests

npm test

##Contributing

Fork, clone, lint, test, pull :-)

