import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/axios';

export const useLogin = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await api.post("/auth/login", {
                email: form.email,
                password: form.password
            });
            const token = response.data.token;

            localStorage.setItem('token', token);
            navigate('/home');
        } catch (err: any) {
            setError(err.response?.data || 'Login failed');
        }
    }
        return { form, error, handleChange, handleSubmit };

};
  