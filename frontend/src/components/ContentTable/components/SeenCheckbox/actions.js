import { updateMovie } from '../../../../scenes/Movies/actions'

export const update = (data, type) => {
  const clearedData = {
      seen: !data.seen
  };
  switch(type){
    case 'movies':
      return updateMovie(data.pk, clearedData);
    default:
      return null;
  }
};