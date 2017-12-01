import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

export default class Pagination extends React.Component {
  static propTypes = {
    onPaginationChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    totalResults: PropTypes.number.isRequired,
  };

  onPaginationChange(page, event) {
    event.preventDefault();
    this.props.onPaginationChange(page);
  }

  render() {
    const {page, totalPages, totalResults} = this.props;

    if (page === 0) {
      return null;
    }

    const prevPage = page > 1 && page - 1;
    const nextPage = page < totalPages && page + 1;

    return (
      <div className="pagination">
        <a
          className="pagination__link"
          disabled={!prevPage}
          href=""
          onClick={prevPage && this.onPaginationChange.bind(this, prevPage)}
        >
          {prevPage && `< ${prevPage}`}
        </a>
        <span>
          Page {page} ({totalResults} results)
        </span>
        <a
          className="pagination__link"
          disabled={!nextPage}
          href=""
          onClick={nextPage && this.onPaginationChange.bind(this, nextPage)}
        >
          {nextPage && `${nextPage} >`}
        </a>
      </div>
    );
  }
}
