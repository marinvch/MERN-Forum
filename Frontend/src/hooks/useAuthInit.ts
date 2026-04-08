import { useEffect } from 'react';
import { useAppDispatch } from './useRedux';
import { loginSuccess } from '../features/auth/authSlice';
import { useValidateTokenMutation } from '../features/auth/authApi';

export const useAuthInit = () => {
  const dispatch = useAppDispatch();
  const [validateToken, { isLoading }] = useValidateTokenMutation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('[AUTH INIT] Checking for token in localStorage:', token ? 'found' : 'not found');
    
    if (token) {
      console.log('[AUTH INIT] Token found, validating...');
      validateToken()
        .unwrap()
        .then((result) => {
          console.log('[AUTH INIT] Token valid, user:', result.user?.username);
          dispatch(loginSuccess(result.user));
        })
        .catch((error) => {
          console.error('[AUTH INIT] Token validation failed:', error);
          // Token is invalid, remove it
          localStorage.removeItem('token');
        });
    } else {
      console.log('[AUTH INIT] No token in localStorage');
    }
  }, [dispatch, validateToken]);

  return { isLoading };
};

