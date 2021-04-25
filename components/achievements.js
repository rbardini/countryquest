import achievements from "../data/achievements";

export default function Achievements({ countriesData }) {
  return (
    <div>
      <h1>Achievements</h1>
      {achievements.map(
        ({ description, formatValue, max, name, unit, value }) => (
          <p key={name}>
            <b>🏆 {name}</b>
            <br />
            {description}
            <br />
            <progress value={value(countriesData) / max}></progress>
            <br />
            <small>
              {formatValue(value(countriesData))}/{formatValue(max)} {unit}
            </small>
          </p>
        )
      )}
    </div>
  );
}
