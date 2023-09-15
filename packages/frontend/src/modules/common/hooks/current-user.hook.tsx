import { useQuery } from 'react-query';
import userService from '../../../service/user.service';
import { APP_KEYS } from '../consts';

const useCurrentUser = () => {
  const jwt = localStorage.getItem('token');
  const { data, isLoading } = useQuery(
    APP_KEYS.QUERY_KEYS.ME,
    userService.getMe.bind(userService),
    {
      enabled: !!jwt
    }
  );
  if (!jwt) {
    return { user: undefined, isLoading: false };
  }
  return {
    user: data,
    isLoading
  };
};

export default useCurrentUser;
