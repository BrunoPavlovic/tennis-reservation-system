import { useState, useEffect } from 'react';
import api from '../services/axios';
import { ClubAdmin } from '../types/Club';

interface PaginatedResponse {
  content: ClubAdmin[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

interface ClubFormData {
  name: string;
  creditPrice: string;
}

export const useAdminClub = () => {
  const [clubs, setClubs] = useState<ClubAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchClubs = async (page: number) => {
    try {
      setLoading(true);
      const response = await api.get(`/admin/clubs?page=${page}&size=10`);
      const data: PaginatedResponse = response.data;
      
      setClubs(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
    } catch (err: any) {
      setError(err.response?.data || 'Failed to load clubs');
    } finally {
      setLoading(false);
    }
  };

  const createClub = async (clubData: { name: string; creditPrice: number }) => {
    try {
      await api.post('/admin/clubs', clubData);
      setSuccess('Club created successfully');
      fetchClubs(currentPage);
    } catch (err: any) {
      setError(err.response?.data || 'Failed to create club');
      throw err;
    }
  };

  const updateClub = async (clubId: number, clubData: { name: string; creditPrice: number }) => {
    try {
      await api.put(`/admin/clubs/${clubId}`, clubData);
      setSuccess('Club updated successfully');
      fetchClubs(currentPage);
    } catch (err: any) {
      setError(err.response?.data || 'Failed to update club');
      throw err;
    }
  };

  const deleteClub = async (clubId: number) => {
    try {
      await api.delete(`/admin/clubs/${clubId}`);
      setSuccess('Club deleted successfully');
      fetchClubs(currentPage);
    } catch (err: any) {
      setError(err.response?.data || 'Failed to delete club');
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
    fetchClubs(currentPage);
  }, [currentPage]);

  return {
    clubs,
    loading,
    currentPage,
    totalPages,
    totalElements,
    error,
    success,
    
    fetchClubs,
    createClub,
    updateClub,
    deleteClub,
    handlePageChange,
    clearMessages
  };
};
