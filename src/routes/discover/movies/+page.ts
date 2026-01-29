import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  // Action disesuaikan: 'trending', 'movies', atau 'series'
  const res = await fetch('https://zeldvorik.ru/rebahin21/api.php?action=movies&page=1');
  const result = await res.json();

  return {
    initialMovies: result.data || [],
    total: result.total || 0,
    action: 'movies', // Sesuaikan dengan action API-nya
    title: 'Movies'
  };
};