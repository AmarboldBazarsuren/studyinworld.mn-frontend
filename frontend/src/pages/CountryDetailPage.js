import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './CountryDetailPage.css';

const CountryDetailPage = () => {
  const { countryId } = useParams();
  const [country, setCountry] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // API-аас өгөгдөл татах
    const mockCountry = {
      id: 1,
      name: 'Ирланд',
      nameEn: 'Ireland',
      flag: '🇮🇪',
      description: 'Ирланд бол Европын боловсролын төв бөгөөд олон улсын оюутнуудад өндөр чанарын боловсрол, ажлын боломж санал болгодог.',
      currency: 'EUR (€)',
      language: 'Англи хэл',
      capital: 'Дублин',
      population: '5 сая',
      climate: 'Далайн уур амьсгал, зөөлөн өвөл, сэрүүн зун',
      universities: [
        {
          id: 1,
          name: 'Trinity College Dublin',
          programs: ['Бакалавр', 'Магистр', 'Докторант'],
          tuition: 14000,
          ranking: 'QS Top 100'
        },
        {
          id: 2,
          name: 'University College Dublin',
          programs: ['Бакалавр', 'Магистр', 'Докторант'],
          tuition: 13000,
          ranking: 'QS Top 200'
        },
        {
          id: 3,
          name: 'Dublin Business School',
          programs: ['Хэлний бэлтгэл', 'Бакалавр', 'Магистр'],
          tuition: 10000,
          ranking: 'Аккредит хийгдсэн'
        }
      ],
      livingCosts: {
        accommodation: {
          dormitory: '400-600',
          shared: '500-800',
          studio: '900-1400'
        },
        food: '250-350',
        transport: '100-150',
        utilities: '80-120',
        other: '150-200'
      },
      workInfo: {
        duringStudy: 'Долоо хоногт 20 цаг',
        afterStudy: 'Бүтэн цагийн',
        minWage: '€11.30/цаг',
        averageSalary: '€2,500-3,500/сар'
      },
      visaInfo: {
        requirements: [
          'Их сургуулийн элсэлтийн баталгаа',
          'Санхүүгийн баталгаа (€7,000+)',
          'Эрүүл мэндийн даатгал',
          'Гэрийн хаяг, байрны баталгаа',
          'IELTS 6.0+ эсвэл түүнтэй тэнцэх'
        ],
        processingTime: '8-12 долоо хоног',
        cost: '€300',
        tips: [
          'Бичиг баримтаа бүрэн бэлдэх',
          'Эрт хүсэлт илгээх (3-4 сарын өмнө)',
          'Санхүүгийн баталгаагаа нарийвчлан бэлдэх'
        ]
      },
      jobSearchTips: [
        'LinkedIn дээр profile үүсгэх',
        'Их сургуулийн Career службээс тусламж авах',
        'Freelance ажлаас эхлэх',
        'Networking events-д оролцох',
        'CV-гээ Европын стандартаар бэлдэх'
      ],
      housingTips: [
        'Daft.ie, Rent.ie сайтуудыг ашиглах',
        'Их сургуулийн байрны үйлчилгээнд хандах',
        'Facebook групп-үүдэд хайх',
        'Эрт хайж эхлэх (2-3 сарын өмнө)',
        'Viewing-д очиход анхаарах зүйлс'
      ]
    };

    setCountry(mockCountry);
  }, [countryId]);

  if (!country) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Уншиж байна...</p>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Ерөнхий мэдээлэл', icon: '📋' },
    { id: 'universities', label: 'Их сургуулиуд', icon: '🎓' },
    { id: 'living', label: 'Амьдрах зардал', icon: '💰' },
    { id: 'work', label: 'Ажил хөдөлмөр', icon: '💼' },
    { id: 'visa', label: 'Виз мэдээлэл', icon: '✈️' },
    { id: 'tips', label: 'Зөвлөмж', icon: '💡' }
  ];

  return (
    <div className="country-detail-page">
      <div className="country-hero">
        <div className="container">
          <div className="country-hero-content">
            <div className="country-hero-flag">{country.flag}</div>
            <div>
              <h1 className="country-hero-title">{country.name}</h1>
              <p className="country-hero-subtitle">{country.nameEn}</p>
            </div>
          </div>
          <div className="country-quick-facts">
            <div className="quick-fact">
              <span className="quick-fact-label">Нийслэл:</span>
              <span className="quick-fact-value">{country.capital}</span>
            </div>
            <div className="quick-fact">
              <span className="quick-fact-label">Хэл:</span>
              <span className="quick-fact-value">{country.language}</span>
            </div>
            <div className="quick-fact">
              <span className="quick-fact-label">Мөнгөн тэмдэгт:</span>
              <span className="quick-fact-value">{country.currency}</span>
            </div>
            <div className="quick-fact">
              <span className="quick-fact-label">Хүн ам:</span>
              <span className="quick-fact-value">{country.population}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="tabs-container">
          <div className="tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="tab-content">
            {activeTab === 'overview' && (
              <div className="content-section">
                <h2 className="section-heading">Ерөнхий мэдээлэл</h2>
                <div className="info-card">
                  <p className="info-text">{country.description}</p>
                  
                  <div className="info-grid">
                    <div className="info-item">
                      <h3 className="info-title">🌡️ Уур амьсгал</h3>
                      <p className="info-value">{country.climate}</p>
                    </div>
                    <div className="info-item">
                      <h3 className="info-title">🗣️ Албан ёсны хэл</h3>
                      <p className="info-value">{country.language}</p>
                    </div>
                    <div className="info-item">
                      <h3 className="info-title">💵 Мөнгөн тэмдэгт</h3>
                      <p className="info-value">{country.currency}</p>
                    </div>
                    <div className="info-item">
                      <h3 className="info-title">👥 Хүн ам</h3>
                      <p className="info-value">{country.population}</p>
                    </div>
                  </div>
                </div>

                <div className="cta-box">
                  <h3>Зардлыг тооцоолох уу?</h3>
                  <p>Нийт зардлыг нарийвчлан тооцоолж үзээрэй</p>
                  <Link to={`/calculator/${country.id}`} className="btn btn-primary">
                    Тооцоолуур ашиглах
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'universities' && (
              <div className="content-section">
                <h2 className="section-heading">Их сургуулиуд</h2>
                <div className="universities-list">
                  {country.universities.map(uni => (
                    <div key={uni.id} className="university-card">
                      <div className="university-header">
                        <h3 className="university-name">{uni.name}</h3>
                        <span className="university-ranking">{uni.ranking}</span>
                      </div>
                      <div className="university-programs">
                        {uni.programs.map((program, idx) => (
                          <span key={idx} className="badge badge-primary">{program}</span>
                        ))}
                      </div>
                      <div className="university-tuition">
                        <span className="tuition-label">Жилийн элсэлтийн хураамж:</span>
                        <span className="tuition-value">€{uni.tuition.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'living' && (
              <div className="content-section">
                <h2 className="section-heading">Амьдрах зардал (сараар)</h2>
                
                <div className="cost-category">
                  <h3 className="cost-title">🏠 Байрны түрээс</h3>
                  <div className="cost-items">
                    <div className="cost-item">
                      <span className="cost-label">Дотуур байр:</span>
                      <span className="cost-value">€{country.livingCosts.accommodation.dormitory}</span>
                    </div>
                    <div className="cost-item">
                      <span className="cost-label">Хамтран түрээслэх:</span>
                      <span className="cost-value">€{country.livingCosts.accommodation.shared}</span>
                    </div>
                    <div className="cost-item">
                      <span className="cost-label">Студио байр:</span>
                      <span className="cost-value">€{country.livingCosts.accommodation.studio}</span>
                    </div>
                  </div>
                </div>

                <div className="cost-category">
                  <h3 className="cost-title">🍔 Хоол хүнс</h3>
                  <div className="cost-items">
                    <div className="cost-item">
                      <span className="cost-label">Сарын дундаж:</span>
                      <span className="cost-value">€{country.livingCosts.food}</span>
                    </div>
                  </div>
                </div>

                <div className="cost-category">
                  <h3 className="cost-title">🚌 Тээвэр</h3>
                  <div className="cost-items">
                    <div className="cost-item">
                      <span className="cost-label">Сарын дундаж:</span>
                      <span className="cost-value">€{country.livingCosts.transport}</span>
                    </div>
                  </div>
                </div>

                <div className="cost-category">
                  <h3 className="cost-title">💡 Үйлчилгээ</h3>
                  <div className="cost-items">
                    <div className="cost-item">
                      <span className="cost-label">Цахилгаан, ус, интернет:</span>
                      <span className="cost-value">€{country.livingCosts.utilities}</span>
                    </div>
                  </div>
                </div>

                <div className="cost-category">
                  <h3 className="cost-title">🎯 Бусад</h3>
                  <div className="cost-items">
                    <div className="cost-item">
                      <span className="cost-label">Зугаа цэнгэл, бусад:</span>
                      <span className="cost-value">€{country.livingCosts.other}</span>
                    </div>
                  </div>
                </div>

                <div className="total-cost">
                  <h3>Сарын нийт дундаж зардал:</h3>
                  <p className="total-amount">€1,080 - €2,820</p>
                </div>
              </div>
            )}

            {activeTab === 'work' && (
              <div className="content-section">
                <h2 className="section-heading">Ажил хөдөлмөр</h2>
                
                <div className="info-card">
                  <div className="work-info-grid">
                    <div className="work-info-item">
                      <h3>⏰ Суралцах хугацаанд</h3>
                      <p>{country.workInfo.duringStudy}</p>
                    </div>
                    <div className="work-info-item">
                      <h3>🎓 Төгссөний дараа</h3>
                      <p>{country.workInfo.afterStudy}</p>
                    </div>
                    <div className="work-info-item">
                      <h3>💵 Хөдөлмөрийн хөлсний доод хэмжээ</h3>
                      <p>{country.workInfo.minWage}</p>
                    </div>
                    <div className="work-info-item">
                      <h3>💰 Дундаж цалин</h3>
                      <p>{country.workInfo.averageSalary}</p>
                    </div>
                  </div>
                </div>

                <div className="tips-card">
                  <h3>Ажил хайх зөвлөмжүүд:</h3>
                  <ul className="tips-list">
                    {country.jobSearchTips.map((tip, idx) => (
                      <li key={idx} className="tip-item">
                        <svg className="tip-icon" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'visa' && (
              <div className="content-section">
                <h2 className="section-heading">Виз мэдээлэл</h2>
                
                <div className="visa-requirements">
                  <h3>📝 Шаардлагатай баримт бичиг:</h3>
                  <ul className="requirements-list">
                    {country.visaInfo.requirements.map((req, idx) => (
                      <li key={idx} className="requirement-item">
                        <svg className="check-icon" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="visa-info-grid">
                  <div className="visa-info-card">
                    <h4>⏱️ Боловсруулах хугацаа</h4>
                    <p>{country.visaInfo.processingTime}</p>
                  </div>
                  <div className="visa-info-card">
                    <h4>💰 Хураамж</h4>
                    <p>{country.visaInfo.cost}</p>
                  </div>
                </div>

                <div className="tips-card">
                  <h3>💡 Зөвлөгөө:</h3>
                  <ul className="tips-list">
                    {country.visaInfo.tips.map((tip, idx) => (
                      <li key={idx} className="tip-item">
                        <svg className="tip-icon" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                        </svg>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'tips' && (
              <div className="content-section">
                <h2 className="section-heading">Заавар зөвлөмж</h2>
                
                <div className="tips-card">
                  <h3>🏠 Байр олох зөвлөмж:</h3>
                  <ul className="tips-list">
                    {country.housingTips.map((tip, idx) => (
                      <li key={idx} className="tip-item">
                        <svg className="tip-icon" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="tips-card">
                  <h3>💼 Ажил олох зөвлөмж:</h3>
                  <ul className="tips-list">
                    {country.jobSearchTips.map((tip, idx) => (
                      <li key={idx} className="tip-item">
                        <svg className="tip-icon" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="info-alert">
                  <svg className="alert-icon" width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                  </svg>
                  <div>
                    <h4>Анхаарах зүйл</h4>
                    <p>Эдгээр мэдээлэл нь ерөнхий удирдамж бөгөөд хувь хүний нөхцөл байдлаас хамаарч өөрчлөгдөж болно. Нарийвчилсан мэдээллийг албан ёсны эх сурвалжаас авна уу.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetailPage;