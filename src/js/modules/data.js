import servicesData from '../../data/services.json';
import clientsData from '../../data/clients.json';
import { ICONS } from '../utils/icons.js';

export function initData() {
    renderServices();
    renderClients();
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

function renderClients() {
    const track = document.querySelector('.partners__scroll-track');
    if (!track) return;

    const logosHtml = clientsData
        .map(
            (client) => `
        <img src="${client.logo}" alt="${client.name}" class="partner-logo" width="120" height="60">
    `
        )
        .join('');

    const duplicateHtml = clientsData
        .map(
            (client) => `
        <img src="${client.logo}" alt="${client.name}" class="partner-logo" aria-hidden="true" width="120" height="60">
    `
        )
        .join('');

    track.innerHTML = logosHtml + duplicateHtml;
}
