import axios from 'axios';

export default {
    fetchUser: async () => {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/users`); //eslint-disable-line
            return response.data;
        } catch (err) {
            console.log(err); //eslint-disable-line
            return [];
        }
    }
};
