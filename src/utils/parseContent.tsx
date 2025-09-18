// utils/parseContent.tsx
import React from 'react';
import parse, {
  domToReact,
  HTMLReactParserOptions,
  Element,
} from 'html-react-parser';
import { DOMNode } from 'html-dom-parser';

const parseContent = (content: string): React.ReactNode => {
  // Regex for **bold text**
  const boldRegex = /\*\*(.*?)\*\*/g;

  // Regex for <https://link.com>
  const linkRegex = /<https:\/\/(.*?)>/g;

  // Regex for [alias](https://link.com)
  const aliasLinkRegex = /\[(.*?)\]\((https:\/\/.*?)\)/g;

  // Replace **bold** with <strong>
  const replaceBold = (text: string): string => {
    return text.replace(boldRegex, '<strong>$1</strong>');
  };

  // Replace bare links with clickable anchors
  const replaceLinks = (text: string): string => {
    return text.replace(
      linkRegex,
      '<a href="https://$1" target="_blank" style="color: lightblue; text-decoration: underline;">https://$1</a>',
    );
  };

  // Replace markdown-style links with anchors
  const replaceAliasLinks = (text: string): string => {
    return text.replace(
      aliasLinkRegex,
      '<a href="$2" target="_blank" style="color: lightblue; text-decoration: underline;">$1</a>',
    );
  };

  // Preserve manual line breaks so they render as expected
  const addLineBreaks = (text: string): string => {
    return text.replace(/\r?\n/g, '<br />');
  };

  // Apply all transformations to the content
  const transformedContent = addLineBreaks(
    replaceAliasLinks(replaceLinks(replaceBold(content))),
  );

  // Options for html-react-parser to render custom nodes
  const options: HTMLReactParserOptions = {
    replace: (domNode: DOMNode) => {
      if (domNode instanceof Element) {
        if (domNode.tagName === 'a') {
          return (
            <a
              href={domNode.attribs.href}
              target="_blank"
              style={{ color: 'lightblue', textDecoration: 'underline' }}
              rel="noopener noreferrer"
            >
              {domToReact(domNode.children as DOMNode[])}
            </a>
          );
        } else if (domNode.tagName === 'strong') {
          return <strong>{domToReact(domNode.children as DOMNode[])}</strong>;
        }
      }
      return domNode;
    },
  };

  // Parse the transformed content into React nodes
  return parse(transformedContent, options);
};

export default parseContent;
