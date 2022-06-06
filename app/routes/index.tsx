import type { FormEvent } from 'react';
import { useRef } from 'react';

import { SearchIcon } from '@heroicons/react/solid';
import { VisuallyHidden } from '@reach/visually-hidden';
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import {
  Form,
  useSubmit,
  useSearchParams,
  useLoaderData,
} from '@remix-run/react';

import Card from '~/components/Card';
import type { CountryCard } from '~/components/Card';
import { listAllCountries, searchCountryByName } from '~/model/rest-countries';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const countryName = url.searchParams.get('name');

  if (typeof countryName === 'string' && countryName.length > 0) {
    return json(await searchCountryByName(countryName));
  }

  return json(await listAllCountries());
};

export default function Index() {
  const [searchParams] = useSearchParams();
  const countryName = searchParams.get('name');

  const data = useLoaderData();

  const submit = useSubmit();
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  // Submit the search form after a period of time.
  function handleSearch(event: FormEvent<HTMLFormElement>) {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    const form = event.currentTarget;
    timerRef.current = setTimeout(() => submit(form, { replace: true }), 1000);
  }

  return (
    <>
      <main id="main-content">
        <div className="filter-bar">
          <Form method="get" onChange={handleSearch}>
            <label className="control-group">
              <SearchIcon className="search-icon" />
              <input
                type="text"
                id="search-country"
                className="search-input"
                name="name"
                placeholder="Search for a country..."
                defaultValue={countryName?.length ? countryName : ''}
              />
              <VisuallyHidden>Search for a country</VisuallyHidden>
            </label>
          </Form>
        </div>
        <div className="card-container">
          {data?.map((country: CountryCard) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <Card key={country.alpha3Code} {...country} />
          ))}
        </div>
      </main>
    </>
  );
}
