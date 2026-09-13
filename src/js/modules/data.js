import servicesData from '../../data/services.json';
import processData from '../../data/process-steps.json';
import clientsData from '../../data/clients.json';

export function initData() {
    renderServices();
    renderProcessSteps();
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
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-svg" aria-hidden="true">
                   <!-- Icon placeholder based on ID or we can inject generic based on type. For brevity, using generic. -->
                   <circle cx="24" cy="24" r="10" stroke="#4ABAFF" stroke-width="2"/>
                </svg>
            </div>
            <div class="service-card__number" aria-hidden="true">0${index + 1}</div>
            <h3 class="service-card__title" data-fr="${service.titleFr}" data-en="${service.titleEn}">${service.titleFr}</h3>
            <p class="service-card__solution" data-fr="${service.descFr}" data-en="${service.descEn}">${service.descFr}</p>
            <a href="#contact" class="service-card__cta" data-fr="En savoir plus →" data-en="Learn more →">En savoir plus →</a>
        </div>
    `
        )
        .join('');
}

function renderProcessSteps() {
    const track = document.querySelector('.why__timeline .timeline-track');
    if (!track) return;

    const html = processData
        .map(
            (step, i) => `
        <div class="timeline-node">
            <div class="timeline-node__dot"></div>
            <div class="timeline-node__label" data-fr="${step.titleFr}" data-en="${step.titleEn}">${step.titleFr}</div>
        </div>
        ${i < processData.length - 1 ? '<div class="timeline-connector"></div>' : ''}
    `
        )
        .join('');

    track.innerHTML = html;
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
