import { useState, useEffect } from "react";
import api from "../services/axios";
import { User } from "../types/User";

interface EmailForm {
  email: string;
}

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const useProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailForm, setEmailForm] = useState<EmailForm>({ email: "" });
  const [emailValidationErrors, setEmailValidationErrors] = useState<Record<string, string>>({});
  const [emailLoading, setEmailLoading] = useState(false);
  
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [passwordValidationErrors, setPasswordValidationErrors] = useState<Record<string, string>>({});
  const [passwordLoading, setPasswordLoading] = useState(false);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("users/me");
      const userData = response.data;
      setUser(userData);
      
      localStorage.setItem('userEmail', userData.email);
      localStorage.setItem('userCredit', userData.credit.toString());
      localStorage.setItem('userClub', userData.club);
    } catch (err: any) {
      setError(err.response?.data || "Failed to load user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const validateEmail = (email: string) => {
    const errors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      errors.email = "Valid email is required (e.g. bpavlovic@foi.hr)";
    }
    
    setEmailValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePassword = (form: PasswordForm) => {
    const errors: Record<string, string> = {};
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{12,}$/;
    
    if (!form.currentPassword.trim()) {
      errors.currentPassword = "Current password is required";
    }
    
    if (!form.newPassword.trim()) {
      errors.newPassword = "New password is required";
    } else if (!passwordRegex.test(form.newPassword)) {
      errors.newPassword = "Password ( 12 characters, 1 uppercase, 1 lowercase,1 number and 1 special character )";
    }
    
    if (!form.confirmPassword.trim()) {
      errors.confirmPassword = "Confirm password is required";
    } else if (form.newPassword !== form.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    
    setPasswordValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEmailUpdate = async () => {
    if (!validateEmail(emailForm.email)) {
      setError("Please fix the validation errors before submitting.");
      return;
    }

    try {
      setEmailLoading(true);
      setError(null);
      await api.put('/users/email', { email: emailForm.email });
      setSuccess("Email updated successfully! You need to log in again with your new email.");
      setShowEmailModal(false);
      setEmailForm({ email: "" });
      setEmailValidationErrors({});
      
      setTimeout(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('userCredit');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userClub');
        window.location.href = '/login';
      }, 3000);
      
    } catch (err: any) {
      setError(err.response?.data || "Failed to update email");
    } finally {
      setEmailLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!validatePassword(passwordForm)) {
      setError("Please fix the validation errors before submitting.");
      return;
    }

    try {
      setPasswordLoading(true);
      setError(null);
      await api.put('/users/password', { 
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword 
      });
      setSuccess("Password changed successfully! You need to log in again with your new password.");
      setShowPasswordModal(false);
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      setPasswordValidationErrors({});
      
      setTimeout(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('userCredit');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userClub');
        window.location.href = '/login';
      }, 3000);
      
    } catch (err: any) {
      setError(err.response?.data || "Failed to change password");
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailForm({ ...emailForm, [e.target.name]: e.target.value });
    if (emailValidationErrors[e.target.name]) {
      setEmailValidationErrors({ ...emailValidationErrors, [e.target.name]: "" });
    }
  };

  const handlePasswordFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
    if (passwordValidationErrors[e.target.name]) {
      setPasswordValidationErrors({ ...passwordValidationErrors, [e.target.name]: "" });
    }
  };

  const openEmailModal = () => {
    if (user) {
      setEmailForm({ email: user.email });
      setEmailValidationErrors({});
      setShowEmailModal(true);
    }
  };

  const openPasswordModal = () => {
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    setPasswordValidationErrors({});
    setShowPasswordModal(true);
  };


  useEffect(() => {
    if (success && !success.includes("You need to log in again")) {
      const timer = setTimeout(() => {
        setSuccess(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return {
    // User data
    user,
    loading,
    success,
    
    // Email functionality
    showEmailModal,
    setShowEmailModal,
    emailForm,
    emailValidationErrors,
    emailLoading,
    handleEmailChange,
    handleEmailUpdate,
    openEmailModal,
    
    // Password functionality
    showPasswordModal,
    setShowPasswordModal,
    passwordForm,
    passwordValidationErrors,
    passwordLoading,
    handlePasswordFormChange,
    handlePasswordChange,
    openPasswordModal
  };
};
