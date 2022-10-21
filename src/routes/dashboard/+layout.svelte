<script lang="ts">
  import AdminDashboard from "$lib/components/layout/AdminDashboard.svelte";
</script>

<section id="body" class="h-screen w-screen flex flex-col">
  <AdminDashboard>
    <slot />
  </AdminDashboard>
</section>
