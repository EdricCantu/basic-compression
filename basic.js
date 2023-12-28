const bin = [...Array(256).keys()];

function basicCompression(input){
  var uB = [...(new Set(input))];//uniqueBytes
  if([0,1,256].includes(uB.length)){
    throw [-1, uB.length]
  }
  
  [uB[0], uB[1]] = [uB[1],uB[0]]//so that outputs won't have zero paddings
  
  return [uB.length, ...uB, ...base(uB,input, bin)];
}


function basicDecompression(input){
  const uB = input.splice(0,input.shift());
  return base(bin,input, uB);
}

function base(fromBase, input, toBase){
  if(!(typeof input === 'string' || input instanceof Array)){
    throw [0, input, typeof input, input.constructor.name]
  }
  input = (typeof input === "string") ? input.split("").reverse() : input.reverse();
  
  if ((new Set(fromBase)).size !== fromBase.length) {
    throw [1, ...fromBase.map((value, index) => fromBase.indexOf(value, index + 1))
            .filter(index => index !== -1)];
  }
  //one of the characters repeats in toBase or fromBase
  if ((new Set(toBase)).size !== toBase.length) {
    throw [2, ...toBase.map((value, index) => toBase.indexOf(value, index + 1))
            .filter(index => index !== -1)];
  }
  var pad = -1;
  while(input[++pad] === fromBase[0]);

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
    throw [3, ...input.filter(elem=>toBase.includes(elem)).map((item, index)=>{
      return item ? index : false;
    }).filter(a=>(a!==false))];//one of the input characters is invalid
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
