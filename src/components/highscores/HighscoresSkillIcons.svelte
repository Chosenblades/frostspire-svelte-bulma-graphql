<script>
import { createEventDispatcher } from 'svelte';
import { skills } from '../../utility/skills';

const dispatch = createEventDispatcher();

function searchSkill(skill) {
    dispatch('searchSkill', {
        skill
    });
}
</script>

<style>
    .skillicon {
        margin-left: 5px;
        margin-right: 5px;
    }
</style>

<!-- svelte-ignore a11y-missing-attribute -->
<article class="message is-primary">
    <div class="message-header">
        <p>Sort by skill</p>
    </div>
    <div class="message-body has-text-centered is-unselectable">
        {#each skills as skill}
            <a on:click={() => searchSkill(skill)} class="tooltip" data-tooltip="{skill}"><img class="skillicon" src="img/skillicons/{skill}.png"></a>
        {/each}
    </div>
</article>