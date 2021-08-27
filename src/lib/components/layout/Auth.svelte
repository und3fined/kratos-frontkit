<!--
 | File: LayoutAuth.svelte
 | Project: kratos-frontkit
 | File Created: 24 Aug 2021 23:00:33
 | Author: und3fined (me@und3fined.com)
 | -----
 | Last Modified: 24 Aug 2021 23:00:33
 | Modified By: und3fined (me@und3fined.com)
 | -----
 | Copyright (c) 2021 und3fined.com
-->
<script lang="ts">
    import {theme} from '$ui/stores/theme';
    import Input from '$ui/Input.svelte';
    import Button from '$ui/Button.svelte';

    $: isDark = $theme == 'dark';
</script>

<svelte:head>
	<title>Sign in page</title>
</svelte:head>

<div class="signin-container" class:dark={isDark}>
    <div class="signin-card">
        <slot name="content"></slot>
    </div>
    
    <div class="signin-actions">
        <slot name="actions"></slot>
    </div>
</div>

<style lang="postcss">
	.signin-container {
		@apply w-96 sm:w-full px-6 space-y-4 mb-8;
	}

    .signin-card {
        @apply rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-500 border-opacity-10 p-6;
    }

    .signin-actions {
        @apply text-center
    }
</style>
