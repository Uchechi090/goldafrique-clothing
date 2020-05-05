import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectDirectorySections } from "../../redux/directory/directorySelector";
import MenuItem from "../menu-item/MenuItem";
import "./directory.styles.scss";

//Changed to a functional component after state data was moved to redux store
const Directory = ({ sections }) => (
  <div className="directory-menu">
    {sections.map(({ id, ...otherSectionProps }) => (
      <MenuItem
        key={id}
        // title={title}     ;all the same as spreading below
        // imageUrl={imageUrl}
        // size={size}
        // linkUrl={linkUrl}
        {...otherSectionProps}
      />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
});

export default connect(mapStateToProps)(Directory);
