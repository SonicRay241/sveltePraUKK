<script lang="ts">
    export let logged = false;
    export let name: string;
    export let nik: string;
</script>

<nav class="container-fluid">
    <ul>
      <li><a href="/" class="contrast"><strong>Adu domba</strong></a></li>
    </ul>
    <ul>
        {#if logged}
        <details role="list" dir="rtl">
            <summary aria-haspopup="listbox" role="link" class="contrast">Profile</summary>
            <ul role="listbox">
              <li><h6>Nama: { name }</h6></li>
              <li><p>Nik: { nik }</p></li>
              <li>
                  <form action="" method="POST">
                      <button formaction="/logout" type="submit" class="outline">Logout</button>
                    </form>
                </li>
            </ul>
          </details>
        {/if}
    </ul>
  </nav>