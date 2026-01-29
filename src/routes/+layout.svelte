<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon.ico";
  import ProgressBar from "$lib/ui/ProgressBar.svelte";
  import { fade, fly } from "svelte/transition";

  // Ambil URL saat ini sebagai key agar Svelte tahu kapan harus trigger animasi
  import { page } from "$app/stores";

  let { children } = $props();
</script>

<ProgressBar />

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<section class="min-h-screen bg-[#0a0a0a]">
  {#key $page.url.pathname}
    <div
      in:fly={{ y: 10, duration: 400, delay: 300 }}
      out:fade={{ duration: 250 }}
    >
      {@render children()}
    </div>
  {/key}
</section>

<style>
  /* Mencegah tumpang tindih saat animasi (double scrollbar) */
  :global(body) {
    overflow-x: hidden;
  }
</style>
