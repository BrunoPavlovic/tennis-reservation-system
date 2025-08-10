import { useState, useEffect } from 'react';
import api from '../services/axios';
import { User } from '../types/User';

export const useCredit = () => {
    const [credit, setCredit] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchCredit = async (): Promise<void> => {
        try {
            setIsLoading(true);
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await api.get('/users/me');
            const creditAmount = response.data.credit || 0;
            setCredit(creditAmount);
            localStorage.setItem('userCredit', creditAmount.toString());
            localStorage.setItem('userClub', response.data.club);
        } catch (error) {
            console.error('Error fetching credit:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateCredit = (newCredit: number): void => {
        setCredit(newCredit);
        localStorage.setItem('userCredit', newCredit.toString());
    };

    const refreshCredit = async (): Promise<void> => {
        await fetchCredit();
    };

    useEffect(() => {
        const storedCredit = localStorage.getItem('userCredit');
        if (storedCredit) {
            setCredit(parseFloat(storedCredit));
        } else {
            fetchCredit();
        }
    }, []);

    // Expose updateCredit function globally for other components
    useEffect(() => {
        (window as any).updateUserCredit = updateCredit;
        return () => {
            delete (window as any).updateUserCredit;
        };
    }, []);

    return {
        credit,
        updateCredit,
        refreshCredit,
        isLoading
    };
};
