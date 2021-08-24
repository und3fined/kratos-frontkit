<!--
 | File: Button.svelte
 | Project: kratos-frontkit
 | File Created: 20 Aug 2021 14:55:24
 | Author: und3fined (me@und3fined.com)
 | -----
 | Last Modified: 23 Aug 2021 18:51:30
 | Modified By: und3fined (me@und3fined.com)
 | -----
 | Copyright (c) 2021 und3fined.com
-->

<script lang="ts">
	export let full: boolean = false;

</script>

<button class="btn-indigo bg-blue-500" class:full>
	<slot />
</button>

<style lang="postcss">
	.btn-indigo {
		@apply py-2 px-4 font-semibold text-gray-50 rounded-xl shadow-md;
	}

	.full {
		@apply w-full;
	}
</style>
