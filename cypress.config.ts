import { defineConfig } from 'cypress';
import got from 'got';

export default defineConfig({
  e2e: {
    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ) {
      // `on` is used to hook into various events Cypress emits
      // `config` is the resolved Cypress config
      // implement node event listeners here
      let isDev = config.watchForFileChanges;
      let port = process.env.PORT ?? (isDev ? '3000' : '8811');
      let configOverrides: Partial<Cypress.PluginConfigOptions> = {
        baseUrl: `http://localhost:${port}`,
        video: !process.env.CI,
        screenshotOnRunFailure: !process.env.CI,
      };
      Object.assign(config, configOverrides);

      // @ts-ignore
      const data = await got('https://restcountries.com/v2/all').json();

      const regions = [
        // @ts-ignore
        ...new Set(data.map((country) => country.region)),
      ].sort();

      // @ts-ignore
      const countByRegion = data.reduce((acc, country) => {
        acc[country.region] = acc[country.region] ? acc[country.region] + 1 : 1;
        return acc;
      }, {});

      // @ts-ignore
      const countryCodes = data.reduce((acc, country) => {
        let entry = {};

        ['alpha2Code', 'alpha3Code', 'name', 'borders'].forEach(
          // @ts-ignore
          (f) => (entry[f] = country[f])
        );

        acc.push(entry);

        return acc;
      }, []);

      config.env.countries = data;
      config.env.regions = regions;
      config.env.countByRegion = countByRegion;
      config.env.countryCodes = countryCodes;

      return config;
    },
  },
});
