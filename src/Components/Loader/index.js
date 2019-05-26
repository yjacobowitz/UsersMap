import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./Loader.css";

export default ({ size = 100, thickness = 2 }) => (
  <div className="Loader">
    <CircularProgress size={size} thickness={thickness} />
  </div>
);
