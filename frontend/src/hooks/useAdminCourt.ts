import { useState, useEffect } from 'react';
import api from '../services/axios';
import { CourtAdmin } from '../types/Club';

export const useAdminCourt = () => {
  const [courts, setCourts] = useState<CourtAdmin[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedClub, setSelectedClub] = useState<string>('');

  const fetchCourts = async (clubName: string, page: number = 0) => {
    if (!clubName) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(`/admin/courts`, {
        params: {
          clubName: clubName,
          page: page,
          size: 10
        }
      });
      
      setCourts(response.data.content);
      setTotalPages(response.data.totalPages);
      setTotalElements(response.data.totalElements);
      setCurrentPage(page);
    } catch (err: any) {
      setError(err.response?.data || 'Failed to fetch courts');
    } finally {
      setLoading(false);
    }
  };

  const createCourt = async (courtData: { name: string; clubName: string }) => {
    try {
      setLoading(true);
      setError(null);
      await api.post('/admin/courts', courtData);
      setSuccess('Court created successfully');
      fetchCourts(selectedClub, currentPage);
    } catch (err: any) {
      setError(err.response?.data || 'Failed to create court');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCourt = async (clubName: string, courtName: string, courtData: { name: string; clubName: string }) => {
    try {
      setLoading(true);
      setError(null);
      await api.put(`/admin/courts/${encodeURIComponent(clubName)}/${encodeURIComponent(courtName)}`, courtData);
      setSuccess('Court updated successfully');
      fetchCourts(selectedClub, currentPage);
    } catch (err: any) {
      setError(err.response?.data || 'Failed to update court');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteCourt = async (clubName: string, courtName: string) => {
    try {
      setLoading(true);
      setError(null);
      await api.delete(`/admin/courts/${encodeURIComponent(clubName)}/${encodeURIComponent(courtName)}`);
      setSuccess('Court deleted successfully');
      fetchCourts(selectedClub, currentPage);
    } catch (err: any) {
      setError(err.response?.data || 'Failed to delete court');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    fetchCourts(selectedClub, page);
  };

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  const setClub = (clubName: string) => {
    setSelectedClub(clubName);
    if (clubName) {
      fetchCourts(clubName, 0);
    } else {
      setCourts([]);
      setTotalPages(0);
      setTotalElements(0);
      setCurrentPage(0);
    }
  };

  useEffect(() => {
    if (selectedClub) {
      fetchCourts(selectedClub, currentPage);
    }
  }, [selectedClub]);

  return {
    courts,
    loading,
    currentPage,
    totalPages,
    totalElements,
    error,
    success,
    selectedClub,
    createCourt,
    updateCourt,
    deleteCourt,
    handlePageChange,
    clearMessages,
    setClub,
    setError
  };
};
