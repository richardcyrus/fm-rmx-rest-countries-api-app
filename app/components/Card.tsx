import { Link } from '@remix-run/react';

export type CountryCard = {
  alpha3Code: string;
  capital?: string;
  flag: string;
  name: string;
  population?: string;
  region?: string;
};

function Card(props: CountryCard) {
  return (
    <Link to={`/details/${props.alpha3Code}`} className="card-link">
      <div className="card">
        <div className="card-image">
          <img src={props.flag} alt="" className="card-flag" loading="lazy" />
        </div>
        <div className="card-body">
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
            <div className="card-fact-group">
              <dt className="card-fact-label">Capital</dt>
              <dd className="card-fact-value">{props.capital}</dd>
            </div>
          </dl>
        </div>
      </div>
    </Link>
  );
}

export default Card;
