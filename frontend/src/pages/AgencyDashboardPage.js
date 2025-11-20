import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AgencyDashboardPage.css';

const AgencyDashboardPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('requests');
  const [agencyData, setAgencyData] = useState(null);
  const [stats, setStats] = useState({
    totalRequests: 0,
    newRequests: 0,
    processing: 0,
    completed: 0
  });
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [profileForm, setProfileForm] = useState({
    description: '',
    teamSize: '',
    studentsHelped: '',
    website: '',
    facebook: '',
    instagram: ''
  });

  useEffect(() => {
    // Зуучлагчийн эрх шалгах
    const adminToken = localStorage.getItem('adminToken');
    const userType = localStorage.getItem('userType');

    if (!adminToken || userType !== 'agency') {
      navigate('/admin/login');
      return;
    }

    // API-аас өгөгдөл татах
    fetchAgencyData();
    fetchStats();
    fetchRequests();
  }, [navigate]);

  const fetchAgencyData = () => {
    // Mock data
    const mockAgency = {
      id: 1,
      name: 'Global Education Mongolia',
      logo: '🌏',
      email: 'info@globaledu.mn',
      phone: '+976 7777-7777',
      address: 'СБД, 1-р хороо, Улаанбаатар',
      registrationNumber: '1234567890',
      established: 2013,
      countries: ['Ирланд', 'Их Британи', 'Канад'],
      services: ['Сургууль сонгох', 'Виз зөвлөгөө', 'Байр хайх', 'Ажил олоход туслах'],
      description: 'Олон улсын боловсролын салбарт 10 жилийн туршлагатай, 500+ оюутанд үйлчилсэн.',
      teamSize: 15,
      studentsHelped: 500,
      website: 'https://globaledu.mn',
      facebook: 'facebook.com/globaledu.mn',
      instagram: '@globaledu.mn'
    };

    setAgencyData(mockAgency);
    setProfileForm({
      description: mockAgency.description,
      teamSize: mockAgency.teamSize.toString(),
      studentsHelped: mockAgency.studentsHelped.toString(),
      website: mockAgency.website,
      facebook: mockAgency.facebook,
      instagram: mockAgency.instagram
    });
  };

  const fetchStats = () => {
    // Mock data
    setStats({
      totalRequests: 24,
      newRequests: 5,
      processing: 8,
      completed: 11
    });
  };

  const fetchRequests = () => {
    // Mock data
    const mockRequests = [
      {
        id: 1,
        studentName: 'Б. Болд',
        email: 'bold@example.com',
        phone: '+976 9999-1111',
        country: 'Ирланд',
        message: 'Сайн байна уу, би бакалаврын хөтөлбөрт элсэх талаар зөвлөгөө авмаар байна.',
        status: 'new',
        submittedDate: '2024-03-20',
        interestedProgram: 'Бакалавр'
      },
      {
        id: 2,
        studentName: 'Ц. Сарантуяа',
        email: 'sara@example.com',
        phone: '+976 9999-2222',
        country: 'Их Британи',
        message: 'Магистрын хөтөлбөрт элсэх боломжийн талаар асуумаар байна.',
        status: 'new',
        submittedDate: '2024-03-19',
        interestedProgram: 'Магистр'
      },
      {
        id: 3,
        studentName: 'Г. Мөнхбат',
        email: 'munkh@example.com',
        phone: '+976 9999-3333',
        country: 'Канад',
        message: 'Хэлний бэлтгэл хөтөлбөрийн талаар мэдээлэл авахыг хүсч байна.',
        status: 'contacted',
        submittedDate: '2024-03-18',
        interestedProgram: 'Хэлний бэлтгэл'
      },
      {
        id: 4,
        studentName: 'Д. Ганболд',
        email: 'ganbold@example.com',
        phone: '+976 9999-4444',
        country: 'Ирланд',
        message: 'Дублин хотод суралцах талаар дэлгэрэнгүй мэдээлэл авмаар байна.',
        status: 'processing',
        submittedDate: '2024-03-15',
        interestedProgram: 'Бакалавр'
      },
      {
        id: 5,
        studentName: 'Н. Номин',
        email: 'nomin@example.com',
        phone: '+976 9999-5555',
        country: 'Их Британи',
        message: 'Визний процессийн талаар танилцуулга хүсч байна.',
        status: 'completed',
        submittedDate: '2024-03-10',
        interestedProgram: 'Магистр',
        completedDate: '2024-03-17'
      }
    ];

    setRequests(mockRequests);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userType');
    navigate('/');
  };

  const handleViewRequest = (request) => {
    setSelectedRequest(request);
    setShowRequestModal(true);
  };

  const handleUpdateStatus = (requestId, newStatus) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { 
            ...req, 
            status: newStatus,
            ...(newStatus === 'completed' && { completedDate: new Date().toISOString().split('T')[0] })
          }
        : req
    ));

    alert('Төлөв амжилттай шинэчлэгдлээ!');
    fetchStats();
    setShowRequestModal(false);
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    
    // API руу хүсэлт илгээх
    console.log('Updating profile:', profileForm);
    
    setAgencyData(prev => ({
      ...prev,
      description: profileForm.description,
      teamSize: parseInt(profileForm.teamSize),
      studentsHelped: parseInt(profileForm.studentsHelped),
      website: profileForm.website,
      facebook: profileForm.facebook,
      instagram: profileForm.instagram
    }));

    setEditMode(false);
    alert('Мэдээлэл амжилттай шинэчлэгдлээ!');
  };

  const handleProfileFormChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredRequests = requests.filter(req => {
    if (activeTab === 'all') return true;
    if (activeTab === 'requests') return true;
    return req.status === activeTab;
  });

  if (!agencyData) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Уншиж байна...</p>
      </div>
    );
  }

  return (
    <div className="agency-dashboard">
      <div className="dashboard-header">
        <div className="container">
          <div className="dashboard-header-content">
            <div className="agency-info">
              <div className="agency-avatar">{agencyData.logo}</div>
              <div>
                <h1 className="dashboard-title">{agencyData.name}</h1>
                <p className="dashboard-subtitle">Зуучлагчийн хяналтын самбар</p>
              </div>
            </div>
            <div className="header-actions">
              <button className="profile-btn" onClick={() => setShowProfileModal(true)}>
                Профайл
              </button>
              <button className="logout-btn" onClick={handleLogout}>
                Гарах
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon primary">
              📊
            </div>
            <div className="stat-content">
              <h3>{stats.totalRequests}</h3>
              <p>Нийт хүсэлт</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon info">
              📬
            </div>
            <div className="stat-content">
              <h3>{stats.newRequests}</h3>
              <p>Шинэ хүсэлт</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon warning">
              ⏳
            </div>
            <div className="stat-content">
              <h3>{stats.processing}</h3>
              <p>Хариуцаж байгаа</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon success">
              ✅
            </div>
            <div className="stat-content">
              <h3>{stats.completed}</h3>
              <p>Дууссан</p>
            </div>
          </div>
        </div>

        <div className="dashboard-tabs">
          <button
            className={`dashboard-tab ${activeTab === 'requests' ? 'active' : ''}`}
            onClick={() => setActiveTab('requests')}
          >
            Бүх хүсэлт ({requests.length})
          </button>
          <button
            className={`dashboard-tab ${activeTab === 'new' ? 'active' : ''}`}
            onClick={() => setActiveTab('new')}
          >
            Шинэ ({requests.filter(r => r.status === 'new').length})
          </button>
          <button
            className={`dashboard-tab ${activeTab === 'contacted' ? 'active' : ''}`}
            onClick={() => setActiveTab('contacted')}
          >
            Холбогдсон ({requests.filter(r => r.status === 'contacted').length})
          </button>
          <button
            className={`dashboard-tab ${activeTab === 'processing' ? 'active' : ''}`}
            onClick={() => setActiveTab('processing')}
          >
            Явагдаж буй ({requests.filter(r => r.status === 'processing').length})
          </button>
          <button
            className={`dashboard-tab ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            Дууссан ({requests.filter(r => r.status === 'completed').length})
          </button>
        </div>

        <div className="dashboard-content">
          <div className="content-header">
            <h2 className="content-title">Оюутнуудын хүсэлт</h2>
          </div>

          {filteredRequests.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📭</div>
              <p>Хүсэлт олдсонгүй</p>
            </div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Нэр</th>
                  <th>Утас</th>
                  <th>Улс орон</th>
                  <th>Хөтөлбөр</th>
                  <th>Огноо</th>
                  <th>Төлөв</th>
                  <th>Үйлдэл</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map(request => (
                  <tr key={request.id}>
                    <td>{request.studentName}</td>
                    <td>{request.phone}</td>
                    <td>{request.country}</td>
                    <td>{request.interestedProgram}</td>
                    <td>{request.submittedDate}</td>
                    <td>
                      <span className={`status-badge ${request.status}`}>
                        {request.status === 'new' && 'Шинэ'}
                        {request.status === 'contacted' && 'Холбогдсон'}
                        {request.status === 'processing' && 'Явагдаж буй'}
                        {request.status === 'completed' && 'Дууссан'}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="action-btn view"
                          onClick={() => handleViewRequest(request)}
                        >
                          Харах
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Request Detail Modal */}
      {showRequestModal && selectedRequest && (
        <div className="modal-overlay" onClick={() => setShowRequestModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Хүсэлтийн дэлгэрэнгүй</h2>
              <button className="modal-close" onClick={() => setShowRequestModal(false)}>
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <div className="detail-section">
              <h3>Оюутны мэдээлэл</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <p className="detail-label">Нэр:</p>
                  <p className="detail-value">{selectedRequest.studentName}</p>
                </div>
                <div className="detail-item">
                  <p className="detail-label">И-мэйл:</p>
                  <p className="detail-value">{selectedRequest.email}</p>
                </div>
                <div className="detail-item">
                  <p className="detail-label">Утас:</p>
                  <p className="detail-value">{selectedRequest.phone}</p>
                </div>
                <div className="detail-item">
                  <p className="detail-label">Сонирхож буй улс:</p>
                  <p className="detail-value">{selectedRequest.country}</p>
                </div>
                <div className="detail-item">
                  <p className="detail-label">Хөтөлбөр:</p>
                  <p className="detail-value">{selectedRequest.interestedProgram}</p>
                </div>
                <div className="detail-item">
                  <p className="detail-label">Төлөв:</p>
                  <span className={`status-badge ${selectedRequest.status}`}>
                    {selectedRequest.status === 'new' && 'Шинэ'}
                    {selectedRequest.status === 'contacted' && 'Холбогдсон'}
                    {selectedRequest.status === 'processing' && 'Явагдаж буй'}
                    {selectedRequest.status === 'completed' && 'Дууссан'}
                  </span>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h3>Мессеж</h3>
              <div className="detail-item">
                <p className="detail-value">{selectedRequest.message}</p>
              </div>
            </div>

            <div className="detail-section">
              <h3>Огноо</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <p className="detail-label">Илгээсэн:</p>
                  <p className="detail-value">{selectedRequest.submittedDate}</p>
                </div>
                {selectedRequest.completedDate && (
                  <div className="detail-item">
                    <p className="detail-label">Дууссан:</p>
                    <p className="detail-value">{selectedRequest.completedDate}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="modal-actions">
              {selectedRequest.status === 'new' && (
                <button
                  className="btn btn-primary"
                  onClick={() => handleUpdateStatus(selectedRequest.id, 'contacted')}
                >
                  Холбогдсон гэж тэмдэглэх
                </button>
              )}
              {selectedRequest.status === 'contacted' && (
                <button
                  className="btn btn-primary"
                  onClick={() => handleUpdateStatus(selectedRequest.id, 'processing')}
                >Явагдаж байгаа гэж тэмдэглэх
                </button>
              )}
              {selectedRequest.status === 'processing' && (
                <button
                  className="btn btn-primary"
                  onClick={() => handleUpdateStatus(selectedRequest.id, 'completed')}
                >
                  Дууссан гэж тэмдэглэх
                </button>
              )}
              <button className="btn btn-outline" onClick={() => setShowRequestModal(false)}>
                Хаах
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="modal-overlay" onClick={() => setShowProfileModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Миний профайл</h2>
              <button className="modal-close" onClick={() => setShowProfileModal(false)}>
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {!editMode ? (
              <>
                <div className="profile-section">
                  <h3 className="profile-section-title">Үндсэн мэдээлэл</h3>
                  <div className="info-display-grid">
                    <div className="info-display-item">
                      <p className="info-display-label">Газрын нэр:</p>
                      <p className="info-display-value">{agencyData.name}</p>
                    </div>
                    <div className="info-display-item">
                      <p className="info-display-label">И-мэйл:</p>
                      <p className="info-display-value">{agencyData.email}</p>
                    </div>
                    <div className="info-display-item">
                      <p className="info-display-label">Утас:</p>
                      <p className="info-display-value">{agencyData.phone}</p>
                    </div>
                    <div className="info-display-item">
                      <p className="info-display-label">Хаяг:</p>
                      <p className="info-display-value">{agencyData.address}</p>
                    </div>
                    <div className="info-display-item">
                      <p className="info-display-label">Регистр:</p>
                      <p className="info-display-value">{agencyData.registrationNumber}</p>
                    </div>
                    <div className="info-display-item">
                      <p className="info-display-label">Байгуулагдсан:</p>
                      <p className="info-display-value">{agencyData.established}</p>
                    </div>
                  </div>
                </div>

                <div className="profile-section">
                  <h3 className="profile-section-title">Нэмэлт мэдээлэл</h3>
                  <div className="info-display-grid">
                    <div className="info-display-item">
                      <p className="info-display-label">Багийн хэмжээ:</p>
                      <p className="info-display-value">{agencyData.teamSize} хүн</p>
                    </div>
                    <div className="info-display-item">
                      <p className="info-display-label">Туслсан оюутан:</p>
                      <p className="info-display-value">{agencyData.studentsHelped}+</p>
                    </div>
                    <div className="info-display-item">
                      <p className="info-display-label">Вэбсайт:</p>
                      <p className="info-display-value">{agencyData.website || '-'}</p>
                    </div>
                    <div className="info-display-item">
                      <p className="info-display-label">Facebook:</p>
                      <p className="info-display-value">{agencyData.facebook || '-'}</p>
                    </div>
                    <div className="info-display-item">
                      <p className="info-display-label">Instagram:</p>
                      <p className="info-display-value">{agencyData.instagram || '-'}</p>
                    </div>
                  </div>
                </div>

                <div className="profile-section">
                  <h3 className="profile-section-title">Тайлбар</h3>
                  <div className="info-display-item">
                    <p className="info-display-value">{agencyData.description}</p>
                  </div>
                </div>

                <div className="profile-section">
                  <h3 className="profile-section-title">Хамрах улс орнууд</h3>
                  <div className="services-display">
                    {agencyData.countries.map((country, idx) => (
                      <span key={idx} className="badge badge-primary">{country}</span>
                    ))}
                  </div>
                </div>

                <div className="profile-section">
                  <h3 className="profile-section-title">Үйлчилгээ</h3>
                  <div className="services-display">
                    {agencyData.services.map((service, idx) => (
                      <span key={idx} className="badge badge-success">{service}</span>
                    ))}
                  </div>
                </div>

                <div className="modal-actions">
                  <button className="btn btn-primary" onClick={() => setEditMode(true)}>
                    Засах
                  </button>
                  <button className="btn btn-outline" onClick={() => setShowProfileModal(false)}>
                    Хаах
                  </button>
                </div>
              </>
            ) : (
              <form className="profile-form" onSubmit={handleProfileUpdate}>
                <div className="form-group">
                  <label className="form-label">Тайлбар</label>
                  <textarea
                    name="description"
                    className="form-textarea"
                    value={profileForm.description}
                    onChange={handleProfileFormChange}
                    rows="4"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Багийн хэмжээ</label>
                    <input
                      type="number"
                      name="teamSize"
                      className="form-input"
                      value={profileForm.teamSize}
                      onChange={handleProfileFormChange}
                      min="1"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Туслсан оюутан</label>
                    <input
                      type="number"
                      name="studentsHelped"
                      className="form-input"
                      value={profileForm.studentsHelped}
                      onChange={handleProfileFormChange}
                      min="0"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Вэбсайт</label>
                  <input
                    type="url"
                    name="website"
                    className="form-input"
                    value={profileForm.website}
                    onChange={handleProfileFormChange}
                    placeholder="https://example.com"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Facebook</label>
                    <input
                      type="text"
                      name="facebook"
                      className="form-input"
                      value={profileForm.facebook}
                      onChange={handleProfileFormChange}
                      placeholder="facebook.com/youragency"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Instagram</label>
                    <input
                      type="text"
                      name="instagram"
                      className="form-input"
                      value={profileForm.instagram}
                      onChange={handleProfileFormChange}
                      placeholder="@youragency"
                    />
                  </div>
                </div>

                <div className="modal-actions">
                  <button type="submit" className="btn btn-primary">
                    Хадгалах
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline"
                    onClick={() => {
                      setEditMode(false);
                      setProfileForm({
                        description: agencyData.description,
                        teamSize: agencyData.teamSize.toString(),
                        studentsHelped: agencyData.studentsHelped.toString(),
                        website: agencyData.website,
                        facebook: agencyData.facebook,
                        instagram: agencyData.instagram
                      });
                    }}
                  >
                    Цуцлах
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AgencyDashboardPage;