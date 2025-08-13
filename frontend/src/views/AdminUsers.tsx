import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBSpinner,
  MDBIcon,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink
} from "mdb-react-ui-kit";
import { useAdminUser } from "../hooks/useAdminUser";

const AdminUsers: React.FC = () => {
  const {
    users,
    loading,
    currentPage,
    totalPages,
    totalElements,
    error,
    success,
    deactivateUser,
    handlePageChange,
    clearMessages
  } = useAdminUser();

  const handleDeactivate = async (userId: number) => {
    if (window.confirm('Are you sure you want to deactivate this user? This will prevent them from logging in.')) {
      try {
        await deactivateUser(userId);
      } catch (err: any) {
        // Error is already handled by the hook
      }
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid Date';
      }
      return date.toLocaleDateString();
    } catch (error) {
      return 'Invalid Date';
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
        <MDBSpinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <MDBCard className="shadow-5" style={{ borderRadius: "15px" }}>
        <MDBCardBody className="p-4 p-md-5">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
            <MDBCardTitle className="fw-bold h4 mb-0">
              <MDBIcon fas icon="users" className="me-2 text-primary" />
              Manage Users
            </MDBCardTitle>
            <div className="d-flex align-items-center">
              <span className="text-muted">
                {totalElements} user{totalElements !== 1 ? 's' : ''} total
              </span>
            </div>
          </div>

          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {error}
              <button type="button" className="btn-close" onClick={clearMessages}></button>
            </div>
          )}

          {success && (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              {success}
              <button type="button" className="btn-close" onClick={clearMessages}></button>
            </div>
          )}

          {users.length === 0 ? (
            <div className="text-center py-5">
              <MDBIcon fas icon="users" size="3x" className="text-muted mb-3" />
              <h5 className="text-muted">No users found</h5>
              <p className="text-muted mb-0">No users are registered in the system.</p>
            </div>
          ) : (
            <>
              {/* Desktop/Tablet Table View */}
              <div className="d-none d-md-block">
                <div className="table-responsive">
                  <MDBTable hover responsive className="mb-0">
                    <MDBTableHead className="table-dark">
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col" className="d-none d-lg-table-cell">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col" className="d-none d-lg-table-cell">Credit</th>
                        <th scope="col">Status</th>
                        <th scope="col" className="d-none d-xl-table-cell">Created At</th>
                        <th scope="col" className="text-center">Actions</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      {users.map((user) => (
                        <tr key={user.userId} className="align-middle">
                          <td>
                            <div className="fw-bold text-primary">
                              {user.firstName} {user.lastName}
                            </div>
                          </td>
                          <td className="d-none d-lg-table-cell">
                            <div className="text-muted">{user.email}</div>
                          </td>
                          <td>
                            <span className={`badge ${user.role === 'ADMIN' ? 'bg-danger' : 'bg-primary'} fs-6`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="d-none d-lg-table-cell">
                            <span className="badge bg-success fs-6">
                              {user.creditAmount}€
                            </span>
                          </td>
                          <td>
                            <span className={`badge ${user.active ? 'bg-success' : 'bg-secondary'} fs-6`}>
                              {user.active ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="d-none d-xl-table-cell">
                            <div className="text-muted">
                              {formatDate(user.createdAt)}
                            </div>
                          </td>
                          <td className="text-center">
                            <div className="d-flex justify-content-center gap-2 flex-wrap">
                              {user.active && (
                                <MDBBtn
                                  color="warning"
                                  size="sm"
                                  onClick={() => handleDeactivate(user.userId)}
                                  title="Deactivate User"
                                  className="mb-1"
                                >
                                  <MDBIcon fas icon="user-slash" />
                                </MDBBtn>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </MDBTableBody>
                  </MDBTable>
                </div>
              </div>

              {/* Mobile Cards View */}
              <div className="d-md-none">
                {users.map((user) => (
                  <div key={user.userId} className="card mb-3 shadow-sm">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <h6 className="card-title text-primary mb-1">
                            {user.firstName} {user.lastName}
                          </h6>
                          <small className="text-muted">{user.email}</small>
                        </div>
                        <div className="d-flex gap-1">
                          {user.active && (
                            <MDBBtn
                              color="warning"
                              size="sm"
                              onClick={() => handleDeactivate(user.userId)}
                              title="Deactivate User"
                            >
                              <MDBIcon fas icon="user-slash" />
                            </MDBBtn>
                          )}
                        </div>
                      </div>
                      <div className="row g-2">
                        <div className="col-6">
                          <small className="text-muted">Role:</small>
                          <div className={`badge ${user.role === 'ADMIN' ? 'bg-danger' : 'bg-primary'} fs-6`}>
                            {user.role}
                          </div>
                        </div>
                        <div className="col-6">
                          <small className="text-muted">Credit:</small>
                          <div className="badge bg-success fs-6">{user.creditAmount}€</div>
                        </div>
                        <div className="col-6">
                          <small className="text-muted">Status:</small>
                          <div className={`badge ${user.active ? 'bg-success' : 'bg-secondary'} fs-6`}>
                            {user.active ? 'Active' : 'Inactive'}
                          </div>
                        </div>
                        <div className="col-6">
                          <small className="text-muted">Created:</small>
                          <div className="text-muted">{formatDate(user.createdAt)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                  <MDBPagination className="mb-0">
                    <MDBPaginationItem disabled={currentPage === 0}>
                      <MDBPaginationLink
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={currentPage === 0 ? 'disabled' : ''}
                      >
                        <MDBIcon fas icon="chevron-left" />
                      </MDBPaginationLink>
                    </MDBPaginationItem>

                    {(() => {
                      const maxVisiblePages = 5;
                      let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
                      let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

                      if (endPage - startPage + 1 < maxVisiblePages) {
                        startPage = Math.max(0, endPage - maxVisiblePages + 1);
                      }

                      return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
                        <MDBPaginationItem key={page} active={page === currentPage}>
                          <MDBPaginationLink
                            onClick={() => handlePageChange(page)}
                            className={page === currentPage ? 'active' : ''}
                          >
                            {page + 1}
                          </MDBPaginationLink>
                        </MDBPaginationItem>
                      ));
                    })()}

                    <MDBPaginationItem disabled={currentPage === totalPages - 1}>
                      <MDBPaginationLink
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={currentPage === totalPages - 1 ? 'disabled' : ''}
                      >
                        <MDBIcon fas icon="chevron-right" />
                      </MDBPaginationLink>
                    </MDBPaginationItem>
                  </MDBPagination>
                </div>
              )}
            </>
          )}
        </MDBCardBody>
      </MDBCard>
    </>
  );
};

export default AdminUsers;
