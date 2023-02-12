<script>
    import { page } from "$app/stores";
    import Login from "./+page.svelte"
</script>
<Login>
    <small style="color: red;">{$page.error?.message}</small>
</Login>