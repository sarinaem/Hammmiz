import axios from 'axios';

const API_BASE_URL = 'https://20d2-213-145-66-196.ngrok-free.app/main/';

export const getLocations = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}hammmiz_locations/`);
    console.log(response.data);
    // return response.data;

    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Error fetching locations:', error);
    return [];
  }
};

export const checkLocation = async (hammizName) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}check_hammiz/${hammizName}/`
    );
    return response.data;
  } catch (error) {
    console.error('Error checking location:', error);
    return null;
  }
};
