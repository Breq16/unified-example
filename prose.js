import { unified } from "unified";
import retextEnglish from "retext-english";
import retextStringify from "retext-stringify";
import retextSpell from "retext-spell";
import dictionary from "dictionary-en";
import retextEquality from "retext-equality";
import retextIndefiniteArticle from "retext-indefinite-article";
import retextProfanities from "retext-profanities";
import retextRepeatedWords from "retext-repeated-words";
import retextQuotes from "retext-quotes";
import fs from "fs/promises";
const personal = await fs.readFile("./dictionary.txt", "utf8");

const processor = unified()
  // Parser
  .use(retextEnglish)

  // Check prose
  .use(retextSpell, {
    dictionary,
    personal,
  })
  .use(retextEquality)
  .use(retextIndefiniteArticle)
  .use(retextProfanities)
  .use(retextRepeatedWords)
  .use(retextQuotes)

  // Compiler
  .use(retextStringify);

export default processor;
