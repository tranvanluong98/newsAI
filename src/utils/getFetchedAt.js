import pickBy from 'lodash/pickBy';

const defaultCacheDuration = 10 * 60 * 1000; // ten minutes

const getFetchedAt = (
  newRecordIds = [],
  oldRecordFetchedAt = {},
  now = new Date(),
  cacheDuration = defaultCacheDuration,
) => {
  // prepare new records and timestamp them
  const newFetchedAt = {};
  newRecordIds.forEach(recordId => {
    newFetchedAt[recordId] = now;
  });

  // remove outdated entry
  const latestValidDate = new Date();
  latestValidDate.setTime(latestValidDate.getTime() - cacheDuration);

  const stillValidFetchedAt = pickBy(
    oldRecordFetchedAt,
    date => date > latestValidDate,
  );

  return {
    ...stillValidFetchedAt,
    ...newFetchedAt,
  };
};

export default getFetchedAt;
