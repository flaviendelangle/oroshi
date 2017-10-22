import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Paper from 'material-ui/Paper';
import StarRatingComponent from 'react-star-rating-component';

import Poster from './components/Poster'
import Actions from './components/Actions'

import './style.css'

class Movie extends Component {
  
  render() {
    return (
      <Paper zDepth={3} className="movie">
        <Poster path={this.props.data.poster} title={this.props.data.title} />
        <div className="overlay">
          <Link to={'/movies/' + this.props.data.tmdbId + '/'}>
            <div className="title">{this.props.data.title}</div>
            <div className="note">
              <StarRatingComponent
                name={"Rate " + this.props.data.title}
                starCount={10}
                value={this.props.data.note}
                editing={false}
              />
            </div>
          </Link>
          <Actions data={this.props.data} type='collection_movies'/>
        </div>
      </Paper>
    );
  }
  
}

export default Movie;