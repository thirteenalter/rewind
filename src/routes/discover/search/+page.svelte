<script>
  export let data;

  // Ambil data secara reactive
  $: ({ movies, query, total } = data);

  // Ambil hasil pertama sebagai background Hero agar identik dengan Discover
  $: featured = movies && movies.length > 0 ? movies[0] : null;

  const cleanTitle = (title) => {
    if (!title) return "";
    return title
      .replace(/\[Indonesian\]|\[Hindi\]|\[Tamil\]|Lyrical Video/gi, "")
      .trim();
  };
</script>

<svelte:head>
  <title>Search: {query} | Rewind</title>
</svelte:head>

<div class="min-h-screen bg-[#0a0a0a] font-['Montserrat'] text-white pb-20">
  {#if featured}
    <section class="relative w-full h-[60vh] overflow-hidden">
      <div
        class="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] scale-105"
        style="background-image: url('{featured.thumbnail.replace(
          'w_250',
          'w_1280',
        )}');"
      ></div>

      <div
        class="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent"
      ></div>
      <div
        class="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-transparent to-transparent"
      ></div>

      <div
        class="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-20 pt-[120px]"
      >
        <div
          class="inline-flex items-center backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.5em] mb-4 w-fit"
        >
          Search Results
        </div>

        <h1
          class="text-6xl md:text-[8rem] font-['Bebas_Neue'] leading-[0.8] tracking-tighter text-white uppercase italic drop-shadow-2xl"
        >
          "{query}"
        </h1>

        <p
          class="text-[10px] md:text-xs text-white/50 uppercase tracking-[0.3em] mt-6 flex items-center gap-3"
        >
          <span class="text-white font-bold">{total} Matches</span>
          <span class="w-1 h-1 bg-white/20 rounded-full"></span>
          <span>Filtered by Relevance</span>
        </p>
      </div>
    </section>
  {/if}

  <section
    class="max-w-7xl mx-auto px-6 {featured ? '-mt-12' : 'pt-32'} relative z-20"
  >
    {#if movies && movies.length > 0}
      <div class="flex items-end justify-between mb-10">
        <h2 class="text-xl font-['Bebas_Neue'] tracking-[0.2em] text-white/90">
          All Matches
        </h2>
        <span class="h-[1px] flex-1 bg-white/10 ml-6 mb-2"></span>
      </div>

      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-12"
      >
        {#each movies as movie}
          <a href="/watch/{movie.slug}" class="group block">
            <div
              class="relative aspect-[2/3] rounded-[32px] overflow-hidden bg-white/5 border border-white/5 transition-all duration-500 group-hover:scale-[1.03] group-hover:border-white/20 group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)]"
            >
              <div
                class="absolute top-4 right-4 z-10 backdrop-blur-md bg-black/40 border border-white/10 px-2.5 py-1 rounded-xl flex items-center gap-1"
              >
                <span class="text-[10px] font-bold text-yellow-500 italic"
                  >★</span
                >
                <span class="text-[10px] font-bold tracking-tighter italic"
                  >{movie.rating}</span
                >
              </div>

              <div
                class="absolute bottom-4 left-4 z-10 backdrop-blur-md bg-white/10 border border-white/10 px-3 py-1 rounded-full"
              >
                <span class="text-[8px] font-bold uppercase tracking-[0.2em]"
                  >{movie.type}</span
                >
              </div>

              <img
                src={movie.thumbnail}
                alt={movie.title}
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />

              <div
                class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]"
              >
                <div
                  class="w-12 h-12 rounded-full bg-white flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300 shadow-2xl"
                >
                  <span class="material-symbols-outlined text-black text-2xl"
                    >play_arrow</span
                  >
                </div>
              </div>
            </div>

            <div class="mt-5 px-1">
              <h3
                class="text-[11px] font-bold uppercase tracking-wider text-white/60 group-hover:text-white transition-colors line-clamp-2 leading-snug"
              >
                {cleanTitle(movie.title)}
              </h3>
              <div class="flex items-center gap-2 mt-2">
                <span
                  class="text-[9px] text-white/20 font-bold uppercase tracking-widest"
                >
                  {movie.year || "2026"}
                </span>
                <span class="w-1 h-1 bg-white/10 rounded-full"></span>
                <span
                  class="text-[9px] text-white/20 font-bold uppercase tracking-widest italic"
                >
                  HD Quality
                </span>
              </div>
            </div>
          </a>
        {/each}
      </div>
    {:else}
      <div class="py-32 flex flex-col items-center justify-center text-center">
        <div
          class="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6"
        >
          <span class="material-symbols-outlined text-4xl opacity-20"
            >search_off</span
          >
        </div>
        <p class="uppercase tracking-[0.5em] text-[10px] font-bold opacity-30">
          No matches found for your request
        </p>
        <a
          href="/discover"
          class="mt-8 text-[10px] uppercase tracking-[0.2em] underline opacity-50 hover:opacity-100"
          >Back to Discover</a
        >
      </div>
    {/if}
  </section>
</div>

<style>
  img {
    content-visibility: auto;
  }
</style>
