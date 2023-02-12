<script lang="ts">
	import Navbar from "$lib/components/Navbar.svelte";

  let username: any;
  let password: any;

</script>
  <Navbar name = {""}, nik = {""}/>
  <!-- Main -->
  <main class="container">
    <article class="grid">
      <div>
        <hgroup>
          <h1>Sign in</h1>
          <h2>Login to your account</h2>
        </hgroup>
        <form method="POST">
          <input type="text" name="username" bind:value={username} placeholder="Username" aria-label="Username" autocomplete="nickname" required>
          <input type="password" name="password" bind:value={password} placeholder="Password" aria-label="Password" autocomplete="current-password" required>
          <fieldset>
            <slot/>
          </fieldset>
          {#if username === undefined || username === "" || password == undefined || password == ""}
          <button type="submit" class="contrast" disabled>Login</button>
          {:else}
          <button type="submit" class="contrast">Login</button>
          {/if}
          <p>
            Dont have an account? <a href="/register">Register</a>
          </p>
        </form>
      </div>
      <div style="background-image: url('https://raw.githubusercontent.com/picocss/examples/master/sign-in/assets/alessio-soggetti-8jeWeKdygfk-unsplash-1000x1200.jpg');background-position: center;background-size: cover;"></div>
    </article>
  </main><!-- ./ Main -->