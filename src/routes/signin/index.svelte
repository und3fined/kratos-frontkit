<script lang="ts">
	import Input from '$ui/Input.svelte';
	import Button from '$ui/Button.svelte';
	import Layout from '$components/layout/Auth.svelte';
    
</script>

<svelte:head>
	<title>Sign in page</title>
</svelte:head>

<Layout>
	<svelte:fragment slot="content">
		<p class="tips">Signin for continue</p>

		<div class="signin-form">
			<Input label="Identity" placeholder="Email or Username" />
			<Input label="Password" type="password" placeholder="••••••" />
			<p class="my-4 text-right"><a class="link" href="/recovery">Loss password?</a></p>
			<Button full={true}>Login</Button>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="actions">
		<p>No account? <a class="link2" href="/signup">Create an account!</a></p>
	</svelte:fragment>
</Layout>

<style lang="postcss">
	.tips {
		@apply text-center;
	}
</style>
