import geodata from "./geodata";

const area = geodata.features.reduce(
  (acc, { properties: { area } }) => acc + area,
  0
);

export default area;
