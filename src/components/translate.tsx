import { ReactNode } from "react";

async function translateText(text:string, localActive:string):Promise<string> {
  let result = text
  await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${localActive === "ru" ? "en" : "ru"}&tl=${localActive}&dt=t&q=${text}`)
  .then((res) => res.json())
  .then((data) => {result = data[0][0][0]})
  return result
}

export default async function Translate({to, text}:{to:string, text:string}) {
  const data = translateText(text, to)
  return data
}