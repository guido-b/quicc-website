// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
	site: 'https://quicc.dc.uba.ar',
	base: '/',
	integrations: [
		mdx(),
		sitemap()
	],
	markdown: {
		shikiConfig: {
			themes: {
				light: 'github-light',
				dark: 'github-dark',
			},
		},
		remarkPlugins: [remarkMath],
		rehypePlugins: [rehypeKatex]
	},
	build: {
		inlineStylesheets: 'always',
	},
});
