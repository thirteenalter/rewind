<script lang="ts">
  export let data;

  // Ambil film pertama untuk Hero, sisanya untuk list
  $: movies = data.movies;
  $: featured = movies[0] || null;
  $: listMovies = movies.slice(1);

  const cleanTitle = (title: string) => {
    return title
      .replace(/\[Indonesian\]|\[Hindi\]|\[Tamil\]|Lyrical Video/gi, "")
      .trim();
  };
</script>

<div class="min-h-screen bg-[#0a0a0a] text-white pb-20 font-['Montserrat']">
  {#if featured}
    <section class="relative w-full h-[80vh] md:h-[90vh] overflow-hidden">
      <div
        class="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] hover:scale-110"
        style="background-image: url('{featured.thumbnail.replace(
          'w_250',
          'w_1280',
        )}');"
      ></div>

      <div
        class="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent"
      ></div>
      <div
        class="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/60 via-transparent to-transparent"
      ></div>

      <div
        class="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-20 md:pb-32 pt-[120px]"
      >
        <div
          class="inline-flex items-center backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] mb-6 w-fit"
        >
          <span class="w-2 h-2 bg-red-500 rounded-full mr-3 animate-pulse"
          ></span>
          Featured Today
        </div>

        <h1
          class="text-6xl md:text-[7rem] font-['Bebas_Neue'] leading-[0.85] tracking-tighter drop-shadow-2xl max-w-4xl uppercase italic"
        >
          {cleanTitle(featured.title)}
        </h1>

        <div
          class="flex items-center gap-4 mt-8 text-[10px] md:text-xs font-bold text-white/80 uppercase tracking-[0.3em]"
        >
          <span class="px-2 py-0.5 border border-white/30 rounded"
            >{featured.type}</span
          >
          <span>{featured.year || "2026"}</span>
          <span class="text-yellow-500">★ {featured.rating}</span>
        </div>

        <div class="mt-10 flex items-center gap-4">
          <a
            href="/watch/{featured.slug}"
            class="flex items-center gap-3 bg-white text-black px-10 py-4 rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:bg-neutral-200 transition-all duration-300 group"
          >
            <span
              class="material-symbols-outlined text-xl group-hover:scale-125 transition-transform"
              >play_arrow</span
            >
            Watch Now
          </a>
        </div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-6 -mt-16 relative z-20 space-y-16">
      <div>
        <div class="flex items-end justify-between mb-8">
          <h2
            class="text-2xl font-['Bebas_Neue'] tracking-widest text-white/90"
          >
            Recommended For You
          </h2>
          <span class="h-[1px] flex-1 bg-white/10 ml-6 mb-2"></span>
        </div>

        <div
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-12"
        >
          {#each listMovies as movie}
            <a href="/watch/{movie.slug}" class="group block">
              <div
                class="relative aspect-[2/3] rounded-[32px] overflow-hidden border border-white/5 bg-white/5 transition-all duration-500 group-hover:scale-[1.03] group-hover:border-white/20"
              >
                <div
                  class="absolute top-3 right-3 z-30 bg-black/60 backdrop-blur-md border border-white/10 px-2 py-1 rounded-xl text-[9px] font-bold text-yellow-400"
                >
                  ★ {movie.rating}
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
                    class="w-12 h-12 rounded-full bg-white flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300"
                  >
                    <span class="material-symbols-outlined text-black"
                      >play_arrow</span
                    >
                  </div>
                </div>
              </div>

              <div class="mt-4 px-1">
                <h3
                  class="text-[10px] font-bold uppercase tracking-wider text-white/70 group-hover:text-white transition-colors line-clamp-2 leading-tight"
                >
                  {cleanTitle(movie.title)}
                </h3>
                <p
                  class="text-[8px] text-white/30 mt-1.5 uppercase tracking-widest font-medium"
                >
                  {movie.year || "2026"} • {movie.type}
                </p>
              </div>
            </a>
          {/each}
        </div>
      </div>
    </section>
  {:else}
    <div class="h-screen flex items-center justify-center">
      <div
        class="w-10 h-10 border-2 border-white/10 border-t-white rounded-full animate-spin"
      ></div>
    </div>
  {/if}
</div>

<style>
  /* Menghaluskan scroll */
  :global(html) {
    scroll-behavior: smooth;
  }
</style>
