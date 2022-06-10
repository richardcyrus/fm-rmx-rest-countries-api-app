const { rest } = require('msw');

const countries = require('./data/all-v2.json');

const endpoint = 'https://restcountries.com/v2';

const handlers = [
  /* listAllCountries(), getRegionList() */
  rest.get(`${endpoint}/all`, (req, res, ctx) => {
    // const fields = req.url.searchParams.get('fields');
    return res(ctx.status(200), ctx.json(countries));
  }),

  /* searchCountryByName(name) */
  rest.get(`${endpoint}/name/:name`, (req, res, ctx) => {
    const { name: pname } = req.params;
    // const fields = req.url.searchParams.get('fields');

    let results = countries.filter((item) =>
      item.name.toLowerCase().includes(pname)
    );

    return res(ctx.status(200), ctx.json(results));
  }),

  /* listCountriesInRegion(region) */
  rest.get(`${endpoint}/region/:region`, (req, res, ctx) => {
    const { region } = req.params;
    // const fields = req.url.searchParams.get('fields');

    let results = countries.filter((item) =>
      item.region.toLowerCase().includes(region)
    );

    return res(ctx.status(200), ctx.json(results));
  }),

  /* getBorderCountryInfo(code), getCountryDetailByCode(code) */
  rest.get(`${endpoint}/alpha/:code`, (req, res, ctx) => {
    const { code } = req.params;
    // const fields = req.url.searchParams.get('fields');

    let result = countries.find((item) => item.alpha3Code === code);

    return res(ctx.status(200), ctx.json(result));
  }),
];

module.exports = handlers;
