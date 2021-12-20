const API_KEY = 'api_key=45f31e9ac804875663bd3354d9c20d50';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

var app = new Vue({
  el: '#app',
  data: {
    currentPage: '/home',
    isLoading: true,
    movieList: [],
    favoriteMovies: [],
    searchTerm: '',
  },
  methods: {
    getMovies: function (url) {
      const x = fetch(url)
        .then((res) => res.json())
        .then((data) => {
          this.movieList = data.results;
          this.isLoading = false;
        });
      
      console.log(x)

    },
    /* handleHomeButtonClick shows the top 20 most popular movies at the moment */
    handleHomeButtonClick: function () {
      this.getMovies(API_URL);
    },
    /* getFavoriteMovies accesses movies' names stored in an array called
    'favorite' located in the local storage and returns it */
    getFavoriteMovies() {
      const arrFavorite = JSON.parse(localStorage.getItem('favorite'));

      return arrFavorite;
    },
    /* saveAsFavoriteMovies saves movies names in an array to store them in 
    the local storage */
    saveAsFavoriteMovies: function (movieTitle) {
      let favoriteMovies = this.getFavoriteMovies();
      if (!favoriteMovies) {
        favoriteMovies = [];
      }

      if (!favoriteMovies.includes(movieTitle)) {
        favoriteMovies.push(movieTitle);
      }

      localStorage.setItem('favorite', JSON.stringify(favoriteMovies));
      alert(`${movieTitle} successfully added to favorite movies list!`);
    },
    /* showFavoriteList gets the data stored in the 'favorite' array located
    in the local storage*/
    showFavoriteList: function () {
      const currentfavoriteMovies = this.getFavoriteMovies();

      this.favoriteMovies = currentfavoriteMovies;

      this.currentPage = '/favoritos';
    },
    /* showHome shows the main page, which has the top 20 most popular movies at the moment */
    showHome: function () {
      this.getMovies(API_URL);
      this.currentPage = '/home';
    },
    /* removeFavoriteMovies removes an specific movie present in the 'favorite'
    array located in the local storage by its name  */
    removeFavoriteMovies: function (movieTitle) {
      const currentfavoriteMovies = this.getFavoriteMovies();
      const updatedFavoriteMovies = currentfavoriteMovies.filter(
        (movie) => movie !== movieTitle
      );
      localStorage.setItem('favorite', JSON.stringify(updatedFavoriteMovies));

      this.favoriteMovies = updatedFavoriteMovies;
    },
    /* searchMovie searches for a movie or movies depending on the text typed in
    the search input */
    searchMovie: function () {
      this.isLoading = true;

      if (this.searchTerm) {
        this.getMovies(searchURL + '&query=' + this.searchTerm);
      } else {
        this.getMovies(API_URL);
      }
    },
  },
  /* mounted loads the main page which has the top 20 most popular movies at the moment */
  mounted: function () {
    this.getMovies(API_URL);
  },
});
