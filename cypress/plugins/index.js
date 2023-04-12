import { cypressBrowserPermissionsPlugin } from 'cypress-browser-permissions';

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line import/no-anonymous-default-export
export default (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  config = cypressBrowserPermissionsPlugin(on, config);
  return config;
};
