import { useState, useEffect } from 'react';

export const useAuth = () => {
    const [username, setUsername] = useState<string>('');
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<any>(null);

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
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userClub');
        setUsername('');
        setIsAuthenticated(false);
        setUser(null);
        window.location.href = '/login';
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = decodeToken(token);
            if (decoded && decoded.sub) {
                setUsername(decoded.sub);
                setIsAuthenticated(true);
                
                let role = 'USER';
                if (decoded.role && decoded.role.length > 0) {
                    const roleAuthority = decoded.role[0].authority;
                    if (roleAuthority === 'ROLE_ADMIN') {
                        role = 'ADMIN';
                    }
                }
                
                setUser({
                    email: decoded.sub,
                    role: role
                });
            } else {
                logout();
            }
        }
    }, []);

    return {
        username,
        isAuthenticated,
        user,
        logout
    };
};
