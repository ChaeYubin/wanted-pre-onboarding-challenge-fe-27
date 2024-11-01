import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '@/utils/localStorage';

const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (storage.get('token')) {
      navigate('/');
    }
  }, [navigate]);
};

export default useAuth;
