import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import ImageEdit from 'material-ui/svg-icons/image/edit'

import Poster from '../../element/Poster'

import styles from './CollectionCover.scss'


const CollectionCover = ({
  covers,
  onClick,
  onItemClick,
  creationMode,
  ratio,
}) => {
  const completeCover = [
    ...covers,
    ...Array.from({ length: 3 - covers.length }, () => null),
  ]

  const coverClasses = cx({
    [styles.CollectionCover]: true,
    [styles.CollectionCoverHoverable]: !onItemClick,
  })

  return (
    <div
      className={coverClasses}
      onClick={onClick}
      data-ratio={ratio}
      role="button"
      tabIndex={0}
    >
      {
        completeCover.map((el, index) => (
          <div
            className={styles.Cover}
            data-place={index}
            key={index /* eslint-disable-line react/no-array-index-key */}
          >
            {
              el ?
                <Poster
                  path={el.getPosterPath()}
                  title=""
                  ratio={ratio}
                /> :
                <div className={styles.FakePoster}>
                  { creationMode ? '+' : '?' }
                </div>
            }
            {
              onItemClick &&
              <div
                role="button"
                tabIndex={0}
                className={styles.Overlay}
                onClick={() => onItemClick(index)}
              >
                <ImageEdit />
              </div>
            }
          </div>
        ))
      }
    </div>
  )
}

CollectionCover.defaultProps = {
  covers: [],
  ratio: 0.5,
}

CollectionCover.propTypes = {
  covers: PropTypes.array,
  creationMode: PropTypes.bool,
  onClick: PropTypes.func,
  onItemClick: PropTypes.func,
  ratio: PropTypes.number,
}

export default CollectionCover
