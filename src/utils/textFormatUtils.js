
const colorRegex = /\d+/g;
const bgColorRegex = /(background-color.*\(.*?\))/g;

export const getColor = (formattedText) => {

let foundColor =  formattedText.match(colorRegex);
  if (foundColor) {
    foundColor = foundColor.map(val => Number(val));
    return `rgb(${foundColor[0]},${foundColor[1]},${foundColor[2]})`
  }
  return '#37474f'
}

export const getBgColor = (formattedText) => {
    
let foundColor =  formattedText.match(bgColorRegex);
foundColor = foundColor ? foundColor[0].match(colorRegex) : foundColor;
    if (foundColor) {
      foundColor = foundColor.map(val => Number(val));
      return `rgb(${foundColor[0]},${foundColor[1]},${foundColor[2]})`
    }
    return 'rgba(0,0,0,0)'
}