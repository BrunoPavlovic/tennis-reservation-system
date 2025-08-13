import { useState, useEffect } from 'react';
import api from '../services/axios';
import { User } from '../types/User';

interface PaginatedResponse {
  content: User[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

export const useAdminUser = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchUsers = async (page: number) => {
    try {
      setLoading(true);
      const response = await api.get(`/admin/users?page=${page}&size=10`);
      const data: PaginatedResponse = response.data;
      
      setUsers(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
    } catch (err: any) {
      setError(err.response?.data || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const deactivateUser = async (userId: number) => {
    try {
      await api.put(`/admin/users/${userId}/deactivate`);
      setSuccess('User deactivated successfully');
      fetchUsers(currentPage);
    } catch (err: any) {
      setError(err.response?.data || 'Failed to deactivate user');
      throw err;
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  return {
    users,
    loading,
    currentPage,
    totalPages,
    totalElements,
    error,
    success,
    
    fetchUsers,
    deactivateUser,
    handlePageChange,
    clearMessages
  };
};
