/**
 * ECOMOBI GARAGE — main.js
 * Funções: navbar scroll, menu mobile, scroll-reveal,
 *          formulário com validação, lightbox, back-to-top
 */

document.addEventListener('DOMContentLoaded', function () {
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initScrollReveal();
  initForm();
  initLightbox();
  initBackToTop();
});

/* ─────────────────────────────────────────────────────────
   NAVBAR – escurece ao rolar
──────────────────────────────────────────────────────────*/
function initNavbar() {
  var nav = document.getElementById('navbar');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

/* ─────────────────────────────────────────────────────────
   MENU MOBILE
──────────────────────────────────────────────────────────*/
function initMobileMenu() {
  var btn   = document.getElementById('hamburger');
  var links = document.getElementById('navLinks');
  if (!btn || !links) return;

  btn.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    btn.classList.toggle('active', open);
    btn.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Fecha ao clicar num link
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });

  // Fecha ao pressionar ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  // Fecha ao clicar fora do nav
  document.addEventListener('click', function (e) {
    var nav = document.getElementById('navbar');
    if (nav && !nav.contains(e.target) && links.classList.contains('open')) {
      closeMenu();
    }
  });

  function closeMenu() {
    links.classList.remove('open');
    btn.classList.remove('active');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
}

/* ─────────────────────────────────────────────────────────
   SMOOTH SCROLL com offset do navbar
──────────────────────────────────────────────────────────*/
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href   = this.getAttribute('href');
      if (href === '#') { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      var navH   = document.getElementById('navbar')
                   ? document.getElementById('navbar').offsetHeight : 72;
      var y      = target.getBoundingClientRect().top + window.pageYOffset - navH - 12;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });
}

/* ─────────────────────────────────────────────────────────
   SCROLL REVEAL
──────────────────────────────────────────────────────────*/
function initScrollReveal() {
  var els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('visible'); });
    return;
  }

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(function (el) { obs.observe(el); });
}

/* ─────────────────────────────────────────────────────────
   FORMULÁRIO DE ORÇAMENTO
──────────────────────────────────────────────────────────*/
function initForm() {
  var form = document.getElementById('orcamentoForm');
  if (!form) return;

  // Máscara de telefone
  var wpInput = document.getElementById('whatsapp');
  if (wpInput) {
    wpInput.addEventListener('input', function () {
      var v = this.value.replace(/\D/g, '').substring(0, 11);
      if (v.length <= 10) {
        v = v.replace(/^(\d{2})(\d{0,4})(\d{0,4})$/, function (_, a, b, c) {
          return b ? '(' + a + ') ' + b + (c ? '-' + c : '') : '(' + a;
        });
      } else {
        v = v.replace(/^(\d{2})(\d{5})(\d{0,4})$/, '($1) $2-$3');
      }
      this.value = v;
    });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    handleSubmit();
  });
}

function clearErrors() {
  document.querySelectorAll('.field input, .field select, .field textarea').forEach(function (el) {
    el.classList.remove('invalid');
  });
  document.querySelectorAll('.field-error').forEach(function (el) {
    el.textContent = '';
    el.classList.remove('show');
  });
}

function showError(id, msg) {
  var el  = document.getElementById(id);
  var err = document.getElementById(id + 'Error');
  if (el)  el.classList.add('invalid');
  if (err) { err.textContent = msg; err.classList.add('show'); }
}

function handleSubmit() {
  clearErrors();

  var nome     = document.getElementById('nome');
  var whatsapp = document.getElementById('whatsapp');
  var tipo     = document.getElementById('tipo');
  var descricao= document.getElementById('descricao');
  var email    = document.getElementById('email');
  var modelo   = document.getElementById('modelo');

  var valid = true;

  if (!nome || !nome.value.trim()) {
    showError('nome', 'Por favor, informe seu nome.'); valid = false;
  }
  if (!whatsapp || !whatsapp.value.trim()) {
    showError('whatsapp', 'Por favor, informe seu WhatsApp.'); valid = false;
  } else {
    var digits = whatsapp.value.replace(/\D/g, '');
    if (digits.length < 10) {
      showError('whatsapp', 'Número inválido — mínimo 10 dígitos.'); valid = false;
    }
  }
  if (!tipo || !tipo.value) {
    showError('tipo', 'Selecione o tipo de veículo.'); valid = false;
  }
  if (!descricao || !descricao.value.trim()) {
    showError('descricao', 'Descreva o problema ou serviço desejado.'); valid = false;
  }

  if (!valid) return;

  // Salva lead
  try {
    var leads = JSON.parse(localStorage.getItem('ecomobi_leads') || '[]');
    leads.push({
      nome:      nome.value.trim(),
      whatsapp:  whatsapp.value.trim(),
      email:     email ? email.value.trim() : '',
      tipo:      tipo.value,
      modelo:    modelo ? modelo.value.trim() : '',
      descricao: descricao.value.trim(),
      data:      new Date().toLocaleString('pt-BR')
    });
    localStorage.setItem('ecomobi_leads', JSON.stringify(leads));
  } catch (_) { /* silently fail */ }

  // Monta mensagem WhatsApp
  var nomeVal  = nome.value.trim();
  var tipoVal  = tipo.value;
  var modVal   = modelo ? modelo.value.trim() : '';
  var descVal  = descricao.value.trim();
  var wpVal    = whatsapp.value.trim();
  var emailVal = email ? email.value.trim() : '';

  var msg = 'Olá! Vim pelo site e gostaria de um orçamento.\n\n'
    + '*Nome:* ' + nomeVal + '\n'
    + '*Veículo:* ' + tipoVal + (modVal ? ' – ' + modVal : '') + '\n'
    + '*Descrição:* ' + descVal + '\n'
    + '*WhatsApp:* ' + wpVal
    + (emailVal ? '\n*E-mail:* ' + emailVal : '');

  var waURL = 'https://wa.me/5511968100730?text=' + encodeURIComponent(msg);

  // Mostra sucesso
  var formContent = document.getElementById('formContent');
  var formSuccess = document.getElementById('formSuccess');
  var submitBtn   = document.getElementById('submitBtn');

  if (submitBtn) { submitBtn.disabled = true; }
  if (formContent) { formContent.style.display = 'none'; }
  if (formSuccess) { formSuccess.style.display = 'block'; }

  // Abre WhatsApp
  setTimeout(function () {
    window.open(waURL, '_blank', 'noopener,noreferrer');
  }, 1500);
}

/* ─────────────────────────────────────────────────────────
   LIGHTBOX DA GALERIA
──────────────────────────────────────────────────────────*/
function initLightbox() {
  var box   = document.getElementById('lightbox');
  var img   = document.getElementById('lightboxImg');
  var close = document.getElementById('lightbox-close');
  if (!box || !img) return;

  document.querySelectorAll('.gallery-grid img').forEach(function (el) {
    el.addEventListener('click', function () {
      img.src = this.src;
      img.alt = this.alt || '';
      box.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    box.classList.remove('open');
    document.body.style.overflow = '';
    img.src = '';
  }

  if (close) close.addEventListener('click', closeLightbox);

  box.addEventListener('click', function (e) {
    if (e.target === box) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && box.classList.contains('open')) closeLightbox();
  });
}

/* ─────────────────────────────────────────────────────────
   BACK TO TOP
──────────────────────────────────────────────────────────*/
function initBackToTop() {
  var btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', function () {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
