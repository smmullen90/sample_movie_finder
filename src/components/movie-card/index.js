import React from 'react';
import PropTypes from 'prop-types';

import './style.css';
import moviesStore from '../../stores/movies';

const MovieCard = props => {
  const {backdrop_path, original_language, release_date, title} = props;
  const releaseYear = release_date.split('-')[0];
  let movieImg;

  if (backdrop_path) {
    movieImg = (
      <img
        className="mc__img"
        src={moviesStore.formatImgPath(backdrop_path)}
        alt={title}
      />
    );
  } else {
    movieImg = <div className="mc__img--default" />;
  }

  return (
    <div className="mc">
      {movieImg}
      <div className="mc__inner">
        <h3 className="mc__title">
          {title}
          {original_language !== 'en' && (
            <span className="mc__lang">({original_language})</span>
          )}
        </h3>
        <p className="mc__year">{releaseYear}</p>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  backdrop_path: PropTypes.string,
  original_language: PropTypes.string,
  release_date: PropTypes.string,
  title: PropTypes.string,
};

export default MovieCard;
