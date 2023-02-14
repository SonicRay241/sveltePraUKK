<script lang="ts">
  import Navbar from "$lib/components/Navbar.svelte";
  import { slide } from "svelte/transition"

  let name: any;
  let username: any;
  let password: any;
  let phone: any;
  let nik: any;


</script>

  <Navbar name = {""}, nik = {""}/>
  <!-- Main -->
  <main class="container" transition:slide>
    <article class="grid">
      <div>
        <hgroup>
          <h1>Register</h1>
          <h2>Register a new account</h2>
        </hgroup>
        <form method="POST">
          <input type="text" name="name" bind:value={name} placeholder="Nama" aria-label="Nama" autocomplete="nickname" required>
          <input type="text" name="username" bind:value={username} placeholder="Username" aria-label="Username" autocomplete="nickname" required>
          <input type="password" name="password" bind:value={password} placeholder="Password" aria-label="Password" autocomplete="current-password" required>
          <input type="number" name="telepon" bind:value={phone} placeholder="Telepon" aria-label="Telepon" autocomplete="phone" required>
          <input type="number" name="nik" bind:value={nik} placeholder="NIK" aria-label="NIK" required>
          <fieldset>
              <slot/>
          </fieldset>
          {#if name == undefined || name == "" || username == undefined || username == "" || password == undefined || password == "" || phone == undefined || phone == "" || nik == undefined || nik == ""}
            <button type="submit" class="contrast" disabled>Register</button>
          {:else}
            <button type="submit" class="contrast">Register</button>
          {/if}
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
      <div style="background-image: url('https://raw.githubusercontent.com/picocss/examples/master/sign-in/assets/alessio-soggetti-8jeWeKdygfk-unsplash-1000x1200.jpg');background-position: center;background-size: cover;"></div>
    </article>
  </main><!-- ./ Main -->

  