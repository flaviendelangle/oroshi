import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import Home from '../../../scenes/Home'
import Account from '../../../scenes/Account'
import Login from '../../../scenes/Login'
import Logout from '../../../scenes/Logout'
import Collection from '../Collection'
import Playground from '../../../scenes/Playground'
import NotFound from '../../errors/NotFound'

import { notifyRouteChange } from '../../../services/actions/router'
import { getProfile } from '../../../services/actions/users'

import styles from './Container.scss'


class Container extends PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired,
    loadProfile: PropTypes.func.isRequired,
    onRouteChange: PropTypes.func.isRequired,
    username: PropTypes.string,
    profile: PropTypes.object,
    oauth: PropTypes.object,
  }

  componentDidMount() {
    this.getProfile()
  }

  componentWillReceiveProps(newProps) {
    const { location: { pathname }, onRouteChange } = this.props
    if (pathname !== newProps.location.pathname) {
      onRouteChange(newProps.location)
      this.getProfile()
    }
  }

  getProfile = () => {
    const {
      location,
      profile,
      oauth,
      username,
      loadProfile,
    } = this.props
    if (
      location.pathname !== '/logout/' &&
      !profile &&
      oauth &&
      username
    ) {
      loadProfile(username)
    }
  }

  render() {
    return (
      <main className={styles.Container}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login/" component={Login} />
          <Route path="/logout/" component={Logout} />
          <Route path="/account" component={Account} />
          <Route path="/collections/" component={Collection} />
          <Route path="/playground/" component={Playground} />
          <Route path="/" component={NotFound} />
        </Switch>
      </main>
    )
  }
}


const mapStateToProps = (state) => {
  const root = state.app
  return {
    profile: root.profile,
    oauth: root.oauth,
    username: root.username,
  }
}

const mapDispatchToProps = dispatch => ({
  onRouteChange: location => dispatch(notifyRouteChange(location)),
  loadProfile: username => dispatch(getProfile(username)),
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container))
