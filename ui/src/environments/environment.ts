/**
 * Represents the configuration for the application's environment settings.
 *
 * @property {string} apiUrl - The base URL of the API used for network requests.
 * Is initially empty and will be filled on application start by environment variable "API_URL", which must exist
 */
export const environment = {
    production: true,
    apiUrl: '' // Is not used for productive environment, see nginx config
};
