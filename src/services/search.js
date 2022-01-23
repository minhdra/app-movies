import axios from '../utils/axios';

export const search = async (searchKeyWord, size) => {
  const data = await axios.post(`search/searchLenovo`, {
    searchKeyWord: 'spider man',
    size: 10,
  })

  console.log(data);
};

export const searchWithKeyword = async (
    keyword
  ) =>
    (
      await axios.post("search/v1/searchWithKeyWord", {
        searchKeyWord: keyword,
        size: 50,
        sort: "",
        searchType: "",
      })
    ).data.data.searchResults;
