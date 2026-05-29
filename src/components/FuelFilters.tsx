import React, { ChangeEvent } from "react";

interface FuelFiltersProps {
  provinces: string[];
  cities: string[];
  selectedProvince: string;
  selectedCity: string;
  selectedFuel: string;
  onProvinceChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onFuelChange: (value: string) => void;
  resetPageToTop: () => void;
}

type FilterName = "province" | "city" | "fuel";

const FuelFilters = ({
  provinces,
  cities,
  selectedProvince,
  selectedCity,
  selectedFuel,
  onProvinceChange,
  onCityChange,
  onFuelChange,
  resetPageToTop,
}: FuelFiltersProps) => {
  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const name = event.target.name as FilterName;
    const value = event.target.value;
    const actions: Record<FilterName, () => void> = {
      province: () => onProvinceChange(value),
      city: () => onCityChange(value),
      fuel: () => onFuelChange(value),
    };
    const action = actions[name];
    if (action) {
      action();
      resetPageToTop();
    }
  };

  return (
    <div className="fuel-filters">
      <select
        name="province"
        value={selectedProvince}
        onChange={handleFilterChange}
      >
        <option value="">Provincia</option>
        {provinces.map((prov) => (
          <option key={prov} value={prov}>
            {prov}
          </option>
        ))}
      </select>

      <select name="city" value={selectedCity} onChange={handleFilterChange}>
        <option value="">Ciudad</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      <select name="fuel" value={selectedFuel} onChange={handleFilterChange}>
        <option value="">Tipo de combustible</option>
        <option value="Precio Gasoleo A">Gasóleo A</option>
        <option value="Precio Gasolina 95 E5">Gasolina 95 E5</option>
      </select>
    </div>
  );
};

export default FuelFilters;
