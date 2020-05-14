import { createSelector } from "reselect";

//This is used for matching Route IDs to their string names
// const COLLECTION_ID_MAP = {
//   hats: 1,
//   sneakers: 2,
//   jackets: 3,
//   womens: 4,
//   mens: 5
// };

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

// export const selectCollectionsForPreview = createSelector(
//   [selectCollections],
//   collections => Object.keys(collections).map(key => collections[key])
// );

//this is this way because data comes from firestore now and there can
//be no null values
export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections =>
    collections ? Object.keys(collections).map((key) => collections[key]) : []
);

//NOTE: using the array method - find() is not efficient for large data because
//we would have to do an iteration on every array element, hence put the data
//into an object(instead of array - making it a hash table and giving them keys - UIDs); this is called
//Data Normalization. Hence we do not need the COLLECTION_ID_MAP object above
//i.e. Storing lists of elements as objects instead of arrays

// export const selectCollection = (collectionUrlParam) =>
//   createSelector(
//     [selectCollections],
//     (collections) => collections[collectionUrlParam]
//     // collections.find(
//     //   collection => collection.id === COLLECTION_ID_MAP[collectionUrlParam]
//     // )
//   );

export const selectCollection = (collectionUrlParam) =>
  createSelector(
    [selectCollections],
    (collections) => (collections ? collections[collectionUrlParam] : null)
  );
