import fetchAnimeData from "./fetchAnimeData";

const delayedFetchAnimeRecommendationsData = async (
  arr, 
  setIsDataLoading, 
  setAnimeData, 
  isSingleAnimePageMountedRef, 
  delay = 1700) => {
    if (arr.length > 0) {
      setIsDataLoading(true);
      const data = [];

      for (const item of arr) {
        if (!isSingleAnimePageMountedRef.current) { 
          break;
        }

        await new Promise(resolve => setTimeout(resolve, delay));
        const anime = await fetchAnimeData(item.entry.mal_id);
        data.push(anime);
      }

      if (isSingleAnimePageMountedRef.current) {
        setAnimeData(data);
        setIsDataLoading(false);
      }
    } else {
      setIsDataLoading(false);
    }
};

const delayedFetchAnimeRelationsData = async (
  arr, 
  setIsDataLoading, 
  setAnimeData, 
  isSingleAnimePageMountedRef, 
  delay = 1500) => {
    if (arr.length > 0) {
      setIsDataLoading(true);
      const data = [];

      for (let i = 1; i < arr.length; i++) { 
        const relationObj = arr[i];
        const animeArr = relationObj.entry;

        for (const animeObj of animeArr) {
          if (data.length >= 10 || !isSingleAnimePageMountedRef.current) {
            break;
          }        

          await new Promise(resolve => setTimeout(resolve, delay));
          const anime = await fetchAnimeData(animeObj.mal_id);
          data.push(anime);
        }
      }

      if (isSingleAnimePageMountedRef.current) {
        setAnimeData(data);
        setIsDataLoading(false);
      }
    } else {
      setIsDataLoading(false);
    }
};

export { delayedFetchAnimeRelationsData, delayedFetchAnimeRecommendationsData };