import { GET_LIST, GET_ONE } from '@/core/dataFetchActions';

const generalize = (type, res) => {
  switch (type) {
    case GET_LIST:
      return {
        data: res.items,
        total: res.total,
        lastPostId: res.lastId,
      };
    case GET_ONE: {
      const data = { ...res };
      const generalizedData = Object.keys(data).reduce((acc, key) => {
        if (key === 'image') {
          return {
            ...acc,
            [key]: {
              src: data[key],
            },
          };
        }
        return acc;
      }, {});
      return { data: { ...data, ...generalizedData } };
    }
    default:
      return { data: res };
  }
};

export default generalize;
