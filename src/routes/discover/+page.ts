import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  try {
    const res = await fetch('https://zeldvorik.ru/rebahin21/api.php?action=home');
    const result = await res.json();

    return {
      // Kita asumsikan API home mengembalikan properti 'data' 
      // Jika strukturnya berbeda (misal ada 'trending', 'popular'), sesuaikan di sini
      movies: result.data || []
    };
  } catch (err) {
    console.error("Home API Error:", err);
    return { movies: [] };
  }
};