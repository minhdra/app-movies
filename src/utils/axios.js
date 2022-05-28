import axios from 'axios';

// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
export default axios.create({
  baseURL: 'https://ezexpress.tk/https://ga-mobile-api.loklok.tv/cms/app',
  headers: {
    lang: 'en',
    versioncode: '11',
    clienttype: 'ios_jike_default',
  },
});
