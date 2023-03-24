export const fetchFromTaskPlannerApi = async (path, method = 'GET', data = null) => {

    const URL = 'http://localhost:5000/api/';
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    if (data) {
      options.body = JSON.stringify(data);
    }
  
    try {
      const response = await fetch(`${URL}${path}`, options);
      if (!response.ok) {
        const error = await response.json();
        throw error;
      }
      return response.json();
    } catch (error) {
      if (error.status === 400) {
        return error;
      }
      throw error;
    }
  };
  