<script>
    let shown = false;
    
    export const toggle = () => { shown = (shown === false) ? true : false }

    import { fade, scale } from 'svelte/transition';
    import { expoOut } from 'svelte/easing';

</script>

{ #if shown }
<div class="back" transition:fade="{{duration: 300}}"></div>
<div class="modal-wrapper" transition:scale="{{duration: 500, easing: expoOut}}">
    <div class="modal">
            <article style="max-height:90vh;overflow-y:scroll;">
                <span class="close" on:click={ () => toggle() } on:keypress={ () => toggle() }><h3>&times;</h3></span>
                <slot/>
            </article>
    </div>
</div>
{ /if }

<style>
    .back {
        background-color: black;
        background-color: rgba(0, 0, 0, 0.6);
        position: fixed;
        width: 100vw;
        height: 100%;
        top: 0;
        left: 0;
    }
    .modal-wrapper {
        position: absolute;
        width: 100vw;
        height: 100%;
        top: 0;
        left: 0;
    }
    .modal {
        max-width: 80vw;
        padding: 1 rem;
        margin: auto;
        position: sticky;
    }
    .close {
        float: right;
        cursor: pointer;
    }
</style>