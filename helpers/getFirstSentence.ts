function getFirstSentence(str: string) {
  const matched = str.match(/<p>([\s\S]*)?<\/p>/i) || [];
  return matched[1] || ''
}

export default getFirstSentence