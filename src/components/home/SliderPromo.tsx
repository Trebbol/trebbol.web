'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import Image from 'next/image'
import { ArrowRightLinearIcon } from '@solar-icons/react'
import 'swiper/css'
import 'swiper/css/pagination'

const SLIDES = [
  {
    id: 1,
    eyebrow: 'Salud & Bienestar',
    headline: 'Bienestar para\ntu comunidad',
    subtitle: 'Programas integrales que conectan personas, propósitos y resultados medibles.',
    cta: 'Más información',
    img: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=1600',
    pos: 'center right',
  },
  {
    id: 2,
    eyebrow: 'Publicidad Local',
    headline: 'Impulsa tu\nnegocio hoy',
    subtitle: 'Llega a miles de vecinos que buscan exactamente lo que ofrecés.',
    cta: 'Publicitar ahora',
    img: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1600',
    pos: 'center center',
  },
  {
    id: 3,
    eyebrow: 'Trabajo & Talento',
    headline: 'Encontrá el\ntalento ideal',
    subtitle: 'Conectate con profesionales verificados listos para sumarse a tu equipo.',
    cta: 'Ver candidatos',
    img: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600',
    pos: 'center center',
  },
]

export function SliderPromo() {
  return (
    <section className="section">
      <div className="section__inner">
        <div className="slider-promo">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            className="slider-promo__swiper"
          >
            {SLIDES.map((slide, i) => (
              <SwiperSlide key={slide.id}>
                <div className="slider-promo__slide">
                  <Image
                    src={slide.img}
                    alt={slide.headline.replace('\n', ' ')}
                    fill
                    style={{ objectFit: 'cover', objectPosition: slide.pos }}
                    sizes="(max-width: 768px) 100vw, 1200px"
                    priority={i === 0}
                  />
                  <div className="slider-promo__overlay" />
                  <div className="slider-promo__content">
                    <p className="slider-promo__eyebrow">{slide.eyebrow}</p>
                    <h2 className="slider-promo__headline">{slide.headline}</h2>
                    <p className="slider-promo__subtitle">{slide.subtitle}</p>
                    <a href="#" className="slider-promo__cta btn-primary btn-sm">
                      {slide.cta}
                      <ArrowRightLinearIcon size={14} />
                    </a>
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
