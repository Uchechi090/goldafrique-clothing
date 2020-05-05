import React from "react";
import { connect } from "react-redux";

import { selectCollection } from "../../redux/shop/shopSelector";
import CollectionItem from "../../components/collection-item/CollectionItem";
import "./collection.styles.scss";

const CollectionPage = ({collection}) => {
  // console.log(match.params.collectionId)
  // console.log(collection)
  const {title, items} = collection
  return (
  <div className="collection-page">
    <h2 className="title">{title}</h2>
    <div className="items">
      {items.map(item => <CollectionItem key={item.id} item={item} />)}
    </div>
  </div>
);}

//ownProps is another parameter for mapStateToProps; it refers to the local
//props for this component that is not comming from the reducer state
const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(CollectionPage);
