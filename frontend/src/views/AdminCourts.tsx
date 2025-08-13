import React, { useState, useEffect } from "react";
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
import { CourtAdmin } from "../types/Club";
import { useAdminCourt } from "../hooks/useAdminCourt";
import api from "../services/axios";

const AdminCourts: React.FC = () => {
    const {
        courts,
        loading,
        currentPage,
        totalPages,
        totalElements,
        error,
        success,
        selectedClub,
        createCourt,
        updateCourt,
        deleteCourt,
        handlePageChange,
        clearMessages,
        setClub,
        setError
    } = useAdminCourt();

    const [showDialog, setShowDialog] = useState(false);
    const [editingCourt, setEditingCourt] = useState<CourtAdmin | null>(null);
    const [formData, setFormData] = useState({ name: '' });
    const [clubs, setClubs] = useState<{ name: string }[]>([]);

    useEffect(() => {
        const fetchClubs = async () => {
            try {
                const response = await api.get('/clubs');
                setClubs(response.data);
            } catch (error) {
                console.error('Error fetching clubs:', error);
            }
        };
        fetchClubs();
    }, []);

    const handleShowDialog = (court?: CourtAdmin) => {
        if (court) {
            setEditingCourt(court);
            setFormData({ name: court.name });
        } else {
            setEditingCourt(null);
            setFormData({ name: '' });
        }
        setShowDialog(true);
        clearMessages();
    };

    const handleCloseDialog = () => {
        setShowDialog(false);
        setEditingCourt(null);
        setFormData({ name: '' });
        clearMessages();
    };

    const handleSubmit = async () => {
        if (!selectedClub) {
            setError('Please select a club first');
            return;
        }

        try {
            const courtData = {
                name: formData.name.trim(),
                clubName: selectedClub
            };

            if (editingCourt) {
                await updateCourt(selectedClub, editingCourt.name, courtData);
            } else {
                await createCourt(courtData);
            }

            handleCloseDialog();
        } catch (err: any) {
            // Error is already handled by the hook
        }
    };

    const handleDelete = async (courtName: string) => {
        if (window.confirm('Are you sure you want to delete this court?')) {
            try {
                await deleteCourt(selectedClub, courtName);
            } catch (err: any) {
                // Error is already handled by the hook
            }
        }
    };

    const handleClubChange = (clubName: string) => {
        setClub(clubName);
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
                            <MDBIcon fas icon="table-tennis" className="me-2 text-primary" />
                            Manage Courts
                        </MDBCardTitle>
                        <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-2 gap-sm-3">
                            <MDBBtn
                                color="primary"
                                onClick={() => handleShowDialog()}
                                disabled={!selectedClub}
                            >
                                <MDBIcon fas icon="plus" className="me-2" />
                                Add Court
                            </MDBBtn>
                            <span className="text-muted">
                                {totalElements} court{totalElements !== 1 ? 's' : ''} total
                            </span>
                        </div>
                    </div>

                    {/* Club Selection */}
                    <div className="mb-4">
                        <label className="form-label fw-bold">Select Club:</label>
                        <select
                            className="form-select w-100"
                            value={selectedClub}
                            onChange={(e) => handleClubChange(e.target.value)}
                        >
                            <option value="">Choose a club...</option>
                            {clubs.map((club) => (
                                <option key={club.name} value={club.name}>
                                    {club.name}
                                </option>
                            ))}
                        </select>
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

                    {!selectedClub ? (
                        <div className="text-center py-5">
                            <MDBIcon fas icon="table-tennis" size="3x" className="text-muted mb-3" />
                            <h5 className="text-muted">Select a club to manage courts</h5>
                            <p className="text-muted mb-0">Choose a club from the dropdown above to view and manage its courts.</p>
                        </div>
                    ) : courts.length === 0 ? (
                        <div className="text-center py-5">
                            <MDBIcon fas icon="table-tennis" size="3x" className="text-muted mb-3" />
                            <h5 className="text-muted">No courts found</h5>
                            <p className="text-muted mb-0">Start by adding your first court to {selectedClub}.</p>
                        </div>
                    ) : (
                        <>
                            {/* Desktop/Tablet Table View */}
                            <div className="d-none d-md-block">
                                <div className="table-responsive">
                                    <MDBTable hover responsive className="mb-0">
                                        <MDBTableHead className="table-dark">
                                            <tr>
                                                <th scope="col">Court Name</th>
                                                <th scope="col" className="text-center">Actions</th>
                                            </tr>
                                        </MDBTableHead>
                                        <MDBTableBody>
                                            {courts.map((court) => (
                                                <tr key={court.name} className="align-middle">
                                                    <td>
                                                        <div className="fw-bold text-primary">{court.name}</div>
                                                    </td>
                                                    <td className="text-center">
                                                        <div className="d-flex justify-content-center gap-2 flex-wrap">
                                                            <MDBBtn
                                                                color="info"
                                                                size="sm"
                                                                onClick={() => handleShowDialog(court)}
                                                                className="mb-1"
                                                            >
                                                                <MDBIcon fas icon="edit" />
                                                            </MDBBtn>
                                                            <MDBBtn
                                                                color="danger"
                                                                size="sm"
                                                                onClick={() => handleDelete(court.name)}
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
                                {courts.map((court) => (
                                    <div key={court.name} className="card mb-3 shadow-sm">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <h6 className="card-title text-primary mb-0">{court.name}</h6>
                                                <div className="d-flex gap-1">
                                                    <MDBBtn
                                                        color="info"
                                                        size="sm"
                                                        onClick={() => handleShowDialog(court)}
                                                    >
                                                        <MDBIcon fas icon="edit" />
                                                    </MDBBtn>
                                                    <MDBBtn
                                                        color="danger"
                                                        size="sm"
                                                        onClick={() => handleDelete(court.name)}
                                                    >
                                                        <MDBIcon fas icon="trash" />
                                                    </MDBBtn>
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
                                        {editingCourt ? 'Edit Court' : 'Add New Court'}
                                    </h5>
                                    <button type="button" className="btn-close" onClick={handleCloseDialog}></button>
                                </div>
                                <div className="modal-body">
                                    <MDBInput
                                        label="Court Name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="mb-3"
                                        required
                                    />
                                </div>
                                <div className="modal-footer">
                                    <MDBBtn color="secondary" onClick={handleCloseDialog}>
                                        Cancel
                                    </MDBBtn>
                                    <MDBBtn color="primary" onClick={handleSubmit}>
                                        {editingCourt ? 'Update' : 'Create'}
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

export default AdminCourts;
