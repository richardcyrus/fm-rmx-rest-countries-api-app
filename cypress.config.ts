import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(
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

      return config;
    },
  },
});
