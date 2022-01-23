import axios from '../utils/axios';

export const searchKeywords = async (keyword) => {
  const obj = {
    searchKeyWord: 'spider man',
    size: 10
  }

  return fetch('https://ga-mobile-api.loklok.tv/cms/app/search/searchLenovo', {
    method: 'POST',
    headers: {
      lang: 'en',
      versioncode: '11',
      clienttype: 'ios_jike_default',
      "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
  }).then(res => res.json()).then(data => data.data.searchResults);
};
// (
//   await axios.post(`search/searchLenovo`, {
//     searchKeyWord: keyword,
//     size: 10,
//   })
// ).data.data.searchResults;

export const searchWithKeyword = async (keyword) =>
  (
    await axios.post('search/v1/searchWithKeyWord', {
      searchKeyWord: keyword,
      size: 50,
      sort: '',
      searchType: '',
    })
  ).data.data.searchResults;
