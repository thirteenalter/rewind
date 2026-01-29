<script>
  import { navigating } from "$app/stores";
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";

  let progress = 0;
  let interval;

  // Logika progres tiruan yang terlihat pintar
  $: if ($navigating) {
    startProgress();
  } else {
    completeProgress();
  }

  function startProgress() {
    progress = 0;
    if (interval) clearInterval(interval);

    interval = setInterval(() => {
      if (progress < 70) {
        progress += Math.random() * 15; // Cepat di awal
      } else if (progress < 92) {
        progress += Math.random() * 2; // Melambat di akhir (menunggu API)
      }
    }, 200);
  }

  function completeProgress() {
    progress = 100;
    setTimeout(() => {
      if (!$navigating) progress = 0;
    }, 400);
  }
</script>

{#if $navigating || progress > 0}
  <div
    class="fixed top-0 left-0 right-0 h-[3px] z-[9999] bg-transparent pointer-events-none"
    transition:fade={{ duration: 400 }}
  >
    <div
      class="h-full bg-gradient-to-r from-transparent via-red-600 to-red-500 transition-all duration-500 ease-out relative"
      style="width: {progress}%"
    >
      <div
        class="absolute right-0 top-0 h-full w-[100px] bg-gradient-to-r from-transparent to-red-400 shadow-[0_0_15px_#ef4444,0_0_5px_#ef4444] opacity-100"
      ></div>
    </div>
  </div>
{/if}

<style>
  /* Menambahkan efek blur halus di bawah garis agar menyatu dengan navbar */
  div {
    backdrop-filter: blur(1px);
  }
</style>
