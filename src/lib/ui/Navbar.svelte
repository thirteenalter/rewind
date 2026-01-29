<script>
  import { goto } from "$app/navigation";
  import { slide } from "svelte/transition";

  let isSearchOpen = false;
  let searchQuery = "";
  let searchInput;

  function toggleSearch() {
    isSearchOpen = !isSearchOpen;
    if (isSearchOpen) {
      // Fokus ke input otomatis saat terbuka
      setTimeout(() => searchInput?.focus(), 100);
    }
  }

  function handleSearch(e) {
    if (e.key === "Enter" && searchQuery.trim()) {
      goto(`/discover/search?q=${encodeURIComponent(searchQuery)}`);
      isSearchOpen = false; // Tutup setelah search
      searchQuery = "";
    }
  }

  // Tutup search jika klik di luar (opsional)
  function handleBlur() {
    if (searchQuery === "") isSearchOpen = false;
  }
</script>

<nav class="fixed top-0 left-0 w-full z-50 p-6">
  <div
    class="max-w-7xl mx-auto flex items-center justify-between bg-white/5 backdrop-blur-md border border-white/10 px-8 py-3 rounded-full font-['Montserrat']"
  >
    <div class="flex items-center">
      <a
        href="/"
        class="text-2xl font-['Bebas_Neue'] tracking-tighter text-white hover:opacity-80 transition-opacity"
      >
        Rewind
      </a>
    </div>

    <ul
      class="hidden md:flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-opacity duration-300 {isSearchOpen
        ? 'opacity-0 pointer-events-none'
        : 'opacity-100'}"
    >
      <li class="relative group cursor-pointer">
        <a href="/discover/trending">Trending</a>
      </li>
      <li class="relative group cursor-pointer">
        <a href="/discover/movies">Movies</a>
      </li>
      <li class="relative group cursor-pointer">
        <a href="/discover/series">Series</a>
      </li>
      <li class="relative group cursor-pointer">
        <a href="/discover/random">Random</a>
      </li>
    </ul>

    <div class="flex items-center gap-4 relative">
      <div
        class="flex items-center transition-all duration-500 ease-out overflow-hidden rounded-full
        {isSearchOpen
          ? 'w-48 md:w-64 bg-white/10 px-4 py-1.5 border border-white/20'
          : 'w-0'}"
      >
        <input
          bind:this={searchInput}
          bind:value={searchQuery}
          on:keydown={handleSearch}
          on:blur={handleBlur}
          type="text"
          placeholder="Search titles..."
          class="bg-transparent border-none focus:outline-none text-[10px] text-white placeholder:text-white/40 w-full uppercase tracking-widest"
        />
      </div>

      <button
        on:click={toggleSearch}
        class="text-white/70 hover:text-white transition-all duration-300 flex items-center p-1"
      >
        <span
          class="material-symbols-outlined text-[20px] transition-transform duration-300 {isSearchOpen
            ? 'rotate-90'
            : ''}"
        >
          {isSearchOpen ? "close" : "search"}
        </span>
      </button>
    </div>
  </div>
</nav>

<style>
  /* Efek underline tetap dipertahankan via global atau komponen */
  li {
    position: relative;
  }
  li::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 1px;
    background: white;
    transition: width 0.3s ease;
  }
  li:hover::after {
    width: 100%;
  }
</style>
