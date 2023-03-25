import { getjwtToken } from "./setJwtToken";


export const fetchFromTaskPlannerApi = async (path, method = 'GET', data = null, headers = {
    'Content-Type': 'application/json'
  }) => {

    const URL = 'https://task-planner-backend-new.onrender.com/api/';
    // https://task-planner-backend-new.onrender.com
    const options = {
      method,
      headers: headers
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
  

export const fetchCurrentUserData = () => {

    return fetchFromTaskPlannerApi('users/profile', 'GET', null, {

        'Content-Type': 'application/json',
        'x-auth-token' : getjwtToken()
    });
}; 