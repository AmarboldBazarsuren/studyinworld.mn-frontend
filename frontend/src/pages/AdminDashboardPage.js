import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboardPage.css';

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pending');
  const [stats, setStats] = useState({
    totalAgencies: 0,
    pendingRequests: 0,
    totalCountries: 0,
    totalUniversities: 0
  });
  const [agencies, setAgencies] = useState([]);
  const [selectedAgency, setSelectedAgency] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Админ эрх шалгах
    const adminToken = localStorage.getItem('adminToken');
    const userType = localStorage.getItem('userType');

    if (!adminToken || userType !== 'admin') {
      navigate('/admin/login');
      return;
    }

    // API-аас өгөгдөл татах
    fetchStats();
    fetchAgencies();
  }, [navigate]);

  const fetchStats = () => {
    // Mock data
    setStats({
      totalAgencies: 8,
      pendingRequests: 3,
      totalCountries: 6,
      totalUniversities: 45
    });
  };

  const fetchAgencies = () => {
    // Mock data
    const mockAgencies = [
      {
        id: 1,
        name: 'Global Education Mongolia',
        email: 'info@globaledu.mn',
        phone: '+976 7777-7777',
        registrationNumber: '1234567890',
        established: 2013,
        countries: ['Ирланд', 'Их Британи', 'Канад'],
        services: ['Сургууль сонгох', 'Виз зөвлөгөө', 'Байр хайх'],
        status: 'pending',
        submittedDate: '2024-03-15'
      },
      {
        id: 2,
        name: 'Study Abroad Mongolia',
        email: 'contact@studyabroad.mn',
        phone: '+976 8888-8888',
        registrationNumber: '0987654321',
        established: 2015,
        countries: ['Австрали', 'Ирланд', 'АНУ'],
        services: ['Элсэлтийн баримт', 'Виз зөвлөгөө', 'Санхүүгийн зөвлөгөө'],
        status: 'pending',
        submittedDate: '2024-03-18'
      },
      {
        id: 3,
        name: 'Education First Mongolia',
        email: 'mongolia@educationfirst.com',
        phone: '+976 9999-9999',
        registrationNumber: '1122334455',
        established: 2010,
        countries: ['Их Британи', 'Герман', 'Канад', 'АНУ'],
        services: ['Хэлний бэлтгэл', 'Их сургууль элсэлт', 'Виз дэмжлэг'],
        status: 'approved',
        submittedDate: '2024-02-10',
        approvedDate: '2024-02-15'
      },
      {
        id: 4,
        name: 'Pathway International',
        email: 'hello@pathway.mn',
        phone: '+976 8877-8877',
        registrationNumber: '5566778899',
        established: 2014,
        countries: ['Австрали', 'Канад'],
        services: ['Сургуулийн элсэлт', 'Виз процесс', 'PR зөвлөгөө'],
        status: 'approved',
        submittedDate: '2024-02-20',
        approvedDate: '2024-02-25'
      },
      {
        id: 5,
        name: 'Test Agency Rejected',
        email: 'test@rejected.mn',
        phone: '+976 1111-1111',
        registrationNumber: '9999999999',
        established: 2020,
        countries: ['Ирланд'],
        services: ['Сургууль сонгох'],
        status: 'rejected',
        submittedDate: '2024-03-10',
        rejectedDate: '2024-03-12',
        rejectionReason: 'Баримт бичиг дутуу байна'
      }
    ];

    setAgencies(mockAgencies);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userType');
    navigate('/admin/login');
  };

  const handleViewDetails = (agency) => {
    setSelectedAgency(agency);
    setShowModal(true);
  };

  const handleApprove = (agencyId) => {
    if (window.confirm('Энэ зуучлалын газрыг зөвшөөрөх үү?')) {
      // API руу хүсэлт илгээх
      console.log('Approving agency:', agencyId);
      
      setAgencies(prev => prev.map(agency => 
        agency.id === agencyId 
          ? { ...agency, status: 'approved', approvedDate: new Date().toISOString().split('T')[0] }
          : agency
      ));

      alert('Амжилттай зөвшөөрөгдлөө!');
      fetchStats();
    }
  };

  const handleReject = (agencyId) => {
    const reason = prompt('Татгалзсан шалтгаан:');
    if (reason) {
      // API руу хүсэлт илгээх
      console.log('Rejecting agency:', agencyId, 'Reason:', reason);
      
      setAgencies(prev => prev.map(agency => 
        agency.id === agencyId 
          ? { ...agency, status: 'rejected', rejectedDate: new Date().toISOString().split('T')[0], rejectionReason: reason }
          : agency
      ));

      alert('Амжилттай татгалзлаа!');
      fetchStats();
    }
  };

  const filteredAgencies = agencies.filter(agency => {
    if (activeTab === 'all') return true;
    return agency.status === activeTab;
  });

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div className="container">
          <div className="dashboard-header-content">
            <div>
              <h1 className="dashboard-title">Админ хяналтын самбар</h1>
              <p className="dashboard-subtitle">StudyInWorld.mn удирдлагын систем</p>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              Гарах
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon primary">
              🏢
            </div>
            <div className="stat-content">
              <h3>{stats.totalAgencies}</h3>
              <p>Нийт зуучлагч</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon warning">
              ⏳
            </div>
            <div className="stat-content">
              <h3>{stats.pendingRequests}</h3>
              <p>Хүлээгдэж буй хүсэлт</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon success">
              🌍
            </div>
            <div className="stat-content">
              <h3>{stats.totalCountries}</h3>
              <p>Улс орнууд</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon danger">
              🎓
            </div>
            <div className="stat-content">
              <h3>{stats.totalUniversities}</h3>
              <p>Их сургуулиуд</p>
            </div>
          </div>
        </div>

        <div className="dashboard-tabs">
          <button
            className={`dashboard-tab ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            Хүлээгдэж буй ({agencies.filter(a => a.status === 'pending').length})
          </button>
          <button
            className={`dashboard-tab ${activeTab === 'approved' ? 'active' : ''}`}
            onClick={() => setActiveTab('approved')}
          >
            Зөвшөөрөгдсөн ({agencies.filter(a => a.status === 'approved').length})
          </button>
          <button
            className={`dashboard-tab ${activeTab === 'rejected' ? 'active' : ''}`}
            onClick={() => setActiveTab('rejected')}
          >
            Татгалзсан ({agencies.filter(a => a.status === 'rejected').length})
          </button>
          <button
            className={`dashboard-tab ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            Бүгд ({agencies.length})
          </button>
        </div>

        <div className="dashboard-content">
          <div className="content-header">
            <h2 className="content-title">Зуучлалын газрууд</h2>
          </div>

          {filteredAgencies.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📭</div>
              <p>Өгөгдөл олдсонгүй</p>
            </div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Нэр</th>
                  <th>И-мэйл</th>
                  <th>Улс орнууд</th>
                  <th>Огноо</th>
                  <th>Төлөв</th>
                  <th>Үйлдэл</th>
                </tr>
              </thead>
              <tbody>
                {filteredAgencies.map(agency => (
                  <tr key={agency.id}>
                    <td>{agency.name}</td>
                    <td>{agency.email}</td>
                    <td>
                      {agency.countries.slice(0, 2).map((country, idx) => (
                        <span key={idx} className="badge badge-primary countries-list-item">
                          {country}
                        </span>
                      ))}
                      {agency.countries.length > 2 && (
                        <span className="badge badge-primary">+{agency.countries.length - 2}</span>
                      )}
                    </td>
                    <td>{agency.submittedDate}</td>
                    <td>
                      <span className={`status-badge ${agency.status}`}>
                        {agency.status === 'pending' && 'Хүлээгдэж буй'}
                        {agency.status === 'approved' && 'Зөвшөөрөгдсөн'}
                        {agency.status === 'rejected' && 'Татгалзсан'}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="action-btn view"
                          onClick={() => handleViewDetails(agency)}
                        >
                          Харах
                        </button>
                        {agency.status === 'pending' && (
                          <>
                            <button
                              className="action-btn approve"
                              onClick={() => handleApprove(agency.id)}
                            >
                              Зөвшөөрөх
                            </button>
                            <button
                              className="action-btn reject"
                              onClick={() => handleReject(agency.id)}
                            >
                              Татгалзах
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showModal && selectedAgency && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Зуучлалын газрын дэлгэрэнгүй</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <div className="detail-section">
              <h3>Үндсэн мэдээлэл</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <p className="detail-label">Газрын нэр:</p>
                  <p className="detail-value">{selectedAgency.name}</p>
                </div>
                <div className="detail-item">
                  <p className="detail-label">И-мэйл:</p>
                  <p className="detail-value">{selectedAgency.email}</p>
                </div>
                <div className="detail-item">
                  <p className="detail-label">Утас:</p>
                  <p className="detail-value">{selectedAgency.phone}</p>
                </div>
                <div className="detail-item">
                  <p className="detail-label">Регистр:</p>
                  <p className="detail-value">{selectedAgency.registrationNumber}</p>
                </div>
                <div className="detail-item">
                  <p className="detail-label">Байгуулагдсан:</p>
                  <p className="detail-value">{selectedAgency.established}</p>
                </div>
                <div className="detail-item">
                  <p className="detail-label">Төлөв:</p>
                  <span className={`status-badge ${selectedAgency.status}`}>
                    {selectedAgency.status === 'pending' && 'Хүлээгдэж буй'}
                    {selectedAgency.status === 'approved' && 'Зөвшөөрөгдсөн'}
                    {selectedAgency.status === 'rejected' && 'Татгалзсан'}
                  </span>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h3>Хамрах улс орнууд</h3>
              <div>
                {selectedAgency.countries.map((country, idx) => (
                  <span key={idx} className="badge badge-primary countries-list-item">
                    {country}
                  </span>
                ))}
              </div>
            </div>

            <div className="detail-section">
              <h3>Үйлчилгээ</h3>
              <div>
                {selectedAgency.services.map((service, idx) => (
                  <span key={idx} className="badge badge-success countries-list-item">
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {selectedAgency.status === 'rejected' && selectedAgency.rejectionReason && (
              <div className="detail-section">
                <h3>Татгалзсан шалтгаан</h3>
                <div className="detail-item">
                  <p className="detail-value">{selectedAgency.rejectionReason}</p>
                </div>
              </div>
            )}

            <div className="modal-actions">
              {selectedAgency.status === 'pending' && (
                <>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      handleApprove(selectedAgency.id);
                      setShowModal(false);
                    }}
                  >
                    Зөвшөөрөх
                  </button>
                  <button
                    className="btn btn-outline"
                    onClick={() => {
                      handleReject(selectedAgency.id);
                      setShowModal(false);
                    }}
                  >
                    Татгалзах
                  </button>
                </>
              )}
              <button className="btn btn-outline" onClick={() => setShowModal(false)}>
                Хаах
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;