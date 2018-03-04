import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Line from './Line/index'
import { connect } from '../../../services/redux'

import styles from './MenuPanel.scss'


class MenuPanel extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    collection: PropTypes.object.isRequired,
    active: PropTypes.string,
  }

  isActive(section) {
    return this.props.active === section
  }

  render() {
    const { type, collection } = this.props
    return (
      <div className={styles.MenuPanel} >
        <Line
          active={this.isActive('summary')}
          value="summary"
          type={type}
          collection={collection}
        >
          Summary
        </Line>
        <Line
          active={this.isActive('languages')}
          value="languages"
          type={type}
          collection={collection}
        >
          Languages
        </Line>
        <Line
          active={this.isActive('exports')}
          value="exports"
          type={type}
          collection={collection}
        >
          Export your data
        </Line>
        <Line
          active={this.isActive('imports')}
          value="imports"
          type={type}
          collection={collection}
        >
          Import data
        </Line>
        <Line
          active={this.isActive('cover')}
          value="cover"
          type={type}
          collection={collection}
        >
          Cover customization
        </Line>
      </div>
    )
  }
}

const mapStateToProps = ({ settings }) => ({
  active: settings.activeSection,
})

const mapDispatchToProps = () => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MenuPanel)
