<script>
    let shown = false;
    
    export const toggle = () => { shown = (shown === false) ? true : false }

</script>

{ #if shown }
<div class="modal-wrapper">
    <div class="modal">
            <article>
                <span class="close" on:click={ () => toggle() }>&times;</span>
                <slot/>
            </article>
    </div>
</div>
{ /if }

<style>
    .modal-wrapper {
        background-color: black;
        background-color: rgba(0, 0, 0, 0.6);
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }
    .modal {
        max-width: 80vw;
        padding: 1 rem;
        margin: auto;
    }
    .close {
        float: right;
        cursor: pointer;
    }
</style>