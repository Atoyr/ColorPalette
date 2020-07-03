const toPaddedHexString = function (num, len) {
    if( num < 0 ) { num = 0 }
    if(Math.pow(16 ,len) <= num ) { num = Math.pow(16,len) - 1 }
    let str = parseInt(num).toString(16).toUpperCase();
    
    return "0".repeat(len - str.length) + str;
}

const toColorCode = function(rgb) {
  let temp = [0,0,0]
  if (Array.isArray(rgb)) {
    if (rgb.length == 3) {
      temp = rgb;
    }
  }
    return `#${toPaddedHexString(temp[0],2)}${toPaddedHexString(temp[1],2)}${toPaddedHexString(temp[2],2)}`
}

export default ({},inject) => {
  inject("toPaddedHexString",toPaddedHexString)
  inject("toColorCode",toColorCode)
}

