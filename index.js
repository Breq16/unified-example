import { unified } from "unified";
import { engine } from "unified-engine";
import remarkParse from "remark-parse";
import remarkRetext from "remark-retext";
import prosePipeline from "./prose.js";
import remarkSmartypants from "remark-smartypants";
import remarkSlug from "remark-slug";
import remarkGfm from "remark-gfm";
import remarkExtractFrontmatter from "remark-extract-frontmatter";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { rename } from "vfile-rename";
import rehypeDocument from "rehype-document";
import { select } from "hast-util-select";
import { fromString } from "hast-util-from-string";
import YAML from "yaml";
import remarkFrontmatter from "remark-frontmatter";
import rehypeFormat from "rehype-format";
import rehypePrism from "@mapbox/rehype-prism";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkMusic from "./music.js";

const processor = unified()
  .use(remarkParse)
  .use(remarkFrontmatter)
  .use(remarkExtractFrontmatter, { yaml: YAML.parse })
  .use(remarkGfm)
  .use(remarkMusic)
  .use(remarkMath)
  .use(remarkSlug)
  .use(remarkSmartypants)
  .use(remarkRetext, prosePipeline)
  .use(remarkRehype)
  .use(rehypePrism)
  .use(rehypeKatex)
  .use(rehypeDocument, {
    title: "Untitled",
    css: [
      "https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/themes/prism.min.css",
      "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.15.1/katex.min.css",
      "https://cdnjs.cloudflare.com/ajax/libs/bootstrap/4.6.1/css/bootstrap.min.css",
    ],
    style: "body { margin: 0 auto !important; max-width: 800px; }",
  })
  .use(() => (tree, file) => {
    const title = file.data.title || "Untitled";
    const tag = select("title", tree);
    if (tag) {
      fromString(tag, title);
    }
  })
  .use(() => (tree, file) => {
    rename(file, { extname: ".html" });
  })
  .use(rehypeFormat)
  .use(rehypeStringify);

await new Promise((resolve, reject) => {
  try {
    engine(
      {
        processor,
        files: ["./src/**/*.md"],
        output: "./dist",
      },
      resolve
    );
  } catch (error) {
    reject(error);
  }
});
