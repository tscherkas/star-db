import ItemList from "../item-list";
import { withData, withChildRenderFunction, withSwapiService } from "../hoc-helpers";

const renderNameBirthYear = (i) => `${ i.name }, (${ i.birthYear })`;
const renderNamePopulation = (i) => `${ i.name }, (${ i.population })`;
const renderNameManufacturer = (i) => `${ i.name }, (${ i.manufacturer })`;

const mapPeopleMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getAllPeople
  };
}

const mapPlanetsMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getAllPlanets
  };
}

const mapStarshipsMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getAllStarships
  };
}

const PeopleList = withSwapiService(mapPeopleMethodsToProps)(
  withData(
    withChildRenderFunction(renderNameBirthYear)(ItemList)));
const PlanetList = withSwapiService(mapPlanetsMethodsToProps)(
  withData(
    withChildRenderFunction(renderNamePopulation)(ItemList)));
const StarshipList = withSwapiService(mapStarshipsMethodsToProps)(
  withData(
    withChildRenderFunction(renderNameManufacturer)(ItemList)));

export {
  PeopleList,
  PlanetList,
  StarshipList
};
