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

const PeopleList = withSwapiService(
  withData(withChildRenderFunction(ItemList, renderNameBirthYear)),
  mapPeopleMethodsToProps);
const PlanetList = withSwapiService(
  withData(withChildRenderFunction(ItemList, renderNamePopulation)),
  mapPlanetsMethodsToProps);
const StarshipList = withSwapiService(
  withData(withChildRenderFunction(ItemList, renderNameManufacturer)),
  mapStarshipsMethodsToProps);

export {
  PeopleList,
  PlanetList,
  StarshipList
};
