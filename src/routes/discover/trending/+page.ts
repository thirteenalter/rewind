import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  // API Trending biasanya tidak menggunakan pagination yang banyak, 
  // tapi kita tetap siapkan strukturnya agar aman.
  const res = await fetch('https://zeldvorik.ru/rebahin21/api.php?action=trending&page=1');
  const result = await res.json();

  return {
    initialMovies: result.data || [],
    total: result.total || (result.data ? result.data.length : 0),
    action: 'trending',
    title: 'Trending Now',
    subtitle: 'Most Watched Today'
  };
};