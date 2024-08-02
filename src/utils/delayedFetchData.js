import fetchAnimeData from "./fetchAnimeData";

const delayedFetchAnimeData = async (arr, setIsDataLoading, setAnimeData, delay = 1500) => {
  if (arr.length > 0) {
    setIsDataLoading(true);
    const data = [];

    for (const item of arr) {
      await new Promise(resolve => setTimeout(resolve, delay));

      const anime = await fetchAnimeData(item.entry.mal_id);
      data.push(anime);
    }

    setAnimeData(data);
    setIsDataLoading(false);
  } else {
    setIsDataLoading(false);
  }
};

const delayedFetchAnimeRelationsData = async (arr, setIsDataLoading, setAnimeData, delay = 1500) => {
  if (arr.length > 0) {
    setIsDataLoading(true);
    const data = [];

    for (let i = 1; i < arr.length; i++) { 
      const relationObj = arr[i];
      const animeArr = relationObj.entry;

      for (const animeObj of animeArr) {
        if (data.length >= 10) {
          break;
        }

        await new Promise(resolve => setTimeout(resolve, delay));
        const anime = await fetchAnimeData(animeObj.mal_id);
        data.push(anime);
      }
    }

    setAnimeData(data);
    setIsDataLoading(false);
  } else {
    setIsDataLoading(false);
  }
};

export { delayedFetchAnimeRelationsData, delayedFetchAnimeData };