import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import CollectionContent from 'scenes/Collection';
import CollectionSettings from 'scenes/CollectionSettings';
import ElementSuggestions from 'scenes/ElementSuggestions';
import Header from 'components/appStructure/Header';
import { collectionTypes } from 'appConfig';


const getSceneProps = (el, scene, sceneProps) => {
  const props = {
    ...sceneProps,
    scene,
    config: el,
    type: el.name,
    collection: {
      pk: sceneProps.match.params.collection_id,
    },
  };
  return props;
};

const generate = () => {
  const a = collectionTypes.reduce((result, scene) => {
    return [
      ...result,
      <Route
        path={`/collections/${scene.name}/:collection_id/suggestions/:element_id/`}
        key={scene.name}
        render={props => (
          <Scene {...getSceneProps(scene, 'suggestions', props)} Component={ElementSuggestions} />
        )}
      />,
      <Route
        path={`/collections/${scene.name}/:collection_id/settings/`}
        key={scene.name}
        render={props => (
          <Scene {...getSceneProps(scene, 'settings', props)} Component={CollectionSettings} />
        )}
      />,
      <Route
        path={`/collections/${scene.name}/:collection_id/public/`}
        key={scene.name}
        render={props => (
          <Scene {...getSceneProps(scene, 'content', props)} Component={CollectionContent} isPublic={true} />
        )}
      />,
      <Route
        path={`/collections/${scene.name}/:collection_id/`}
        key={scene.name}
        render={props => (
          <Scene {...getSceneProps(scene, 'content', props)} Component={CollectionContent} isPublic={false} />
        )}
      />,
    ]
  }, []);
  return a;
};

const Collection = () => (
  <Switch>
    {generate()}
  </Switch>
);

const Scene = ({ SceneComponent, ...props }) => (
  <Fragment>
    <Header key={1} {...props} />
    <SceneComponent key={2} {...props} />
  </Fragment>
);

Scene.propTypes = {
  SceneComponent: PropTypes.object,
};

export default Collection;