import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBIcon,
  MDBBtn,
  MDBInput,
  MDBSpinner
} from "mdb-react-ui-kit";
import PasswordInput from "./PasswordInput";
import { useProfile } from "../hooks/useProfile";

const UserInformation: React.FC = () => {
  const {
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
  } = useProfile();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <MDBSpinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <MDBCard className="shadow-5" style={{ borderRadius: "15px" }}>
        <MDBCardBody className="p-4 p-md-5">
          {/* Success Message - Only show when no dialogs are open */}
          {!showEmailModal && !showPasswordModal && success && (
            <div className="alert alert-success mb-4" role="alert">
              {success}
            </div>
          )}

          {user && (
            <div className="row">
              <div className="col-12 col-md-3 text-center mb-4 mb-md-0">
                <MDBIcon 
                  fas 
                  icon="user-circle" 
                  size="4x" 
                  className="text-primary"
                  style={{ minWidth: "80px" }}
                />
              </div>
              <div className="col-12 col-md-9">
                <div className="mb-4">
                  <h5 className="fw-bold mb-1">
                    {user.firstName} {user.lastName}
                  </h5>
                  <p className="text-muted mb-0">Full Name</p>
                </div>

                <div className="mb-4">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="flex-grow-1">
                      <p className="mb-1 text-break">{user.email}</p>
                      <p className="text-muted mb-0 small">Email Address</p>
                    </div>
                    <MDBBtn
                      color="link"
                      size="sm"
                      className="text-primary p-0 ms-2"
                      onClick={openEmailModal}
                    >
                      <MDBIcon fas icon="edit" />
                    </MDBBtn>
                  </div>
                </div>

                <div className="mb-4">
                  <MDBBtn
                    color="primary"
                    outline
                    onClick={openPasswordModal}
                    className="w-100"
                  >
                    <MDBIcon fas icon="key" className="me-2" />
                    Change Password
                  </MDBBtn>
                </div>

                <div className="pt-3 border-top">
                  <div className="row text-center">
                    <div className="col-6">
                      <h6 className="fw-bold text-primary">{user.credit}€</h6>
                      <p className="text-muted small mb-0">Balance</p>
                    </div>
                    <div className="col-6">
                      <h6 className="fw-bold text-success">{user.club}</h6>
                      <p className="text-muted small mb-0">Club</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </MDBCardBody>
      </MDBCard>

      {/* Email Edit Dialog */}
      {showEmailModal && (
        <div className="profile-dialog-overlay">
          <div className="profile-dialog-card">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="mb-0">Edit Email Address</h5>
              <MDBBtn
                color="link"
                className="text-muted p-0"
                onClick={() => setShowEmailModal(false)}
              >
                <MDBIcon fas icon="times" size="lg" />
              </MDBBtn>
            </div>
            
            {/* Email Requirements */}
            <div className="alert alert-info mb-4" role="alert">
              <div className="d-flex align-items-start">
                <MDBIcon fas icon="info-circle" className="me-2 mt-1" />
                <div>
                  <strong>Email Requirements:</strong>
                  <ul className="mb-0 mt-1">
                    <li>Must be a valid email format (e.g., user@example.com)</li>
                    <li>Cannot be already taken by another user</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <MDBInput
                label="New Email Address"
                type="email"
                name="email"
                value={emailForm.email}
                onChange={handleEmailChange}
                className={emailValidationErrors.email ? 'is-invalid' : ''}
              />
            </div>
            
            <div className="d-flex gap-2">
              <MDBBtn color="secondary" onClick={() => setShowEmailModal(false)}>
                Cancel
              </MDBBtn>
              <MDBBtn 
                color="primary" 
                onClick={handleEmailUpdate}
                disabled={emailLoading}
              >
                {emailLoading ? <MDBSpinner size="sm" /> : "Update Email"}
              </MDBBtn>
            </div>
          </div>
        </div>
      )}

      {/* Password Change Dialog */}
      {showPasswordModal && (
        <div className="profile-dialog-overlay">
          <div className="profile-dialog-card">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="mb-0">Change Password</h5>
              <MDBBtn
                color="link"
                className="text-muted p-0"
                onClick={() => setShowPasswordModal(false)}
              >
                <MDBIcon fas icon="times" size="lg" />
              </MDBBtn>
            </div>
            
            {/* Password Requirements */}
            <div className="alert alert-info mb-4" role="alert">
              <div className="d-flex align-items-start">
                <MDBIcon fas icon="info-circle" className="me-2 mt-1" />
                <div>
                  <strong>Password Requirements:</strong>
                  <ul className="mb-0 mt-1">
                    <li>Minimum 12 characters</li>
                    <li>At least 1 uppercase letter</li>
                    <li>At least 1 lowercase letter</li>
                    <li>At least 1 number</li>
                    <li>At least 1 special character</li>
                    <li>Must be different from current password</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mb-3">
              <PasswordInput
                label="Current Password"
                id="currentPassword"
                name="currentPassword"
                value={passwordForm.currentPassword}
                onChange={handlePasswordFormChange}
                className={passwordValidationErrors.currentPassword ? 'is-invalid' : ''}
              />
            </div>
            
            <div className="mb-3">
              <PasswordInput
                label="New Password"
                id="newPassword"
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={handlePasswordFormChange}
                className={passwordValidationErrors.newPassword ? 'is-invalid' : ''}
              />
            </div>
            
            <div className="mb-4">
              <PasswordInput
                label="Confirm New Password"
                id="confirmPassword"
                name="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordFormChange}
                className={passwordValidationErrors.confirmPassword ? 'is-invalid' : ''}
              />
            </div>
            
            <div className="d-flex gap-2">
              <MDBBtn color="secondary" onClick={() => setShowPasswordModal(false)}>
                Cancel
              </MDBBtn>
              <MDBBtn 
                color="primary" 
                onClick={handlePasswordChange}
                disabled={passwordLoading}
              >
                {passwordLoading ? <MDBSpinner size="sm" /> : "Change Password"}
              </MDBBtn>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserInformation;
