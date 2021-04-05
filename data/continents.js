import geodata from "./geodata";

const continents = geodata.features.reduce(
  (acc, { properties: { continentId: id, continentName: name } }) =>
    (acc[id] = { id, name }) && acc,
  {}
);

export default continents;
