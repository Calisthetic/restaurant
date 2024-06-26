async function translateText(text:string, localActive:string):Promise<string> {
  let result = text
  await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${localActive === "ru" ? "en" : "ru"}&tl=${localActive}&dt=t&q=${text}`)
  .then((res) => res.json())
  .then((data) => {result = data[0][0][0]})
  return result
}

export default function TranslateAsync({to, text}:{to:string, text:string}) {
  if (to === "ru") return text
  const data = translateText(text, to)
  return data
}