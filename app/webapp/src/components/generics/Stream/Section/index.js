import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import cx from 'classnames'

import IconButton from 'material-ui/IconButton'
import NavigationLess from 'material-ui/svg-icons/navigation/expand-less'
import NavigationMore from 'material-ui/svg-icons/navigation/expand-more'
import NavigationMoreHoriz from 'material-ui/svg-icons/navigation/more-horiz'

import ElementLine, { groupByLine } from '../../../../components/generics/ElementLine/index'

import styles from './Section.scss'


const CONFIG = {
  pageLength: 4,
}

class Section extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    lineDimensions: PropTypes.object.isRequired,
    loadMore: PropTypes.func.isRequired,
    elementComponent: PropTypes.func.isRequired,
    collection: PropTypes.object.isRequired,
    creationMode: PropTypes.bool,
    isPublic: PropTypes.bool,
    field: PropTypes.object,
  }

  state = {
    isFull: false,
    pages: 1,
  }

  get title() {
    const { data: { key } } = this.props
    return key.title || key.name
  }

  get amountToShow() {
    const { lineDimensions } = this.props
    const { pages } = this.state
    return CONFIG.pageLength * lineDimensions.elementsPerLine * pages
  }

  get isAllShown() {
    const { data: { content, next } } = this.props
    const local = content.length <= this.amountToShow
    return local && !next
  }

  getElements() {
    const { data: { content }, lineDimensions } = this.props
    const { isFull } = this.state
    let elements = content
    if (
      !isFull &&
      elements.length > lineDimensions.elementsPerLine
    ) {
      elements = elements.slice(0, lineDimensions.elementsPerLine)
    } else if (elements.length > this.amountToShow) {
      elements = elements.slice(0, this.amountToShow)
    }
    return groupByLine(elements, lineDimensions.elementsPerLine)
  }


  showFullVersion = () => {
    this.setState(prevState => ({ isFull: !prevState.isFull }))
  }

  showMore = () => {
    const { data: { next }, loadMore } = this.props
    if (next) {
      loadMore(next)
    }
    this.setState(prevState => ({ pages: prevState.pages + 1 }))
  }

  renderLink = () => {
    const { data, field } = this.props
    if (
      Object.prototype.hasOwnProperty.call(data, 'link') &&
      !data.link
    ) {
      return (
        <span>
          {this.title}
        </span>
      )
    }
    return (
      <Link
        to={`/${field.field}/${data.key.pk}`}
      >
        {this.title}
      </Link>
    )
  }

  render() {
    const {
      elementComponent: Element,
      collection,
      creationMode,
      isPublic,
      data: { content },
      lineDimensions: { elementsPerLine },
    } = this.props
    const { isFull } = this.state
    const elements = this.getElements()

    const sectionClasses = cx({
      [styles.Section]: true,
      [styles.SectionFull]: isFull,
    })
    const showFullClasses = cx({
      [styles.ShowFullVersion]: true,
      [styles.ShowFullVersionHidden]: content.length <= elementsPerLine,
    })

    return (
      <div className={sectionClasses}>
        <div className={styles.Title}>
          {this.renderLink()}
          <IconButton onClick={this.showFullVersion} className={showFullClasses}>
            {isFull ? <NavigationLess /> : <NavigationMore />}
          </IconButton>
        </div>
        <div className={styles.Content}>
          {
            elements.map((line, index) => (
              <ElementLine key={index /* eslint-disable-line react/no-array-index-key */} >
                {
                  line.map(el => (
                    <Element
                      update={Math.random()}
                      data={el}
                      collection={collection}
                      key={el.getPublicId()}
                      creationMode={creationMode}
                      isPublic={isPublic}
                    />
                  ))
                }
              </ElementLine>
            ))
          }
          {
            isFull &&
            !this.isAllShown &&
            (
              <div className={styles.ShowMore} >
                <IconButton
                  onClick={this.showMore}
                  className={styles.Button}
                >
                  <NavigationMoreHoriz />
                </IconButton>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  loadMore: loadFunction => dispatch(loadFunction()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Section)
