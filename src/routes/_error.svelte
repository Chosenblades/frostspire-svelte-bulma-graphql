<script>
	export let status;
	export let error;

	const dev = process.env.NODE_ENV === 'development';
</script>

<style>
</style>

<svelte:head>
	<title>{status}</title>
</svelte:head>

<section class="section">
    <div class="column is-8 is-offset-2">
		<article class="message is-primary">
			<div class="message-header">
				<p>{status}</p>
			</div>
			<div class="message-body has-text-centered is-unselectable">
				<p>{error.message}</p>

				{#if dev && error.stack}
					<pre>{error.stack}</pre>
				{/if}
			</div>
		</article>
	</div>
</section>
