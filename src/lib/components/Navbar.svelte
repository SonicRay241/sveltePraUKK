<script lang="ts">
    import { slide } from "svelte/transition"
    export let logged = false;
    export let name: string;
    export let nik: string;
    export let telp = "";
    export let admin = false;
    export let role = "";
</script>

<nav class="container-fluid" transition:slide>
  {#if admin === true}
    <slot/>
  {/if}
    <ul>
      <li><a href="/" class="contrast">
        <strong style="color:var(--primary)">Adu</strong><strong style="color:#5c8296">Domba</strong>
        {#if admin === true}
        <strong>Admin</strong>
        {/if}
      </a>
    </li>
    </ul>
    <ul>
        {#if logged}
        <details role="list" dir="rtl">
            <summary aria-haspopup="listbox" role="link" class="contrast">Profile</summary>
            <ul role="listbox">
              <li><h5 style="float: left;">Nama: { name } </h5></li>
              {#if role != "MASYARAKAT"}
              <li><p style="float: left;">Id: { nik }</p></li>
              <li><p style="float: left;">Role: { role }</p></li>
              {:else}
              <li><p style="float: left;">NIK: { nik }</p></li>
              {/if}
              <li><p style="float: left;">Telp: { telp }</p></li>
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

  <style>
    summary[role="link"].contrast:is([aria-current],:hover,:active,:focus) {
    background-color: transparent;
    color: var(--contrast-hover);
  }
  </style>