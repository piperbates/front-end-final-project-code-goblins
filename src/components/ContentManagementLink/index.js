import React from "react";
import { Link } from "react-router-dom";

export default function ContentManagementButton() {
  return (
    <Link to="/cms" style={{ color: "#000" }}>
      CMS
    </Link>
  );
}
