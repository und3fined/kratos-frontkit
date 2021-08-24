<!--
 | File: Theme.svelte
 | Project: kratos-frontkit
 | File Created: 23 Aug 2021 11:21:38
 | Author: und3fined (me@und3fined.com)
 | -----
 | Last Modified: 23 Aug 2021 11:21:38
 | Modified By: und3fined (me@und3fined.com)
 | -----
 | Copyright (c) 2021 und3fined.com
-->
<script lang="ts">
	import { theme } from '$lib/ui/stores/theme'; 

	function changeTheme() {
		$theme = $theme === 'dark' ? 'light' : 'dark';
		document.documentElement.classList.toggle('dark', $theme === 'dark');
	}
</script>

<div class="change-theme">
	<button on:click={changeTheme}>
		{$theme == 'dark' ? 'Light' : 'Dark'} mode
	</button>
</div>

<style lang="postcss">
	.change-theme {
		@apply fixed top-0 right-0;
	}
</style>
