<!--
 | File: Loading.svelte
 | Project: kratos-frontkit
 | File Created: 23 Aug 2021 13:28:43
 | Author: und3fined (me@und3fined.com)
 | -----
 | Last Modified: 23 Aug 2021 13:28:44
 | Modified By: und3fined (me@und3fined.com)
 | -----
 | Copyright (c) 2021 und3fined.com
-->
<script lang="ts">
	export let message: string = '';
</script>

<div class="loading-container">
	{#if message}
		<div class="loading-message">
			<p class="text-md">Đang tải</p>
		</div>
	{/if}
	<div class="lds-grid ">
		<div class="bg-gray-600 dark:bg-gray-50" />
		<div class="bg-gray-600 dark:bg-gray-50" />
		<div class="bg-gray-600 dark:bg-gray-50" />
		<div class="bg-gray-600 dark:bg-gray-50" />
		<div class="bg-gray-600 dark:bg-gray-50" />
		<div class="bg-gray-600 dark:bg-gray-50" />
		<div class="bg-gray-600 dark:bg-gray-50" />
		<div class="bg-gray-600 dark:bg-gray-50" />
		<div class="bg-gray-600 dark:bg-gray-50" />
		<div class="bg-gray-600 dark:bg-gray-50" />
	</div>
</div>

<style lang="postcss">
	.loading-container {
		@apply w-full h-full flex flex-col justify-center items-center;
	}

	.lds-grid {
		@apply relative w-20 h-24;
	}

	.lds-grid div {
		@apply absolute w-4 h-4 rounded-full;
		animation: lds-grid 1.2s linear infinite;
	}
	.lds-grid div:nth-child(1) {
		top: 8px;
		left: 8px;
		animation-delay: 0s;
	}
	.lds-grid div:nth-child(2) {
		top: 8px;
		left: 32px;
		animation-delay: -0.4s;
	}
	.lds-grid div:nth-child(3) {
		top: 8px;
		left: 56px;
		animation-delay: -0.8s;
	}
	.lds-grid div:nth-child(4) {
		top: 30px;
		left: 8px;
		animation-delay: -0.4s;
	}
	.lds-grid div:nth-child(5) {
		top: 30px;
		left: 32px;
		animation-delay: -0.7s;
	}
	.lds-grid div:nth-child(6) {
		top: 30px;
		left: 56px;
		animation-delay: -1.2s;
	}
	.lds-grid div:nth-child(7) {
		top: 52px;
		left: 8px;
		animation-delay: -1s;
	}
	.lds-grid div:nth-child(8) {
		top: 52px;
		left: 32px;
		animation-delay: -1.2s;
	}
	.lds-grid div:nth-child(9) {
		top: 52px;
		left: 56px;
		animation-delay: -1.6s;
	}

	.lds-grid div:nth-child(10) {
		top: 74px;
		left: 32px;
		animation-delay: -0.5s;
	}

	@keyframes lds-grid {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.3;
		}
	}
</style>
