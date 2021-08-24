<!--
 | File: [token].svelte
 | Project: kratos-frontkit
 | File Created: 24 Aug 2021 19:45:58
 | Author: und3fined (me@und3fined.com)
 | -----
 | Last Modified: 24 Aug 2021 19:45:59
 | Modified By: und3fined (me@und3fined.com)
 | -----
 | Copyright (c) 2021 und3fined.com
-->
<script context="module" lang="ts">
	export async function load({ page, fetch, session, context }) {
		return {
			props: {
				token: page.params.token
			}
		};
	}
</script>

<script lang="ts">
    export let token: string = '';
</script>

<section>
	Token: {token}
</section>
