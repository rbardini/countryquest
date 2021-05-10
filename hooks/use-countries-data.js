import geodata from "../data/geodata";

export default function useCountriesData(countries) {
  return geodata.features.reduce(
    (acc, { id, properties }) =>
      acc[+!countries.has(id)].push(properties) && acc,
    [[], []]
  );
}
