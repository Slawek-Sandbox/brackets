module.exports = function check(str, bracketsConfig) {
  //string with characters to be escaped in a regex pattern
  const brackets = '()[]{}|';

  // flat string array with escaped brackets pairs
  //e.g. for [['(', ')'], ['1', '2']] => ['\(\)', '12']
  const bracketsConfigReduced = bracketsConfig.map(x => x.reduce((a,v) => a + (brackets.indexOf(v) >= 0 ? `\\${v}` : v), ''));

  //regular expression for replacing brackets pairs
  //e.g. for ['\(\)', '12'] => /(?:\(\)|12)/g
  const rgx = new RegExp(`(?:${bracketsConfigReduced.join('|')})`, 'g');

  //while match is found replace a brackets pairs with ''
  //e.g. first loop iteration '(())12' => '()'
  //    second loop iteration '()' => ''
  while(rgx.test(str))
    str = str.replace(rgx, '');
      
  //if str.length > 0 means there are some brackets without a pair
  return str.length ? false : true;
}