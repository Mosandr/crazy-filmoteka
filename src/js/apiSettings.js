// API Key (v3 auth)

const apiSettings = {
  key: '62af7111fb0063930df9c7b53547034d',
  baseUrl: 'https://api.themoviedb.org/3',
  names: {
    tranding: '/trending/movie/week',
    search: '/search/movie',
    movie: '/movie/',
  },
};

export default apiSettings;

// Example API Request
// https://api.themoviedb.org/3/movie/550?api_key=62af7111fb0063930df9c7b53547034d
