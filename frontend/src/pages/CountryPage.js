import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CountryPage.css';

const CountryPage = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');

  useEffect(() => {
    // API-аас өгөгдөл татах (одоогоор хуурамч өгөгдөл)
    const mockCountries = [
      {
        id: 1,
        name: 'Ирланд',
        nameEn: 'Ireland',
        flag: '🇮🇪',
        region: 'europe',
        universitiesCount: 12,
        studentsCount: 150,
        averageTuition: 12000,
        averageLiving: 10000,
        description: 'Европын боловсролын төв, ажлын боломж өндөр',
        workPermit: true,
        languageRequirement: 'IELTS 6.0+'
      },
      {
        id: 2,
        name: 'Австрали',
        nameEn: 'Australia',
        flag: '🇦🇺',
        region: 'oceania',
        universitiesCount: 18,
        studentsCount: 200,
        averageTuition: 20000,
        averageLiving: 15000,
        description: 'Өндөр чанарын боловсрол, амьдрах таатай орчин',
        workPermit: true,
        languageRequirement: 'IELTS 6.5+'
      },
      {
        id: 3,
        name: 'Канад',
        nameEn: 'Canada',
        flag: '🇨🇦',
        region: 'north-america',
        universitiesCount: 15,
        studentsCount: 180,
        averageTuition: 15000,
        averageLiving: 12000,
        description: 'Олон үндэстний орчин, суралцсаны дараа ажиллах боломж',
        workPermit: true,
        languageRequirement: 'IELTS 6.5+'
      },
      {
        id: 4,
        name: 'Их Британи',
        nameEn: 'United Kingdom',
        flag: '🇬🇧',
        region: 'europe',
        universitiesCount: 25,
        studentsCount: 220,
        averageTuition: 18000,
        averageLiving: 14000,
        description: 'Уламжлалт боловсрол, дэлхийн шилдэг их сургуулиуд',
        workPermit: true,
        languageRequirement: 'IELTS 6.0+'
      },
      {
        id: 5,
        name: 'АНУ',
        nameEn: 'United States',
        flag: '🇺🇸',
        region: 'north-america',
        universitiesCount: 30,
        studentsCount: 250,
        averageTuition: 25000,
        averageLiving: 18000,
        description: 'Дэлхийн шилдэг их сургуулиуд, судалгаа шинжилгээний төв',
        workPermit: true,
        languageRequirement: 'TOEFL 80+'
      },
      {
        id: 6,
        name: 'Герман',
        nameEn: 'Germany',
        flag: '🇩🇪',
        region: 'europe',
        universitiesCount: 20,
        studentsCount: 170,
        averageTuition: 0,
        averageLiving: 9000,
        description: 'Төрийн их сургуулиуд үнэгүй, инженерийн боловсрол өндөр',
        workPermit: true,
        languageRequirement: 'IELTS 6.0+ эсвэл Герман хэл'
      }
    ];

    setCountries(mockCountries);
  }, []);

  const regions = [
    { value: 'all', label: 'Бүх бүс нутаг' },
    { value: 'europe', label: 'Европ' },
    { value: 'north-america', label: 'Хойд Америк' },
    { value: 'oceania', label: 'Номхон далай' },
    { value: 'asia', label: 'Ази' }
  ];

  const filteredCountries = countries.filter(country => {
    const matchesSearch = country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         country.nameEn.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || country.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="country-page">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Улс орнууд</h1>
          <p className="page-description">
            Дэлхийн өнцөг булан бүрээс өөрт тохирох улс орноо сонгоно уу
          </p>
        </div>
      </div>

      <div className="container">
        <div className="filters-section">
          <div className="search-box">
            <svg className="search-icon" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Улс хайх..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="region-filters">
            {regions.map(region => (
              <button
                key={region.value}
                className={`filter-btn ${selectedRegion === region.value ? 'active' : ''}`}
                onClick={() => setSelectedRegion(region.value)}
              >
                {region.label}
              </button>
            ))}
          </div>
        </div>

        {filteredCountries.length === 0 ? (
          <div className="no-results">
            <p>Хайлтын үр дүн олдсонгүй</p>
          </div>
        ) : (
          <div className="countries-grid">
            {filteredCountries.map(country => (
              <div key={country.id} className="country-item">
                <div className="country-item-header">
                  <div className="country-flag-large">{country.flag}</div>
                  <div className="country-info">
                    <h2 className="country-item-name">{country.name}</h2>
                    <p className="country-item-name-en">{country.nameEn}</p>
                  </div>
                </div>

                <p className="country-item-description">{country.description}</p>

                <div className="country-features">
                  <div className="feature-item">
                    <svg className="feature-icon" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                    </svg>
                    <span>{country.universitiesCount} их сургууль</span>
                  </div>
                  <div className="feature-item">
                    <svg className="feature-icon" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                    <span>{country.studentsCount}+ оюутан</span>
                  </div>
                  <div className="feature-item">
                    <svg className="feature-icon" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>${country.averageTuition.toLocaleString()}/жил</span>
                  </div>
                </div>

                <div className="country-badges">
                  {country.workPermit && (
                    <span className="badge badge-success">Ажлын зөвшөөрөл</span>
                  )}
                  <span className="badge badge-primary">{country.languageRequirement}</span>
                </div>

                <div className="country-item-actions">
                  <Link to={`/country/${country.id}`} className="btn btn-primary">
                    Дэлгэрэнгүй
                  </Link>
                  <Link to={`/calculator/${country.id}`} className="btn btn-outline">
                    Зардал тооцоолох
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryPage;