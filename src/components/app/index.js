import React from 'react';
import {observer} from 'mobx-react';

import './styles.css';
import moviesStore from '../../stores/movies';
import SearchInput from '../search-input';
import MovieCard from '../movie-card';
import Grid from '../grid';
import Pagination from '../pagination';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    moviesStore.configure();

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onPaginationChange = this.onPaginationChange.bind(this);
  }

  onSearchChange(query) {
    this.query = query;
    moviesStore.search(query);
  }

  onPaginationChange(page) {
    moviesStore.search(this.query, page);
  }

  render() {
    return (
      <div className="app">
        <SearchInput onChange={this.onSearchChange} />
        <Pagination
          {...moviesStore.pagination}
          onPaginationChange={this.onPaginationChange}
        />
        <Grid>
          {moviesStore.movies.map(movie => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </Grid>
      </div>
    );
  }
}

export default observer(App);
