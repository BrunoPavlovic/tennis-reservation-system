import { useState, useEffect } from "react";
import { Registration } from "../types/Registration";
import api from "../services/axios";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const [form, setForm] = useState<Registration>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    club: "",
  });

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await api.get('/clubs');
        setClubs(response.data);
      } catch (err) {
        console.error('Error fetching clubs:', err);
      }
    };

    fetchClubs();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data || "An error occurred during registration.");
    }
  };

  return {
    form,
    error,
    clubs,
    handleChange,
    handleSubmit,
  };
};
