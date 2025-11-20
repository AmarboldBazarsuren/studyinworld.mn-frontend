import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AgenciesPage.css';

const AgenciesPage = () => {
  const [agencies, setAgencies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');

  useEffect(() => {
    // API-аас өгөгдөл татах
    const mockAgencies = [
      {
        id: 1,
        name: 'Global Education Mongolia',
        logo: '🌏',
        description: 'Олон улсын боловсролын салбарт 10 жилийн туршлагатай, 500+ оюутанд үйлчилсэн.',
        countries: ['Ирланд', 'Их Британи', 'Канад'],
        rating: 4.8,
        reviewsCount: 124,
        studentsHelped: 500,
        established: 2013,
        services: ['Сургууль сонгох', 'Виз зөвлөгөө', 'Байр хайх', 'Ажил олоход туслах'],
        contactEmail: 'info@globaledu.mn',
        contactPhone: '+976 7777-7777'
      },
      {
        id: 2,
        name: 'Study Abroad Mongolia',
        logo: '✈️',
        description: 'Гадаадад суралцах бүх үйл явцад мэргэжлийн дэмжлэг үзүүлдэг.',
        countries: ['Австрали', 'Ирланд', 'АНУ'],
        rating: 4.6,
        reviewsCount: 89,
        studentsHelped: 350,
        established: 2015,
        services: ['Элсэлтийн баримт', 'Виз зөвлөгөө', 'Санхүүгийн зөвлөгөө', 'Оршин суух зөвшөөрөл'],
        contactEmail: 'contact@studyabroad.mn',
        contactPhone: '+976 8888-8888'
      },
      {
        id: 3,
        name: 'Education First Mongolia',
        logo: '🎓',
        description: 'Дэлхийн хэмжээнд үйл ажиллагаа явуулдаг олон улсын боловсролын байгууллага.',
        countries: ['Их Британи', 'Герман', 'Канад', 'АНУ'],
        rating: 4.9,
        reviewsCount: 156,
        studentsHelped: 780,
        established: 2010,
        services: ['Хэлний бэлтгэл', 'Их сургууль элсэлт', 'Виз дэмжлэг', 'Оюутны дэмжлэг'],
        contactEmail: 'mongolia@educationfirst.com',
        contactPhone: '+976 9999-9999'
      },
      {
        id: 4,
        name: 'Pathway International',
        logo: '🚀',
        description: 'Австрали, Канад зэрэг улс орнуудад тусгайлсан зуучлалын үйлчилгээ.',
        countries: ['Австрали', 'Канад'],
        rating: 4.7,
        reviewsCount: 95,
        studentsHelped: 420,
        established: 2014,
        services: ['Сургуулийн элсэлт', 'Виз процесс', 'Дасан зохицох дэмжлэг', 'PR зөвлөгөө'],
        contactEmail: 'hello@pathway.mn',
        contactPhone: '+976 8877-8877'
      }
    ];

    setAgencies(mockAgencies);
  }, []);

  const countries = ['all', 'Ирланд', 'Австрали', 'Канад', 'Их Британи', 'АНУ', 'Герман'];

  const filteredAgencies = agencies.filter(agency => {
    const matchesSearch = agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agency.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = selectedCountry === 'all' || agency.countries.includes(selectedCountry);
    return matchesSearch && matchesCountry;
  });

  return (
    <div className="agencies-page">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Зуучлалын газрууд</h1>
          <p className="page-description">
            Баталгаат зуучлалын газруудаас өөрт тохирохыг сонгоно уу
          </p>
        </div>
      </div>

      <div className="container">
        <div className="cta-banner">
          <div className="cta-banner-content">
            <h2>Та зуучлалын газар уу?</h2>
            <p>Манай платформд нэгдээд олон оюутантай холбогдох боломжтой</p>
          </div>
          <Link to="/agency-register" className="btn btn-secondary">
            Зуучлагч бүртгүүлэх
          </Link>
        </div>

        <div className="filters-section">
          <div className="search-box">
            <svg className="search-icon" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Зуучлагч хайх..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="country-filter">
            <label className="filter-label">Улс орноор шүүх:</label>
            <select
              className="form-select"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="all">Бүх улс</option>
              {countries.slice(1).map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
        </div>

        {filteredAgencies.length === 0 ? (
          <div className="no-results">
            <p>Хайлтын үр дүн олдсонгүй</p>
          </div>
        ) : (
          <div className="agencies-grid">
            {filteredAgencies.map(agency => (
              <div key={agency.id} className="agency-card">
                <div className="agency-header">
                  <div className="agency-logo">{agency.logo}</div>
                  <div className="agency-rating">
                    <span className="rating-value">⭐ {agency.rating}</span>
                    <span className="rating-count">({agency.reviewsCount} үнэлгээ)</span>
                  </div>
                </div>

                <h3 className="agency-name">{agency.name}</h3>
                <p className="agency-description">{agency.description}</p>

                <div className="agency-stats">
                  <div className="stat-item">
                    <svg className="stat-icon" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                    <span>{agency.studentsHelped}+ оюутан</span>
                  </div>
                  <div className="stat-item">
                    <svg className="stat-icon" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <span>{agency.established} оноос</span>
                  </div>
                </div>

                <div className="agency-countries">
                  {agency.countries.map((country, idx) => (
                    <span key={idx} className="badge badge-primary">{country}</span>
                  ))}
                </div>

                <div className="agency-services">
                  <h4 className="services-title">Үйлчилгээ:</h4>
                  <ul className="services-list">
                    {agency.services.slice(0, 3).map((service, idx) => (
                      <li key={idx}>
                        <svg className="check-icon" width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="agency-actions">
                  <Link to={`/agency/${agency.id}`} className="btn btn-primary">
                    Дэлгэрэнгүй
                  </Link>
                  <button className="btn btn-outline">
                    Холбогдох
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AgenciesPage;