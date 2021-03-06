import AVMovie from 'material-ui/svg-icons/av/movie'

import type from '../../../../webapp/src/services/content/type'

import elementComponent from './elementComponent'
import elementClass from './elementClass'
import streamGenerator from './streamGenerator'
import sortOptions from './sortOptions'
import * as searchOptions from './searchOptions'
import * as actions from './actions'
import * as publicActions from './publicActions'
import MoviesTMDB from '../../../TheMovieDatabaseJS/movies'
import { MovieCollectionsAPI } from '../../../../webapp/src/services/api/movieCollections'
import { MoviesAPI } from '../../../../webapp/src/services/api/movies'

import * as queries from '../queries.graphql'


const legacy = {
  name: 'movies',
  label: 'Movies',
  elementComponent,
  elementClass,
  actions,
  publicActions,
  searchOptions,
  sortOptions,
  icon: AVMovie,
  elementAPI: MoviesAPI,
  publicAPI: MoviesTMDB,
  collectionAPI: MovieCollectionsAPI,
}


export default type
  .create('movies')
  .label('Movies')
  .icon(AVMovie)
  .elementClass(elementClass)
  .elementComponent(elementComponent)
  .actions('public', publicActions)
  .actions('local', actions)
  .contentManagers('stream', streamGenerator)
  .options('sort', sortOptions)
  .options('search', searchOptions)
  .api('element', MoviesAPI)
  .api('collection', MovieCollectionsAPI)
  .api('public', MoviesTMDB)
  .legacy(legacy)
  .queries(queries)
