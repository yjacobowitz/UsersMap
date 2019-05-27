import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import "./Error.css";

export default ({ message }) => (
  <div className="Error">
    <CloseIcon className="CloseIcon" />
    {message}
  </div>
);
