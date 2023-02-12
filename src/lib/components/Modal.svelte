<script>
    let shown = false;
    
    export const toggle = () => { shown = (shown === false) ? true : false }

    import { fade } from 'svelte/transition';

</script>

{ #if shown }
<div class="back"transition:fade="{{duration: 100}}"></div>
<div class="modal-wrapper" transition:fade="{{duration: 200}}">
    <div class="modal">
            <article>
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