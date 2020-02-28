<script>
import { createEventDispatcher } from 'svelte';
import { fade } from 'svelte/transition';
import { skills } from '../../utility/skills';
import { formatNumber } from '../../utility/utility';
import { getRank } from '../../utility/queries';

export let firstPlayer;
export let secondPlayer;

const dispatch = createEventDispatcher();

function closeModal() {
    dispatch('closeModal');
}
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<div transition:fade={{duration: 100}} class="modal is-active">
    <div class="modal-background" on:click={closeModal}></div>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">{firstPlayer.username} VS {secondPlayer.username}</p>
            <button class="delete" aria-label="close" on:click={closeModal}></button>
        </header>
        <section class="modal-card-body">
            <table class="table is-hoverable is-fullwidth">
                <thead>
                    <tr>
                        <th>Skill</th>
                        <th>Rank</th>
                        <th>Level</th>
                        <th>XP</th>
                        <th>W</th>
                        <th>XP</th>
                        <th>Level</th>
                        <th>Rank</th>
                        <th>Skill</th>
                    </tr>
                </thead>

                <tbody>
                    {#each skills as skill, i}
                        <tr>
                            <td><img class="skillicon" src="img/skillicons/{skill}.png"></td>
                            <!-- When rank is fixed, it should go here -->
                            {#if i == 0}
                            <td>Broken</td>
                            <td>{firstPlayer.totalLevel}</td>
                            <td>{formatNumber(firstPlayer.totalExperience)}</td>
                            {:else}
                            <td>{firstPlayer.skills[i-1].rank}</td>
                            <td>{firstPlayer.skills[i-1].lvl}</td>
                            <td>{formatNumber(firstPlayer.skills[i-1].xp)}</td>
                            {/if}


                            {#if i == 0}
                            {#if firstPlayer.totalExperience > secondPlayer.totalExperience}
                            <td><img src="img/arrowup.gif"></td>
                            {:else}
                            <td><img src="img/arrowdown.gif"></td>
                            {/if}

                            <td>{formatNumber(secondPlayer.totalExperience)}</td>
                            <td>{secondPlayer.totalLevel}</td>
                            <td>Broken</td>

                            {:else}
                            {#if firstPlayer.skills[i-1].xp > secondPlayer.skills[i-1].xp}
                            <td><img src="img/arrowup.gif"></td>
                            {:else}
                            <td><img src="img/arrowdown.gif"></td>
                            {/if}
                            
                            <td>{formatNumber(secondPlayer.skills[i-1].xp)}</td>
                            <td>{secondPlayer.skills[i-1].lvl}</td>
                            <td>{secondPlayer.skills[i-1].rank}</td>
                            {/if}
                            <td><img class="skillicon" src="img/skillicons/{skill}.png"></td>
                        </tr>
                    {:else}
                        <p class="text-is-danger">Error loading data.</p>
                    {/each}       
                </tbody>
            </table>
        </section>
    </div>
</div>