import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SearchBar from 'material-ui-search-bar';
import AutoComplete from 'material-ui/AutoComplete';
import muiThemeable from 'material-ui/styles/muiThemeable';

import { update } from './actions'
import { search, getRecommendations } from 'services/actions/publicAPI';

import './style.css';


class Search extends Component {
  static propTypes = {
    isAdding: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    query: PropTypes.string.isRequired,
    filter: PropTypes.func.isRequired,
    count: PropTypes.number.isRequired,
    muiTheme: PropTypes.object.isRequired,
    autoComplete: PropTypes.object,
  };

  state = {
    query: '',
  };

  get hintText() {
    const { isAdding, title } = this.props;
    if (isAdding) {
      return 'Search for content to add';
    }
    return title ? `Search in ${title}` : 'Search ...';
  }

  search = (query) => {
    this.setState({ query });
    this.filter(query, false)
  };

  filter = (query, forced) => {
    const { isAdding, filter } = this.props;
    filter(query, forced, isAdding);
  };

  renderCounter = () => {
    const { isAdding, count, muiTheme: { palette } } = this.props;
    if (isAdding) {
      return null;
    }
    const style = { color: palette.alternateTextColor };
    return (
      <div className="element-count" style={style} >
        {`${count} element${(count > 1 ? 's' : '')}`}
      </div>
    );
  };

  render() {
    const { query, autoComplete } = this.props;
    return (
      <div className="search-bar-container">
        <SearchBar
          hintText={this.hintText}
          onChange={this.search}
          onRequestSearch={() => this.filter(this.state.query, true)}
          value={query}
          dataSource={autoComplete}
          filter={AutoComplete.caseInsensitiveFilter}
          maxSearchResults={10}
        />
        {this.renderCounter()}
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch, { type, collection }) => ({
  filter: (query, forced, isAdding) => {
    dispatch(update(type, collection, query));
    if (isAdding && forced) {
      if (query === '') {
        dispatch(getRecommendations(type, collection));
      } else {
        dispatch(search(type, collection, query));
      }
    }
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(muiThemeable()(Search));