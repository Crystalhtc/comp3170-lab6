import styles from './Country.module.css';

export default function Country({ country, allCountries }) {
    // Extract and format languages
    const languages = Object.values(country.languages || {}).join(', ');
    
    // Extract and format currencies
    const currencies = Object.values(country.currencies || {})
        .map(currency => `${currency.name} (${currency.symbol})`)
        .join(', ');

    // Convert border codes to full country names
    const getBorderCountryNames = () => {
        if (!country.borders || !allCountries) return '';
        
        return country.borders
            .map(borderCode => {
                const borderCountry = allCountries.find(
                    c => c.cca3 === borderCode
                );
                return borderCountry?.name?.common;
            })
            .filter(Boolean) // Remove any undefined values
            .sort((a, b) => a.localeCompare(b)) // Sort alphabetically
            .join(', ');
    };

    return (
        <div className={styles.country}>
            <div className={styles.title}>
                <img 
                    src={country.flags.svg} 
                    alt={`Flag of ${country.name.common}`}
                    className={styles.countryFlag}
                />
                <p className={styles.countryName}>{country.name.common}</p>
            </div>
            
            <div className={styles.countryDetails}>
                <p>
                    <span className={styles.detailLabel}>Official Name:</span> 
                    <span className={styles.detail}>{country.name.official}</span>
                </p>
                <p>
                    <span className={styles.detailLabel}>Capital:</span> 
                    <span className={styles.detail}>{country.capital?.[0] || ''}</span>
                </p>
                <p>
                    <span className={styles.detailLabel}>Population:</span> 
                    <span className={styles.detail}>{country.population.toLocaleString()}</span>
                </p>
                <p>
                    <span className={styles.detailLabel}>Languages:</span> 
                    <span className={styles.detail}>{languages || ''}</span>
                </p>
                <p>
                    <span className={styles.detailLabel}>Currency:</span> 
                    <span className={styles.detail}>{currencies || ''}</span>
                </p>
                <p>
                    <span className={styles.detailLabel}>Area (mi²):</span> 
                    <span className={styles.detail}>{country.area.toLocaleString()}</span>
                </p>
                <p>
                    <span className={styles.detailLabel}>Subregion:</span> 
                    <span className={styles.detail}>{country.subregion || ''}</span>
                </p>
                <p>
                    <span className={styles.detailLabel}>Continent:</span> 
                    <span className={styles.detail}>{country.continents.join(', ')}</span>
                </p>
                {country.borders && country.borders.length > 0 && (
                    <p>
                        <span className={styles.detailLabel}>Borders:</span> 
                        <span className={styles.detail}>{getBorderCountryNames()}</span>
                    </p>
                )}
                <a 
                    href={country.maps.googleMaps} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.mapLink}
                >
                    Show on Google Maps
                </a>
            </div>
        </div>
    );
}