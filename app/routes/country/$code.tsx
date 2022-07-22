import { ArrowNarrowLeftIcon } from '@heroicons/react/outline';
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';

import { getCountryDetailByCode } from '~/model/rest-countries';
import type { BorderCountry } from '~/model/rest-countries';

type LoaderData = {
  alpha2Code: string;
  alpha3Code: string;
  borders?: Array<BorderCountry>;
  capital?: string;
  currencies?: string;
  flag: string;
  languages?: string;
  name: string;
  nativeName: string;
  population: number;
  region: string;
  subregion: string;
  topLevelDomain: string;
  independent: boolean;
};

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.code, 'Expected to receive the country code.');

  const data = await getCountryDetailByCode(params.code);

  return json<LoaderData>(data);
};

function CountryDetail() {
  const country = useLoaderData<LoaderData>();

  return (
    <>
      <main id="main-content" className="country-detail-content">
        <div className="nav-container">
          <Link to="/" className="button nav-button">
            <ArrowNarrowLeftIcon className="back-arrow-icon" />
            Back
          </Link>
        </div>
        <div className="detail-wrapper">
          <div id="flag-container" className="flag-container">
            <img src={country.flag} alt="" className="large-flag" width={560} />
          </div>
          <div className="country-data">
            <h2 className="country-name">{country.name}</h2>
            <div className="country-facts">
              <dl className="fact-group-left" id="fact-group-left">
                <div className="fact-group">
                  <dt className="fact-label">Native Name</dt>
                  <dd className="fact-value">{country.nativeName}</dd>
                </div>
                <div className="fact-group">
                  <dt className="fact-label">Population</dt>
                  <dd className="fact-value">{country.population}</dd>
                </div>
                <div className="fact-group">
                  <dt className="fact-label">Region</dt>
                  <dd className="fact-value">{country.region}</dd>
                </div>
                <div className="fact-group">
                  <dt className="fact-label">Sub Region</dt>
                  <dd className="fact-value">{country.subregion}</dd>
                </div>
                {country.capital && country.capital.length > 0 ? (
                  <div className="fact-group">
                    <dt className="fact-label">Capital</dt>
                    <dd className="fact-value">{country.capital}</dd>
                  </div>
                ) : null}
              </dl>
              <dl className="fact-group-right" id="fact-group-right">
                <div className="fact-group">
                  <dt className="fact-label">Top Level Domain</dt>
                  <dd className="fact-value">{country.topLevelDomain}</dd>
                </div>
                {country.currencies && country.currencies.length > 0 ? (
                  <div className="fact-group">
                    <dt className="fact-label">Currencies</dt>
                    <dd className="fact-value">{country.currencies}</dd>
                  </div>
                ) : null}
                <div className="fact-group">
                  <dt className="fact-label">Languages</dt>
                  <dd className="fact-value">{country.languages}</dd>
                </div>
              </dl>
            </div>
            {country.borders && country.borders.length > 0 ? (
              <div className="border-countries">
                <h3 className="border-countries-title">Border Countries:</h3>
                {country.borders.map((border) => {
                  return (
                    <Link
                      key={border.alpha2Code}
                      to={`/country/${border.alpha3Code}`}
                      className="button border-country-button"
                    >
                      {border.name}
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </main>
    </>
  );
}

export default CountryDetail;
