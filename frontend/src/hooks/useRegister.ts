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
  const [validationErrors, setValidationErrors] = useState<Record<string,string>>({});
  const [clubs, setClubs] = useState([]);
  const navigate = useNavigate();

  const validate = () => {
    const errors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{12,}$/;

    if (!emailRegex.test(form.email)) errors.email = "Valid email is required (e.g. bpavlovic@foi.hr)";
    if (!passwordRegex.test(form.password)) errors.password = "Password ( 12 characters, 1 uppercase, 1 lowercase,1 number and 1 special character )";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };


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
    if (!validate()) {
      setError("Please fix the validation errors before submitting.");
      return;
    }

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
    validationErrors,
    clubs,
    handleChange,
    handleSubmit,
  };
};
