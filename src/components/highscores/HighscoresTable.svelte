<script>
import { createEventDispatcher } from 'svelte';
import { fade } from 'svelte/transition';
import { skills } from '../../utility/skills';
import { formatNumber } from '../../utility/utility.js';

export let players;
export let amountToShow = 10;
export let loadingTable = false;
export let currentSkill = "Overall";

const dispatch = createEventDispatcher();

function clickPlayer(playerClicked) {
    console.log("clicked player in table");
    dispatch('clickedPlayer', {
        username: playerClicked
    });
}
</script>

<style>
    #normal {
        overflow-x: auto;
    }
</style>

<!-- svelte-ignore a11y-missing-attribute -->
<article class="message is-primary">
    <div class="message-header">
        <p>{currentSkill} Highscores</p>
    </div>
    <div class="message-body is-marginless is-paddingless">
        <div id="normal">
            <table class="table is-hoverable is-fullwidth">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Username</th>
                        <th>Level</th>
                        <th>XP</th>
                    </tr>
                </thead>

                <tbody>
                        {#each players as player, i}
                            {#if i < amountToShow}
                                {#if !loadingTable}                   
                                <tr transition:fade|local>
                                    <td>{players.findIndex(i => i.username === player.username)+1}</td>
                                    <td><a class="is-unselectable" style="text-decoration:none;color:#039be5" on:click={() => clickPlayer(player.username)}>{player.username}</a></td>
                                    {#if currentSkill == "Overall"}
                                        <td>{player.totalLevel}</td>
                                        <td>{formatNumber(player.totalExperience)}</td>
                                    {:else}
                                        <td>{player.skills[skills.indexOf(currentSkill)-1].lvl}</td>
                                        <td>{formatNumber(player.skills[skills.indexOf(currentSkill)-1].xp)}</td>
                                    {/if}
                                </tr>
                                {/if}
                            {/if}
                        {:else}
                            <p class="text-is-danger">Error loading data.</p>
                        {/each}  
                </tbody>
            </table>
        </div>
        <a class="button is-primary is-fullwidth" on:click={() => (amountToShow += 10)}>Show more</a>
    </div>
</article>