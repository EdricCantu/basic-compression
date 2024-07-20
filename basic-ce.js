function base(fromBase, input, toBase){
  if ((new Set(fromBase)).size !== fromBase.length) {
    return 0;
  }
  //one of the characters repeats in toBase or fromBase
  if ((new Set(toBase)).size !== toBase.length) {
    return 1;
  }
  var pad = 0;
  while(true){
    if(input[pad] === fromBase[0]){
      pad++;
    }else{
      break;
    }
  }
  input = (typeof input === "string") ? input.split("").reverse() : input.reverse();
  var err = false;
  var output = [];
  input.forEach((item, index) => {
    var [a, b, c] = [fromBase.indexOf(item), fromBase.length, index].map(d => BigInt(d));
    if (a === -1n) {
      err = true;
      return;
    }
    output.push(a * (b ** c));
    console
  });
  if (err) {
    return 2;//one of the input characters is invalid
  }
  var quotient = output.reduce((a, b) => { return a + b; }, 0n);
  if (typeof toBase === "string") {
    var output = "";
    while (quotient !== 0n) {
      output += toBase[quotient % BigInt(toBase.length)];
      quotient = quotient / BigInt(toBase.length);
    }
    return toBase[0].repeat(pad) + output.split("").reverse().join("");
  } else {console.log("arrOut");
    var output = [];
    while (quotient !== 0n) {
      output.push(toBase[quotient % BigInt(toBase.length)]);
      quotient = quotient / BigInt(toBase.length);
    }
    return (new Array(pad)).fill(toBase[0]).concat(output.reverse());
  }
}
