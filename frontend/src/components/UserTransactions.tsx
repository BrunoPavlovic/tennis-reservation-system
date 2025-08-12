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
import { UserTransactionOverview } from "../types/Reservation";

interface PaginatedResponse {
  content: UserTransactionOverview[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

const UserTransactions: React.FC = () => {
  const [transactions, setTransactions] = useState<UserTransactionOverview[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const fetchUserTransactions = async (page: number) => {
    try {
      setLoading(true);
      const response = await api.get(`/transactions?page=${page}`);
      const data: PaginatedResponse = response.data;
      
      setTransactions(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
    } catch (err: any) {
      console.error("Failed to load user transactions:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserTransactions(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const formatDateTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTransactionTypeInfo = (type: string) => {
    switch (type.toLowerCase()) {
      case 'purchase':
        return {
          icon: 'credit-card',
          color: 'text-success',
          label: 'Credit Purchase'
        };
      case 'reservation':
        return {
          icon: 'calendar-check',
          color: 'text-primary',
          label: 'Reservation'
        };
      case 'refund':
        return {
          icon: 'undo',
          color: 'text-warning',
          label: 'Refund'
        };
      default:
        return {
          icon: 'exchange-alt',
          color: 'text-info',
          label: type
        };
    }
  };

  const getAmountDisplay = (amount: number, type: string) => {
    const isPositive = type.toLowerCase() === 'purchase' || type.toLowerCase() === 'refund';
    const sign = isPositive ? '+' : '-';
    const color = isPositive ? 'text-success' : 'text-danger';
    
    return (
      <span className={`fw-bold ${color}`}>
        {sign}{Math.abs(amount)} credit{Math.abs(amount) !== 1 ? 's' : ''}
      </span>
    );
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
            <MDBIcon fas icon="exchange-alt" className="me-2 text-primary" />
            Transaction History
          </MDBCardTitle>
          {totalElements > 0 && (
            <span className="text-muted">
              {totalElements} transaction{totalElements !== 1 ? 's' : ''} total
            </span>
          )}
        </div>

        {transactions.length === 0 ? (
          <div className="text-center py-5">
            <MDBIcon fas icon="receipt" size="3x" className="text-muted mb-3" />
            <h5 className="text-muted">No transactions found</h5>
            <p className="text-muted mb-0">You haven't made any transactions yet.</p>
          </div>
        ) : (
          <>
            <div className="table-responsive">
              <MDBTable hover responsive className="mb-0">
                <MDBTableHead className="table-dark">
                  <tr>
                    <th scope="col">Type</th>
                    <th scope="col" className="d-none d-sm-table-cell">Date & Time</th>
                    <th scope="col" className="text-center">Amount</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {transactions.map((transaction, index) => {
                    const typeInfo = getTransactionTypeInfo(transaction.type);
                    return (
                      <tr key={index} className="align-middle">
                        <td>
                          <div className="d-flex align-items-center">
                            <MDBIcon 
                              fas 
                              icon={typeInfo.icon} 
                              className={`me-2 ${typeInfo.color}`}
                              size="lg"
                            />
                            <div>
                              <div className="fw-bold">{typeInfo.label}</div>
                              <div className="text-muted small d-none d-sm-block">{transaction.type}</div>
                              <div className="text-muted small d-sm-none">{formatDateTime(transaction.timestamp)}</div>
                            </div>
                          </div>
                        </td>
                        <td className="d-none d-sm-table-cell">
                          <div className="fw-bold">{formatDateTime(transaction.timestamp)}</div>
                        </td>
                        <td className="text-center">
                          {getAmountDisplay(transaction.amount, transaction.type)}
                        </td>
                      </tr>
                    );
                  })}
                </MDBTableBody>
              </MDBTable>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-center mt-4">
                <MDBPagination className="mb-0">
                  {/* Previous button */}
                  <MDBPaginationItem disabled={currentPage === 0}>
                    <MDBPaginationLink 
                      onClick={() => handlePageChange(currentPage - 1)}
                      className={currentPage === 0 ? 'disabled' : ''}
                    >
                      <MDBIcon fas icon="chevron-left" />
                    </MDBPaginationLink>
                  </MDBPaginationItem>

                  {/* Page numbers */}
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

                  {/* Next button */}
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

export default UserTransactions;
