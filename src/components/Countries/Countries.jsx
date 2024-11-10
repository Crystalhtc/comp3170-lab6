import Country from '../Country/Country';
import styles from './Countries.module.css';

export default function Countries({ countries }) {
    return (
        <div className={styles.countries}>
            {countries.map((country) => (
                <div className={styles.country}>
                    <Country key={country.cca3} country={country} allCountries={countries}/>
                </div>
            ))}
        </div>
    );
}