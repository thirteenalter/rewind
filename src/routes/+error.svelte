<script>
  import { page } from "$app/stores";
</script>

<section
  class="relative h-screen w-full flex items-center justify-center bg-[#0a0a0a] font-['Montserrat'] overflow-hidden"
>
  <div
    class="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"
  ></div>

  <div class="relative z-10 text-center px-6">
    <h1
      class="text-[clamp(10rem,20vw,15rem)] font-['Bebas_Neue'] leading-none text-white tracking-tighter"
    >
      {$page.status}
    </h1>

    <div class="space-y-6">
      <div class="space-y-2">
        <h2
          class="text-sm md:text-base font-medium text-white/90 uppercase tracking-[0.4em]"
        >
          {$page.status === 404 ? "Scene Missing" : "System Interrupted"}
        </h2>
        <p
          class="text-[10px] md:text-xs text-white/40 max-w-[280px] mx-auto leading-relaxed uppercase tracking-widest"
        >
          Halaman tidak ditemukan atau terjadi kesalahan pada transmisi data
          kami.
        </p>
      </div>

      <div
        class="flex flex-col md:flex-row gap-3 justify-center items-center pt-4"
      >
        <a
          href="/"
          class="w-full md:w-auto px-10 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-neutral-200 transition-all duration-300"
        >
          Back to Home
        </a>

        <button
          on:click={() => history.back()}
          class="w-full md:w-auto px-10 py-3 border border-white/10 text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-white/5 transition-all duration-300"
        >
          Go Back
        </button>
      </div>
    </div>
  </div>

  <div class="absolute bottom-10 left-10 hidden md:block">
    <div
      class="text-[10px] text-white/20 tracking-[0.5em] uppercase font-bold rotate-90 origin-left"
    >
      Rewind Error Protocol
    </div>
  </div>
</section>
