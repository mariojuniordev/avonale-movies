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
    handleHomeButtonClick: function () {
      this.getMovies(API_URL);
    },
    getFavoriteMovies() {
      const arrFavorite = JSON.parse(localStorage.getItem('favorite'));

      return arrFavorite;
    },
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
    showFavoriteList: function () {
      const currentfavoriteMovies = this.getFavoriteMovies();

      this.favoriteMovies = currentfavoriteMovies;

      this.currentPage = '/favoritos';
    },
    showHome: function () {
      this.currentPage = '/home';
    },
    removeFavoriteMovies: function (movieTitle) {
      const currentfavoriteMovies = this.getFavoriteMovies();
      const updatedFavoriteMovies = currentfavoriteMovies.filter(
        (movie) => movie !== movieTitle
      );
      localStorage.setItem('favorite', JSON.stringify(updatedFavoriteMovies));

      this.favoriteMovies = updatedFavoriteMovies;
    },
    searchMovie: function () {
      this.isLoading = true;

      if (this.searchTerm) {
        this.getMovies(searchURL + '&query=' + this.searchTerm);
      } else {
        this.getMovies(API_URL);
      }
    },
  },
  mounted: function () {
    this.getMovies(API_URL);
  },
});
