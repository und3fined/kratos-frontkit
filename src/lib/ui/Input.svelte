<!--
 | File: Input.svelte
 | Project: kratos-frontkit
 | File Created: 23 Aug 2021 10:24:41
 | Author: und3fined (me@und3fined.com)
 | -----
 | Last Modified: 23 Aug 2021 10:49:35
 | Modified By: und3fined (me@und3fined.com)
 | -----
 | Copyright (c) 2021 und3fined.com
-->
<script lang="ts">
	import { shortId } from '$utils/id';
	import { theme } from './stores/theme';

	export let placeholder: string = '';
	export let label: string = '';
	export let inline: boolean = false;
	export let type: string = 'text';

	let inputId: string = `input-${shortId()}`;

	$: breakline = inline === false;
</script>

<div class="form-input" class:inline class:breakline class:dark={$theme === 'dark'}>
	{#if label}
		<label for={inputId}>{label}</label>
	{/if}
	<!--// focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-xl sm:text-sm -->
	<input id={inputId} {type} {placeholder} />
</div>

<style lang="postcss">
	.form-input {
		@apply my-6 flex shadow-sm;
	}

	.form-input label {
		@apply text-sm;
	}

	.form-input input {
		@apply flex-1 block w-full border-0 rounded-lg sm:text-sm bg-gray-800;
	}

	.form-input.inline {
		@apply flex-row items-center space-x-3;
	}

	.form-input.breakline {
		@apply flex-col space-y-1;
	}

	.form-input.breakline label {
		@apply px-1;
	}

	/* .form-input.inline label {
        @apply text-right
    } */
</style>
