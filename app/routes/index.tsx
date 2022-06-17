import type { FormEvent } from 'react';
import { useRef } from 'react';

import { SearchIcon } from '@heroicons/react/solid';
import VisuallyHidden from '@reach/visually-hidden';
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import {
  Form,
  useCatch,
  useLoaderData,
  useSearchParams,
  useSubmit,
} from '@remix-run/react';

import Card from '~/components/Card';
import type { CountryCard } from '~/components/Card';
import FilterListBox from '~/components/FilterListBox';
import {
  getRegionList,
  listAllCountries,
  listCountriesInRegion,
  searchCountryByName,
} from '~/model/rest-countries';

type LoaderData = {
  regions: Record<string, string>;
  countries: Awaited<
    ReturnType<
      | typeof listCountriesInRegion
      | typeof searchCountryByName
      | typeof listAllCountries
    >
  >;
  selectedRegion: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const countryName = url.searchParams.get('name');
  let selectedRegion = url.searchParams.get('region');

  if (!selectedRegion) {
    selectedRegion = 'default';
  }

  const regions: Record<string, string> = await getRegionList();

  if (selectedRegion && selectedRegion !== 'default') {
    const countries = await listCountriesInRegion(selectedRegion);
    return json<LoaderData>({ regions, countries, selectedRegion });
  }

  if (typeof countryName === 'string' && countryName.length > 0) {
    const countries = await searchCountryByName(countryName);
    return json<LoaderData>({ regions, countries, selectedRegion });
  }

  const countries = await listAllCountries();
  return json<LoaderData>({ regions, countries, selectedRegion });
};

export default function Index() {
  const [searchParams] = useSearchParams();
  const countryName = searchParams.get('name');

  const data = useLoaderData<LoaderData>();

  const submit = useSubmit();
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  // Submit the search input after a period of time (debounced submit).
  function handleSearch(event: FormEvent<HTMLFormElement>) {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    const form = event.currentTarget;
    timerRef.current = setTimeout(() => submit(form, { replace: true }), 1000);
  }

  const onFilterChange = (value: string) => {
    submit({ region: value }, { method: 'get', replace: true });
  };

  return (
    <>
      <main id="main-content" className="main-content" role="main">
        <div className="filter-bar">
          <Form className="country-search" method="get" onChange={handleSearch}>
            <label className="control-group">
              <VisuallyHidden>Search for a country</VisuallyHidden>
              <SearchIcon className="search-icon" />
              <input
                type="text"
                id="search-country"
                className="search-input"
                name="name"
                placeholder="Search for a country..."
                defaultValue={countryName?.length ? countryName : ''}
              />
            </label>
          </Form>
          <Form className="region-filter" method="get">
            <FilterListBox
              regions={data.regions}
              selectedRegion={data.selectedRegion}
              onFilterChange={onFilterChange}
            />
          </Form>
        </div>
        <div className="card-container">
          {data.countries.map((country: CountryCard) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <Card key={country.alpha3Code} {...country} />
          ))}
        </div>
      </main>
    </>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <main id="main-content" className="catch-boundary" role="main">
      <div className="not-found">
        <div className="not-found-image"></div>
        <div className="not-found-message">
          <h2>{caught.status}</h2>
          <h3>Oops! Something went wrong.</h3>
          <p>{caught.data}</p>
        </div>
      </div>
    </main>
  );
}
