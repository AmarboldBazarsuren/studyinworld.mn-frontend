import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLoginPage.css';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // API руу нэвтрэх хүсэлт илгээх
    try {
      // Хуурамч authentication (бодит системд API call болно)
      if (formData.email === 'admin@studyinworld.mn' && formData.password === 'admin123') {
        // JWT token хадгалах
        localStorage.setItem('adminToken', 'mock-admin-token');
        localStorage.setItem('userType', 'admin');
        navigate('/admin/dashboard');
      } else {
        setError('И-мэйл эсвэл нууц үг буруу байна');
      }
    } catch (err) {
      setError('Алдаа гарлаа. Дахин оролдоно уу.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-icon">🔐</div>
            <h1 className="login-title">Админ нэвтрэх</h1>
            <p className="login-subtitle">StudyInWorld.mn удирдлагын систем</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {error && (
              <div className="error-alert">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                </svg>
                <span>{error}</span>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">И-мэйл</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="admin@studyinworld.mn"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Нууц үг</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
                <input
                  type="password"
                  name="password"
                  className="form-input"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-block"
              disabled={loading}
            >
              {loading ? 'Нэвтэрч байна...' : 'Нэвтрэх'}
            </button>

            <div className="demo-credentials">
              <p className="demo-title">Туршилтын нэвтрэх мэдээлэл:</p>
              <p className="demo-info">И-мэйл: admin@studyinworld.mn</p>
              <p className="demo-info">Нууц үг: admin123</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;