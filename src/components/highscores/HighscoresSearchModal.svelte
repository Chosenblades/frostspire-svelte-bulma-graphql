<script>
import { createEventDispatcher } from 'svelte';
import { fade } from 'svelte/transition';
import { skills } from '../../utility/skills';
import { formatNumber } from '../../utility/utility';

export let currentPlayer;

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
            <p class="modal-card-title">{currentPlayer.username}</p>
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
                    </tr>
                </thead>

                <tbody>
                    {#each skills as skill, i}
                        <tr>
                            <td><img class="skillicon" src="img/skillicons/{skill}.png"></td>
                            <!-- Rank should go here when it's fixed -->
                            {#if i == 0}
                            <td>Broken</td>
                            <td>{currentPlayer.totalLevel}</td>
                            <td>{formatNumber(currentPlayer.totalExperience)}</td>
                            {:else}
                            <td>{currentPlayer.skills[i-1].rank}</td>
                            <td>{currentPlayer.skills[i-1].lvl}</td>
                            <td>{formatNumber(currentPlayer.skills[i-1].xp)}</td>
                            {/if}
                        </tr>
                    {:else}
                        <p class="text-is-danger">Error loading data.</p>
                    {/each}       
                </tbody>
            </table>
        </section>
    </div>
</div>