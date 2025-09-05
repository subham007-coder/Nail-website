import { useAuth } from '../context/AuthContext';
import { apiRequest } from '../utils/api';

export const useAuthenticatedApi = () => {
  const { isAuthenticated, getAuthHeaders } = useAuth();

  const authenticatedRequest = async (path, options = {}) => {
    if (!isAuthenticated) {
      throw new Error('User not authenticated');
    }

    const headers = { ...getAuthHeaders(), ...(options.headers || {}) };
    return apiRequest(path, { ...options, headers });
  };

  return { authenticatedRequest, isAuthenticated };
};
