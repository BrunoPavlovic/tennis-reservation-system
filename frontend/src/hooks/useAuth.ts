import { useState, useEffect } from 'react';

export const useAuth = () => {
    const [username, setUsername] = useState<string>('');
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    // Decode JWT token to get username
    const decodeToken = (token: string) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userCredit');
        setUsername('');
        setIsAuthenticated(false);
        window.location.href = '/login';
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = decodeToken(token);
            if (decoded && decoded.sub) {
                setUsername(decoded.sub);
                setIsAuthenticated(true);
            } else {
                logout();
            }
        }
    }, []);

    return {
        username,
        isAuthenticated,
        logout
    };
};
