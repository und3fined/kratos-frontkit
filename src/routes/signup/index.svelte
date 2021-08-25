<!--
 | File: index.svelte
 | Project: kratos-frontkit
 | File Created: 22 Aug 2021 17:33:42
 | Author: und3fined (me@und3fined.com)
 | -----
 | Last Modified: 25 Aug 2021 11:13:00
 | Modified By: und3fined (me@und3fined.com)
 | -----
 | Copyright (c) 2021 und3fined.com
-->
<script context="module" lang="ts">
	import type { LoadInput, Load } from '@sveltejs/kit';
	import { publicEndpoint, endpoint } from '$lib/_kratos';

	export const load: Load = async ({ page, fetch }: LoadInput) => {
		try {
			const resp = await fetch(`${publicEndpoint}${endpoint.register}`, {
				method: 'GET',
				headers: {
					Accept: 'application/json'
				}
			});

            const headers = resp.headers;
            const body = await resp.json();

			return {
                props: {
                    csrfToken: headers.get('set-cookie'),
                    registerData: {
                        id: body.id,
                        expiresAt: body.expires_at,
                        ui: body.ui,
                    },
                }
            }
		} catch (err) {
			throw Error(err);
		}
	};
</script>

<script lang="ts">
    import { onMount } from 'svelte';
    import Input from '$ui/Input.svelte';

    export let registerData: any = {};
    export let csrfToken: string = '';

    // $: console.info('registerData', JSON.stringify(registerData))
</script>

<svelte:head>
	<title>Sign up</title>
</svelte:head>

<div>
    {registerData.id}
    {csrfToken}
    <br />
    {#each registerData.ui.nodes as { attributes, meta }}
        {#if attributes.type === 'hidden'}
            <input {...attributes} />
        {:else if attributes.type !== 'submit'}
            <Input type={attributes.type} label={meta.label.text} />
        {/if}
    {/each}
</div>