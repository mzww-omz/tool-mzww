<script lang="ts">
 import './layout.css';
 import '#lib/tools.css';
 import Shell from '#lib/Shell.svelte';
 let { children } = $props();
</script>
<Shell/>
{@render children()}
