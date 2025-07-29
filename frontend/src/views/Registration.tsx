import React from "react";
import { Link } from "react-router-dom";
import { Club } from "../types/Club";
import { useRegister } from "../hooks/useRegister";
import logo from "../assets/match_point_logo.png";
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBInput,
    MDBIcon,    
}
from 'mdb-react-ui-kit';

const Register: React.FC = () => {
    const { form, clubs, error, validationErrors, handleChange, handleSubmit } = useRegister();

    return (
        <MDBContainer fluid className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
            <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
                <MDBCardBody>
                    <MDBRow>
                        <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                            <form onSubmit={handleSubmit} className="w-100 d-flex flex-column gap-3">
                            <div className="d-flex flex-row align-items-center mb-4 ">
                                <MDBIcon fas icon="user me-3" size='lg' />
                                <MDBInput label='First Name' id='firstName' name="firstName" type='text' value={form.firstName} onChange={handleChange} required />
                                <MDBInput label='Last Name' id='lastName' name="lastName" type='text' value={form.lastName} onChange={handleChange} required/>
                            </div>
                            <div className="d-flex flex-row align-items-center mb-4">
                                <MDBIcon fas icon="envelope me-3" size='lg' />
                                <MDBInput label='Your Email' id='email' type='email' name="email" value={form.email} onChange={handleChange} required
                                    className={validationErrors.email ? 'is-invalid' : ''}/>
                            </div>
                            {validationErrors.email && (
                                <div className="d-flex flex-row align-items-center mb-2">
                                    <div className="invalid-feedback d-block">{validationErrors.email}</div>
                                </div>
                            )}

                            <div className="d-flex flex-row align-items-center mb-4">
                                <MDBIcon fas icon="lock me-3" size='lg' />
                                <MDBInput label='Password' id='password' type='password' name="password" value={form.password} onChange={handleChange} required
                                    className={validationErrors.password ? 'is-invalid' : ''}/>
                            </div>
                            {validationErrors.password && (
                                <div className="d-flex flex-row align-items-center mb-2">
                                    <div className="invalid-feedback d-block">{validationErrors.password}</div>
                                </div>
                            )}

                            <div className="d-flex flex-row align-items-center mb-4">
                                <MDBIcon fas icon="location-arrow me-3" size='lg' />
                                <select className="form-select w-100" name="club" value={form.club} onChange={handleChange} required>
                                    <option value="" disabled hidden>Select a club</option>
                                    {clubs.map((club: Club) => (
                                    <option key={club.name} value={club.name}>
                                        {club.name}
                                    </option>
                                    ))}
                                </select>
                            </div>

                            {error && <div className="text-danger">{error}</div>}
                            <MDBBtn className='mb-4' size='lg' type="submit">Sign up</MDBBtn>
                            <p className="text-center">
                                Already have an account?{' '}
                                <Link to="/login" className="text-primary" style={{ textDecoration: 'underline' }}>Login here</Link>
                            </p>
                            </form>
                        </MDBCol>
                        <MDBCol md='10' lg='5' className='order-1 order-lg-1 d-flex align-items-center'>
                            <MDBCardImage src={logo} fluid alt="Match Point Logo" />
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
};

export default Register;
