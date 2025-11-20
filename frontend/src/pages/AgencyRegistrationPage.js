import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AgencyRegistrationPage.css';

const AgencyRegistrationPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    agencyName: '',
    agencyNameEn: '',
    registrationNumber: '',
    established: '',
    
    // Step 2: Contact Info
    email: '',
    phone: '',
    address: '',
    website: '',
    facebook: '',
    instagram: '',
    
    // Step 3: Services & Countries
    countries: [],
    services: [],
    
    // Step 4: Additional Info
    description: '',
    teamSize: '',
    studentsHelped: '',
    
    // Documents
    licenseDocument: null,
    certificateDocument: null
  });

  const [errors, setErrors] = useState({});

  const countries = [
    'Ирланд', 'Австрали', 'Канад', 'Их Британи', 'АНУ', 
    'Герман', 'Франц', 'Нидерланд', 'Шинэ Зеланд', 'Япон'
  ];

  const servicesList = [
    'Сургууль сонгох зөвлөгөө',
    'Элсэлтийн баримт бичиг',
    'Виз процессын дэмжлэг',
    'Байр хайх туслалцаа',
    'Ажил олоход дэмжлэг',
    'Банкны данс нээх',
    'Даатгалын үйлчилгээ',
    'Хэлний бэлтгэл',
    'Оюутны визийн сунгалт',
    'Санхүүгийн зөвлөгөө'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        [field]: file
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.agencyName) newErrors.agencyName = 'Газрын нэр оруулна уу';
      if (!formData.agencyNameEn) newErrors.agencyNameEn = 'Англи нэр оруулна уу';
      if (!formData.registrationNumber) newErrors.registrationNumber = 'Регистрийн дугаар оруулна уу';
      if (!formData.established) newErrors.established = 'Байгуулагдсан он оруулна уу';
    }

    if (step === 2) {
      if (!formData.email) newErrors.email = 'И-мэйл оруулна уу';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'И-мэйл буруу байна';
      if (!formData.phone) newErrors.phone = 'Утасны дугаар оруулна уу';
      if (!formData.address) newErrors.address = 'Хаяг оруулна уу';
    }

    if (step === 3) {
      if (formData.countries.length === 0) newErrors.countries = 'Наад зах нь 1 улс сонгоно уу';
      if (formData.services.length === 0) newErrors.services = 'Наад зах нь 1 үйлчилгээ сонгоно уу';
    }

    if (step === 4) {
      if (!formData.description) newErrors.description = 'Тайлбар оруулна уу';
      if (!formData.licenseDocument) newErrors.licenseDocument = 'Лицензийн хуулбар оруулна уу';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(4)) {
      // API руу өгөгдөл илгээх
      console.log('Form submitted:', formData);
      alert('Таны хүсэлт амжилттай илгээгдлээ! Админ батлах хүртэл хүлээнэ үү.');
      navigate('/');
    }
  };

  const steps = [
    { number: 1, title: 'Үндсэн мэдээлэл' },
    { number: 2, title: 'Холбоо барих' },
    { number: 3, title: 'Үйлчилгээ' },
    { number: 4, title: 'Нэмэлт мэдээлэл' }
  ];

  return (
    <div className="registration-page">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Зуучлагч бүртгүүлэх</h1>
          <p className="page-description">
            Манай платформд нэгдээд олон оюутантай холбогдох боломжтой
          </p>
        </div>
      </div>

      <div className="container-sm">
        <div className="steps-indicator">
          {steps.map((step, idx) => (
            <div 
              key={step.number}
              className={`step-indicator ${currentStep >= step.number ? 'active' : ''} ${currentStep > step.number ? 'completed' : ''}`}
            >
              <div className="step-number">
                {currentStep > step.number ? (
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                ) : (
                  step.number
                )}
              </div>
              <div className="step-info">
                <span className="step-title">{step.title}</span>
              </div>
              {idx < steps.length - 1 && <div className="step-line"></div>}
            </div>
          ))}
        </div>

        <form className="registration-form" onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <div className="form-step">
              <h2 className="step-heading">Үндсэн мэдээлэл</h2>

              <div className="form-group">
                <label className="form-label">Газрын нэр (Монгол) *</label>
                <input
                  type="text"
                  name="agencyName"
                  className={`form-input ${errors.agencyName ? 'error' : ''}`}
                  value={formData.agencyName}
                  onChange={handleInputChange}
                  placeholder="Жишээ: Глобал Боловсрол"
                />
                {errors.agencyName && <span className="form-error">{errors.agencyName}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Газрын нэр (Англи) *</label>
                <input
                  type="text"
                  name="agencyNameEn"
                  className={`form-input ${errors.agencyNameEn ? 'error' : ''}`}
                  value={formData.agencyNameEn}
                  onChange={handleInputChange}
                  placeholder="Example: Global Education"
                />
                {errors.agencyNameEn && <span className="form-error">{errors.agencyNameEn}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Регистрийн дугаар *</label>
                <input
                  type="text"
                  name="registrationNumber"
                  className={`form-input ${errors.registrationNumber ? 'error' : ''}`}
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  placeholder="1234567890"
                />
                {errors.registrationNumber && <span className="form-error">{errors.registrationNumber}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Байгуулагдсан он *</label>
                <input
                  type="number"
                  name="established"
                  className={`form-input ${errors.established ? 'error' : ''}`}
                  value={formData.established}
                  onChange={handleInputChange}
                  placeholder="2015"
                  min="1990"
                  max={new Date().getFullYear()}
                />
                {errors.established && <span className="form-error">{errors.established}</span>}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="form-step">
              <h2 className="step-heading">Холбоо барих мэдээлэл</h2>

              <div className="form-group">
                <label className="form-label">И-мэйл *</label>
                <input
                  type="email"
                  name="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="info@agency.mn"
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Утасны дугаар *</label>
                <input
                  type="tel"
                  name="phone"
                  className={`form-input ${errors.phone ? 'error' : ''}`}
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+976 7777-7777"
                />
                {errors.phone && <span className="form-error">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Хаяг *</label>
                <input
                  type="text"
                  name="address"
                  className={`form-input ${errors.address ? 'error' : ''}`}
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="СБД, 1-р хороо, Улаанбаатар"
                />
                {errors.address && <span className="form-error">{errors.address}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Вэбсайт</label>
                <input
                  type="url"
                  name="website"
                  className="form-input"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://www.agency.mn"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Facebook хуудас</label>
                <input
                  type="text"
                  name="facebook"
                  className="form-input"
                  value={formData.facebook}
                  onChange={handleInputChange}
                  placeholder="facebook.com/youragency"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Instagram</label>
                <input
                  type="text"
                  name="instagram"
                  className="form-input"
                  value={formData.instagram}
                  onChange={handleInputChange}
                  placeholder="@youragency"
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="form-step">
              <h2 className="step-heading">Үйлчилгээ болон улс орнууд</h2>

              <div className="form-group">
                <label className="form-label">Хамрах улс орнууд *</label>
                <div className="checkbox-grid">
                  {countries.map(country => (
                    <label key={country} className="checkbox-item">
                      <input
                        type="checkbox"
                        value={country}
                        checked={formData.countries.includes(country)}
                        onChange={(e) => handleCheckboxChange(e, 'countries')}
                      />
                      <span>{country}</span>
                    </label>
                  ))}
                </div>
                {errors.countries && <span className="form-error">{errors.countries}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Үзүүлэх үйлчилгээ *</label>
                <div className="checkbox-grid">
                  {servicesList.map(service => (
                    <label key={service} className="checkbox-item">
                      <input
                        type="checkbox"
                        value={service}
                        checked={formData.services.includes(service)}
                        onChange={(e) => handleCheckboxChange(e, 'services')}
                      />
                      <span>{service}</span>
                    </label>
                  ))}
                </div>
                {errors.services && <span className="form-error">{errors.services}</span>}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="form-step">
              <h2 className="step-heading">Нэмэлт мэдээлэл</h2>

              <div className="form-group">
                <label className="form-label">Газрын тухай дэлгэрэнгүй *</label>
                <textarea
                  name="description"
                  className={`form-textarea ${errors.description ? 'error' : ''}`}
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="5"
                  placeholder="Танай зуучлалын газрын тухай дэлгэрэнгүй мэдээлэл..."
                ></textarea>
                {errors.description && <span className="form-error">{errors.description}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Багийн хэмжээ</label>
                <input
                  type="number"
                  name="teamSize"
                  className="form-input"
                  value={formData.teamSize}
                  onChange={handleInputChange}
                  placeholder="10"
                  min="1"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Туслсан оюутны тоо</label>
                <input
                  type="number"
                  name="studentsHelped"
                  className="form-input"
                  value={formData.studentsHelped}
                  onChange={handleInputChange}
                  placeholder="500"
                  min="0"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Үйл ажиллагааны лицензийн хуулбар *</label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, 'licenseDocument')}
                  className="form-file"
                />
                {formData.licenseDocument && (
                  <div className="file-info">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd"/>
                    </svg>
                    <span>{formData.licenseDocument.name}</span>
                  </div>
                )}
                {errors.licenseDocument && <span className="form-error">{errors.licenseDocument}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Гэрчилгээ, баримт (Нэмэлт)</label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, 'certificateDocument')}
                  className="form-file"
                />
                {formData.certificateDocument && (
                  <div className="file-info">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd"/>
                    </svg>
                    <span>{formData.certificateDocument.name}</span>
                  </div>
                )}
              </div>

              <div className="info-box">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                </svg>
                <p>
                  Таны бүртгэлийг админ шалгаж батлах хүртэл 1-2 ажлын өдөр шаардагдана. 
                  Батлагдсан тохиолдолд таны и-мэйл рүү мэдэгдэл явна.
                </p>
              </div>
            </div>
          )}

          <div className="form-actions">
            {currentStep > 1 && (
              <button type="button" className="btn btn-outline" onClick={prevStep}>
                Буцах
              </button>
            )}
            {currentStep < 4 ? (
              <button type="button" className="btn btn-primary" onClick={nextStep}>
                Дараах
              </button>
            ) : (
              <button type="submit" className="btn btn-primary">
                Бүртгүүлэх
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgencyRegistrationPage;