<script>
    export let logged = false;
</script>

<nav class="container-fluid">
    <ul>
      <li><a href="/" class="contrast"><strong>Adu domba</strong></a></li>
    </ul>
    <ul>
        {#if logged}
        <form action="" method="POST">
            <button formaction="/logout" type="submit" class="outline contrast">Logout</button>
        </form>
        {/if}
    </ul>
  </nav>