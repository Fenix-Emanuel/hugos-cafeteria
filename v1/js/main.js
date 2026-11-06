import { CONFIG } from './config.js';
import { initI18n, t } from './i18n.js';
import { initNavbar } from './navbar.js';
import { initForm } from './form.js';
import { initChat } from './chat.js';
import { whatsappUrl } from './whatsapp.js';

function initWhatsappLinks() {
  const update = () => {
    document.querySelectorAll('[data-whatsapp]').forEach((link) => {
      link.href = whatsappUrl(t('whatsapp.greeting'));
      link.target = '_blank'; link.rel = 'noopener';
    });
    document.querySelectorAll('[data-phone]').forEach((el) => { el.textContent = CONFIG.phoneDisplay; });
  };
  update();
  document.addEventListener('hugos:languagechange', update);
}
function initMinDate() {
  const field = document.querySelector('#field-date');
  if (!field) return;
  field.min = new Date().toISOString().split('T')[0];
}
function initNewsletter() {
  const form = document.querySelector('#newsletter-form');
  if (!form) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = form.querySelector('[name="newsletter-name"]').value.trim();
    const text = t('whatsapp.greeting') + (name ? ` (${name})` : '');
    const url = whatsappUrl(text);
    if (!window.open(url, '_blank', 'noopener')) window.location.href = url;
  });
}

initI18n();
initWhatsappLinks();
initMinDate();
initNewsletter();
initNavbar();
initForm();
initChat();
