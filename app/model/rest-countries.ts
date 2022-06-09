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

async function getBorderCountryInfo(code: string) {
  const fields = ['alpha3Code', 'name'];

  const params = new URLSearchParams({ fields: fields.join(',') }).toString();

  const res = await fetch(
    `https://restcountries.com/v2/alpha/${code}?${params}`
  );

  if (!res?.ok) {
    throw new Response(
      `Sorry, an error occurred attempting to retrieve basic information for border country code: '${code}'.`,
      { status: res.status }
    );
  }

  return res.json();
}

async function getCountryDetailByCode(code: string) {
  const fields = [
    'alpha3Code',
    'borders',
    'capital',
    'currencies',
    'flag',
    'languages',
    'name',
    'nativeName',
    'population',
    'region',
    'subregion',
    'topLevelDomain',
  ];

  const params = new URLSearchParams({ fields: fields.join(',') }).toString();

  const res = await fetch(
    `https://restcountries.com/v2/alpha/${code}?${params}`
  );

  if (!res?.ok) {
    throw new Response(
      `Sorry, an error occurred attempting to retrieve the details for country code: '${code}'.`,
      { status: res.status }
    );
  }

  const data = await res.json();

  return {
    ...data,
    population: formatPopulation(data.population),
    topLevelDomain:
      data.topLevelDomain.length > 1
        ? data.topLevelDomain.join(', ')
        : data.topLevelDomain[0],
    languages:
      data.languages.length > 1
        ? data.languages
            .map((lang: Record<string, string>) => lang.name)
            .join(', ')
        : data.languages[0].name,
    currencies:
      data.currencies.length > 1
        ? data.currencies
            .map((money: Record<string, string>) => money.name)
            .join(', ')
        : data.currencies[0].name,
  };
}

export {
  getBorderCountryInfo,
  getCountryDetailByCode,
  getRegionList,
  listAllCountries,
  listCountriesInRegion,
  searchCountryByName,
};
