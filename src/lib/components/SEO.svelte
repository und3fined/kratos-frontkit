<!--
 | File: SEO.svelte
 | Project: kratos-frontkit
 | File Created: 24 Aug 2021 17:41:34
 | Author: und3fined (me@und3fined.com)
 | -----
 | Last Modified: 24 Aug 2021 17:41:34
 | Modified By: und3fined (me@und3fined.com)
 | -----
 | Copyright (c) 2021 und3fined.com
-->
<script lang="ts">
	import SvelteSeo from 'svelte-seo';
	import {
		siteSeoBase,
		siteSeoOpenGraphBase,
		siteSeoOpenGraphArticle,
		siteSeoTwitter
	} from '../config';
	export let title: string = '';
	export let description: string = '';
	export let ogUrl: string = '';
	export let article: typeof siteSeoOpenGraphArticle.article = null;
	export let twitter: typeof siteSeoTwitter = null;
</script>

<SvelteSeo
	title={title ? `${siteSeoBase.title} | ${title}` : siteSeoBase.title}
	description={description || siteSeoBase.description}
	keywords={siteSeoBase.keywords}
	canonical={siteSeoBase.canonical + ''}
	openGraph={{
		...siteSeoOpenGraphBase,
		type: article ? siteSeoOpenGraphArticle.type : siteSeoOpenGraphBase.type,
		url: ogUrl || siteSeoOpenGraphBase.url + '',
		...(article ? { article: { ...siteSeoOpenGraphArticle.article, ...article } } : null)
	}}
	twitter={twitter ? { ...siteSeoTwitter, ...twitter } : null}
/>
