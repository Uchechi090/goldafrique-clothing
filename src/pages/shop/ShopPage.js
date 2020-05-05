import React from "react";
// import { connect } from "react-redux";
// import { createStructuredSelector } from "reselect";
import { Route } from "react-router-dom";

// import { selectCollections } from "../../redux/shop/shopSelector";
// import CollectionPreview from "../../components/collection-preview/CollectionPreview";
import CollectionOverview from "../../components/collection-overview/CollectionOverview";
import CollectionPage from "../collection/CollectionPage"

//Changed to a functional component because SHOP_DATA was moved to redux store

const ShopPage = ({ match }) => (
  <div className="shop-page">
    <Route exact path={`${match.path}`} component={CollectionOverview} />
    <Route path={`${match.path}/:collectionId`} component={CollectionPage} />

    {/* {collections.map(({ id, ...otherCollectionProps }) => (
      <CollectionPreview key={id} {...otherCollectionProps} />
    ))} */}
  </div>
);

// const mapStateToProps = createStructuredSelector({
//   collections: selectCollections
// });

// export default connect(mapStateToProps)(ShopPage);

//These are commented out because they are no longer needed because the connections
//are now made in the child component(CollectionOverview)

export default ShopPage;
