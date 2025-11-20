import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CalculatorPage.css';

const CalculatorPage = () => {
  const { countryId } = useParams();
  const [country, setCountry] = useState(null);
  const [formData, setFormData] = useState({
    university: '',
    programType: '',
    flightCompany: '',
    agency: '',
    accommodationType: 'shared',
    accommodationMonths: 12,
    includeInsurance: true
  });
  const [calculation, setCalculation] = useState(null);

  useEffect(() => {
    // API-аас өгөгдөл татах
    const mockCountry = {
      id: 1,
      name: 'Ирланд',
      currency: 'EUR',
      currencySymbol: '€',
      universities: [
        {
          id: 1,
          name: 'Trinity College Dublin',
          programs: {
            language: 5000,
            bachelor: 14000,
            master: 16000
          }
        },
        {
          id: 2,
          name: 'University College Dublin',
          programs: {
            language: 4500,
            bachelor: 13000,
            master: 15000
          }
        },
        {
          id: 3,
          name: 'Dublin Business School',
          programs: {
            language: 3500,
            bachelor: 10000,
            master: 12000
          }
        }
      ],
      flights: [
        { id: 1, company: 'Turkish Airlines', price: 1200 },
        { id: 2, company: 'Qatar Airways', price: 1400 },
        { id: 3, company: 'Emirates', price: 1500 }
      ],
      agencies: [
        { id: 1, name: 'Global Education', fee: 500 },
        { id: 2, name: 'Study Abroad Mongolia', fee: 600 },
        { id: 3, name: 'Education First', fee: 450 }
      ],
      accommodation: {
        dormitory: 500,
        shared: 650,
        studio: 1150
      },
      insurance: 50,
      visa: 300
    };

    setCountry(mockCountry);
  }, [countryId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const calculateTotal = () => {
    if (!country || !formData.university || !formData.programType) {
      alert('Сургууль болон хөтөлбөр сонгоно уу');
      return;
    }

    const selectedUniversity = country.universities.find(u => u.id === parseInt(formData.university));
    const tuitionFee = selectedUniversity.programs[formData.programType] || 0;
    
    const flightCost = formData.flightCompany 
      ? country.flights.find(f => f.id === parseInt(formData.flightCompany))?.price || 0
      : 0;
    
    const agencyFee = formData.agency
      ? country.agencies.find(a => a.id === parseInt(formData.agency))?.fee || 0
      : 0;

    const accommodationCost = country.accommodation[formData.accommodationType] * formData.accommodationMonths;
    const insuranceCost = formData.includeInsurance ? country.insurance * 12 : 0;
    const visaCost = country.visa;

    const total = tuitionFee + flightCost + agencyFee + accommodationCost + insuranceCost + visaCost;

    setCalculation({
      tuitionFee,
      flightCost,
      agencyFee,
      accommodationCost,
      insuranceCost,
      visaCost,
      total,
      universityName: selectedUniversity.name,
      programName: getProgramName(formData.programType)
    });
  };

  const getProgramName = (type) => {
    const names = {
      language: 'Хэлний бэлтгэл',
      bachelor: 'Бакалавр',
      master: 'Магистр'
    };
    return names[type] || '';
  };

  if (!country) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Уншиж байна...</p>
      </div>
    );
  }

  return (
    <div className="calculator-page">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Зардлын тооцоолуур</h1>
          <p className="page-description">
            {country.name}-д суралцахад шаардагдах нийт зардлыг тооцоолоорой
          </p>
        </div>
      </div>

      <div className="container">
        <div className="calculator-container">
          <div className="calculator-form">
            <h2 className="form-section-title">Мэдээлэл оруулах</h2>

            <div className="form-group">
              <label className="form-label">Их сургууль *</label>
              <select
                name="university"
                className="form-select"
                value={formData.university}
                onChange={handleInputChange}
              >
                <option value="">Сонгоно уу</option>
                {country.universities.map(uni => (
                  <option key={uni.id} value={uni.id}>{uni.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Хөтөлбөр *</label>
              <select
                name="programType"
                className="form-select"
                value={formData.programType}
                onChange={handleInputChange}
                disabled={!formData.university}
              >
                <option value="">Сонгоно уу</option>
                <option value="language">Хэлний бэлтгэл</option>
                <option value="bachelor">Бакалавр</option>
                <option value="master">Магистр</option>
              </select>
              {formData.university && formData.programType && (
                <div className="cost-preview">
                  Элсэлтийн хураамж: {country.currencySymbol}
                  {country.universities.find(u => u.id === parseInt(formData.university))
                    .programs[formData.programType].toLocaleString()}
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Нислэгийн компани</label>
              <select
                name="flightCompany"
                className="form-select"
                value={formData.flightCompany}
                onChange={handleInputChange}
              >
                <option value="">Сонгоно уу</option>
                {country.flights.map(flight => (
                  <option key={flight.id} value={flight.id}>
                    {flight.company} - {country.currencySymbol}{flight.price.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Зуучлалын газар</label>
              <select
                name="agency"
                className="form-select"
                value={formData.agency}
                onChange={handleInputChange}
              >
                <option value="">Сонгоно уу</option>
                {country.agencies.map(agency => (
                  <option key={agency.id} value={agency.id}>
                    {agency.name} - {country.currencySymbol}{agency.fee.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Байрны төрөл</label>
              <select
                name="accommodationType"
                className="form-select"
                value={formData.accommodationType}
                onChange={handleInputChange}
              >
                <option value="dormitory">
                  Дотуур байр - {country.currencySymbol}{country.accommodation.dormitory}/сар
                </option>
                <option value="shared">
                  Хамтран түрээслэх - {country.currencySymbol}{country.accommodation.shared}/сар
                </option>
                <option value="studio">
                  Студио - {country.currencySymbol}{country.accommodation.studio}/сар
                </option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Байрны хугацаа (сар)</label>
              <input
                type="number"
                name="accommodationMonths"
                className="form-input"
                value={formData.accommodationMonths}
                onChange={handleInputChange}
                min="1"
                max="24"
              />
              <div className="cost-preview">
                Нийт байрны зардал: {country.currencySymbol}
                {(country.accommodation[formData.accommodationType] * formData.accommodationMonths).toLocaleString()}
              </div>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="includeInsurance"
                  checked={formData.includeInsurance}
                  onChange={handleInputChange}
                />
                <span>Эрүүл мэндийн даатгал оруулах ({country.currencySymbol}{country.insurance}/сар)</span>
              </label>
            </div>

            <button className="btn btn-primary btn-lg" onClick={calculateTotal}>
              Тооцоолох
            </button>
          </div>

          {calculation && (
            <div className="calculation-result">
              <h2 className="result-title">Тооцооны үр дүн</h2>
              
              <div className="result-summary">
                <div className="summary-item">
                  <span className="summary-label">Сургууль:</span>
                  <span className="summary-value">{calculation.universityName}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Хөтөлбөр:</span>
                  <span className="summary-value">{calculation.programName}</span>
                </div>
              </div>

              <div className="result-breakdown">
                <div className="breakdown-item">
                  <div className="breakdown-label">
                    <svg className="breakdown-icon" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                    </svg>
                    Элсэлтийн хураамж
                  </div>
                  <div className="breakdown-value">
                    {country.currencySymbol}{calculation.tuitionFee.toLocaleString()}
                  </div>
                </div>

                {calculation.flightCost > 0 && (
                  <div className="breakdown-item">
                    <div className="breakdown-label">
                      <svg className="breakdown-icon" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                      </svg>
                      Нислэгийн тийз
                    </div>
                    <div className="breakdown-value">
                      {country.currencySymbol}{calculation.flightCost.toLocaleString()}
                    </div>
                  </div>
                )}

                {calculation.agencyFee > 0 && (
                  <div className="breakdown-item">
                    <div className="breakdown-label">
                      <svg className="breakdown-icon" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                      </svg>
                      Зуучлалын хөлс
                    </div>
                    <div className="breakdown-value">
                      {country.currencySymbol}{calculation.agencyFee.toLocaleString()}
                    </div>
                  </div>
                )}

                <div className="breakdown-item">
                  <div className="breakdown-label">
                    <svg className="breakdown-icon" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1
                      h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                    </svg>
                    Байрны түрээс ({formData.accommodationMonths} сар)
                  </div>
                  <div className="breakdown-value">
                    {country.currencySymbol}{calculation.accommodationCost.toLocaleString()}
                  </div>
                </div>

                {calculation.insuranceCost > 0 && (
                  <div className="breakdown-item">
                    <div className="breakdown-label">
                      <svg className="breakdown-icon" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                      </svg>
                      Эрүүл мэндийн даатгал (12 сар)
                    </div>
                    <div className="breakdown-value">
                      {country.currencySymbol}{calculation.insuranceCost.toLocaleString()}
                    </div>
                  </div>
                )}

                <div className="breakdown-item">
                  <div className="breakdown-label">
                    <svg className="breakdown-icon" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    Визний хураамж
                  </div>
                  <div className="breakdown-value">
                    {country.currencySymbol}{calculation.visaCost.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="result-total">
                <span className="total-label">Нийт зардал:</span>
                <span className="total-value">
                  {country.currencySymbol}{calculation.total.toLocaleString()}
                </span>
              </div>

              <div className="result-note">
                <svg className="note-icon" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                </svg>
                <p>
                  Энэхүү тооцоолол нь зөвхөн танилцуулга зориулалттай бөгөөд бодит зардал өөрчлөгдөж болно. 
                  Хоол хүнс, тээвэр болон бусад хувийн зардлууд орсонгүй.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalculatorPage;