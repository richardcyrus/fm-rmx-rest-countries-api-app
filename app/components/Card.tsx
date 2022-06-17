import VisuallyHidden from '@reach/visually-hidden';
import { Link } from '@remix-run/react';

export type CountryCard = {
  alpha3Code: string;
  capital?: string;
  flag: string;
  name: string;
  population: string;
  region: string;
};

function Card(props: CountryCard) {
  return (
    <>
      <div className="card">
        <VisuallyHidden id={`country-card-${props.alpha3Code.toLowerCase()}`}>
          {props.name}
        </VisuallyHidden>
        <div className="card-image">
          <Link
            to={`/country/${props.alpha3Code}`}
            title={props.name}
            className="card-link"
          >
            <img src={props.flag} width={264} alt="" className="card-flag" />
          </Link>
        </div>
        <div className="card-body">
          <Link
            to={`/country/${props.alpha3Code}`}
            title={`${props.name} summary details`}
            className="card-link"
          >
            <h2 className="country-name">{props.name}</h2>
            <dl className="card-facts">
              <div className="card-fact-group">
                <dt className="card-fact-label">Population</dt>
                <dd className="card-fact-value">{props.population}</dd>
              </div>
              <div className="card-fact-group">
                <dt className="card-fact-label">Region</dt>
                <dd className="card-fact-value">{props.region}</dd>
              </div>
              {props.capital && props.capital.length > 0 ? (
                <div className="card-fact-group">
                  <dt className="card-fact-label">Capital</dt>
                  <dd className="card-fact-value">{props.capital}</dd>
                </div>
              ) : null}
            </dl>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Card;
