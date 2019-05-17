<h1>Application</h1>
<a href="/">Home</a>
<a href="/about">About</a>
<svelte:component this={page} name="page" />
<style>
	h1 {
		color: lch(53 105 40);
		font-size: 15px;
	}
</style>
<script>
  export let page;
</script>
