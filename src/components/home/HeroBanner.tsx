'use client'

import { useRef, useState } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import Image from 'next/image'
import 'swiper/css'

const SLIDES = [
  {
    id: 1,
    eyebrow: 'Novedad de la Semana',
    title: 'Auriculares Sony\nWH-1000XM5',
    desc: 'Cancelación de ruido premium · 30h de batería',
    cta: 'Ver ahora',
    badge: '€349',
    reviews: { count: '124+', label: 'reseñas' },
    img: 'https://images.pexels.com/photos/3799291/pexels-photo-3799291.jpeg?auto=compress&cs=tinysrgb&w=1200',
    overlay: '#FFF0EB',
  },
  {
    id: 2,
    eyebrow: 'Empleo Destacado',
    title: 'Fontanero\nCertificado',
    desc: 'Disponible en tu zona · Respuesta en 1h',
    cta: 'Contratar',
    badge: '€35/h',
    reviews: { count: '89+', label: 'trabajos' },
    img: 'https://images.pexels.com/photos/6419128/pexels-photo-6419128.jpeg?auto=compress&cs=tinysrgb&w=1200',
    overlay: '#FFF8E6',
  },
  {
    id: 3,
    eyebrow: 'Negocio Local',
    title: 'Florería La\nVida en Flor',
    desc: 'Arreglos frescos para cada ocasión · Entrega a domicilio',
    cta: 'Visitar',
    badge: '4.9 ★',
    reviews: { count: '4.9', label: 'puntuación' },
    img: 'https://images.pexels.com/photos/5414331/pexels-photo-5414331.jpeg?auto=compress&cs=tinysrgb&w=1200',
    overlay: '#F5FAEE',
  },
]

const AVATARS = [
  'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=64',
  'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=64',
  'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=64',
]

export function HeroBanner() {
  const swiperRef = useRef<SwiperType | null>(null)
  const [activeIdx, setActiveIdx] = useState(0)

  return (
    <section className="hero-banner">
      <div className="section__inner">
        <div className="hero-banner__track">
          {/* Nav dots — inside the slider */}
          <div className="hero-banner__nav">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                className={`hero-banner__nav-dot${i === activeIdx ? ' hero-banner__nav-dot--active' : ''}`}
                style={i === activeIdx ? { width: '22px' } : {}}
                onClick={() => swiperRef.current?.slideTo(i + 1)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop
            onSwiper={(s) => { swiperRef.current = s }}
            onRealIndexChange={(s) => setActiveIdx(s.realIndex)}
            className="hero-banner__swiper"
          >
            {SLIDES.map((slide, i) => (
              <SwiperSlide key={slide.id}>
                <div className="hero-banner__slide">

                  {/* Background image */}
                  <Image
                    src={slide.img}
                    alt={slide.title.replace('\n', ' ')}
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    sizes="1200px"
                    priority={i === 0}
                  />

                  {/* Gradient overlay — opaque left → transparent right */}
                  <div className="hero-banner__overlay" style={{
                    background: `linear-gradient(to right, ${slide.overlay} 0%, ${slide.overlay}F2 30%, ${slide.overlay}99 55%, ${slide.overlay}22 75%, transparent 90%)`,
                  }} />

                  {/* Content */}
                  <div className="hero-banner__content">
                    <p className="hero-banner__eyebrow">
                      <span className="hero-banner__accent-dot" />
                      {slide.eyebrow}
                    </p>
                    <h2 className="hero-banner__title">{slide.title}</h2>
                    <p className="hero-banner__desc">{slide.desc}</p>
                    <a href="#" className="btn-dark btn-sm hero-banner__cta">{slide.cta}</a>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}
