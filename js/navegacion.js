/**
 * navbar.js — Pôle Orthodontique
 * Navbar autocontenido: inyecta HTML + CSS + JS en el DOM.
 * Verifica que no exista ya un navbar para evitar duplicados.
 */

(function () {
  'use strict';

  // ═══════════════════════════════════════════════════════════════════════
  // VERIFICAR QUE NO EXISTA YA UN NAVBAR (evita duplicados)
  // ═══════════════════════════════════════════════════════════════════════
  if (document.getElementById('site-navbar')) {
    console.log('Navbar ya existe, evitando duplicado');
    return;
  }

  /* ════════════════════════════════════════════════
     CONFIG — edita aquí solo los datos del contenido
  ═══════════════════════════════════════════════════ */
  const NAV = {
  logo: {
    src: (() => {
      // Calcular profundidad de la página actual
      const path = window.location.pathname;
      const depth = (path.match(/\//g) || []).length - 1;
      const up = depth > 0 ? '../'.repeat(depth) : '';
      return `${up}image-optimized/logo.svg`;
    })(),
    alt: 'Pôle Orthodontique',
    href: '/'
  },
    phone: {
      label: '+1 (555) 000-0000',
      href:  'tel:+15550000000'
    },
    bookUrl: '/form.html',

    links: [
      {
        label: 'Inicio',
        href: '/',
        active: true
      },
      {
        label: 'Nosotros',
        dropdown: [
          { label: 'Quiénes Somos',      icon: '🏛️', desc: 'Nuestra historia y misión',     href: '/about.html' },
          { label: 'Conoce a la Doctora', icon: '👩‍⚕️', desc: 'Experiencia y especialidades', href: '/about/meet-the-doctor.html' }
        ]
      },
      {
        label: 'Servicios',
        allHref: '/services.html',
        mega: [
          {
            heading: 'Odontología General',
            href: '/services/general-dentistry.html',
            items: [
              { label: 'Limpieza y Exámenes',   href: '/services/general-dentistry/dental-cleanings-exams.html' },
              { label: 'Empastes Dentales',      href: '/services/general-dentistry/dental-fillings.html' },
              { label: 'Selladores Dentales',    href: '/services/general-dentistry/dental-sealants.html' },
              { label: 'Tecnología Dental',      href: '/services/general-dentistry/dental-technology.html' },
              { label: 'Dentista de Emergencia', href: '/services/general-dentistry/emergency-dentist.html' },
              { label: 'Tratamiento con Flúor',  href: '/services/general-dentistry/fluoride-treatment.html' },
              { label: 'Protectores Bucales',    href: '/services/general-dentistry/occlusal-sports-mouthguards.html' },
              { label: 'Detección de Cáncer Oral', href: '/services/general-dentistry/oral-cancer-screening.html' },
              { label: 'Odontología Pediátrica', href: '/services/general-dentistry/pediatric-dentistry.html' },
              { label: 'Extracciones',           href: '/services/general-dentistry/tooth-extractions.html' },
              { label: 'Extracción de Muelas',   href: '/services/general-dentistry/wisdom-teeth-removal.html' }
            ]
          },
          {
            heading: 'Odontología Estética',
            href: '/services/cosmetic-dentistry.html',
            items: [
              { label: 'Invisalign',               href: '/services/cosmetic-dentistry/invisalign.html' },
              { label: 'Blanqueamiento Dental',     href: '/services/cosmetic-dentistry/teeth-whitening.html' },
              { label: 'Carillas',                  href: '/services/cosmetic-dentistry/veneers.html' },
              { label: 'Ortodoncia',                href: '/services/cosmetic-dentistry/orthodontics.html' },
              { label: 'Transformación de Sonrisa', href: '/services/cosmetic-dentistry/smile-makeover.html' }
            ]
          },
          {
            heading: 'Odontología Restauradora',
            href: '/services/restorative-dentistry.html',
            items: [
              { label: 'Injerto Óseo',            href: '/services/restorative-dentistry/bone-grafting.html' },
              { label: 'Puentes Dentales',        href: '/services/restorative-dentistry/dental-bridges.html' },
              { label: 'Coronas Dentales',        href: '/services/restorative-dentistry/dental-crowns.html' },
              { label: 'Implantes Dentales',      href: '/services/restorative-dentistry/dental-implant-restoration.html' },
              { label: 'Endodoncia',              href: '/services/restorative-dentistry/endodontics.html' },
              { label: 'Prótesis',                href: '/services/restorative-dentistry/full-partial-dentures.html' },
              { label: 'Cirugía Oral',            href: '/services/restorative-dentistry/oral-surgery.html' }
            ]
          }
        ]
      },
      {
        label: 'Pacientes Info',
        href: '/patient-info.html'
      },
      {
        label: 'Contacto',
        href: '/contact.html'
      }
    ]
  };

  /* ════════════════════════════════════════════════
     CSS — variables al inicio para ajuste rápido
  ═══════════════════════════════════════════════════ */
  const CSS = `
    :root {
      --nb-bg-color:   #0f2431;
      --nb-accent:     #99cae6;
      --nb-accent-hov: #b8d9ee;
      --nb-text:       #ffffff;
      --nb-muted:      rgba(255, 255, 255, 0.65);
      --nb-border:     rgba(255, 255, 255, 0.85);
      --nb-drop-bg:    #0a1e2b;
      --nb-height:     5.5rem;
      --nb-radius:     0px;
      --nb-px:         5%;
      --nb-font:       inherit;
      --nb-fsize-link: 0.99rem;
      --nb-fsize-btn:  1.09rem;
    }

    #site-navbar {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 999;
      height: var(--nb-height);
      background: transparent;
      border-bottom: 1px solid var(--nb-border);
      display: flex;
      align-items: center;
      padding: 0 var(--nb-px);
      font-family: var(--nb-font);
      color: var(--nb-text);
      transition: background 0.3s ease;
    }
    #site-navbar.nb-scrolled,
    #site-navbar.nb-menu-open {
      background: var(--nb-bg-color);
    }
    #site-navbar .navbar3_bg {
      position: absolute;
      inset: 0;
      background: var(--nb-bg-color);
      height: 0%;
      z-index: 0;
      pointer-events: none;
    }
    .nb-inner {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: center;
      width: 100%;
      height: 100%;
      position: relative;
      z-index: 1;
    }
    .nb-logo {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      text-decoration: none;
      z-index: 3;
    }
    .nb-logo img {
      width: 6.44rem;
      height: auto;
      display: block;
    }
    .nb-logo {
      filter: brightness(0) invert(1) opacity(0.77);
    }
    .nb-links {
      grid-column: 1;
      display: flex;
      align-items: center;
      list-style: none;
      margin: 0;
      padding: 0;
      padding-right: 3.8rem;
      height: 100%;
      margin-left: -2rem;
    }
    .nb-links > li {
      position: relative;
      height: 100%;
      display: flex;
      align-items: center;
    }
    .nb-links > li > a,
    .nb-links > li > button {
      color: var(--nb-text);
      text-decoration: none;
      font-size: var(--nb-fsize-link);
      font-weight: 400;
      padding: 0.484rem 0.669rem;
      display: flex;
      align-items: center;
      gap: 0.3rem;
      background: none;
      border: none;
      cursor: pointer;
      white-space: nowrap;
      transition: color 0.2s;
      height: 100%;
    }
    .nb-links > li > a.active,
    .nb-links > li > a:hover,
    .nb-links > li > button:hover,
    .nb-links > li.nb-open > button {
      color: var(--nb-accent);
    }
    .nb-chevron {
      width: 0.9rem;
      height: 0.9rem;
      flex-shrink: 0;
      transition: transform 0.25s ease;
    }
    .nb-links > li.nb-open .nb-chevron {
      transform: rotate(180deg);
    }
    .nb-drop {
      position: absolute;
      top: 100%;
      left: 0;
      background: var(--nb-drop-bg);
      border: 1px solid rgba(255,255,255,0.12);
      border-top: 2px solid var(--nb-accent);
      border-radius: 0 0 6px 6px;
      min-width: 18rem;
      padding: 0.6rem 0.5rem 0.75rem;
      display: none;
      z-index: 200;
      box-shadow: 0 12px 32px rgba(0,0,0,0.45);
    }
    .nb-links > li.nb-open .nb-drop {
      display: block;
    }
    .nb-drop-label {
      font-size: 0.65rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--nb-accent);
      padding: 0.4rem 0.875rem 0.5rem;
      opacity: 0.85;
    }
    .nb-drop-sep {
      height: 1px;
      background: rgba(255,255,255,0.08);
      margin: 0.3rem 0.5rem 0.4rem;
    }
    .nb-drop a {
      display: flex;
      align-items: flex-start;
      gap: 0.65rem;
      color: rgba(255,255,255,0.88);
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 500;
      padding: 0.55rem 0.875rem;
      border-radius: 4px;
      transition: background 0.18s, color 0.18s;
      white-space: nowrap;
      line-height: 1.35;
    }
    .nb-drop a .nd-icon {
      font-size: 1rem;
      margin-top: 0.05rem;
      flex-shrink: 0;
      opacity: 0.75;
    }
    .nb-drop a .nd-meta {
      display: flex;
      flex-direction: column;
    }
    .nb-drop a .nd-meta span {
      font-size: 0.72rem;
      color: rgba(255,255,255,0.4);
      font-weight: 400;
      margin-top: 0.1rem;
    }
    .nb-drop a:hover,
    .nb-drop a.w--current {
      background: rgba(255,255,255,0.06);
      color: var(--nb-accent);
    }
    .nb-drop a:hover .nd-icon {
      opacity: 1;
    }
    .nb-mega {
      position: fixed;
      top: var(--nb-height);
      left: 50%;
      transform: translateX(-50%);
      width: min(72rem, 88vw);
      background: #1b3a52;
      border-top: 1px solid rgba(255,255,255,0.9);
      border-left: 1px solid rgba(255,255,255,0.12);
      border-right: 1px solid rgba(255,255,255,0.12);
      border-bottom: none;
      border-radius: 0 0 8px 8px;
      padding: 2.2rem 3rem 0 3rem;
      display: none;
      z-index: 200;
      box-shadow: 0 16px 48px rgba(0,0,0,0.5);
      flex-direction: column;
    }
    .nb-links > li.nb-open .nb-mega {
      display: flex;
    }
    .nb-mega-cols {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2.5rem;
    }
    .nb-mega-col a.nb-mega-head {
      display: block;
      color: #ffffff;
      font-size: 0.95rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      text-decoration: none;
      margin-bottom: 1rem;
      padding-bottom: 0.7rem;
      border-bottom: 1px solid rgba(255,255,255,0.2);
      transition: color 0.2s;
    }
    .nb-mega-col a.nb-mega-head:hover {
      color: var(--nb-accent);
    }
    .nb-mega-col ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .nb-mega-col ul a {
      display: block;
      color: rgba(255,255,255,0.82);
      font-size: 0.975rem;
      text-decoration: none;
      padding: 0.38rem 0;
      transition: color 0.2s;
    }
    .nb-mega-col ul a:hover {
      color: #ffffff;
    }
    .nb-mega-footer {
      margin-top: 1.75rem;
      padding: 1rem 0 1.5rem;
      border-top: 1px solid rgba(255,255,255,0.1);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .nb-mega-footer a {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      color: var(--nb-accent);
      font-size: 0.9rem;
      font-weight: 600;
      text-decoration: none;
      letter-spacing: 0.03em;
      transition: color 0.2s, gap 0.2s;
    }
    .nb-mega-footer a:hover {
      color: var(--nb-accent-hov);
      gap: 0.65rem;
    }
    .nb-mega-footer a svg {
      width: 1rem;
      height: 1rem;
      flex-shrink: 0;
    }
    .nb-actions {
      grid-column: 3;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-left: 3.8rem;
      gap: 0.75rem;
      z-index: 3;
    }
    .nb-btn {
      font-size: var(--nb-fsize-btn);
      font-weight: 400;
      padding: 0.605rem 1.05rem;
      border-radius: 0;
      cursor: pointer;
      text-decoration: none;
      white-space: nowrap;
      border: 1px solid transparent;
      transition: background 0.2s, color 0.2s, border-color 0.2s;
      display: inline-flex;
      align-items: center;
    }
    .nb-btn-primary {
      background: var(--nb-accent);
      color: #030608;
      border-color: var(--nb-accent);
    }
    .nb-btn-primary:hover {
      background: var(--nb-accent-hov);
      border-color: var(--nb-accent-hov);
    }
    .nb-btn-outline {
      background: transparent;
      color: var(--nb-text);
      border-color: rgba(255, 255, 255, 0.75);
    }
    .nb-btn-outline:hover {
      border-color: var(--nb-accent);
      color: var(--nb-accent);
    }
    .nb-hamburger {
      display: none;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 5px;
      width: 48px;
      height: 48px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      z-index: 3;
      grid-column: 3;
      justify-self: end;
    }
    .nb-hamburger span {
      display: block;
      width: 24px;
      height: 2px;
      background: var(--nb-text);
      border-radius: 2px;
      transition: transform 0.3s ease, opacity 0.3s ease;
    }
    #site-navbar.nb-menu-open .nb-hamburger span:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }
    #site-navbar.nb-menu-open .nb-hamburger span:nth-child(2) {
      opacity: 0;
      transform: scaleX(0);
    }
    #site-navbar.nb-menu-open .nb-hamburger span:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }
    #nb-mobile-panel {
      display: none;
      position: fixed;
      top: var(--nb-height);
      left: 0; right: 0; bottom: 0;
      background: var(--nb-bg-color);
      overflow-y: auto;
      padding: 0 var(--nb-px) 3rem;
      z-index: 997;
      flex-direction: column;
      border-top: 1px solid rgba(255,255,255,0.08);
    }
    #nb-mobile-panel.nb-panel-open {
      display: flex;
    }
    .nb-mob-link {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: rgba(255,255,255,0.9);
      text-decoration: none;
      font-size: 1.05rem;
      font-weight: 500;
      padding: 1.1rem 0;
      border-bottom: 1px solid rgba(255,255,255,0.08);
      background: none;
      border-left: none;
      border-right: none;
      border-top: none;
      cursor: pointer;
      width: 100%;
      text-align: left;
      transition: color 0.2s;
      letter-spacing: 0.01em;
    }
    .nb-mob-link.active {
      color: var(--nb-accent);
    }
    .nb-mob-link:hover {
      color: var(--nb-accent);
    }
    .nb-mob-link .nb-chevron {
      transition: transform 0.25s;
      flex-shrink: 0;
      opacity: 0.5;
    }
    .nb-mob-link.nb-mob-open .nb-chevron {
      transform: rotate(180deg);
      opacity: 1;
    }
    .nb-mob-sub {
      display: none;
      flex-direction: column;
      padding: 0.4rem 0 0.6rem 0;
      border-bottom: 1px solid rgba(255,255,255,0.08);
      gap: 0.05rem;
    }
    .nb-mob-sub.nb-mob-sub-open {
      display: flex;
    }
    .nb-mob-sub-group {
      display: flex;
      flex-direction: column;
      margin-top: 0.5rem;
      padding-top: 0.5rem;
      border-top: 1px solid rgba(255,255,255,0.07);
    }
    .nb-mob-sub-group:first-of-type {
      border-top: none;
      margin-top: 0;
      padding-top: 0;
    }
    .nb-mob-sub .nb-mob-sub-head {
      color: var(--nb-accent);
      font-size: 0.62rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.13em;
      padding: 0.6rem 0 0.3rem;
      opacity: 0.75;
    }
    .nb-mob-sub a {
      color: rgba(255,255,255,0.65);
      text-decoration: none;
      font-size: 0.92rem;
      padding: 0.42rem 0;
      transition: color 0.2s;
      border: none;
    }
    .nb-mob-sub a:hover {
      color: #ffffff;
    }
    .nb-mob-all-services {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.45rem;
      margin: 1.1rem 0 0.3rem;
      padding: 0.7rem 1rem;
      color: var(--nb-accent);
      font-size: 0.875rem;
      font-weight: 600;
      text-decoration: none;
      letter-spacing: 0.04em;
      border: 1px solid rgba(153,202,230,0.35);
      border-radius: 3px;
      background: rgba(153,202,230,0.06);
      transition: background 0.2s, border-color 0.2s, color 0.2s;
      width: 100%;
    }
    .nb-mob-all-services:hover {
      background: rgba(153,202,230,0.12);
      border-color: rgba(153,202,230,0.6);
      color: var(--nb-accent-hov);
    }
    .nb-mob-all-services svg {
      width: 0.9rem;
      height: 0.9rem;
      flex-shrink: 0;
    }
    .nb-mob-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.65rem;
      margin-top: 2rem;
    }
    .nb-mob-actions .nb-btn {
      flex: 1;
      justify-content: center;
      min-width: 8rem;
    }
    .nb-mob-actions .nb-btn-primary {
      flex-basis: 100%;
    }
    .nb-btn-phone {
      font-size: 0.85rem;
    }
    @media (max-width: 991px) {
      .nb-links,
      .nb-actions {
        display: none;
      }
      .nb-hamburger {
        display: flex;
      }
      .nb-inner {
        grid-template-columns: auto 1fr auto;
      }
      .nb-logo {
        position: static;
        transform: none;
        grid-column: 1;
      }
    }
  `;

  const CHEVRON = `
    <svg class="nb-chevron" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path fill-rule="evenodd" clip-rule="evenodd"
        d="M2.558 6.295a.667.667 0 0 1 0-.942l.884-.884a.667.667 0 0 1 .942 0
           L8 8.086l3.616-3.617a.667.667 0 0 1 .942 0l.884.884a.667.667 0 0 1 0
           .942L8.471 11.56a.667.667 0 0 1-.942 0L2.558 6.295z"
        fill="currentColor"/>
    </svg>`;

  const ARROW = `
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5"
        stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

  function buildDesktopLinks() {
    return NAV.links.map(link => {
      if (!link.dropdown && !link.mega) {
        return `
          <li>
            <a href="${link.href}"${link.active ? ' class="active" aria-current="page"' : ''}>
              ${link.label}
            </a>
          </li>`;
      }
      if (link.dropdown) {
        const items = link.dropdown.map(d => `
          <a href="${d.href}">
            <span class="nd-icon">${d.icon || '→'}</span>
            <span class="nd-meta">
              ${d.label}
              ${d.desc ? `<span>${d.desc}</span>` : ''}
            </span>
          </a>`).join('');
        return `
          <li>
            <button class="nb-toggle" aria-expanded="false">
              ${link.label} ${CHEVRON}
            </button>
            <div class="nb-drop" role="menu">
              <div class="nb-drop-label">${link.label}</div>
              <div class="nb-drop-sep"></div>
              ${items}
            </div>
          </li>`;
      }
      if (link.mega) {
        const cols = link.mega.map(col => `
          <div class="nb-mega-col">
            <a class="nb-mega-head" href="${col.href}">${col.heading}</a>
            <ul>
              ${col.items.map(i => `<li><a href="${i.href}">${i.label}</a></li>`).join('')}
            </ul>
          </div>`).join('');
        const allHref = link.allHref || '#';
        return `
          <li>
            <button class="nb-toggle" aria-expanded="false">
              ${link.label} ${CHEVRON}
            </button>
            <div class="nb-mega" role="menu">
              <div class="nb-mega-cols">${cols}</div>
              <div class="nb-mega-footer">
                <a href="${allHref}">
                  Ver todos los servicios ${ARROW}
                </a>
              </div>
            </div>
          </li>`;
      }
    }).join('');
  }

  function buildMobileLinks() {
    return NAV.links.map(link => {
      if (!link.dropdown && !link.mega) {
        return `
          <a href="${link.href}" class="nb-mob-link${link.active ? ' active' : ''}">
            ${link.label}
          </a>`;
      }
      if (link.dropdown) {
        const items = link.dropdown
          .map(d => `<a href="${d.href}">${d.label}</a>`)
          .join('');
        return `
          <button class="nb-mob-link nb-mob-toggle">
            ${link.label} ${CHEVRON}
          </button>
          <div class="nb-mob-sub">
            ${items}
          </div>`;
      }
      if (link.mega) {
        const inner = link.mega.map(col => `
          <div class="nb-mob-sub-group">
            <span class="nb-mob-sub-head">${col.heading}</span>
            ${col.items.map(i => `<a href="${i.href}">${i.label}</a>`).join('')}
          </div>`
        ).join('');
        const allHref = link.allHref || '#';
        return `
          <button class="nb-mob-link nb-mob-toggle">
            ${link.label} ${CHEVRON}
          </button>
          <div class="nb-mob-sub">
            ${inner}
            <a href="${allHref}" class="nb-mob-all-services">
              Ver todos los servicios ${ARROW}
            </a>
          </div>`;
      }
    }).join('');
  }

  function inject() {
    const style = document.createElement('style');
    style.id = 'nb-styles';
    style.textContent = CSS;
    document.head.appendChild(style);

    const nav = document.createElement('nav');
    nav.id = 'site-navbar';
    nav.setAttribute('role', 'banner');
    nav.classList.add('navbar3_component');
    nav.innerHTML = `
      <div class="navbar3_bg"></div>
      <div class="nb-inner">
        <ul class="nb-links" role="navigation" aria-label="Navegación principal">
          ${buildDesktopLinks()}
        </ul>
        <a href="${NAV.logo.href}" class="nb-logo" aria-label="${NAV.logo.alt}">
          <img src="${NAV.logo.src}" alt="${NAV.logo.alt}" width="68" height="68">
        </a>
        <div class="nb-actions">
          <a href="${NAV.bookUrl}" class="nb-btn nb-btn-primary" target="_blank" rel="noopener">
            Reservar Cita
          </a>
          <a href="/contact.html" class="nb-btn nb-btn-outline">Contáctenos</a>
          <a href="${NAV.phone.href}" class="nb-btn nb-btn-outline">${NAV.phone.label}</a>
        </div>
        <button class="nb-hamburger" aria-label="Abrir menú" aria-expanded="false" aria-controls="nb-mobile-panel">
          <span></span><span></span><span></span>
        </button>
      </div>
    `;

    const panel = document.createElement('div');
    panel.id = 'nb-mobile-panel';
    panel.setAttribute('aria-hidden', 'true');
    panel.innerHTML = `
      ${buildMobileLinks()}
      <div class="nb-mob-actions">
        <a href="/contact.html" class="nb-btn nb-btn-outline">Contáctenos</a>
        <a href="${NAV.phone.href}" class="nb-btn nb-btn-outline nb-btn-phone">${NAV.phone.label}</a>
        <a href="${NAV.bookUrl}" class="nb-btn nb-btn-primary" target="_blank" rel="noopener">
          Reservar Cita
        </a>
      </div>
    `;

    document.body.prepend(panel);
    document.body.prepend(nav);
  }

  function bindEvents() {
    const navbar    = document.getElementById('site-navbar');
    const panel     = document.getElementById('nb-mobile-panel');
    const hamburger = navbar.querySelector('.nb-hamburger');

    const onScroll = () => {
      navbar.classList.toggle('nb-scrolled', window.scrollY > 80);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    hamburger.addEventListener('click', () => {
      const isOpen = navbar.classList.toggle('nb-menu-open');
      panel.classList.toggle('nb-panel-open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      panel.setAttribute('aria-hidden', !isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navbar.querySelectorAll('.nb-toggle').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const li = btn.closest('li');
        const wasOpen = li.classList.contains('nb-open');

        navbar.querySelectorAll('li.nb-open').forEach(el => {
          el.classList.remove('nb-open');
          el.querySelector('.nb-toggle')?.setAttribute('aria-expanded', 'false');
        });

        if (!wasOpen) {
          li.classList.add('nb-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    document.addEventListener('click', () => {
      navbar.querySelectorAll('li.nb-open').forEach(el => {
        el.classList.remove('nb-open');
        el.querySelector('.nb-toggle')?.setAttribute('aria-expanded', 'false');
      });
    });

    panel.querySelectorAll('.nb-mob-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const sub = btn.nextElementSibling;
        if (!sub) return;

        const wasOpen = sub.classList.contains('nb-mob-sub-open');

        panel.querySelectorAll('.nb-mob-sub.nb-mob-sub-open').forEach(el => el.classList.remove('nb-mob-sub-open'));
        panel.querySelectorAll('.nb-mob-toggle.nb-mob-open').forEach(el => el.classList.remove('nb-mob-open'));

        if (!wasOpen) {
          sub.classList.add('nb-mob-sub-open');
          btn.classList.add('nb-mob-open');
        }
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 991) {
        navbar.classList.remove('nb-menu-open');
        panel.classList.remove('nb-panel-open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && navbar.classList.contains('nb-menu-open')) {
        navbar.classList.remove('nb-menu-open');
        panel.classList.remove('nb-panel-open');
        document.body.style.overflow = '';
        hamburger.focus();
      }
    });
  }

  function init() {
    inject();
    bindEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

/**
 * footer.js — Pôle Orthodontique
 * Footer autocontenido: inyecta HTML + CSS en el DOM.
 * Verifica que no exista ya un footer para evitar duplicados.
 */

(function () {
  'use strict';

  // ═══════════════════════════════════════════════════════════════════════
  // VERIFICAR QUE NO EXISTA YA UN FOOTER (evita duplicados)
  // ═══════════════════════════════════════════════════════════════════════
  if (document.getElementById('site-footer')) {
    console.log('Footer ya existe, evitando duplicado');
    return;
  }

  /* ════════════════════════════════════════════════
     CONFIG — edita aquí solo los datos del contenido
  ═══════════════════════════════════════════════════ */
  const FT = {
  logo: (() => {
    const path = window.location.pathname;
    const depth = (path.match(/\//g) || []).length - 1;
    const up = depth > 0 ? '../'.repeat(depth) : '';
    return {
      src: `${up}image-optimized/logo.svg`,
      alt: 'Pôle Orthodontique',
      href: '/'
    };
  })(),
  tagline: 'Atención dental de calidad en el corazón de Toulouse.',

    nav: [
      { label: 'Inicio',              href: '/' },
      { label: 'Quiénes Somos',       href: '/about.html' },
      { label: 'La Doctora',          href: '/about/meet-the-doctor.html' },
      { label: 'Info para Pacientes', href: '/patient-info.html' },
      { label: 'Contacto',            href: '/contact.html' }
    ],

    services: [
      { label: 'Todos los Servicios',       href: '/services.html' },
      { label: 'Odontología General',       href: '/services/general-dentistry.html' },
      { label: 'Odontología Estética',      href: '/services/cosmetic-dentistry.html' },
      { label: 'Odontología Restauradora',  href: '/services/restorative-dentistry.html' }
    ],

    address: {
      text: '12 Rue des Carmes,<br>Toulouse, 31000',
      mapsUrl: 'https://maps.app.goo.gl/sH6JLQKQDmvfXYPWA'
    },
    phone:  { label: '+1 (555) 000-0000',        href: 'tel:+15550000000' },
    email:  { label: 'contacto@ejemplo.com',     href: 'mailto:contacto@ejemplo.com' },

    credit: 'LunaRojaDigital',
    creditUrl: '#'
  };

  /* ════════════════════════════════════════════════
     CSS
  ═══════════════════════════════════════════════════ */
  const CSS = `
    #site-footer {
      --ft-bg:        #08181f;
      --ft-accent:    #99cae6;
      --ft-text:      #ffffff;
      --ft-muted:     rgba(255,255,255,0.5);
      --ft-border:    rgba(255,255,255,0.08);
      --ft-px:        5%;
      --ft-font:      inherit;
    }

    #site-footer {
      background: var(--ft-bg);
      color: var(--ft-text);
      font-family: var(--ft-font);
      padding: 4.5rem var(--ft-px) 0;
      border-top: 1px solid var(--ft-border);
    }

    .ft-top {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 2.5rem;
      padding-bottom: 3.5rem;
    }

    .ft-brand {
      display: flex;
      flex-direction: column;
      gap: 1.1rem;
    }
    .ft-logo {
      display: inline-block;
      text-decoration: none;
      width: fit-content;
    }
    .ft-logo img {
      width: 4.2rem;
      height: auto;
      display: block;
      filter: brightness(0) invert(1) opacity(0.75);
    }
    .ft-tagline {
      font-size: 0.875rem;
      color: var(--ft-muted);
      line-height: 1.65;
      margin: 0;
    }
    .ft-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.7rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--ft-muted);
      border: 1px solid var(--ft-border);
      border-radius: 3px;
      padding: 0.3rem 0.6rem;
      width: fit-content;
      margin-top: 0.25rem;
    }
    .ft-badge svg {
      width: 0.75rem;
      height: 0.75rem;
      flex-shrink: 0;
      opacity: 0.6;
    }

    .ft-col {
      display: flex;
      flex-direction: column;
    }
    .ft-col-title {
      font-size: 0.68rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: var(--ft-accent);
      margin-bottom: 1rem;
      opacity: 0.85;
    }
    .ft-link {
      color: rgba(255,255,255,0.88);
      text-decoration: none;
      font-size: 0.875rem;
      padding: 0.32rem 0;
      transition: color 0.2s;
      display: block;
    }
    .ft-link:hover {
      color: #ffffff;
    }

    .ft-contact-group {
      display: flex;
      flex-direction: column;
      margin-bottom: 1.1rem;
    }
    .ft-contact-group:last-child { margin-bottom: 0; }
    .ft-contact-label {
      font-size: 0.68rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--ft-text);
      opacity: 0.4;
      margin-bottom: 0.35rem;
    }
    .ft-contact-val {
      color: rgba(255,255,255,0.88);
      text-decoration: none;
      font-size: 0.875rem;
      line-height: 1.6;
      transition: color 0.2s;
      display: block;
    }
    .ft-contact-val:hover { color: #ffffff; }

    .ft-divider {
      height: 1px;
      background: var(--ft-border);
      width: 100%;
    }

    .ft-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.25rem 0 1.5rem;
      gap: 1rem;
    }
    .ft-credit {
      font-size: 0.78rem;
      color: var(--ft-muted);
    }
    .ft-credit-link {
      color: var(--ft-muted);
      text-decoration: none;
      font-weight: 600;
      font-size: 0.78rem;
      transition: color 0.2s;
      letter-spacing: 0.02em;
    }
    .ft-credit-link:hover { color: var(--ft-accent); }

    @media (max-width: 991px) {
      .ft-top {
        grid-template-columns: 1fr 1fr;
        gap: 2.5rem 2rem;
      }
    }

    @media (max-width: 567px) {
      #site-footer { padding-top: 3rem; }
      .ft-top {
        grid-template-columns: 1fr 1fr;
        gap: 2rem 1.5rem;
        padding-bottom: 2.5rem;
      }
      .ft-bottom {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }
    }
  `;

  function buildHTML() {
    const navLinks = FT.nav
      .map(l => `<a href="${l.href}" class="ft-link">${l.label}</a>`)
      .join('');

    const serviceLinks = FT.services
      .map(l => `<a href="${l.href}" class="ft-link">${l.label}</a>`)
      .join('');

    const year = new Date().getFullYear();

    const lockIcon = `
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="4" y="7" width="8" height="6" rx="1" stroke="currentColor" stroke-width="1.4"/>
        <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
      </svg>`;

    return `
      <footer id="site-footer" role="contentinfo">

        <div class="ft-top">

          <div class="ft-brand">
            <a href="${FT.logo.href}" class="ft-logo" aria-label="${FT.logo.alt}">
              <img src="${FT.logo.src}" alt="${FT.logo.alt}" width="67" height="67">
            </a>
            <p class="ft-tagline">${FT.tagline}</p>
            <span class="ft-badge">${lockIcon} Sitio seguro</span>
          </div>

          <div class="ft-col">
            <span class="ft-col-title">Navegación</span>
            ${navLinks}
          </div>

          <div class="ft-col">
            <span class="ft-col-title">Servicios</span>
            ${serviceLinks}
          </div>

          <div class="ft-col">
            <span class="ft-col-title">Contacto</span>

            <div class="ft-contact-group">
              <span class="ft-contact-label">Dirección</span>
              <a href="${FT.address.mapsUrl}" class="ft-contact-val" target="_blank" rel="noopener">
                ${FT.address.text}
              </a>
            </div>

            <div class="ft-contact-group">
              <span class="ft-contact-label">Teléfono</span>
              <a href="${FT.phone.href}" class="ft-contact-val">${FT.phone.label}</a>
            </div>

            <div class="ft-contact-group">
              <span class="ft-contact-label">Email</span>
              <a href="${FT.email.href}" class="ft-contact-val">${FT.email.label}</a>
            </div>
          </div>

        </div>

        <div class="ft-divider"></div>

        <div class="ft-bottom">
          <span class="ft-credit">© ${year}. Todos los derechos reservados.</span>
          <a href="${FT.creditUrl}" class="ft-credit-link">${FT.credit}</a>
        </div>

      </footer>`;
  }

  function inject() {
    const style = document.createElement('style');
    style.id = 'ft-styles';
    style.textContent = CSS;
    document.head.appendChild(style);

    document.body.insertAdjacentHTML('beforeend', buildHTML());

    const yearSpan = document.querySelector('#site-footer .ft-credit');
    if (yearSpan) {
      yearSpan.innerHTML = yearSpan.innerHTML.replace(
        /\d{4}/,
        new Date().getFullYear()
      );
    }
  }

  /* ════════════════════════════════════════════════
     WHATSAPP DEMO MODAL — Upwork-safe
  ═══════════════════════════════════════════════════ */
  function showWADemo(e) {
    if (e) e.preventDefault();

    const existing = document.getElementById('wa-demo-modal');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'wa-demo-modal';
    overlay.innerHTML = `
      <div style="
        position:fixed;inset:0;z-index:99999;
        background:rgba(0,0,0,.55);
        display:flex;align-items:center;justify-content:center;
        backdrop-filter:blur(3px);
        animation:fadeIn .25s ease;
      " onclick="if(event.target===this)closeWAModal()">
        <div style="
          background:#fff;border-radius:16px;padding:2.2rem 2rem;
          max-width:400px;width:90%;text-align:center;
          box-shadow:0 24px 64px rgba(0,0,0,.25);
          font-family:Arial,Helvetica,sans-serif;
          animation:slideUp .3s ease;
        ">
          <div style="font-size:2.6rem;margin-bottom:.6rem;">🔧</div>
          <h3 style="margin:0 0 .5rem;font-size:1.3rem;color:#0f2431;">Demo — Portfolio</h3>
          <p style="margin:0 0 1.4rem;color:#555;font-size:.9rem;line-height:1.5;">
            Este sitio es un portfolio profesional.<br>
            Para contactar al desarrollador,<br>
            usa <strong>Upwork</strong>.
          </p>
          <button onclick="closeWAModal()" style="
            background:#327ba5;color:#fff;border:none;
            padding:.7rem 2rem;border-radius:8px;
            font-size:.95rem;cursor:pointer;
            font-weight:600;
          " onmouseover="this.style.background='#286284'" onmouseout="this.style.background='#327ba5'">
            Entendido
          </button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    return false;
  }

  function closeWAModal() {
    const el = document.getElementById('wa-demo-modal');
    if (el) el.remove();
  }

  window.showWADemo = showWADemo;
  window.closeWAModal = closeWAModal;

  /* ════════════════════════════════════════════════
     KEYFRAMES
  ═══════════════════════════════════════════════════ */
  const keyframes = document.createElement('style');
  keyframes.textContent = `
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUp { from { transform: translateY(24px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  `;
  document.head.appendChild(keyframes);

  function init() {
    inject();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();