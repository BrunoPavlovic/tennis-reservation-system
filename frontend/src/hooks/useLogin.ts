import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/axios';

export const useLogin = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await api.post("/auth/login", {
                email: form.email,
                password: form.password
            });
            const token = response.data.token;

            localStorage.setItem('token', token);
            
            const decoded = decodeToken(token);
            if (decoded && decoded.role) {
                const isAdmin = decoded.role.some((auth: any) => auth.authority === 'ROLE_ADMIN');
                if (isAdmin) {
                    navigate('/admin');
                } else {
                    navigate('/home');
                }
            } else {
                navigate('/home');
            }
        } catch (err: any) {
            setError(err.response?.data || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    }

    return { form, error, isLoading, handleChange, handleSubmit };
};
  