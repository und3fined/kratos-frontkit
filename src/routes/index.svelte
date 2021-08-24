<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ session: { user } }) => {
		return { props: { user } };
	};
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import Loading from '$ui/Loading.svelte';
	import { goto } from '$app/navigation';
	export let user;

	onMount(async () => {
		let nextHref = '/app';
		if (!user) {
			nextHref = '/signin'
		}

		await goto(nextHref, { replaceState: true });
	})
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<Loading />
