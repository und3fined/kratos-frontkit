<!--
 | File: index.svelte
 | Project: kratos-frontkit
 | File Created: 23 Aug 2021 14:14:19
 | Author: und3fined (me@und3fined.com)
 | -----
 | Last Modified: 23 Aug 2021 14:16:12
 | Modified By: und3fined (me@und3fined.com)
 | -----
 | Copyright (c) 2021 und3fined.com
-->
<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	export const load: Load = async ({ session: { user } }) => {
		return { props: { user } };
	};
</script>
<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from "$app/navigation";

    export let user;

    onMount(async () => {
        if (!user) {
            await goto('/signin')
        }
    })
</script>


<div>App</div>
