import React, { useState } from 'react';
import logo from './20944445.jpg';
import { Link, useNavigate } from 'react-router-dom'; // 👈 Add useNavigate
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate(); // 👈 Initialize navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { email, password } = formData;
    const newErrors = {};
  
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        newErrors.email = 'Invalid email format';
      }
    }
  
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    try {
      const res = await axios.post('https://wave-tech-auth-server.vercel.app/api/auth/login', {
        email,
        password,
      });
  
      toast.success(res.data.message || 'Login successful!');
  
      // Save login token/status if needed
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(res.data.user)); // if needed
  
      // Navigate to dashboard
      navigate('/dashboard');
  
      // Clear form
      setFormData({ email: '', password: '' });
      setErrors({});
      setLoginError('');
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid email or password';
      setLoginError(msg);
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
          <p>Don't have an account yet? <span><Link to="/">Sign Up</Link></span></p>

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

          <div>
            <input type="checkbox" />
            <span>Keep me logged in</span>
            <span style={{ float: 'right' }}>Forgot Password?</span>
          </div>

          {loginError && <p className="error">{loginError}</p>}

          <div className="form-btn">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
