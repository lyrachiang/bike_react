// package
import React from "react";

// components
import Container, { MainFilter, MapResult } from "../../components/container";

const Lane = () => {
  return(
    <Container>
      <MainFilter>
        <div>
          <h2>想騎YouBike看風景～</h2>
        </div>
      </MainFilter>
      <MapResult>Result</MapResult>
    </Container>
  );
};

export default Lane;