export default function remarkInjectToc() {
  return function (tree, file) {
    let hasTocDisabled = false;

    // Astro passes frontmatter to remark plugins via file.data.astro.frontmatter
    if (file.data && file.data.astro && file.data.astro.frontmatter) {
      if (file.data.astro.frontmatter.toc === false) {
        hasTocDisabled = true;
      }
    }

    if (!hasTocDisabled) {
      // Find the first heading in the document.
      let insertIndex = tree.children.findIndex((node) => node.type === 'heading');

      if (insertIndex === -1) {
        // No headings found, so we don't inject TOC.
        return;
      }

      tree.children.splice(insertIndex, 0, {
        type: 'heading',
        depth: 2,
        children: [{ type: 'text', value: 'Table of Contents' }],
      });
    }
  };
}
