import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const res = await fetch('https://zeldvorik.ru/rebahin21/api.php?action=series&page=1');
  const result = await res.json();

  return {
    initialMovies: result.data || [],
    total: result.total || 0,
    action: 'series', // Ini kunci untuk loadMore
    title: 'TV Series',
    subtitle: 'Binge-Worthy Shows'
  };
};