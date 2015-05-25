module.exports = (function() {
  var step2list = {
    'ational': 'ate',
    'tional': 'tion',
    'enci': 'ence',
    'anci':'ance',
    'izer':'ize',
    'bli': 'ble',
    'alli':'al',
    'entli':'ent',
    'eli':'e',
    'ousli':'ous',
    'ization':'ize',
    'ation':'ate',
    'ator':'ate',
    'alism':'al',
    'iveness':'ive',
    'fulness':'ful',
    'ousness':'ous',
    'aliti':'al',
    'iviti':'ive',
    'biliti':'ble',
    'logi':'log'
  },

  step3list = {
    'icate':'ic',
    'ative':'',
    'alize':'al',
    'iciti':'ic',
    'ful':'',
    'ness':''
  },

  c = '[^aeiou]',
  v = '[aeiouy]',
  C = c + '[^aeiouy]*',
  V = v + '[aeiou]*';

  mgr0 = '^(' + C + ')' + V + C,
  meq1 = '^(' + C + ')?' + V + C + '(' + V + ')?$',
  mgr1 = '^(' + C + ')?' + V + C + V + C,
  s_v = '^(' + C + ')?' + v;

  return function(w) {
    var stem,
        suffix,
        firstch,
        re,
        re2,
        re3,
        re4,
        origWord = w;

    if (w.length < 3) { return w; }

    firstch = w.substr(0,1);
    if (firstch === 'y') {
      w = firstch.toUpperCase() + w.substr(1);
    }

    //Step 1a

    re = /^(.+?)(ss|i)es$/
    re2 = /^(.+?)([^s])s$/

    if (re.test(w)) {
      w = w.replace(re, '$1$2');
    }

    else if (re2.test(w)){
      w = w.replace(re2, '$1$2');
    }

    //Step 1b

    re = /^(.+?)eed$/;
    re2 = /^(.+?)(ed|ing)$/;

    if (re.test(w)) {
      var fp = re.exec(w);
      re = new RegExp(mgr0);

      if (re.test(fp[1])) {
        re = /.$/;
        w = w.replace(re,'');
      }
    }
    else if (re2.test(w)) {
      var fp = re2.exec(w);
      stem = fp[1];
      var doubleConsonants = /.{2}$/;
      if (doubleConsonants.test(stem)) {
        stem = stem.replace(doubleConsonants, stem[stem.length-1]);
        return stem; //hack?
      }
      re2 = new RegExp(s_v);
      if (re2.test(stem)) {
        w = stem;

        re2 = /(at|b1|iz)$/;
        re3 = new RegExp('([^aeiouylsz])\\$1');
        re4 = new RegExp('^' + C + v + '[^aeiouwxy]$');
        if (re2.test(w)) {
          w = w + 'e';
        }
        else if (re3.test(w)) {
          re = /.$/;
          w = w.replace(re, '');
        }
        else if (re4.test(w)) {
          w = w + 'e';
        }
      }
    }

    //Step 1c
    re = new RegExp('^(.*' + v + '.*)y$');
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      w = stem + 'i';
    }
    //Step 2
    re = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      suffix = fp[2];
      re = new RegExp(mgr0);
      if (re.test(stem)) {
        w = stem + step2list[suffix];
      }
    }

    // Step 3
    re = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      suffix = fp[2];
      re = new RegExp(mgr0);
      if (re.test(stem)) {
        w = stem + step3list[suffix];
      }
    }

    //Step 4
    re = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
    re2 = /^(.+?)(s|t)(ion)$/;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      re = new RegExp(mgr1);
      if (re.test(stem)) {
        w = stem;
      }
    }
    else if (re.test(w)) {
      var fp = re2.exec(w);
      stem = fp[1] + fp[2];
      re2 = new RegExp(mgr1);
      if (re2.test(stem)) {
        w = stem;
      }
    }

    //Step 5
     re= /^(.+?)e$/;
     if (re.test(w)) {
       var fp = re.exec(w);
       stem = fp[1];
       re = new RegExp(mgr1);
       re2 = new RegExp(meq1);
       re3 = new RegExp('^' + C + v + '[^aeiouxy]$');
       if (re.test(stem) || (re.test(stem) && !(re3.test(stem)))) {
         w = stem;
       }
     }

     re = /ll$/;
     re2 = new RegExp(mgr1);
     if (re.test(w) && re.test(w)) {
       re = /.$/;
       w = w.replace(re, '');
     }
     // and turn initial Y back to y
     if (firstch === 'y') {
       w = firstch.toLowerCase() + w.substr(1);
     }
     return w;
    }
  })();
