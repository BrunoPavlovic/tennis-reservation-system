import { useState } from "react";
import { Registration } from "../types/Registration";
import api from "../services/axios";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const [form, setForm] = useState<Registration>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    handleChange,
    handleSubmit,
  };
};
