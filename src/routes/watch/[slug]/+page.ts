import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
  // Mengambil data detail berdasarkan slug dari URL
  const res = await fetch(`https://zeldvorik.ru/rebahin21/api.php?action=detail&slug=${params.slug}`);
  const result = await res.json();

  if (!result.success) {
    return {
      status: 404,
      error: "Content not found"
    };
  }

  return {
    movie: result.data
  };
};