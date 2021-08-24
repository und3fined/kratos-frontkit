<script lang="ts">
	import '../tailwind.postcss';

	import { onMount } from 'svelte';
	import { theme } from '$ui/stores/theme'; 
	import SwitchTheme from '$components/Theme.svelte';

	let currentHref: string = '';

	onMount(() => {
		currentHref = document.location.href;
	})

	$: isDark = $theme === 'dark';
	$: pathLocation = currentHref
</script>

<div class="app-layout" class:dark={isDark}>
	<div class="layout-container">
		<div class="brand">
			<div class="logo">
				{pathLocation}
			</div>
		</div>

		<slot />
	</div>
</div>

<SwitchTheme />

<style lang="postcss">
	.app-layout {
		@apply min-h-screen flex items-center justify-center
	}

	.layout-container {
		@apply max-w-md w-full space-y-8;
	}

	.brand {
		@apply px-6 py-8 flex justify-center;
	}

	.logo {
		@apply w-64 h-16 bg-gray-200 dark:bg-gray-800 rounded-2xl;
	}
</style>
