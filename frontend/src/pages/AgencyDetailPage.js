import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './AgencyDetailPage.css';

const AgencyDetailPage = () => {
  const { agencyId } = useParams();
  const navigate = useNavigate();
  const [agency, setAgency] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    message: ''
  });

  useEffect(() => {
    // API-аас өгөгдөл татах
    const mockAgency = {
      id: 1,
      name: 'Global Education Mongolia',
      logo: '🌏',
      description: 'Олон улсын боловсролын салбарт 10 жилийн туршлагатай, 500+ оюутанд үйлчилсэн баталгаат зуучлалын газар.',
      fullDescription: `Global Education Mongolia нь 2013 онд байгуулагдсан бөгөөд Монгол оюутнуудыг гадаадад суралцахад бүх талаар нь дэмжин ажилладаг. Бид Ирланд, Их Британи, Канад зэрэг улс орнуудад тусгайлсан үйлчилгээ үзүүлдэг.
      
      Манай баг 15+ жилийн туршлагатай мэргэжилтнүүдээс бүрдэх бөгөөд оюутан бүрт хувь хүний хандлагаар хамгийн тохиромжтой шийдлийг санал болгодог.`,
      countries: ['Ирланд', 'Их Британи', 'Канад'],
      rating: 4.8,
      reviewsCount: 124,
      studentsHelped: 500,
      established: 2013,
      services: [
        'Сургууль сонгох зөвлөгөө',
        'Элсэлтийн баримт бичиг бэлтгэх',
        'Виз процессын дэмжлэг',
        'Байр хайх туслалцаа',
        'Ажил олоход дэмжлэг үзүүлэх',
        'Банкны данс нээх',
        'Даатгалын үйлчилгээ',
        'Оюутны визийн сунгалт'
      ],
      team: [
        { name: 'Б. Болд', position: 'Гүйцэтгэх захирал', experience: '15 жил' },
        { name: 'Ц. Сарантуяа', position: 'Виз мэргэжилтэн', experience: '10 жил' },
        { name: 'Г. Мөнхбат', position: 'Сургалтын зөвлөх', experience: '8 жил' }
      ],
      contactInfo: {
        email: 'info@globaledu.mn',
        phone: '+976 7777-7777',
        address: 'СБД, 1-р хороо, Улаанбаатар',
        workingHours: 'Даваа-Баасан: 09:00-18:00',
        facebook: 'facebook.com/globaledu.mn',
        instagram: '@globaledu.mn'
      },
      reviews: [
        {
          id: 1,
          author: 'Д. Ганболд',
          rating: 5,
          date: '2024-10-15',
          country: 'Ирланд',
          comment: 'Маш сайн үйлчилгээ үзүүлсэн. Визний процесс бүгдийг нь тэд хариуцаж, би зөвхөн шаардлагатай баримтуудыг өгсөн. Одоо Дублинд амжилттай суралцаж байна.',
          verified: true
        },
        {
          id: 2,
          author: 'Н. Номин',
          rating: 5,
          date: '2024-09-20',
          country: 'Канад',
          comment: 'Багийнхан маш мэргэжлийн түвшинд ажилласан. Байр олоход их туслав. Баярлалаа!',
          verified: true
        },
        {
          id: 3,
          author: 'Т. Тэмүүжин',
          rating: 4,
          date: '2024-08-10',
          country: 'Их Британи',
          comment: 'Ерөнхийдөө сайн байлаа. Зарим асуудал удаан шийдэгдсэн ч эцэст нь бүх зүйл амжилттай болсон.',
          verified: true
        }
      ],
      successStories: [
        {
          name: 'Б. Оюунчимэг',
          university: 'Trinity College Dublin',
          program: 'Computer Science',
          year: 2023,
          story: 'Global Education-ийн тусламжтайгаар би мөрөөдлийн их сургуульдаа элссэн.',
          image: '👩‍🎓'
        },
        {
          name: 'Г. Батжаргал',
          university: 'University of Toronto',
          program: 'Business Administration',
          year: 2023,
          story: 'Визний процесс маш хялбар байлаа. Одоо Канадад амьдарч байна.',
          image: '👨‍🎓'
        }
      ]
    };

    setAgency(mockAgency);
  }, [agencyId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API руу хүсэлт илгээх
    console.log('Form submitted:', formData);
    alert('Таны хүсэлт амжилттай илгээгдлээ! Бид тантай удахгүй холбогдох болно.');
    setShowContactForm(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      country: '',
      message: ''
    });
  };

  if (!agency) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Уншиж байна...</p>
      </div>
    );
  }

  return (
    <div className="agency-detail-page">
      <div className="agency-hero">
        <div className="container">
          <div className="agency-hero-content">
            <div className="agency-hero-logo">{agency.logo}</div>
            <div>
              <h1 className="agency-hero-title">{agency.name}</h1>
              <div className="agency-hero-rating">
                <span className="rating-stars">⭐ {agency.rating}</span>
                <span className="rating-text">({agency.reviewsCount} үнэлгээ)</span>
              </div>
            </div>
          </div>
          <div className="agency-hero-stats">
            <div className="hero-stat">
              <span className="stat-value">{agency.studentsHelped}+</span>
              <span className="stat-label">Оюутан</span>
            </div>
            <div className="hero-stat">
              <span className="stat-value">{agency.established}</span>
              <span className="stat-label">Байгуулагдсан</span>
            </div>
            <div className="hero-stat">
              <span className="stat-value">{agency.countries.length}</span>
              <span className="stat-label">Улс орон</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="agency-content">
          <div className="agency-main">
            <section className="agency-section">
              <h2 className="section-title">Бидний тухай</h2>
              <div className="description-text">
                {agency.fullDescription.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section className="agency-section">
              <h2 className="section-title">Хамрах улс орнууд</h2>
              <div className="countries-list">
                {agency.countries.map((country, idx) => (
                  <div key={idx} className="country-badge">
                    <span className="country-flag">🌍</span>
                    <span className="country-name">{country}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="agency-section">
              <h2 className="section-title">Үйлчилгээ</h2>
              <div className="services-grid">
                {agency.services.map((service, idx) => (
                  <div key={idx} className="service-item">
                    <svg className="service-icon" width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="agency-section">
              <h2 className="section-title">Манай баг</h2>
              <div className="team-grid">
                {agency.team.map((member, idx) => (
                  <div key={idx} className="team-member">
                    <div className="member-avatar">👤</div>
                    <h3 className="member-name">{member.name}</h3>
                    <p className="member-position">{member.position}</p>
                    <p className="member-experience">{member.experience} туршлагатай</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="agency-section">
              <h2 className="section-title">Амжилтын түүхүүд</h2>
              <div className="success-stories">
                {agency.successStories.map((story, idx) => (
                  <div key={idx} className="story-card">
                    <div className="story-avatar">{story.image}</div>
                    <div className="story-content">
                      <h3 className="story-name">{story.name}</h3>
                      <p className="story-details">
                        {story.university} - {story.program} ({story.year})
                      </p>
                      <p className="story-text">"{story.story}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="agency-section">
              <h2 className="section-title">Үнэлгээ & Сэтгэгдэл</h2>
              <div className="reviews-summary">
                <div className="summary-rating">
                  <span className="big-rating">{agency.rating}</span>
                  <div className="rating-stars-large">⭐⭐⭐⭐⭐</div>
                  <span className="reviews-count">{agency.reviewsCount} үнэлгээ</span>
                </div>
              </div>

              <div className="reviews-list">
                {agency.reviews.map(review => (
                  <div key={review.id} className="review-card">
                    <div className="review-header">
                      <div>
                        <h4 className="review-author">{review.author}</h4>
                        <div className="review-meta">
                          <span className="review-country">{review.country}</span>
                          <span className="review-date">{review.date}</span>
                          {review.verified && (
                            <span className="verified-badge">✓ Баталгаажсан</span>
                          )}
                        </div>
                      </div>
                      <div className="review-rating">
                        {'⭐'.repeat(review.rating)}
                      </div>
                    </div>
                    <p className="review-comment">{review.comment}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="agency-sidebar">
            <div className="contact-card sticky-card">
              <h3 className="contact-title">Холбоо барих</h3>
              
              <div className="contact-info">
                <div className="contact-item">
                  <svg className="contact-icon" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <a href={`mailto:${agency.contactInfo.email}`}>{agency.contactInfo.email}</a>
                </div>

                <div className="contact-item">
                  <svg className="contact-icon" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  <a href={`tel:${agency.contactInfo.phone}`}>{agency.contactInfo.phone}</a>
                </div>

                <div className="contact-item">
                  <svg className="contact-icon" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <span>{agency.contactInfo.address}</span>
                </div>

                <div className="contact-item">
                  <svg className="contact-icon" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span>{agency.contactInfo.workingHours}</span>
                </div>
              </div>

              <div className="social-links">
                <a href={`https://${agency.contactInfo.facebook}`} target="_blank" rel="noopener noreferrer" className="social-link">
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href={`https://instagram.com/${agency.contactInfo.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="social-link">
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
              </div>

              <button 
                className="btn btn-primary btn-block"
                onClick={() => setShowContactForm(true)}
              >
                Хүсэлт илгээх
              </button>
            </div>
          </div>
        </div>
      </div>

      {showContactForm && (
        <div className="modal-overlay" onClick={() => setShowContactForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Хүсэлт илгээх</h2>
              <button className="modal-close" onClick={() => setShowContactForm(false)}>
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Нэр *</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">И-мэйл *</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Утас *</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-input"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Сонирхож буй улс *</label>
                <select
                  name="country"
                  className="form-select"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Сонгоно уу</option>
                  {agency.countries.map((country, idx) => (
                    <option key={idx} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Нэмэлт мэдээлэл</label>
                <textarea
                  name="message"
                  className="form-textarea"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Таны асуулт эсвэл нэмэлт мэдээлэл..."
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                Илгээх
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgencyDetailPage;