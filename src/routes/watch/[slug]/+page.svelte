<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;

  // Reactive data
  $: movie = data.movie;

  // State untuk player
  let currentIframe: string = "";
  let activeEpisode: number | null = null;

  // Inisialisasi state saat data movie tersedia
  $: if (movie) {
    currentIframe = movie.player_url;
    if (movie.episodes && movie.episodes.length > 0) {
      activeEpisode = movie.episodes[0].episode;
    }
  }

  function changeEpisode(ep: any) {
    currentIframe = ep.player_url;
    activeEpisode = ep.episode;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const cleanTitle = (t: string) =>
    t ? t.replace(/\(\d{4}\)/g, "").trim() : "";
</script>

<svelte:head>
  {#if movie}
    <title>Watching {movie.title} | Rewind</title>
  {/if}
</svelte:head>

{#if movie}
  <div class="min-h-screen bg-[#0a0a0a] font-['Montserrat'] text-white pb-20">
    <section class="relative pt-32 pb-10">
      <div class="max-w-7xl mx-auto px-6">
        <button
          on:click={() => history.back()}
          class="w-full md:w-auto px-10 py-3 border border-white/10 text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-white/5 transition-all duration-300"
        >
          Go Back
        </button>
        <br />
        <br />
        <div
          class="aspect-video w-full rounded-[32px] overflow-hidden bg-white/5 shadow-2xl border border-white/10 relative group"
        >
          <iframe
            src={currentIframe}
            class="w-full h-full"
            allowfullscreen
            frameborder="0"
            title={movie.title}
          ></iframe>
        </div>
      </div>
    </section>

    <section
      class="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12"
    >
      <div class="lg:col-span-2 space-y-10">
        <br />

        <div>
          <div class="flex items-center gap-4 mb-6">
            <div
              class="inline-flex items-center backdrop-blur-md bg-red-600/20 border border-red-500/30 rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.5em] text-red-500"
            >
              Now Playing
            </div>
            {#if movie.year}
              <span
                class="text-white/30 text-[10px] font-bold uppercase tracking-[0.4em]"
                >{movie.year}</span
              >
            {/if}
          </div>

          <h1
            class="text-5xl md:text-7xl font-['Bebas_Neue'] tracking-tighter mb-6 uppercase italic leading-[0.9]"
          >
            {cleanTitle(movie.title)}
            {#if activeEpisode && movie.episodes?.length > 0}
              <span class="text-red-600 ml-2">/ EP {activeEpisode}</span>
            {/if}
          </h1>

          <div class="flex flex-wrap gap-3">
            <div
              class="backdrop-blur-md bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl flex items-center gap-1.5"
            >
              <span class="text-[10px] font-bold text-yellow-500 italic">★</span
              >
              <span class="text-[10px] font-bold tracking-tighter italic"
                >{movie.rating}</span
              >
            </div>
            {#each movie.genres as genre}
              <span
                class="px-4 py-1.5 bg-white/5 rounded-full border border-white/10 text-[9px] font-bold uppercase tracking-widest text-white/60"
              >
                {genre}
              </span>
            {/each}
          </div>
        </div>
        <br />

        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <h3
              class="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20"
            >
              Storyline
            </h3>
            <span class="h-[1px] flex-1 bg-white/5"></span>
          </div>
          <br />
          <p
            class="text-white/60 leading-relaxed text-sm md:text-base max-w-3xl italic font-light"
          >
            {movie.synopsis}
          </p>
        </div>

        <div class="space-y-4 pt-4">
          <div class="flex items-center gap-3">
            <h3
              class="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20"
            >
              Cast Members
            </h3>
            <span class="h-[1px] flex-1 bg-white/5"></span>
          </div>
          <br />
          <div class="flex flex-wrap gap-2">
            {#each movie.cast as actor}
              <span
                class="text-[10px] font-bold uppercase tracking-widest text-white/40 bg-white/5 px-4 py-2 rounded-2xl border border-white/5 hover:border-white/20 hover:text-white transition-all duration-300 cursor-default"
              >
                {actor}
              </span>
            {/each}
          </div>
        </div>
      </div>

      <div class="lg:col-span-1">
        {#if movie.episodes && movie.episodes.length > 0}
          <div
            class="bg-white/5 border border-white/10 rounded-[32px] p-8 sticky top-32 shadow-2xl backdrop-blur-sm"
          >
            <div class="flex items-center justify-between mb-8">
              <h3
                class="text-xl font-['Bebas_Neue'] tracking-[0.2em] italic uppercase text-white/90"
              >
                Episodes
              </h3>
              <div
                class="h-1.5 w-1.5 rounded-full bg-red-600 animate-ping"
              ></div>
            </div>

            <div
              class="rounded-[32px] overflow-hidden bg-[#121212]/50 backdrop-blur-xl border border-white/5 shadow-2xl"
            >
              <div
                class="p-6 pb-2 border-b border-white/5 flex items-center justify-between"
              >
                <div class="flex items-center gap-3">
                  <span
                    class="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)]"
                  ></span>
                  <h3
                    class="text-sm font-bold uppercase tracking-[0.3em] text-white/80"
                  >
                    Select Episode
                  </h3>
                </div>
                <span
                  class="text-[10px] font-bold text-white/20 uppercase tracking-widest"
                  >{movie.episodes.length} EP</span
                >
              </div>

              <div class="p-4">
                <div
                  class="space-y-2.5 max-h-[420px] overflow-y-auto pr-2 custom-scroll"
                >
                  {#each movie.episodes as ep}
                    <button
                      on:click={() => changeEpisode(ep)}
                      class="w-full flex items-center gap-4 p-3.5 rounded-[22px] transition-all duration-500 group relative overflow-hidden
                      {activeEpisode === ep.episode
                        ? 'bg-white text-black shadow-[0_15px_30px_rgba(255,255,255,0.1)] scale-[1.02]'
                        : 'bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.02] hover:border-white/10'}"
                    >
                      {#if activeEpisode === ep.episode}
                        <div
                          class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"
                        ></div>
                      {/if}

                      <div
                        class="w-11 h-11 flex-none rounded-[14px] flex items-center justify-center font-['Bebas_Neue'] text-2xl transition-all duration-500
                        {activeEpisode === ep.episode
                          ? 'bg-black text-white rotate-[5deg]'
                          : 'bg-white/5 text-white/30 group-hover:text-white/60 group-hover:scale-110'}"
                      >
                        {ep.episode < 10 ? `0${ep.episode}` : ep.episode}
                      </div>

                      <div class="text-left overflow-hidden z-10">
                        <p
                          class="text-[9px] font-bold uppercase tracking-[0.2em] mb-0.5 transition-colors {activeEpisode ===
                          ep.episode
                            ? 'text-black/40'
                            : 'text-white/20'}"
                        >
                          Series • S01
                        </p>
                        <p
                          class="text-[12px] font-extrabold uppercase tracking-widest truncate transition-all {activeEpisode ===
                          ep.episode
                            ? 'text-black'
                            : 'text-white/70 group-hover:text-white'}"
                        >
                          Episode {ep.episode}
                        </p>
                      </div>

                      <div class="ml-auto z-10">
                        {#if activeEpisode === ep.episode}
                          <div
                            class="flex items-center gap-2 px-3 py-1 bg-black rounded-full shadow-lg"
                          >
                            <div class="flex gap-0.5 items-end h-2.5">
                              <div
                                class="w-[2px] bg-red-600 animate-bar-bounce"
                              ></div>
                              <div
                                class="w-[2px] bg-red-600 animate-bar-bounce [animation-delay:0.2s]"
                              ></div>
                              <div
                                class="w-[2px] bg-red-600 animate-bar-bounce [animation-delay:0.4s]"
                              ></div>
                            </div>
                            <span
                              class="text-[9px] font-black uppercase text-white tracking-tighter"
                              >Live</span
                            >
                          </div>
                        {:else}
                          <div
                            class="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0"
                          >
                            <span
                              class="material-symbols-outlined text-sm text-white/40"
                              >play_arrow</span
                            >
                          </div>
                        {/if}
                      </div>
                    </button>
                  {/each}
                </div>
              </div>
            </div>
          </div>
        {:else}
          <div
            class="bg-white/5 border border-white/10 rounded-[32px] p-10 text-center sticky top-32 overflow-hidden"
          >
            <div
              class="absolute -top-10 -right-10 text-9xl font-['Bebas_Neue'] text-white/[0.02] rotate-12 select-none"
            >
              MOVIE
            </div>
            <span
              class="material-symbols-outlined text-5xl text-red-600 mb-6 block"
              >high_quality</span
            >
            <h4
              class="text-[10px] font-bold uppercase tracking-[0.5em] text-white mb-2"
            >
              Ultra Streaming
            </h4>
            <p
              class="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 leading-relaxed"
            >
              Experience cinema quality <br /> at your fingertips
            </p>
          </div>
        {/if}
      </div>
    </section>
  </div>
{:else}
  <div
    class="h-screen w-full flex flex-col items-center justify-center bg-[#0a0a0a] gap-6"
  >
    <div
      class="w-12 h-12 border-[3px] border-red-600 border-t-transparent rounded-full animate-spin"
    ></div>
    <p
      class="text-[10px] font-bold uppercase tracking-[0.5em] text-white/20 animate-pulse"
    >
      Initializing Stream
    </p>
  </div>
{/if}

<style>
  /* Global Styles */
  .custom-scroll::-webkit-scrollbar {
    width: 4px;
  }
  .custom-scroll::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scroll::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
  }
  .custom-scroll::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  iframe {
    aspect-ratio: 16 / 9;
  }

  /* Animations */
  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }

  @keyframes bar-bounce {
    0%,
    100% {
      height: 4px;
    }
    50% {
      height: 10px;
    }
  }

  .animate-bar-bounce {
    animation: bar-bounce 0.6s infinite;
  }
</style>
