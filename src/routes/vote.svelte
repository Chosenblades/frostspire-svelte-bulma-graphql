<script>

    import { fade, fly } from 'svelte/transition';

    let usernameVisible = true;
    let buttonsVisible = false;

    function vote() {
        var username = document.getElementById('username').value;
        console.log(`vote with username ${username}`);
        usernameVisible = false;
    }

</script>

<style>
</style>

<svelte:head>
	<title>Vote for Frostspire</title>
</svelte:head>

<!-- svelte-ignore a11y-missing-attribute -->
<section class="section">

    <div class="container">
        <div class="column is-half is-offset-one-quarter">

            <article class="message is-primary is-medium">
                <div class="message-header has-text-centered">
                    <p>Vote for Frostspire!</p>
                </div>
                <div class="message-body">
                    <div class="column is-half is-offset-one-quarter">
                        {#if usernameVisible}
                            <div out:fade|local on:outroend="{() => buttonsVisible = true}" class="field has-addons" id="usernamefield">
                                <div class="control">
                                    <input class="input" type="text" placeholder="Username" id="username">
                                </div>
                                <div class="control">
                                    
                                    <a on:click={vote} class="button is-info">
                                    Vote
                                    </a>
                                </div>
                            </div>
                        {/if}
                        {#if buttonsVisible}
                            <div in:fade|local class="field is-grouped" id="buttongroup">
                                <p class="control">
                                    <a class="button is-primary">
                                        RuneLocus
                                    </a>
                                </p>
                                <p class="control">
                                    <a class="button is-primary">
                                        RSPS-List
                                    </a>
                                </p>
                            </div>
                        {/if}
                    </div>

                    <hr>

                    <div class="columns has-text-centered">
                        <div class="column is-one-third">
                            <h4 class="has-text-primary">
                                Votes for June
                            </h4>
                            <h2 class="subtitle">
                                69
                            </h2>
                        </div>
                        <div class="column is-one-third is-offset-one-third">
                            <h4 class="has-text-primary">
                                Top Voter for June
                            </h4>
                            <h2 class="subtitle">
                                Chosenblades
                            </h2>
                        </div>
                    </div>
                </div>
            </article>

        </div>
    </div>
</section>