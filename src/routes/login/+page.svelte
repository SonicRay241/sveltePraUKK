<script lang="ts">
	import Navbar from "$lib/components/Navbar.svelte";

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
          <input type="text" name="username" placeholder="Username" aria-label="Username" autocomplete="nickname" required>
          <input type="password" name="password" placeholder="Password" aria-label="Password" autocomplete="current-password" required>
          <fieldset>
            <!-- <label for="remember">
              <input type="checkbox" role="switch" id="remember" name="remember">
              Remember me
            </label> -->
          </fieldset>
          <button type="submit" class="contrast">Login</button>
          <p>
            Dont have an account? <a href="/register">Register</a>
          </p>
        </form>
      </div>
      <div style="background-image: url('https://raw.githubusercontent.com/picocss/examples/master/sign-in/assets/alessio-soggetti-8jeWeKdygfk-unsplash-1000x1200.jpg');background-position: center;background-size: cover;"></div>
    </article>
  </main><!-- ./ Main -->