import servicesData from '../../data/services.json';
import { ICONS } from '../utils/icons.js';

export function initData() {
    renderServices();
}

function renderServices() {
    const grid = document.querySelector('.services__grid');
    if (!grid) return;

    grid.innerHTML = servicesData
        .map(
            (service, index) => `
        <div class="service-card stagger-item" data-index="${index}">
            <div class="service-card__icon">
                ${ICONS[service.icon] || ICONS.globe}
            </div>
            <h3 class="service-card__title">${service.titleFr}</h3>
            <p class="service-card__solution">${service.descFr}</p>
            <a href="#contact" class="service-card__cta">${service.cta}</a>
        </div>
    `
        )
        .join('');
}
