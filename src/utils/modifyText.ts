export default function modifyTextForNumber(num:number, text0:string, text1:string, text2:string, text3:string) {
  num = Math.floor(num)
  // only 1
  if (num === 1) {return text0}
  // 11, 12
  if (num > 10) {
    let num1 = num - Math.floor(num / 100) * 100
    if (num1 > 10 && num1 < 15) {return text3}
  }
  // *1, *2
  let num2 = num - Math.floor(num / 10) * 10
  if (num2 === 1) {return text1}
  if (num2 > 1 && num2 < 5) {return text2}
  return text3
}