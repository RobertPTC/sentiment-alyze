module.exports = (function(word) {
  var m;
  function porterize1(word) {
    var ssess = /sses$/,
        ies = /ies$/,
        ss = /ss$/,
        s = /s{1}$/,
        y = /y$/,
        yVowel = /[bcdfghjklmnpqrstvwxyz]y/g,
        vc = /([aeiou][bcdfghjklmnpqrstvwxyz])/g,
        eed = /eed$/,
        ed = /ed$/,
        ing = /ing$/,
        starVstar = /[a-z][aeiou][a-z]/,
        starO = /([bcdfghjklmnpqrstvwxyz][aeiou][abcdfghjklmnpqrstvz])$/,
        at = /at$/,
        bl = /bl$/,
        iz = /iz$/,
        doubleConsonants = /[lsz]{2}$/,
        specialDoubles = ['l', 's','z'];
        if (word.match(vc)) {
          m = word.match(vc).length;
        }
    if (ssess.test(word)) {
      return porterize2(word.replace(ssess, 'ss'));
    }
    else if (ies.test(word)) {
      return porterize2(word.replace(ies, 'i'));
    }
    else if (ss.test(word)) {
      return porterize2(word);
    }
    else if (s.test(word)) {
      return porterize2(word.replace(s, ''));
    }
    else if (m > 0 && eed.test(word)) {
      return porterize2(word.replace(eed, 'ee'));
    }
    else if (m <= 0 && eed.test(word)) {
      return porterize2(word);
    }
    else if (ed.test(word)) {
      word = word.length > 4 ? word.replace(ed,'') : word;
      if (at.test(word)) {
        return porterize2(word.replace(at, 'ate'));
      }
      else if (bl.test(word)) {
        return porterize2(word.replace(bl, 'ble'));
      }
      else if (iz.test(word)) {
        return porterize2(word.replace(iz, 'ize'));
      }
      else if (word[word.length-1] === word[word.length-2]) {
        if (specialDoubles.indexOf(word[word.length-1]) === -1) {
          word = word.slice(0, word.length-1);
          return porterize2(word);
        }
        // else {
        //   return word;
        // }
      }
      else if (starO.test(word) && word.length <= 3) {
        word += 'e';
        return porterize2(word);
      }
      return porterize2(word);
    }
    else if (ing.test(word)) {
      word = word.length > 5 ? word.replace(ing,'') : word;
      if (doubleConsonants.test(word)) {
          return porterize2(word);
      }
      else if (word[word.length-1] === word[word.length-2]) {
        if (specialDoubles.indexOf(word[word.length-1]) === -1) {
          word = word.slice(0, word.length-1);
          return porterize2(word);
        }
      }
      else if (starO.test(word) && word.length <= 3) {
        word += 'e';
        return porterize2(word);
      }
      // return word;
    }
    else if(starVstar.test(word)) {
      if (y.test(word) && word.length > 3) {
        return porterize2(word.replace(y, 'i'));
      }
    }
    return porterize2(word);
  }

  function porterize2(word) {
    var ational = /ational$/,
        tional = /tional$/,
        enci = /enci$/,
        anci = /anci$/,
        izer = /izer$/,
        abli = /abli$/,
        alli = /alli$/,
        entli = /entli$/,
        eli = /eli$/,
        ousli = /ousli$/,
        ization = /ization$/,
        ation = /ation$/,
        ator = /ator$/,
        alism = /alism$/,
        iveness = /iveness$/,
        fulness = /fulness$/,
        ousness = /ousness$/,
        aliti = /aliti$/,
        iviti = /iviti$/,
        biliti = /biliti$/;
    if (m > 0) {
      if (word.length > 8) {
        if (ational.test(word)) {
          return porterize3(word.replace(ational, 'ate'));
        }
        else if (tional.test(word)) {
          return porterize3(word.replace(tional, 'tion'));
        }
      }
      if (enci.test(word)) {
        return porterize3(word.replace(enci, 'ence'));
      }
      else if (anci.test(word)) {
        return porterize3(word.replace(anci, 'ance'));
      }
      else if (izer.test(word)) {
        return porterize3(word.replace(izer, 'ize'));
      }
      else if (abli.test(word)) {
        return porterize3(word.replace(abli, 'able'));
      }
      else if (alli.test(word)) {
        return porterize3(word.replace(alli, 'al'));
      }
      else if (entli.test(word)) {
        return porterize3(word.replace(entli, 'ent'));
      }
      else if (eli.test(word)) {
        return porterize3(word.replace(eli, 'e'));
      }
      else if (ousli.test(word)) {
        return porterize3(word.replace(ousli, 'ous'));
      }
      else if (ization.test(word)) {
        return porterize3(word.replace(ization, 'ize'));
      }
      else if (ation.test(word)) {
        return porterize3(word.replace(ation, 'ate'));
      }
      else if (ator.test(word)) {
        return porterize3(word.replace(ator, 'ate'));
      }
      else if (alism.test(word)) {
        return porterize3(word.replace(alism, 'al'));
      }
      else if (iveness.test(word)) {
        return porterize3(word.replace(iveness, 'ive'));
      }
      else if (fulness.test(word)) {
        return porterize3(word.replace(fulness, 'ful'));
      }
      else if (ousness.test(word)) {
        return porterize3(word.replace(ousness, 'ous'));
      }
      else if (aliti.test(word)) {
        return porterize3(word.replace(aliti, 'al'));
      }
      else if (iviti.test(word)) {
        return porterize3(word.replace(iviti, 'ive'));
      }
      else if(biliti) {
        return porterize3(word.replace(biliti, 'ble'));
      }
    }
    return porterize3(word);
  }

  function porterize3(word) {
    var icate = /icate$/,
        ative = /ative$/,
        alize = /alize$/,
        iciti = /iciti$/,
        ical = /ical$/,
        ful = /ful$/,
        ness = /ness$/;
    if (m > 0) {
      if (icate.test(word)) return word.replace(icate, 'ic');
      else if (ative.test(word)) return porterize4(word.replace(ative, ''));
      else if (alize.test(word)) return porterize4(word.replace(alize, 'al'));
      else if (iciti.test(word)) return porterize4(word.replace(iciti, 'ic'));
      else if (ical.test(word)) return porterize4(word.replace(ical, 'ic'));
      else if (ful.test(word)) return porterize4(word.replace(ful, ''));
      else if (ness.test(word)) return porterize4(word.replace(ness, ''));
    }
    return porterize4(word);
  }

  function porterize4(word) {
    var al = /al$/,
        ance = /ance$/,
        ence = /ence$/,
        er = /er$/,
        ic = /ic$/,
        able = /able$/,
        ible = /ible$/,
        ant = /ant$/,
        ement = /ement$/,
        ment = /ment$/,
        ent = /ent$/,
        ion = /ion$/,
        ou = /ou$/,
        ism = /ism$/,
        ate = /ate$/,
        iti = /iti$/,
        ous = /ous$/,
        ive = /ive$/,
        ize = /ize$/,
        star = /([bcdfghjklmnpqrstvwxyz][aeiou][abcdfghjklmnpqrstvz][s|t])$/;

    if (m > 1) {
      if (al.test(word)) return porterize5(word.replace(al, ''));
      else if (ance.test(word)) return porterize5(word.replace(ance, ''));
      else if (ence.test(word)) return porterize5(word.replace(ence, ''));
      else if (er.test(word)) return porterize5(word.replace(er, ''));
      else if (ic.test(word)) return porterize5(word.replace(ic, ''));
      else if (able.test(word)) return porterize5(word.replace(able, ''));
      else if (ible.test(word)) return porterize5(word.replace(ible, ''));
      else if (ant.test(word)) return porterize5(word.replace(ant, ''));
      else if (ement.test(word)) return porterize5(word.replace(ement, ''));
      else if (ent.test(word)) return porterize5(word.replace(ent, ''));
      else if (ion.test(word)) {
        var tempWord = word.replace(ion, '');
        if (star.test(tempWord)) {
          return porterize5(tempWord);
        }
      }
      else if (ou.test(word)) return porterize5(word.replace(ou, ''));
      else if (ism.test(word)) return porterize5(word.replace(ism, ''));
      else if (ate.test(word)) return porterize5(word.replace(ate, ''));
      else if (iti.test(word)) return porterize5(word.replace(iti, ''));
      else if (ous.test(word)) return porterize5(word.replace(ous, ''));
      else if (ive.test(word)) return porterize5(word.replace(ive, ''));
      else if (ize.test(word)) return porterize5(word.replace(ize, ''));
    }
    return porterize5(word);
  }

  function porterize5(word) {
    var e = /e$/,
        starO = /([bcdfghjklmnpqrstvwxyz][aeiou][abcdfghjklmnpqrstvz])$/,
        doubleL = /l{2}$/;
    if (m > 1) {
      if (e.test(word)) return word.replace(e, '');
      else if (doubleL.test(word)) return word.replace(doubleL, 'l');
    }
    else if (m===1) {
      if (!starO.test(word)) {
        return word.replace(e, '');
      }
    }
    return word;
  }
  return porterize1(word);
});
