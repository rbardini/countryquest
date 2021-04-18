import { countryCodeEmoji } from "country-code-emoji";
import styles from "../styles/CountryList.module.css";

export default function CountryList({ countriesData }) {
  return (
    <ul className={styles.list}>
      {countriesData.map(({ id, name }) => (
        <li key={id}>
          {countryCodeEmoji(id)} {name}
        </li>
      ))}
    </ul>
  );
}
