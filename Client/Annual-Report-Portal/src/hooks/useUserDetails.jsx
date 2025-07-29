import { useState, useEffect } from 'react';
import { getUserDetails } from '../api/auth';

export const useUserDetails = () => {
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUserDetails();
      setUserDetails(user.data);
    };
    fetchData();
  }, []);

  return userDetails;
};
