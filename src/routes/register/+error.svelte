<script>
    import { page } from "$app/stores";
    import Reg from "./+page.svelte"
</script>
<Reg>
    <small style="color: red;">{$page.error?.message}</small>
</Reg>