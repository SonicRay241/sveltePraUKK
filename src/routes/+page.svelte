<script lang="ts">
	import Navbar from "$lib/components/Navbar.svelte";
  import type { PageData } from './$types';
  import { slide } from "svelte/transition"

	export let data: PageData
  let a = false
  let admin = false
  if (data.user != null) {
    a = true
  }
  if (data.user?.level === "ADMIN") {
    admin = true
  }
</script>

<div class="hero" data-theme="dark">
  <Navbar logged = {a} name = { data.user?.name ?? "" } nik = {data.user?.nik ?? ""} role = {data.user?.level} admin = {admin} telp = {data.user?.telepon}/>
    <div class="container" transition:slide>
      <header class="container">
        <hgroup>
          {#if data.user == null}
          <h1>Hello!</h1>
          <h2>Proceed to make an account to continue</h2>
          {:else}
          <h1>Welcome back, {data.user.name}!</h1>
          <h2>Happy to meet you again!</h2>
          {/if}
        </hgroup>
        {#if !data.user}
        <p><a href="/register" role="button">Register</a></p>
        <p>Already have an account? <a href="/login" class="primary">Login</a></p>
        {:else}
        <a href="/home" role="button">Continue</a>
        {/if}
      </header>
    </div>
  </div><!-- ./ Hero -->

  <!-- Main -->
  <main class="container" transition:slide>
    <div class="grid">

      <section>
        <hgroup>
          <h2>Ut sit amet sem ut velit</h2>
          <h3>Quisque mi est</h3>
        </hgroup>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque lobortis est vel velit bibendum ultrices. Sed aliquam tortor vel odio fermentum ullamcorper eu vitae neque. Sed non diam at tellus venenatis viverra. Vestibulum et leo laoreet arcu tempor eleifend venenatis ac leo. Pellentesque euismod justo sed nisl sollicitudin varius. Duis venenatis nisl sit amet ante rutrum posuere. Etiam nec ullamcorper leo, sed placerat mauris.</p>
        <figure>
          <img src="https://raw.githubusercontent.com/picocss/examples/master/company/assets/ashim-d-silva-3Ijt7UkSBYE-unsplash-1500x750.jpg" alt="Architecture">
          <figcaption>Image from <a href="https://unsplash.com/photos/3Ijt7UkSBYE">unsplash.com</a></figcaption>
        </figure>
        <h3>Nulla augue metus</h3>
        <p>Pacilisis sed ante ut, posuere volutpat quam. Maecenas maximus blandit mi ac finibus. Proin quis lacinia tellus. Aliquam erat volutpat. Aliquam erat volutpat. Phasellus suscipit nisi augue, id accumsan tortor auctor ut. Duis odio arcu, egestas nec nulla vel, fermentum bibendum ex.</p>
        <h3>Sed purus sapien, porta a cursus sed, maximus et metus.</h3>
        <p>Phasellus molestie ante sed massa bibendum, eget tempus ex sollicitudin. Vestibulum libero nulla, porttitor nec faucibus et, scelerisque eget quam. Nullam finibus tempor dui, vel congue urna condimentum ac. Fusce ultricies mauris justo, nec vulputate mauris pulvinar eu. Sed tempus ligula lorem, at tincidunt risus mollis non. Quisque et turpis sit amet sapien gravida ullamcorper in eu velit. Curabitur luctus ornare finibus. Proin tempor nulla sagittis est fermentum dapibus. Vestibulum posuere mattis congue. Ut porttitor id sem euismod tristique. Quisque mi est, posuere nec lorem eu, vulputate vehicula diam. Nullam scelerisque, libero posuere efficitur bibendum, urna odio finibus lorem, sed volutpat dolor ligula in dolor. Suspendisse suscipit efficitur neque, ut porta tellus mollis vel. Nam consequat arcu ac tellus porta, nec egestas orci sodales.</p>
      </section>

      <aside>
        <a href="/" aria-label="Example"><img src="https://raw.githubusercontent.com/picocss/examples/master/company/assets/maarten-deckers-T5nXYXCf50I-unsplash-1500x750.jpg" alt="Architecture"></a>
        <p>
            <a href="/">Donec sit amet</a><br>
            <small>Class aptent taciti sociosqu ad litora torquent per conubia nostra</small>
        </p>
        <a href="/" aria-label="Example"><img src="https://raw.githubusercontent.com/picocss/examples/master/company/assets/daniel-von-appen-tb4heMa-ZRo-unsplash-1500-750.jpg" alt="Architecture"></a>
        <p>
          <a href="/" >Suspendisse potenti</a><br>
          <small>Proin non condimentum tortor. Donec in feugiat sapien.</small>
        </p>
        <a href="/" aria-label="Example"><img src="https://raw.githubusercontent.com/picocss/examples/master/company/assets/sascha-eremin-DNQ-M93tHmA-unsplash-3000x1000.jpg" alt="Architecture"></a>
        <p>
          <a href="/" >Nullam lobortis placerat aliquam</a><br>
          <small>Maecenas vitae nibh blandit dolor commodo egestas vel eget neque. Praesent semper justo orci, vel imperdiet mi auctor in.</small>
        </p>
      </aside>

    </div>
  </main><!-- ./ Main -->
  

  <style>
    /* Global CSS variables */
:root {
    --spacing-company: 3rem;
    --font-weight: 400;
    --border-radius: 0;
  }
  
  /* Typography */
  h2,
  h3,
  hgroup > :last-child {
    font-weight: 200;
  }
  
  small {
    color: var(--muted-color);
  }
  
  /* Header */
  .hero {
    background-color: #394046;
    background-image: url("https://github.com/picocss/examples/raw/master/company/assets/sascha-eremin-DNQ-M93tHmA-unsplash-3000x1000.jpg");
    background-position: center;
    background-size: cover;
  }
  
  header {
    padding: var(--spacing-company) 0;
  }
  
  header hgroup > :last-child {
    color: var(--h3-color);
  }
  
  header hgroup {
    margin-bottom: var(--spacing-company);
  }
  
  /* Nav */
  
  
  /* Main */
  @media (min-width: 992px) {
    main .grid {
      grid-column-gap: var(--spacing-company);
      grid-template-columns: auto 25%;
    }
  }
  
  
  /* Aside nav */
  aside img {
    margin-bottom: 0.25rem;
  }
  
  aside p {
    margin-bottom: var(--spacing-company);
    line-height: 1.25;
  }
  </style>