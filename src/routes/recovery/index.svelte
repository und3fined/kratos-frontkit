<!--
 | File: recovery.svelte
 | Project: kratos-frontkit
 | File Created: 24 Aug 2021 18:20:13
 | Author: und3fined (me@und3fined.com)
 | -----
 | Last Modified: 24 Aug 2021 18:20:14
 | Modified By: und3fined (me@und3fined.com)
 | -----
 | Copyright (c) 2021 und3fined.com
-->
<script lang="ts">
    import { shortId } from '$utils/id';

    let token = shortId();
</script>

<svelte:head>
    <title>Recovery</title>
</svelte:head>

<section>
    <a href={`/recovery/${token}`}>
        Recovery
    </a>
</section>