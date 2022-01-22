import axios from '../utils/axios';

export const getHome = async (page = 0) => {
    const data = await (axios.get('homePage/getHome', {
        params: {
            page
        }
    }));

    return data.data.data.recommendItems;
};

export const getSearchBoard = async () => {
    const data = await (axios.get('search/v1/searchLeaderboard'));
    
    return data.data.data.list;
}