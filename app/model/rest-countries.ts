// Todo: Make thiss work with node.js
function formatPopulation(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'decimal' }).format(value);
}

async function listAllCountries() {
  const fields = [
    'alpha3Code',
    'capital',
    'flag',
    'name',
    'population',
    'region',
  ];

  const params = new URLSearchParams({ fields: fields.join(',') }).toString();

  const res = await fetch(`https://restcountries.com/v2/all?${params}`);

  const data = await res.json();

  return data.map((country: any) => ({
    population: formatPopulation(country.poulation),
    ...country,
  }));
}

async function searchCountryByName(name: string) {
  const fields = [
    'alpha3Code',
    'capital',
    'flag',
    'name',
    'population',
    'region',
  ];

  const params = new URLSearchParams({ fields: fields.join(',') }).toString();

  const res = await fetch(
    `https://restcountries.com/v2/name/${name}?${params}`
  );

  const data = await res.json();

  return data.map((country: any) => ({
    population: formatPopulation(country.poulation),
    ...country,
  }));
}

export { listAllCountries, searchCountryByName };
