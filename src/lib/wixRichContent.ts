export function extractPlainText(richContent: any): string {
  if (!richContent || !Array.isArray(richContent.nodes)) return '';

  return richContent.nodes
    .flatMap((node: any) => {
      if (node.type === 'PARAGRAPH' && Array.isArray(node.nodes)) {
        return node.nodes
          .map((textNode: any) => textNode.textData?.text ?? '')
          .join('');
      }
      return '';
    })
    .join(' ')
    .trim();
}
