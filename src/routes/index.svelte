<script>
  import { onMount } from 'svelte';

	let toast;

	onMount(async () => {
		const module = await import('bulma-toast');
    toast = module.default;
  })
  
  function test() {
      toast.toast({
        message: "Chosenblades killed Ses.",
        type: "is-danger",
        position: "bottom-right",
        dismissible: true,
        pauseOnHover: true
      });
  }
</script>

<style>
</style>

<svelte:head>
	<title>Frostspire</title>
</svelte:head>

<section class="hero is-success is-fullheight-with-navbar" style="background-color:transparent">
  <div class="hero-body">
    <div class="container has-text-centered">
      <h1 class="title">
        Welcome to Frostspire!
      </h1>
      <h2 class="subtitle">
        There is currently 69 players online.
      </h2>
      <!-- svelte-ignore a11y-missing-attribute -->
      <a on:click={test} class="button is-large is-primary">Play</a>
    </div>
  </div>
</section>
