<script>
	function toggleNavBar(event) {
		var navBar = document.getElementById('navMenu');
		navBar.classList.toggle('is-active');
	}

	function closeNavBar() {
		var navBar = document.getElementById('navMenu');
		navBar.classList.toggle('is-active', false);
	}
</script>

<style>
</style>

<!-- svelte-ignore a11y-missing-attribute -->
<nav>
	<nav class="navbar is-unselectable is-spaced" role="navigation" aria-label="main navigation">
		<div class="navbar-brand is-transparent">
			<a on:click={closeNavBar} class="navbar-item is-size-4" href="/">
				Frostspire
			</a>

			<a on:click={toggleNavBar} role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navMenu">
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
			</a>
		</div>

		<div id="navMenu" class="navbar-menu">
			<div class="navbar-start">
			</div>

			<div class="navbar-end">
				<a on:click={closeNavBar} class="navbar-item" href="https://discord.gg/0zU3KRSxrvjvFfeQ">
					Discord
				</a>

				<a on:click={closeNavBar} class="navbar-item" href="store">
					Store
				</a>

				<a on:click={closeNavBar} class="navbar-item" href="vote">
					Vote
				</a>

				<a on:click={closeNavBar} rel=prefetch class="navbar-item" href="highscores">
					Highscores
				</a>
			</div>
		</div>
	</nav>
</nav>