import React from "react";
import ItemDetails, { Record } from "../item-details";
import { withSwapiService } from "../hoc-helpers";

const StarshipDetails =(props) => {
  return (
    <ItemDetails { ...props }>
      <Record field="manufacturer" label="Manufactorer" />
      <Record field="model" label="Model" />
      <Record field="costInCredits" label="Costs" />
      <Record field="passengers" label="Passengers" />
      <Record field="lenght" label="Length" />
    </ItemDetails>
  );
};

const mapStarhipMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getStarship,
    getImageUrl: swapiService.getStarshipImage
  };
}

export default withSwapiService(StarshipDetails, mapStarhipMethodsToProps);
