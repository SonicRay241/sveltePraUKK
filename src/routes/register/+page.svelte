<script>
  import Navbar from "$lib/components/Navbar.svelte";
</script>

  <Navbar/>
  <!-- Main -->
  <main class="container">
    <article class="grid">
      <div>
        <hgroup>
          <h1>Register</h1>
          <h2>Register a new account</h2>
        </hgroup>
        <form method="POST">
          <input type="text" name="name" placeholder="Nama" aria-label="Nama" autocomplete="nickname" required>
          <input type="text" name="username" placeholder="Username" aria-label="Username" autocomplete="nickname" required>
          <input type="password" name="password" placeholder="Password" aria-label="Password" autocomplete="current-password" required>
          <input type="text" name="telepon" placeholder="Telepon" aria-label="Telepon" autocomplete="phone" required>
          <input type="text" name="nik" placeholder="NIK" aria-label="NIK" autocomplete="nickname" required>
          <fieldset>
            <!-- <label for="remember">
              <input type="checkbox" role="switch" id="remember" name="remember">
              Remember me
            </label> -->
          </fieldset>
          <button type="submit" class="contrast">Register</button>
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
      <div style="background-image: url('https://raw.githubusercontent.com/picocss/examples/master/sign-in/assets/alessio-soggetti-8jeWeKdygfk-unsplash-1000x1200.jpg');background-position: center;background-size: cover;"></div>
    </article>
  </main><!-- ./ Main -->

  