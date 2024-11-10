import React from 'react';
import styles from './Filter.module.css';

export default function Filter({ filters, onFilterChange, uniqueSubregions }) {
  return (
    <div className={styles.filtersContainer}>
      <p className={styles.filtersTitle}>Filter & Sort</p>
      <div className={styles.filtersGrid}>
        <div className={styles.filterItem}>
          <input
            type="checkbox"
            id="alpha"
            checked={filters.sortAlpha}
            onChange={(e) => onFilterChange("sortAlpha", e.target.checked)}
            className={styles.filterCheckbox}
          />
          <label htmlFor="alpha">Alpha</label>
        </div>
        
        <div className={`${styles.filterItem} ${styles.top10}`}>
          <p className={styles.top10Title}>Top 10</p>
          <div className={styles.population}>
            <input
              type="checkbox"
              id="topTenPopulation"
              checked={filters.topTen.population}
              onChange={(e) => onFilterChange("topTenPopulation", e.target.checked)}
              className={styles.checkbox}
            />
            <label htmlFor="topTenPopulation">by population</label>
          </div>
          <div className={styles.area}>
            <input
              type="checkbox"
              id="topTenArea"
              checked={filters.topTen.area}
              onChange={(e) => onFilterChange("topTenArea", e.target.checked)}
              className={styles.checkbox}
            />
            <label htmlFor="topTenArea">by area</label>
          </div>
        </div>

        <div className={styles.filterItem}>
          <p className={styles.filterLabel}>By continent</p>
          <select
            value={filters.continent}
            onChange={(e) => onFilterChange("continent", e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All</option>
            <option value="africa">Africa</option>
            <option value="antarctica">Antarctica</option>
            <option value="asia">Asia</option>
            <option value="europe">Europe</option>
            <option value="north america">North America</option>
            <option value="oceania">Oceania</option>
            <option value="south america">South America</option>
          </select>
        </div>
        
        <div className={styles.filterItem}>
          <p className={styles.filterLabel}>By subregion</p>
          <select
            value={filters.subregion}
            onChange={(e) => onFilterChange("subregion", e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">Choose region</option>
            {uniqueSubregions.map(subregion => (
              <option key={subregion} value={subregion}>
                {subregion}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
