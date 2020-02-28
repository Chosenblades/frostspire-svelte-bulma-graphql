<script>
import { createEventDispatcher } from 'svelte';
import {getHighscore, query} from '../../utility/queries';
import { validateInput } from '../../utility/utility';

const dispatch = createEventDispatcher();
let showFirstErrorMessage = false;
let firstErrorMessage = "Error message.";
let showSecondErrorMessage = false;
let secondErrorMessage = "Error message.";

async function comparePlayers() {
    showFirstErrorMessage = false;
    showSecondErrorMessage = false;
    var user1 = document.getElementById('compareplayer1').value;
    var user2 = document.getElementById('compareplayer2').value;

    if(!validateInput(user1)) {
        firstErrorMessage = "Please enter a name.";
        showFirstErrorMessage = true;
        return;
    }

    if(!validateInput(user2)) {
        secondErrorMessage = "Please enter a name.";
        showSecondErrorMessage = true;
        return;
    }

    const res = await query(getHighscore(user1));
    const response = await res.json();

    if (res.status !== 200) {
        console.log("fetch was not successful");
        firstErrorMessage = "An error occurred.";
        showFirstErrorMessage = true;
        return;
    }
    
    if(response.data.getHighscore == null) {
        firstErrorMessage = "User doesn't exist.";
        showFirstErrorMessage = true;
        return;
    }

    let firstPlayer = response.data.getHighscore;

    const res2 = await query(getHighscore(user2));
    const response2 = await res2.json();

    if (res2.status !== 200) {
        console.log("fetch was not successful");
        secondErrorMessage = "An error occurred.";
        showSecondErrorMessage = true;
        return;
    }

    if(response2.data.getHighscore == null) {
        secondErrorMessage = "User doesn't exist.";
        showSecondErrorMessage = true;
        return;
    }

    let secondPlayer = response2.data.getHighscore;


    dispatch('comparePlayers', 
        {
            firstPlayer,
            secondPlayer
        });
}
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<article class="message is-primary">
    <div class="message-header">
        <p>Compare players</p>
    </div>
    <div class="message-body">
        <div class="field">
            <div class="control is-expanded">
                <input class="input" type="text" placeholder="Username" id="compareplayer1">
            </div>
        </div>

        {#if showFirstErrorMessage}
            <div class="has-text-danger has-text-centered">
                <p>{firstErrorMessage}</p>
                <br>
            </div>
        {/if}

        <div class="field has-addons">
            <div class="control is-expanded">
                <input class="input" type="text" placeholder="Username" id="compareplayer2">
            </div>
            <div class="control">
                <a on:click={comparePlayers} class="button is-info">
                Compare
                </a>
            </div>
        </div>

        {#if showSecondErrorMessage}
            <div class="has-text-danger has-text-centered">
                <p>{secondErrorMessage}</p>
                <br>
            </div>
        {/if}
    </div>
</article>