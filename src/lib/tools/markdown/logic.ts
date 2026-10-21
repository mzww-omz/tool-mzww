import MarkdownIt from 'markdown-it';
const md=new MarkdownIt({html:false,linkify:false,typographer:false});
// Images remain text: exported documents must not fetch user-supplied resources.
md.renderer.rules.image=(tokens,index)=>md.utils.escapeHtml(tokens[index].content);
export function renderMarkdown(input:string){if(input.length>100000)throw new Error('Markdownは100,000文字以内です。');return md.render(input);}
