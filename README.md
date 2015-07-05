[![Build Status](https://travis-ci.org/RobertPTC/sentiment-alyze.svg?branch=master)](https://travis-ci.org/RobertPTC/sentiment-alyze)

# sentiment-alyze
Node package for conducting textual analysis. The sentimentalyze method takes a string as its argument and returns a sentiment score calculated using AFINN-111. The termFrequency method also takes a string as its argument and returns an object with the count of words in that string. Filtering out English stop-words is optional.

Porter stemming algorithm reduces tokens to base, e.g. 'run', 'running', and 'runs' will all convert to 'run'.

Values of words in AFINN-111 range between -5 and +5.

##Installation:
npm install --save sentiment-alyze

##Usage:
```javascript
var sA = require('sentiment-alyze'),
    string = 'This string is super awesome! I feel like running and shopping',
    sentimentScore = sA.sentimentalyze(string),
    termFrequency  = sA.termFrequency(string),
    termFrequencyNoStopWords = sA.termFrequency(string, {stopWords: 'no'}),
    termFrequencyPorterized = sA.termFrequency(string, {stopWords: 'no', stem: 'yes'}),
    phrases = [
               'Virgina Woolf wrote To the Lighthouse',
               'Virginia Woolf was an English author who lived in London.',
               'Virginia Woolf lived in London. London was important to her. '],
    tfIDF = sA.tfIDF(phrases);


    console.log('sentiment score ', sentimentScore, 'term frequency, all words ', termFrequency, 'term frequency, no stop words ', termFrequencyNoStopWords, 'porterized ', termFrequencyPorterized);
    console.log('term frequency-inverse document frequency ', tfIDF);

```
##Tests

npm test;

###Contributing

Fork, clone, lint, test, pull :-)
