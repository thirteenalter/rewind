<script lang="ts">
  import { onMount } from "svelte";
  export let data;

  // Reactive data dari load function
  $: ({ initialMovies, total, title, action, subtitle } = data);

  let movies = [];
  let currentPage = 1;
  let isLoading = false;
  let hasMore = true;
  let observerTarget: HTMLElement;

  // Inisialisasi data awal
  $: if (initialMovies && movies.length === 0) {
    movies = [...initialMovies];
    hasMore = total > movies.length;
  }

  const cleanTitle = (t: string) => {
    if (!t) return "";
    return t
      .replace(/\[Indonesian\]|\[Hindi\]|\[Tamil\]|Lyrical Video/gi, "")
      .trim();
  };

  async function loadMore() {
    if (isLoading || !hasMore) return;
    isLoading = true;

    const nextPage = currentPage + 1;
    try {
      const res = await fetch(
        `https://zeldvorik.ru/rebahin21/api.php?action=${action}&page=${nextPage}`,
      );
      const result = await res.json();

      if (result.success && result.data.length > 0) {
        movies = [...movies, ...result.data];
        currentPage = nextPage;
        hasMore = total > movies.length;
      } else {
        hasMore = false;
      }
    } catch (e) {
      console.error("Failed to fetch more series:", e);
      hasMore = false;
    } finally {
      isLoading = false;
    }
  }

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && hasMore) {
          loadMore();
        }
      },
      { threshold: 0.1 },
    );

    if (observerTarget) observer.observe(observerTarget);
    return () => observer.disconnect();
  });

  $: featured = movies.length > 0 ? movies[0] : null;
</script>

<svelte:head>
  <title>{title} | Rewind</title>
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
          class="inline-flex items-center backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.5em] mb-4 w-fit text-white/80"
        >
          {subtitle}
        </div>

        <h1
          class="text-6xl md:text-[8rem] font-['Bebas_Neue'] leading-[0.8] tracking-tighter text-white uppercase italic drop-shadow-2xl"
        >
          {title}
        </h1>

        <p
          class="text-[10px] md:text-xs text-white/50 uppercase tracking-[0.3em] mt-6 flex items-center gap-3"
        >
          <span class="text-white font-bold">{total} Series</span>
          <span class="w-1 h-1 bg-white/20 rounded-full"></span>
          <span>New Episodes Available</span>
        </p>
      </div>
    </section>
  {/if}

  <section
    class="max-w-7xl mx-auto px-6 {featured ? '-mt-12' : 'pt-32'} relative z-20"
  >
    {#if movies.length > 0}
      <div class="flex items-end justify-between mb-10">
        <h2
          class="text-xl font-['Bebas_Neue'] tracking-[0.2em] text-white/90 uppercase"
        >
          Latest {title}
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
                  >{movie.year || "2026"}</span
                >
                <span class="w-1 h-1 bg-white/10 rounded-full"></span>
                <span
                  class="text-[9px] text-white/20 font-bold uppercase tracking-widest italic font-medium"
                  >HD</span
                >
              </div>
            </div>
          </a>
        {/each}
      </div>

      <div
        bind:this={observerTarget}
        class="w-full py-20 flex justify-center items-center"
      >
        {#if isLoading}
          <div class="flex gap-2">
            <div class="w-2 h-2 bg-red-600 rounded-full animate-bounce"></div>
            <div
              class="w-2 h-2 bg-red-600 rounded-full animate-bounce [animation-delay:-0.15s]"
            ></div>
            <div
              class="w-2 h-2 bg-red-600 rounded-full animate-bounce [animation-delay:-0.3s]"
            ></div>
          </div>
        {:else if !hasMore}
          <p
            class="text-[10px] uppercase tracking-[0.5em] text-white/10 font-bold italic"
          >
            No more series to show
          </p>
        {/if}
      </div>
    {:else}
      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 pt-10"
      >
        {#each Array(12) as _}
          <div class="animate-pulse">
            <div class="aspect-[2/3] bg-white/5 rounded-[32px] mb-4"></div>
            <div class="h-2 w-2/3 bg-white/5 rounded mb-2"></div>
            <div class="h-2 w-1/2 bg-white/5 rounded"></div>
          </div>
        {/each}
      </div>
    {/if}
  </section>
</div>

<style>
  img {
    content-visibility: auto;
  }
</style>
