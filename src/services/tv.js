import axios from '../utils/axios';

export async function getTvDetail(id, episodeIndex) {
  const data = (
    await axios.get('movieDrama/get', {
      params: {
        id,
        category: 1,
      },
    })
  ).data.data;

  const sources = (
    await Promise.all(
      data.episodeVo[episodeIndex].definitionList.map(
        async (quality) =>
          (
            await axios.get('media/previewInfo', {
              params: {
                category: 1,
                contentId: id,
                episodeId: data.episodeVo[episodeIndex].id,
                definition: quality.code,
              },
            })
          ).data.data.mediaUrl
      )
    )
  )
    .map((url, index) => ({
      quality: Number(
        data.episodeVo[episodeIndex].definitionList[index].description
          .toLowerCase()
          .replace('p', '')
      ),
      url,
    }))
    .sort((a, b) => b.quality - a.quality);

  const subtitles = data.episodeVo[episodeIndex].subtitlingList
    .map((sub) => ({
      language: `${sub.language}${sub.translateType ? ' (Auto)' : ''}`,
      url: sub.subtitlingUrl,
      lang: sub.languageAbbr,
    }))
    .reduce((acc, element) => {
      if (element.lang === 'en') {
        return [element, ...acc];
      }
      return [...acc, element];
    }, [])
    .reduce((acc, element) => {
      if (element.lang === 'vi') {
        return [element, ...acc];
      }
      return [...acc, element];
    }, []);

  
  return {
    data,
    sources,
    subtitles,
  };
}
