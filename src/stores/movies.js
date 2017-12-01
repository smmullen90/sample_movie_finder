import MoviesApi from '../services/movies-api';
import {extendObservable} from 'mobx';

class MoviesStore {
  constructor() {
    extendObservable(this, {
      _baseUrl: '',
      _genresMap: {},
      _movies: [],
      _moviesPage: 0,
      _moviesTotalPages: 0,
      _moviesTotalResults: 0,
    });
  }

  get movies() {
    return this._movies.slice();
  }

  get pagination() {
    return {
      page: this._moviesPage,
      totalPages: this._moviesTotalPages,
      totalResults: this._moviesTotalResults,
    };
  }

  async configure() {
    this.fetchGenres();
    this.fetchBaseUrl();
  }

  async fetchBaseUrl() {
    const response = await MoviesApi.get('/configuration');
    this._baseUrl = response.images.base_url;
  }

  async fetchGenres() {
    const {genres} = await MoviesApi.get('/genre/movie/list');
    this._genresMap = genres.reduce((map, genre) => {
      // eslint-disable-next-line no-param-reassign
      map[genre.id] = genre.name;
      return map;
    }, {});
  }

  formatImgPath(path, width = 300) {
    if (!path) {
      return null;
    }

    return [
      this._baseUrl.replace(/\/$/, ''),
      `w${width}`,
      path.replace(/^\//, ''),
    ].join('/');
  }

  getGenreName(id) {
    return this._genresMap[id];
  }

  reset() {
    this._movies = [];
    this._moviesPage = 0;
    this._moviesTotalPages = 0;
    this._moviesTotalResults = 0;
  }

  async search(query, pageNum) {
    if (!query) {
      this.reset();
      return;
    }

    const {results, page, total_pages, total_results} = await MoviesApi.get(
      '/search/movie',
      {page: pageNum, query}
    );

    this._movies = results;
    this._moviesPage = page;
    this._moviesTotalPages = total_pages;
    this._moviesTotalResults = total_results;
  }
}

const moviesStore = new MoviesStore();
export default moviesStore;
