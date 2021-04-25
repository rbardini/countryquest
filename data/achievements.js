import area from "./area";
import continents from "./continents";
import geodata from "./geodata";

const countryCount = geodata.features.length;
const continentCount = Object.keys(continents).length;

const achievements = [
  {
    name: "Travelling Salesman",
    description: `Visit all countries`,
    min: 0,
    max: countryCount,
    value: (data) => data.length,
    formatValue: (value) => value,
  },
  {
    name: "Seven Worlds",
    description: `Visit all continents`,
    min: 0,
    max: continentCount,
    value: (data) => new Set(data.map(({ continentId }) => continentId)).size,
    formatValue: (value) => value,
  },
  {
    name: "Land Surveyor",
    description: "Visit world's entire land surface",
    min: 0,
    max: area,
    value: (data) => data.reduce((acc, { area }) => acc + area, 0),
    formatValue: (value) =>
      (value / 1000 ** 2).toLocaleString("en", {
        notation: "compact",
      }),
    unit: "km²",
  },
  {
    name: "Ice Wall",
    description: `Visit Antarctica`,
    min: 0,
    max: 1,
    value: (data) => +data.some(({ continentId }) => continentId === "AN"),
    formatValue: (value) => value,
  },
];

export default achievements;
