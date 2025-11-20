import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const featuredCountries = [
    {
      id: 1,
      name: 'Ирланд',
      nameEn: 'Ireland',
      image: '🇮🇪',
      studentsCount: 150,
      universitiesCount: 12,
      description: 'Европын боловсролын төв, ажлын боломж өндөр'
    },
    {
      id: 2,
      name: 'Австрали',
      nameEn: 'Australia',
      image: '🇦🇺',
      studentsCount: 200,
      universitiesCount: 18,
      description: 'Өндөр чанарын боловсрол, амьдрах таатай орчин'
    },
    {
      id: 3,
      name: 'Канад',
      nameEn: 'Canada',
      image: '🇨🇦',
      studentsCount: 180,
      universitiesCount: 15,
      description: 'Олон үндэстний орчин, суралцсаны дараа ажиллах боломж'
    },
    {
      id: 4,
      name: 'Их Британи',
      nameEn: 'United Kingdom',
      image: '🇬🇧',
      studentsCount: 220,
      universitiesCount: 25,
      description: 'Уламжлалт боловсрол, дэлхийн шилдэг их сургуулиуд'
    }
  ];

  const features = [
    {
      icon: '🎓',
      title: 'Сургуулийн мэдээлэл',
      description: 'Их сургуулиуд, хөтөлбөрүүд, элсэлтийн шаардлага'
    },
    {
      icon: '💰',
      title: 'Зардлын тооцоолуур',
      description: 'Нийт зардлыг нарийвчлан тооцоолох боломж'
    },
    {
      icon: '🏢',
      title: 'Зуучлалын үйлчилгээ',
      description: 'Баталгаат зуучлалын газруудын мэдээлэл'
    },
    {
      icon: '📚',
      title: 'Заавар зөвлөмж',
      description: 'Виз, байр, ажил олох талаар дэлгэрэнгүй мэдээлэл'
    }
  ];

  const testimonials = [
    {
      name: 'Б. Болд',
      country: 'Ирланд',
      text: 'StudyInWorld.mn-ийн тусламжтайгаар би Ирландад амжилттай элсэж, одоо магистрын хөтөлбөрт суралцаж байна.',
      rating: 5
    },
    {
      name: 'Ц. Сарантуяа',
      country: 'Австрали',
      text: 'Сайтын мэдээлэл маш ойлгомжтой, зардлын тооцоолуур их туслав. Зуучлагчаа олоход амар байсан.',
      rating: 5
    },
    {
      name: 'Г. Мөнхбат',
      country: 'Канад',
      text: 'Байр, ажлын талаарх зөвлөмжүүд их хэрэгтэй байлаа. Одоо Торонтод амьдарч, ажиллаж байна.',
      rating: 5
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Гадаадад суралцах<br />
              <span className="highlight">мөрөөдлөө бодит болго</span>
            </h1>
            <p className="hero-description">
              Дэлхийн шилдэг их сургуулиуд, зуучлалын үйлчилгээ, зардлын тооцоолуур<br />
              болон бүх шаардлагатай мэдээллийг нэг дороос авах боломжтой
            </p>
            <div className="hero-buttons">
              <Link to="/countries" className="btn btn-primary btn-lg">
                Улс сонгох
              </Link>
              <Link to="/agencies" className="btn btn-outline btn-lg">
                Зуучлагч олох
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Countries */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Хаана суралцах вэ?</h2>
            <p className="section-subtitle">
              Манай платформ дээр байгаа улс орнуудаас өөрт тохирохыг сонгоно уу
            </p>
          </div>

          <div className="grid grid-cols-4">
            {featuredCountries.map((country) => (
              <Link 
                to={`/country/${country.id}`} 
                key={country.id}
                className="country-card"
              >
                <div className="country-flag">{country.image}</div>
                <h3 className="country-name">{country.name}</h3>
                <p className="country-name-en">{country.nameEn}</p>
                <p className="country-description">{country.description}</p>
                <div className="country-stats">
                  <div className="stat">
                    <span className="stat-value">{country.universitiesCount}+</span>
                    <span className="stat-label">Их сургууль</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">{country.studentsCount}+</span>
                    <span className="stat-label">Оюутан</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-4">
            <Link to="/countries" className="btn btn-primary">
              Бүх улс орныг харах
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Бид юу санал болгож байна вэ?</h2>
          </div>

          <div className="grid grid-cols-4">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Хэрхэн ажилладаг вэ?</h2>
          </div>

          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3 className="step-title">Улс сонгох</h3>
                <p className="step-description">
                  Өөрт тохирох улс орноо сонгоод дэлгэрэнгүй мэдээллийг үзнэ
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3 className="step-title">Сургууль сонгох</h3>
                <p className="step-description">
                  Их сургууль, хөтөлбөр, элсэлтийн шаардлагатай танилцана
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3 className="step-title">Зардал тооцоолох</h3>
                <p className="step-description">
                  Тооцоолуураар нийт зардлыг нарийвчлан тооцоолно
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3 className="step-title">Зуучлагч сонгох</h3>
                <p className="step-description">
                  Баталгаат зуучлагчаа сонгоод хүсэлт илгээнэ
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Амжилтын түүхүүд</h2>
            <p className="section-subtitle">
              Бидний тусламжтайгаар гадаадад суралцаж байгаа оюутнуудын сэтгэгдэл
            </p>
          </div>

          <div className="grid grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="star">⭐</span>
                  ))}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <p className="author-name">{testimonial.name}</p>
                  <p className="author-location">{testimonial.country}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Гадаадад суралцах аялал эхэлцгээе</h2>
            <p className="cta-description">
              Та зуучлалын газар уу? Манай платформд нэгдээд олон оюутантай холбогдох боломжтой
            </p>
            <Link to="/agency-register" className="btn btn-secondary btn-lg">
              Зуучлагч бүртгүүлэх
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;