import axios from '../utils/axios';

export async function searchConfig() {
  const data = (
    await axios.get('search/list')
  ).data.data;

  return data;
}

export async function searchAdvanced(params) {
  const options = {
    "size": 1000,
    "subtitles": "",
    "order": "up",
    ...params
  }

  const data = (
    await axios.post('search/v1/search', options)
  ).data.data.searchResults;

  return data;
}