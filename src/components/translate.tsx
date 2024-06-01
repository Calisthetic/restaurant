import React, { useEffect, useState } from 'react';

function translateText(text:string, localActive:string) {
  return fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=ru&tl=${localActive}&dt=t&q=${text}`)
   .then(res => res.json())
   .then(data => data[0][0][0]);
}

export default function Translate({ to, text }:{ to:string, text:string }) {
  const [translatedText, setTranslatedText] = useState('');

  useEffect(() => {
    translateText(text, to).then(result => {
      setTranslatedText(result);
    });
  }, [text, to]);

  return translatedText;
}