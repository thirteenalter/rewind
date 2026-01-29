<script>
  import { goto } from "$app/navigation";
  let searchQuery = "";

  function handleSearch() {
    if (searchQuery.trim()) {
      // Melempar ke halaman search dengan query parameter
      goto(`/discover/search?q=${encodeURIComponent(searchQuery)}`);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSearch();
  }
</script>

<section class="antialiased">
  <section
    class="relative h-screen w-full overflow-hidden bg-[url('https://files.catbox.moe/0bn9f7.jpg')] bg-cover bg-center"
  >
    <div
      class="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"
    ></div>

    <div
      class="relative h-full flex flex-col justify-end p-6 md:p-20 font-['Montserrat'] text-white"
    >
      <div
        class="border-b border-white/30 flex flex-col md:flex-row justify-between items-start md:items-end pb-6 md:pb-8"
      >
        <div class="w-full md:flex-1">
          <h1
            class="text-7xl md:text-[12rem] font-['Bebas_Neue'] leading-[0.8] tracking-tighter uppercase drop-shadow-2xl -ml-1 md:-ml-2"
          >
            Rewind
          </h1>
          <p
            class="text-[10px] md:text-sm font-light mt-4 max-w-[280px] md:max-w-sm leading-relaxed opacity-80 uppercase tracking-[0.2em] md:tracking-widest"
          >
            Rewind, Tempat Semua Orang Mau Nonton Gratis Tapi Tetap Pengen
            Kualitas Bioskop
          </p>
        </div>

        <div class="mt-6 md:mt-0 w-full md:w-auto flex items-center gap-10">
          <div>
            <button
              on:click={() => goto("/discover")}
              class="flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2.5 md:px-6 md:py-3 transition-all duration-300 hover:bg-white/20 hover:border-white"
            >
              <span
                class="text-[10px] md:text-sm uppercase tracking-widest font-bold text-white/70 hover:text-white transition-colors"
              >
                Discover
              </span>
            </button>
          </div>
          <div
            class="group flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2.5 md:px-6 md:py-3 transition-all duration-300 focus-within:bg-white/20 focus-within:border-white"
          >
            <input
              type="text"
              bind:value={searchQuery}
              on:keydown={handleKeyDown}
              placeholder="Search movies..."
              class="bg-transparent focus:outline-none text-sm w-full md:w-64 placeholder:text-white/50"
            />
            <button on:click={handleSearch} class="flex items-center">
              <span
                class="material-symbols-outlined text-white/70 group-hover:text-white transition-colors cursor-pointer text-xl"
              >
                search
              </span>
            </button>
          </div>
        </div>
      </div>

      <div class="mt-6 flex justify-between items-center">
        <div class="w-full md:w-auto overflow-x-auto no-scrollbar">
          <ul
            class="flex gap-6 md:gap-8 text-[10px] md:text-xs font-medium uppercase tracking-[0.2em] whitespace-nowrap"
          >
            <button
              on:click={() => goto("/discover/trending")}
              class="relative group cursor-pointer bg-none border-none p-0 text-inherit font-inherit"
            >
              <span class="hover:text-gray-300 transition-colors">Trending</span
              >
              <span
                class="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"
              ></span>
            </button>
            <button
              on:click={() => goto("/discover/movies")}
              class="relative group cursor-pointer bg-none border-none p-0 text-inherit font-inherit"
            >
              <span class="hover:text-gray-300 transition-colors">Movies</span>
              <span
                class="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"
              ></span>
            </button>
            <button
              on:click={() => goto("/discover/series")}
              class="relative group cursor-pointer bg-none border-none p-0 text-inherit font-inherit"
            >
              <span class="hover:text-gray-300 transition-colors">Series</span>
              <span
                class="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"
              ></span>
            </button>
            <button
              on:click={() => goto("/discover/random")}
              class="relative group cursor-pointer bg-none border-none p-0 text-inherit font-inherit"
            >
              <span class="hover:text-gray-300 transition-colors">Random</span>
              <span
                class="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"
              ></span>
            </button>
            <button
              on:click={() => goto("/discover/credits")}
              class="relative group cursor-pointer bg-none border-none p-0 text-inherit font-inherit"
            >
              <span class="hover:text-gray-300 transition-colors">Credits</span>
              <span
                class="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"
              ></span>
            </button>
          </ul>
        </div>

        <div
          class="hidden lg:flex gap-4 text-[10px] tracking-[0.3em] opacity-50 uppercase font-bold text-right"
        >
          <span>Streaming Now</span>
          <span>•</span>
          <span>HD Quality</span>
          <span>•</span>
          <span>Ads Tapi dikit</span>
        </div>
      </div>
    </div>
  </section>
</section>
