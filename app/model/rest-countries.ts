import slugify from '~/utils/slugify';

export type Languages = {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
};

export type Currencies = {
  code: string;
  name: string;
  symbol: string;
};

export type Country = {
  alpha2Code: string;
  alpha3Code: string;
  borders?: Array<BorderCountry>;
  capital?: string;
  currencies: Array<Currencies>;
  flag: string;
  languages: Array<Languages>;
  name: string;
  nativeName: string;
  population: number;
  region: string;
  subregion: string;
  topLevelDomain: Array<string>;
  independent: boolean;
};

export type BorderCountry = Pick<Country, 'alpha2Code' | 'alpha3Code' | 'name'>;

export type CountryForCards = Pick<
  Country,
  | 'alpha2Code'
  | 'alpha3Code'
  | 'capital'
  | 'flag'
  | 'name'
  | 'population'
  | 'region'
>;

async function listAllCountries() {
  const fields = [
    'alpha2Code',
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

  return data.map((country: CountryForCards) => ({
    ...country,
    flag: country.flag.includes('flagcdn')
      ? country.flag
      : `https://flagcdn.com/${country.alpha2Code.toLowerCase()}.svg`,
    population: formatPopulation(country.population),
  }));
}

async function searchCountryByName(name: string) {
  const fields = [
    'alpha2Code',
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

  return data.map((country: CountryForCards) => ({
    ...country,
    flag: country.flag.includes('flagcdn')
      ? country.flag
      : `https://flagcdn.com/${country.alpha2Code.toLowerCase()}.svg`,
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

  const data: Array<{ region: string; independent?: boolean }> =
    await res.json();

  const regionNames: Array<string> = [
    ...new Set(data.map((item) => item.region)),
  ];

  // This is returned so it can be programmatically selected. The list entry
  // is hidden with CSS based on the slug.
  const defaultFilter = {
    default: 'Filter by Region',
  };

  const regions = regionNames.reduce((accumulator, region) => {
    // We set the separator to a literal space, so it is encoded correctly when
    // submitted as part of the form.
    let slug = slugify(region, ' ');
    // @ts-ignore
    accumulator[slug] = region;
    return accumulator;
  }, {});

  return { ...defaultFilter, ...regions };
}

async function listCountriesInRegion(region: string) {
  const fields = [
    'alpha2Code',
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

  return data.map((country: CountryForCards) => ({
    ...country,
    flag: country.flag.includes('flagcdn')
      ? country.flag
      : `https://flagcdn.com/${country.alpha2Code.toLowerCase()}.svg`,
    population: formatPopulation(country.population),
  }));
}

async function getBorderCountryInfo(code: string) {
  const fields = ['alpha2Code', 'alpha3Code', 'name'];

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
    'alpha2Code',
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

  const country = await fetch(
    `https://restcountries.com/v2/alpha/${code}?${params}`
  ).then((res) => {
    if (!res?.ok) {
      throw new Response(
        `Sorry, an error occurred attempting to retrieve the details for country code: '${code}'.`,
        { status: res.status }
      );
    }
    return res.json();
  });

  const cBorders =
    country.borders && country.borders.length > 0 ? country.borders : [];

  let bc = [];
  for (let i = 0; i < cBorders.length; i++) {
    bc.push(
      await getBorderCountryInfo(cBorders[i]).then((b) => ({
        name: b.name,
        alpha2Code: b.alpha2Code,
        alpha3Code: b.alpha3Code,
      }))
    );
  }

  return {
    ...country,
    flag: country.flag.includes('flagcdn')
      ? country.flag
      : `https://flagcdn.com/${country.alpha2Code.toLowerCase()}.svg`,
    population: formatPopulation(country.population),
    topLevelDomain:
      country.topLevelDomain.length > 1
        ? country.topLevelDomain.join(', ')
        : country.topLevelDomain[0],
    languages:
      country.languages.length > 1
        ? country.languages
            .map((lang: Record<string, string>) => lang.name)
            .join(', ')
        : country.languages[0].name,
    currencies:
      country.currencies && country.currencies.length > 1
        ? country.currencies
            .map((money: Record<string, string>) => money.name)
            .join(', ')
        : country.currencies
        ? country.currencies[0].name
        : '',
    borders: bc,
  };
}

function formatPopulation(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'decimal' }).format(value);
}

export {
  getBorderCountryInfo,
  getCountryDetailByCode,
  getRegionList,
  listAllCountries,
  listCountriesInRegion,
  searchCountryByName,
};
