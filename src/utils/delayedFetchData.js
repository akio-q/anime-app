import fetchAnimeData from "./fetchAnimeData";

const delayedFetchAnimeData = async (arr, setIsDataLoading, setAnimeData, itemHasEntry = true, delay = 1500) => {
  if (arr.length > 0) {
    setIsDataLoading(true);
    const data = [];

    for (const item of arr) {
      const anime = itemHasEntry ? await fetchAnimeData(item.entry.mal_id) : await fetchAnimeData(item.mal_id);
      data.push(anime);

      await new Promise(resolve => setTimeout(resolve, delay));
    }

    setAnimeData(data);
    setIsDataLoading(false);
  } else {
    setIsDataLoading(false);
  }
};

export default delayedFetchAnimeData;