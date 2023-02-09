<script>
	import Navbar from "$lib/components/Navbar.svelte";
</script>

<Navbar logged = {true}/>
<article>

    <form method="POST">
        <!-- Markup example 2: input is after label -->
        <label for="email">Email address</label>
        <input type="email" id="email" name="email" placeholder="Email address" required>
        <small>We'll never share your email with anyone else.</small>
      
        <!-- Button -->
        <button type="submit">Submit</button>
      
      </form>
</article>
