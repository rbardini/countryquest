import area from "../data/area";
import continents from "../data/continents";
import geodata from "../data/geodata";

export default function Stats({ countriesData }) {
  const visitedContinents = new Set(
    countriesData.map(({ continentId }) => continentId)
  );

  const visitedArea = countriesData.reduce((acc, { area }) => acc + area, 0);

  return (
    <div>
      <h1>Stats</h1>
      <p>
        <b>
          {countriesData.length} out of {geodata.features.length} countries
          visited.
        </b>{" "}
        That's{" "}
        {(countriesData.length / geodata.features.length).toLocaleString("en", {
          style: "percent",
          maximumFractionDigits: 2,
        })}{" "}
        of all territories!
      </p>
      <p>
        <b>
          {visitedContinents.size} out of {Object.keys(continents).length}{" "}
          continents visited.
        </b>{" "}
        {new Intl.ListFormat("en", {
          style: "long",
          type: "conjunction",
        }).format(
          Object.values(continents)
            .filter(({ id }) => !visitedContinents.has(id))
            .map(({ name }) => name)
            .sort()
        )}{" "}
        to go!
      </p>
      <p>
        <b>
          {(visitedArea / 1000 ** 2).toLocaleString("en", {
            style: "unit",
            unit: "kilometer",
            notation: "compact",
            compactDisplay: "long",
          })}
          ² visited.
        </b>{" "}
        Roughly{" "}
        {(visitedArea / area).toLocaleString("en", {
          style: "percent",
          maximumFractionDigits: 2,
        })}{" "}
        of the world's land area!
      </p>
    </div>
  );
}
