import React from 'react'
import { connect } from 'react-redux'

import ContentTable from 'components/ContentTable/index'
import { sort } from './actions'

class List extends ContentTable {
  
  render() {
    this.params = {
      ...this.params,
      scene: this.props.scene,
      columns: this.props.columns,
      tableStyle: {},
    };
    return super.render();
  }
  
}

const mapStateToProps = state => {
  return {}
};

const mapDispatchToProps = dispatch => {
  return {
    sort: (...args) => dispatch(sort(...args))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);