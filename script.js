const filters = document.querySelectorAll('[data-filter]');
const cards = document.querySelectorAll('.project-card');
const filterStatus = document.getElementById('filter-status');
filters.forEach((button) => {
    button.addEventListener('click', () => {
        const category = button.dataset.filter;
        filters.forEach((filter) => {
            const selected = filter === button;
            filter.classList.toggle('active', selected);
            filter.setAttribute('aria-pressed', String(selected));
        });
        let visible = 0;
        cards.forEach((card) => {
            card.hidden = category !== 'all' && card.dataset.category !== category;
            if (!card.hidden) visible += 1;
        });
        filterStatus.textContent = `Showing ${visible} ${category === 'all' ? 'projects' : category === 'app' ? 'apps' : 'games'}.`;
    });
});
const projects = {
    watchworld: { name: 'WatchWorld', package: 'com.WatchWorld' },
    'tresors-de-paris': { name: 'Trésors de Paris', package: 'com.tresorsdeparis' },
    'exploding-booze': { name: 'Exploding Booze', package: 'com.explodingbooze' },
    mazebound: { name: 'Mazebound: Simple TD', package: 'nl.valentijnkeijser.towerdefense' },
};
const dialog = document.getElementById('gallery-dialog');
const galleryImage = document.getElementById('gallery-image');
const galleryCounter = document.getElementById('gallery-counter');
let currentProject = 'watchworld';
let currentIndex = 0;
function renderScreenshot() {
    const project = projects[currentProject];
    galleryImage.src = `assets/${currentProject}-screen-${currentIndex + 1}.webp`;
    galleryImage.alt = `${project.name} — official Google Play screenshot ${currentIndex + 1} of 3`;
    galleryCounter.textContent = `${currentIndex + 1} / 3`;
}
document.querySelectorAll('[data-gallery]').forEach((button) => {
    button.addEventListener('click', () => {
        currentProject = button.dataset.gallery;
        currentIndex = 0;
        document.getElementById('gallery-title').textContent = projects[currentProject].name;
        document.getElementById('gallery-store').href = `https://play.google.com/store/apps/details?id=${projects[currentProject].package}`;
        renderScreenshot();
        dialog.showModal();
        document.body.classList.add('gallery-open');
    });
});
function changeScreenshot(direction) {
    currentIndex = (currentIndex + direction + 3) % 3;
    renderScreenshot();
}
document.querySelector('.gallery-prev').addEventListener('click', () => changeScreenshot(-1));
document.querySelector('.gallery-next').addEventListener('click', () => changeScreenshot(1));
document.querySelector('.gallery-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => document.body.classList.remove('gallery-open'));
dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        changeScreenshot(event.key === 'ArrowLeft' ? -1 : 1);
    }
});
document.getElementById('year').textContent = new Date().getFullYear();
