import React, { useState } from 'react';
import logo from './20944445.jpg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // 👈 for navigation after registration

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = formData;
    const newErrors = {};

    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) newErrors.email = 'Enter a valid email';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password should be at least 6 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({}); // Clear previous errors

    try {
      // Sending data to the backend API
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      
      // If registration is successful
      toast.success(res.data.message || 'Registered successfully!');
      
      // Navigate to login page
      navigate('/login');
      
      // Reset form after successful registration
      setFormData({ name: '', email: '', password: '' });

    } catch (err) {
      // Handling error response
      const msg = err.response?.data?.message || 'Something went wrong';
      toast.error(msg);
    }
  };

  return (
    <div className="login-main-div">
      <ToastContainer/>
      <div className="grid-column-one">
        <img src={logo} alt="user login" />
      </div>
      <div className="grid-column-two">
        <form onSubmit={handleSubmit}>
          <h2>Welcome Back!</h2>
          <p>Already have an account yet?
            <span><Link to="/login"> Sign In</Link></span>
          </p>

          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <div className="form-btn">
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
