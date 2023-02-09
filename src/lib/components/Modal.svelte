<script>
    let shown = false;
    
    export const toggle = () => { shown = (shown === true) ? false : true }

</script>

{ #if shown }
    <dialog>
        <article>
            <header>
                <h1>Hello</h1>
            </header>
            <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint pariatur vel cupiditate ad quaerat? Libero officia dolore quidem eligendi. Aperiam, magnam veritatis consectetur accusantium adipisci qui debitis odit quisquam deleniti?
            </p>
            <footer>
                <button on:click={ () => toggle }></button>
            </footer>
        </article>
    </dialog>
{ /if }