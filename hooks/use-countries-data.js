import geodata from "../data/geodata";

const nameCompare = (a, b) => a.name.localeCompare(b.name);

export default function useCountriesData(countries) {
  const [
    excludedCountriesData,
    includedCountriesData,
  ] = geodata.features.reduce(
    (acc, { id, properties }) =>
      acc[+countries.has(id)].push(properties) && acc,
    [[], []]
  );

  excludedCountriesData.sort(nameCompare);
  includedCountriesData.sort(nameCompare);

  return [includedCountriesData, excludedCountriesData];
}
