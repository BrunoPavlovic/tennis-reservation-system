import { useState, useEffect } from 'react';
import api from '../services/axios';
import { User } from '../types/User';


const CREDIT_UPDATE_EVENT = 'creditUpdate';
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
        // this will update all components ( problem was that in navigation bar it was not updating)
        window.dispatchEvent(new CustomEvent(CREDIT_UPDATE_EVENT, { detail: newCredit }));
    };

    const refreshCredit = async (): Promise<void> => {
        await fetchCredit();
        window.dispatchEvent(new CustomEvent(CREDIT_UPDATE_EVENT));
    };

    useEffect(() => {
        const storedCredit = localStorage.getItem('userCredit');
        if (storedCredit) {
            setCredit(parseFloat(storedCredit));
        } else {
            fetchCredit();
        }

        const handleCreditUpdate = (event: CustomEvent) => {
            if (event.detail) {
                setCredit(event.detail);
            } else {
                fetchCredit();
            }
        };

        window.addEventListener(CREDIT_UPDATE_EVENT, handleCreditUpdate as EventListener);

        return () => {
            window.removeEventListener(CREDIT_UPDATE_EVENT, handleCreditUpdate as EventListener);
        };
    }, []);

    // Expose updateCredit function globally for other components
    useEffect(() => {
        (window as any).updateUserCredit = updateCredit;
        (window as any).refreshUserCredit = refreshCredit;
        return () => {
            delete (window as any).updateUserCredit;
            delete (window as any).refreshUserCredit;
        };
    }, []);

    return {
        credit,
        updateCredit,
        refreshCredit,
        isLoading
    };
};
