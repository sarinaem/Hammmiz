export const environment = import.meta.env.VITE_ENVIRONMENT;

export const baseUrl =
  environment === 'develop'
    ? 'https://20d2-213-145-66-196.ngrok-free.app/main'
    : '';

export const getLocation = `${baseUrl}/hammmiz_locations/`;
