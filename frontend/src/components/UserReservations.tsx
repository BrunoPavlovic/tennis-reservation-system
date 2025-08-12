import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
  MDBSpinner,
  MDBIcon
} from "mdb-react-ui-kit";
import api from "../services/axios";
import { UserReservationOverview } from "../types/Reservation";

interface PaginatedResponse {
  content: UserReservationOverview[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

const UserReservations: React.FC = () => {
  const [reservations, setReservations] = useState<UserReservationOverview[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const fetchUserReservations = async (page: number) => {
    try {
      setLoading(true);
      const response = await api.get(`/reservations/user?page=${page}`);
      const data: PaginatedResponse = response.data;
      
      setReservations(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
    } catch (err: any) {
      console.error("Failed to load user reservations:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserReservations(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return timeString.substring(0, 5);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
        <MDBSpinner size="lg" />
      </div>
    );
  }

  return (
    <MDBCard className="shadow-5" style={{ borderRadius: "15px" }}>
      <MDBCardBody className="p-4 p-md-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <MDBCardTitle className="fw-bold h4 mb-0">
            <MDBIcon fas icon="calendar-alt" className="me-2 text-primary" />
            My Reservations
          </MDBCardTitle>
          {totalElements > 0 && (
            <span className="text-muted">
              {totalElements} reservation{totalElements !== 1 ? 's' : ''} total
            </span>
          )}
        </div>

        {reservations.length === 0 ? (
          <div className="text-center py-5">
            <MDBIcon fas icon="calendar-times" size="3x" className="text-muted mb-3" />
            <h5 className="text-muted">No reservations found</h5>
            <p className="text-muted mb-0">You haven't made any reservations yet.</p>
          </div>
        ) : (
          <>
            <div className="table-responsive">
              <MDBTable hover responsive className="mb-0">
                <MDBTableHead className="table-dark">
                  <tr>
                    <th scope="col" className="d-none d-md-table-cell">Club & Court</th>
                    <th scope="col">Date</th>
                    <th scope="col" className="d-none d-sm-table-cell">Time</th>
                    <th scope="col" className="text-center">Credit Cost</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {reservations.map((reservation, index) => (
                    <tr key={index} className="align-middle">
                      <td className="d-none d-md-table-cell">
                        <div>
                          <div className="fw-bold text-primary">{reservation.clubName}</div>
                          <div className="text-muted small">{reservation.courtName}</div>
                        </div>
                      </td>
                      <td>
                        <div className="fw-bold">{formatDate(reservation.date)}</div>
                        <div className="d-md-none text-muted small">
                          {reservation.clubName} - {reservation.courtName}
                        </div>
                      </td>
                      <td className="d-none d-sm-table-cell">
                        <div>
                          <div className="fw-bold">{formatTime(reservation.startTime)}</div>
                          <div className="text-muted small">to {formatTime(reservation.endTime)}</div>
                        </div>
                      </td>
                      <td className="text-center">
                        <div>
                          <span className="badge bg-success fs-6 d-none d-sm-inline">
                            {reservation.creditCost} credit{reservation.creditCost !== 1 ? 's' : ''}
                          </span>
                          <span className="badge bg-success d-sm-none">
                            {reservation.creditCost}
                          </span>
                        </div>
                        <div className="d-sm-none text-muted small mt-1">
                          {formatTime(reservation.startTime)} - {formatTime(reservation.endTime)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>
            </div>

            {/* Pagination */}
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
  );
};

export default UserReservations;
