import type { Metadata } from 'next'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'

export const metadata: Metadata = {
  title: 'Política de privacidad — Trebbol',
  description: 'Cómo Trebbol recopila, usa y protege tu información personal.',
}

export default function PrivacyPage() {
  return (
    <div className="privacy-page">

      {/* ── Header ── */}
      <header className="privacy-header">
        <Link href="/" className="privacy-logo">
          <Image src="/logotipo.svg" alt="Trebbol" width={28} height={28} />
          <span>Trebbol</span>
        </Link>
      </header>

      {/* ── Hero ── */}
      <section className="privacy-hero">
        <p className="privacy-hero__eyebrow">Privacidad</p>
        <h1 className="privacy-hero__title">Tu privacidad,<br />nuestra prioridad</h1>
        <p className="privacy-hero__subtitle">
          En Trebbol creemos que tus datos te pertenecen. Esta política explica
          qué información recopilamos, por qué la necesitamos y cómo la protegemos —
          en un lenguaje que cualquier persona pueda entender.
        </p>
        <p className="privacy-hero__date">Última actualización: octubre 2026</p>
      </section>

      {/* ── Pilares ── */}
      <section className="privacy-pillars">
        <div className="privacy-pillar">
          <div className="privacy-pillar__icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="privacy-pillar__title">Tus datos, tus reglas</h2>
          <p className="privacy-pillar__text">
            Tu información personal te pertenece. Puedes acceder a ella, corregirla
            o eliminarla en cualquier momento desde tu perfil.
          </p>
        </div>

        <div className="privacy-pillar">
          <div className="privacy-pillar__icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="privacy-pillar__title">Seguridad continua</h2>
          <p className="privacy-pillar__text">
            Cifrado en tránsito y en reposo, monitoreo 24/7 y revisiones de seguridad
            periódicas para mantener tu cuenta protegida.
          </p>
        </div>

        <div className="privacy-pillar">
          <div className="privacy-pillar__icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.75"/>
              <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
            </svg>
          </div>
          <h2 className="privacy-pillar__title">Transparencia total</h2>
          <p className="privacy-pillar__text">
            Te avisamos antes de cualquier cambio importante. Sin sorpresas,
            sin letra pequeña escondida.
          </p>
        </div>

        <div className="privacy-pillar">
          <div className="privacy-pillar__icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
              <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.75"/>
              <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
            </svg>
          </div>
          <h2 className="privacy-pillar__title">Sin venta de datos</h2>
          <p className="privacy-pillar__text">
            Nunca vendemos tu información a terceros. Tus datos solo se usan
            para hacer funcionar y mejorar Trebbol.
          </p>
        </div>
      </section>

      {/* ── Secciones detalladas ── */}
      <div className="privacy-content">

        <article className="privacy-section">
          <h2 className="privacy-section__title">1. Qué información recopilamos</h2>
          <p className="privacy-section__text">
            Para ofrecerte los servicios de Trebbol recopilamos la información que tú nos proporcionas
            directamente al crear tu cuenta o usar la plataforma:
          </p>
          <ul className="privacy-list">
            <li><strong>Datos de cuenta:</strong> nombre, correo electrónico y contraseña.</li>
            <li><strong>Datos de perfil:</strong> foto, descripción, ubicación aproximada y tipo de usuario (Vecino, Freelancer o Empresa).</li>
            <li><strong>Contenido que publicas:</strong> anuncios de productos, servicios, ofertas de empleo y mensajes.</li>
            <li><strong>Datos de uso:</strong> páginas visitadas, búsquedas realizadas e interacciones dentro de la app para mejorar la experiencia.</li>
            <li><strong>Datos de pago:</strong> procesados de forma segura a través de proveedores certificados PCI-DSS. No almacenamos números de tarjeta.</li>
          </ul>
        </article>

        <article className="privacy-section">
          <h2 className="privacy-section__title">2. Para qué usamos tu información</h2>
          <ul className="privacy-list">
            <li>Crear y gestionar tu cuenta en Trebbol.</li>
            <li>Conectarte con vecinos, freelancers y empresas de tu comunidad.</li>
            <li>Procesar pagos y gestionar transacciones dentro de la plataforma.</li>
            <li>Enviarte notificaciones relevantes sobre tu actividad (nuevos mensajes, ofertas, actualizaciones).</li>
            <li>Detectar y prevenir fraudes, spam o comportamientos abusivos.</li>
            <li>Mejorar y personalizar la experiencia de uso.</li>
          </ul>
        </article>

        <article className="privacy-section">
          <h2 className="privacy-section__title">3. Con quién compartimos tu información</h2>
          <p className="privacy-section__text">
            <strong>No vendemos tus datos.</strong> Solo los compartimos en los siguientes casos:
          </p>
          <ul className="privacy-list">
            <li><strong>Con otros usuarios:</strong> tu perfil público es visible para quienes visiten tu anuncio o inicien una conversación contigo.</li>
            <li><strong>Con proveedores de servicio:</strong> empresas que nos ayudan a operar la plataforma (alojamiento, pagos, correo), bajo acuerdos estrictos de confidencialidad.</li>
            <li><strong>Por obligación legal:</strong> cuando la ley nos lo exija o para proteger los derechos de Trebbol o sus usuarios.</li>
          </ul>
        </article>

        <article className="privacy-section">
          <h2 className="privacy-section__title">4. Tus derechos</h2>
          <p className="privacy-section__text">
            Conforme al RGPD y la legislación aplicable, tienes derecho a:
          </p>
          <ul className="privacy-list">
            <li><strong>Acceso:</strong> solicitar una copia de tus datos personales.</li>
            <li><strong>Rectificación:</strong> corregir información incorrecta o incompleta.</li>
            <li><strong>Supresión:</strong> eliminar tu cuenta y los datos asociados.</li>
            <li><strong>Portabilidad:</strong> exportar tus datos en formato estándar.</li>
            <li><strong>Oposición:</strong> oponerte al tratamiento de tus datos para fines de marketing.</li>
          </ul>
          <p className="privacy-section__text" style={{ marginTop: '1rem' }}>
            Para ejercer cualquiera de estos derechos, escríbenos a{' '}
            <a href="mailto:privacidad@trebbol.app" className="privacy-link">privacidad@trebbol.app</a>.
            Responderemos en un plazo máximo de 30 días.
          </p>
        </article>

        <article className="privacy-section">
          <h2 className="privacy-section__title">5. Cookies y tecnologías similares</h2>
          <p className="privacy-section__text">
            Usamos cookies esenciales para mantener tu sesión activa y cookies analíticas
            (anonimizadas) para entender cómo se usa la plataforma. Puedes gestionar tus
            preferencias de cookies desde la configuración de tu navegador.
          </p>
        </article>

        <article className="privacy-section">
          <h2 className="privacy-section__title">6. Retención de datos</h2>
          <p className="privacy-section__text">
            Conservamos tus datos mientras tu cuenta esté activa o según sea necesario para
            prestarte el servicio. Cuando elimines tu cuenta, borraremos o anonimizaremos
            tus datos personales en un plazo de 30 días, salvo que la ley nos obligue a
            conservarlos por más tiempo.
          </p>
        </article>

        <article className="privacy-section">
          <h2 className="privacy-section__title">7. Cambios en esta política</h2>
          <p className="privacy-section__text">
            Si realizamos cambios significativos, te lo notificaremos por correo electrónico
            o mediante un aviso destacado en la app al menos 30 días antes de que entren
            en vigor. El uso continuado de Trebbol tras esa fecha implica la aceptación
            de la nueva versión.
          </p>
        </article>

        <article className="privacy-section">
          <h2 className="privacy-section__title">8. Contacto</h2>
          <p className="privacy-section__text">
            Si tienes preguntas sobre esta política o sobre cómo tratamos tus datos,
            puedes contactarnos en:
          </p>
          <ul className="privacy-list">
            <li>Email: <a href="mailto:privacidad@trebbol.app" className="privacy-link">privacidad@trebbol.app</a></li>
            <li>Trebbol B.V. — Países Bajos</li>
          </ul>
        </article>

      </div>

      {/* ── Footer ── */}
      <footer className="privacy-footer">
        <p>© {new Date().getFullYear()} Trebbol. Todos los derechos reservados.</p>
        <Link href="/login" className="privacy-footer__link">Iniciar sesión</Link>
      </footer>

    </div>
  )
}
