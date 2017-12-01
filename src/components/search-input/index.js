import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';
import React from 'react';

import './styles.css';
import SearchIcon from '../icons/search';

const DEBOUNCE_DELAY = 200;

export default class SearchInput extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const {value} = this.input;
    this.props.onChange(value);
  }

  render() {
    return (
      <div className="search-input-container">
        <input
          className="search-input"
          ref={input => {
            this.input = input;
          }}
          placeholder="Search Movies"
          onChange={debounce(this.onChange, DEBOUNCE_DELAY)}
        />
        <SearchIcon className="search-input__icon" />
      </div>
    );
  }
}
