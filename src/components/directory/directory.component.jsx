import React from "react";
import "./directory.styles.scss";
import MenuItem from "../menu-item/menu-item.component";
import sections from "./directory.data";

export default class Directory extends React.Component {
  constructor() {
    super();
    this.state = { sections };
  }
  render() {
    return (
      <div className="directory-menu">
        {this.state.sections.map(({ id, ...sectionProps}) => (
          <MenuItem key={id}  {...sectionProps} />
        ))}
      </div>
    );
  }
}
