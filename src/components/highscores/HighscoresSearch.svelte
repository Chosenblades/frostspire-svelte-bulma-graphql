<script>
    import { createEventDispatcher } from 'svelte';
    import {getHighscore, query} from '../../utility/queries';
    import { validateInput } from '../../utility/utility';

    const dispatch = createEventDispatcher();
    let showErrorMessage = false;
    let errorMessage = "Error message.";

    //Search a single player
    async function searchPlayer() {
        showErrorMessage = false;
        const username = document.getElementById('searchplayer').value;

        if(!validateInput(username)) {
            errorMessage = "Please enter a name.";
            showErrorMessage = true;
            return;
        }

        const res = await query(getHighscore(username));
        const response = await res.json();

        if (res.status === 200) {
            if(response.data.getHighscore == null) {
                errorMessage = "User doesn't exist.";
                showErrorMessage = true;
                return;
            }

            let currentPlayer = response.data.getHighscore;
            dispatch('searchPlayer', 
                {
                    currentPlayer
                });
        } else {
            console.log("fetch was not successful");
            errorMessage = "An error occurred.";
            showErrorMessage = true;
        }
    }
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<article class="message is-primary">
    <div class="message-header has-text-centered">
        <p>Search player</p>
    </div>
    <div class="message-body">
        <div class="field has-addons">
            <div class="control is-expanded">
                <input class="input" type="text" placeholder="Username" id="searchplayer">
            </div>
            <div class="control">
                <a on:click={searchPlayer} class="button is-info">
                Search
                </a>
            </div>
        </div>
        {#if showErrorMessage}
            <div class="has-text-danger has-text-centered">
                <p id="errormessage">{errorMessage}</p>
            </div>
        {/if}
    </div>
</article>