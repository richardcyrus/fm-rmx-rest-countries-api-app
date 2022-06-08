import slugify from '~/utils/slugify';

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

  if (!res?.ok) {
    throw new Response(
      'Sorry but an error occurred when attempting to get all of the countries.',
      { status: res.status }
    );
  }

  const data = await res.json();

  return data.map((country: any) => ({
    ...country,
    population: formatPopulation(country.population),
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

  if (!res?.ok) {
    throw new Response(
      `Sorry but an error occurred looking for country names containing: '${name}'.`,
      { status: res.status }
    );
  }

  const data = await res.json();

  return data.map((country: any) => ({
    ...country,
    population: formatPopulation(country.population),
  }));
}

async function getRegionList() {
  const fields = ['region'];
  const params = new URLSearchParams({ fields: fields.join(',') }).toString();

  const res = await fetch(`https://restcountries.com/v2/all?${params}`);

  if (!res?.ok) {
    throw new Response(
      'Sorry but an error occurred when getting the list of regions.',
      { status: res.status }
    );
  }

  const data: Array<{ region: string; independent: boolean }> =
    await res.json();

  const regionNames: Array<string> = [
    ...new Set(data.map((item) => item.region)),
  ];

  // This is returned so it can be programmatically selected. The list entry
  // is hidden with CSS based on the slug.
  const defaultFilter = {
    default: 'Filter by Region',
  };

  const regions = regionNames.reduce((result, region) => {
    // We set the separator to a literal space, so it is encoded correctly when
    // submitted as part of the form.
    let slug = slugify(region, ' ');
    // @ts-ignore
    result[slug] = region;
    return result;
  }, {});

  return { ...defaultFilter, ...regions };
}

async function listCountriesInRegion(region: string) {
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
    `https://restcountries.com/v2/region/${region}?${params}`
  );

  if (!res?.ok) {
    throw new Response(
      `Sorry but an error occurred looking for countries in the region: '${region}'.`,
      { status: res.status }
    );
  }

  const data = await res.json();

  return data.map((country: any) => ({
    ...country,
    population: formatPopulation(country.population),
  }));
}

export {
  getRegionList,
  listAllCountries,
  listCountriesInRegion,
  searchCountryByName,
};
