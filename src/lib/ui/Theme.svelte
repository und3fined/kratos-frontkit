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
	const defaultTheme = 'dark';
	let theme = defaultTheme;

	function changeTheme() {
		theme = theme === 'dark' ? 'light' : 'dark';
        document.documentElement.classList.toggle('dark', theme === 'dark');
	}
</script>

<button on:click={changeTheme}>
	{theme == 'dark' ? 'Light' : 'Dark'} mode
</button>
