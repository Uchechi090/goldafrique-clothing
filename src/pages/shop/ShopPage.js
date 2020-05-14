import React from "react";
import { connect } from "react-redux";
// import { createStructuredSelector } from "reselect";
import { Route } from "react-router-dom";
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

// import { selectCollections } from "../../redux/shop/shopSelector";
// import CollectionPreview from "../../components/collection-preview/CollectionPreview";
import CollectionOverview from "../../components/collection-overview/CollectionOverview";
import CollectionPage from "../collection/CollectionPage";
import { updateCollections } from "../../redux/shop/shopActions";
import WithSpinner from "../../components/with-spinner/WithSpinner";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

//Changed again to a class component to enable fetching data from firebase
class ShopPage extends React.Component {
  state = {
    loading: true,
  };

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection("collections");

    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(
      async (snapshot) => {
        // console.log(snapshot);
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        //console.log(collectionsMap);
        updateCollections(collectionsMap);
        this.setState({ loading: false });
      }
    );
  }

  render() {
    const { match } = this.props;
    const {loading} = this.state

    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          //component={CollectionOverview} this was before using WithSpinner
          render={(props) => (
            <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          //component={CollectionPage}   same here
          render={props => (<CollectionPageWithSpinner isLoading={loading} {...props} />)}
        />
      </div>
    );
  }
}

//Changed to a functional component because SHOP_DATA was moved to redux store

// const ShopPage = ({ match }) => (
//   <div className="shop-page">
//     <Route exact path={`${match.path}`} component={CollectionOverview} />
//     <Route path={`${match.path}/:collectionId`} component={CollectionPage} />

//     {/* {collections.map(({ id, ...otherCollectionProps }) => (
//       <CollectionPreview key={id} {...otherCollectionProps} />
//     ))} */}
//   </div>
// );

//Initial state of the component
// const mapStateToProps = createStructuredSelector({
//   collections: selectCollections
// });

// export default connect(mapStateToProps)(ShopPage);

//These are commented out because they are no longer needed because the connections
//are now made in the child component(CollectionOverview)

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
