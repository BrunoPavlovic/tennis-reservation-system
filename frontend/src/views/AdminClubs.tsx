import React, { useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBInput,
  MDBSpinner,
  MDBIcon,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink
} from "mdb-react-ui-kit";
import { Club, ClubAdmin } from "../types/Club";
import { useAdminClub } from "../hooks/useAdminClub";

const AdminClubs: React.FC = () => {
  const {
    clubs,
    loading,
    currentPage,
    totalPages,
    totalElements,
    error,
    success,
    createClub,
    updateClub,
    deleteClub,
    handlePageChange,
    clearMessages
  } = useAdminClub();

  const [showDialog, setShowDialog] = useState(false);
  const [editingClub, setEditingClub] = useState<Club | null>(null);
  const [formData, setFormData] = useState({ name: '', creditPrice: '' });

  const handleShowDialog = (club?: Club) => {
    if (club) {
      setEditingClub(club);
      setFormData({ name: club.name, creditPrice: club.creditPrice.toString() });
    } else {
      setEditingClub(null);
      setFormData({ name: '', creditPrice: '' });
    }
    setShowDialog(true);
    clearMessages();
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setEditingClub(null);
    setFormData({ name: '', creditPrice: '' });
    clearMessages();
  };

  const handleSubmit = async () => {
    try {
      const clubData = {
        name: formData.name.trim(),
        creditPrice: parseFloat(formData.creditPrice)
      };

      if (editingClub) {
        await updateClub(editingClub.clubId, clubData);
      } else {
        await createClub(clubData);
      }

      handleCloseDialog();
    } catch (err: any) {
      // Error is already handled by the hook
    }
  };

  const handleDelete = async (clubId: number) => {
    if (window.confirm('Are you sure you want to delete this club?')) {
      try {
        await deleteClub(clubId);
      } catch (err: any) {
        // Error is already handled by the hook
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
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
              <MDBIcon fas icon="building" className="me-2 text-primary" />
              Manage Clubs
            </MDBCardTitle>
            <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-2 gap-sm-3">
              <MDBBtn color="primary" onClick={() => handleShowDialog()}>
                <MDBIcon fas icon="plus" className="me-2" />
                Add Club
              </MDBBtn>
              <span className="text-muted">
                {totalElements} club{totalElements !== 1 ? 's' : ''} total
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

          {clubs.length === 0 ? (
            <div className="text-center py-5">
              <MDBIcon fas icon="building" size="3x" className="text-muted mb-3" />
              <h5 className="text-muted">No clubs found</h5>
              <p className="text-muted mb-0">Start by adding your first club.</p>
            </div>
          ) : (
            <>
              {/* Desktop/Tablet Table View */}
              <div className="d-none d-md-block">
                <div className="table-responsive">
                  <MDBTable hover responsive className="mb-0">
                    <MDBTableHead className="table-dark">
                      <tr>
                        <th scope="col">Club Name</th>
                        <th scope="col">Credit Price</th>
                        <th scope="col" className="d-none d-lg-table-cell">Courts</th>
                        <th scope="col" className="d-none d-lg-table-cell">Members</th>
                        <th scope="col" className="d-none d-xl-table-cell">Created At</th>
                        <th scope="col" className="text-center">Actions</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      {clubs.map((club) => (
                        <tr key={club.clubId} className="align-middle">
                          <td>
                            <div className="fw-bold text-primary">{club.name}</div>
                          </td>
                          <td>
                            <span className="badge bg-success fs-6">
                              {club.creditPrice}€
                            </span>
                          </td>
                          <td className="d-none d-lg-table-cell">
                            <span className="badge bg-info fs-6">
                              {club.courtCount}
                            </span>
                          </td>
                          <td className="d-none d-lg-table-cell">
                            <span className="badge bg-warning fs-6">
                              {club.memberCount}
                            </span>
                          </td>
                          <td className="d-none d-xl-table-cell">
                            <div className="text-muted">
                              {formatDate(club.createdAt)}
                            </div>
                          </td>
                          <td className="text-center">
                            <div className="d-flex justify-content-center gap-2 flex-wrap">
                              <MDBBtn
                                color="info"
                                size="sm"
                                onClick={() => handleShowDialog(club)}
                                className="mb-1"
                              >
                                <MDBIcon fas icon="edit" />
                              </MDBBtn>
                              <MDBBtn
                                color="danger"
                                size="sm"
                                onClick={() => handleDelete(club.clubId)}
                                className="mb-1"
                              >
                                <MDBIcon fas icon="trash" />
                              </MDBBtn>
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
                {clubs.map((club) => (
                  <div key={club.clubId} className="card mb-3 shadow-sm">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h6 className="card-title text-primary mb-0">{club.name}</h6>
                        <div className="d-flex gap-1">
                          <MDBBtn
                            color="info"
                            size="sm"
                            onClick={() => handleShowDialog(club)}
                          >
                            <MDBIcon fas icon="edit" />
                          </MDBBtn>
                          <MDBBtn
                            color="danger"
                            size="sm"
                            onClick={() => handleDelete(club.clubId)}
                          >
                            <MDBIcon fas icon="trash" />
                          </MDBBtn>
                        </div>
                      </div>
                      <div className="row g-2">
                        <div className="col-6">
                          <small className="text-muted">Credit Price:</small>
                          <div className="badge bg-success fs-6">{club.creditPrice}€</div>
                        </div>
                        <div className="col-6">
                          <small className="text-muted">Courts:</small>
                          <div className="badge bg-info fs-6">{club.courtCount}</div>
                        </div>
                        <div className="col-6">
                          <small className="text-muted">Members:</small>
                          <div className="badge bg-warning fs-6">{club.memberCount}</div>
                        </div>
                        <div className="col-6">
                          <small className="text-muted">Created:</small>
                          <div className="text-muted">{formatDate(club.createdAt)}</div>
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

      {showDialog && (
        <>
          <div className="modal fade show" style={{ display: 'block', zIndex: 1050 }} tabIndex={-1}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {editingClub ? 'Edit Club' : 'Add New Club'}
                  </h5>
                  <button type="button" className="btn-close" onClick={handleCloseDialog}></button>
                </div>
                <div className="modal-body">
                  <MDBInput
                    label="Club Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mb-3"
                    required
                  />
                  <MDBInput
                    label="Credit Price (€)"
                    type="number"
                    value={formData.creditPrice}
                    onChange={(e) => setFormData({ ...formData, creditPrice: e.target.value })}
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
                <div className="modal-footer">
                  <MDBBtn color="secondary" onClick={handleCloseDialog}>
                    Cancel
                  </MDBBtn>
                  <MDBBtn color="primary" onClick={handleSubmit}>
                    {editingClub ? 'Update' : 'Create'}
                  </MDBBtn>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal-backdrop fade show"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1040
            }}
            onClick={handleCloseDialog}
          ></div>
        </>
      )}
    </>
  );
};

export default AdminClubs;
