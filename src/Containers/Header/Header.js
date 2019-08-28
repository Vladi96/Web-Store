import React from "react";
import Nav from "../../Components/Nav/Nav";
import Hoc from "../../Hoc/Hoc";

const header = props => {
  return (
    <Hoc>
      <header>
        <Nav />
      </header>
    </Hoc>
  );
};

export default header;
