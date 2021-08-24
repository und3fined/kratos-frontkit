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
        <p class="tips">Signin for continue</p>

        <div class="signin-form">
            <Input label="Identity" placeholder="Email or Username" />
            <Input label="Password" type="password" placeholder="••••••" />
            <p class="my-4 text-right"><a class="link" href="/recovery">Loss password?</a></p>
            <Button full={true}>Login</Button>
        </div>
    </div>
    
    <div class="signin-actions">
        <p>No account? <a class="link" href="/signup">Create an account!</a></p>
    </div>
</div>

<style lang="postcss">
	.signin-container {
		@apply w-full sm:w-96 px-6 space-y-4 mb-8;
	}

    .signin-card {
        @apply rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-500 border-opacity-10 p-6;
    }

    .signin-card .tips {
        @apply text-center
    }

    .signin-actions {
        @apply text-center
    }

    .link {
		@apply text-blue-500 active:text-blue-500;
	}
</style>
