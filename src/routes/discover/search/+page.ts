import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url, fetch }) => {
  // Ambil parameter 'q' dari URL (misal: ?q=fight+club)
  const query = url.searchParams.get('q') || '';
  const page = url.searchParams.get('page') || '1';

  if (!query) {
    return { movies: [], query: '', total: 0 };
  }

  try {
    const apiUrl = `https://zeldvorik.ru/rebahin21/api.php?action=search&q=${encodeURIComponent(query)}&page=${page}`;
    const res = await fetch(apiUrl);
    const result = await res.json();

    return {
      movies: result.data || [],
      query: query,
      total: result.total || 0
    };
  } catch (err) {
    console.error("Fetch error:", err);
    return { movies: [], query: query, total: 0 };
  }
};