import * as React from 'react';
import './style.css';

import ReactMarkdown from 'react-markdown';
import RemarkMathPlugin from 'remark-math';
import remarkGfm from 'remark-gfm';
import RehypeMathjax from 'rehype-mathjax';
import RehypeStringify from 'rehype-stringify';
import { Options } from 'rehype-stringify/lib';
import RehypeParse from 'rehype-parse';
import RehypeRaw from 'rehype-raw';
import RehypeSanitize, {defaultSchema} from 'rehype-sanitize';
import MathJax from 'react-mathjax';

// @ts-ignore
// import remarkGfm = require('remark-gfm');

const markdown = `
| Syntax | Description |
| ----------- | ----------- |
| Header | Title |
| Paragraph | Text |

<body>
<h1>This is an <code>&lt;h1></code> header tag</h1>
<form method="GET" onsubmit="alert('this is a joke')">
  <button type="submit">Submit</button>
</form>
</body>

Here's a sentence with a footnote. [^1]

[^1]: This is the footnote.

> this is some blockquote

$\\sqrt{3}$

When $$(a \\ne 0)$$, there are two solutions to $$(ax^2 + bx + c = 0)$$ and they are
$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$

$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$

$$\\begin{array}{cc} a & b \\\\ c & d \\end{array}$$

[$$\\frac{1}{\\sqrt{x^2 + 1}}$$](https://google.com)
`;

export default function App() {
  const mathSanitizeSchema = {
    ...defaultSchema,
    attributes: {
      ...defaultSchema.attributes,
      div: [
        ...(defaultSchema.attributes ? defaultSchema.attributes.div : []),
        ['className', 'math', 'math-display']
      ],
      span: [
        ['className', 'math', 'math-inline']
      ]
    }
  };
  
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
      <MathJax.Provider>
        <ReactMarkdown
          remarkPlugins={[remarkGfm, RemarkMathPlugin]}
          rehypePlugins={[
            RehypeRaw,
            // [RehypeSanitize, mathSanitizeSchema],
            RehypeMathjax
          ]}
          skipHtml={false}
          remarkRehypeOptions={{
            allowDangerousHtml: true,
          }}
        >
          {markdown}
        </ReactMarkdown>
      </MathJax.Provider>
    </div>
  );
}
