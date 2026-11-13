const filters = [...document.querySelectorAll('[data-filter]')];
const cards = [...document.querySelectorAll('.project-card')];
const filterStatus = document.getElementById('filter-status');
const prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

function applyFilter(category) {
    filters.forEach(filter => {
        const selected = filter.dataset.filter === category;
        filter.classList.toggle('active', selected);
        filter.setAttribute('aria-pressed', String(selected));
    });
    let visible = 0;
    cards.forEach(card => {
        card.hidden = category !== 'all' && card.dataset.category !== category;
        if (!card.hidden) visible++;
    });
    filterStatus.textContent = `Showing ${visible} ${category === 'all' ? 'projects' : category === 'app' ? 'apps' : 'games'}.`;
}

document.querySelector('.filters').hidden = false;
filters.forEach(button => {
    const count = cards.filter(card => button.dataset.filter === 'all' || card.dataset.category === button.dataset.filter).length;
    button.querySelector('span').textContent = String(count).padStart(2, '0');
    button.addEventListener('click', () => {
        const update = () => applyFilter(button.dataset.filter);
        if (document.startViewTransition && !prefersReducedMotion.matches) document.startViewTransition(update);
        else update();
    });
});

// Populated from the official stores by npm run sync:stores.
const projects = /* STORE_DATA_START */ {
    "watchworld": {
        "name": "WatchWorld",
        "googlePlay": "https://play.google.com/store/apps/details?id=com.WatchWorld",
        "screenshots": {
            "android": [
                {
                    "src": "assets/store/watchworld-android-1.6480b4e2c3.webp",
                    "width": 800,
                    "height": 1743
                },
                {
                    "src": "assets/store/watchworld-android-2.58cd44dffc.webp",
                    "width": 800,
                    "height": 1743
                },
                {
                    "src": "assets/store/watchworld-android-3.5b8c4eb3f4.webp",
                    "width": 800,
                    "height": 1743
                },
                {
                    "src": "assets/store/watchworld-android-4.1dff61dd8e.webp",
                    "width": 800,
                    "height": 1743
                }
            ],
            "ios": []
        }
    },
    "exploding-booze": {
        "name": "Exploding Booze",
        "googlePlay": "https://play.google.com/store/apps/details?id=com.explodingbooze",
        "appStore": "https://apps.apple.com/nl/app/exploding-booze/id6825521254",
        "screenshots": {
            "android": [
                {
                    "src": "assets/store/exploding-booze-android-1.90633511b1.webp",
                    "width": 800,
                    "height": 1743
                },
                {
                    "src": "assets/store/exploding-booze-android-2.e6249695f2.webp",
                    "width": 800,
                    "height": 1743
                },
                {
                    "src": "assets/store/exploding-booze-android-3.67f1072d9a.webp",
                    "width": 800,
                    "height": 1778
                },
                {
                    "src": "assets/store/exploding-booze-android-4.9dc022d3f9.webp",
                    "width": 800,
                    "height": 1743
                },
                {
                    "src": "assets/store/exploding-booze-android-5.9cae644ae3.webp",
                    "width": 800,
                    "height": 1778
                },
                {
                    "src": "assets/store/exploding-booze-android-6.fe0c709a65.webp",
                    "width": 800,
                    "height": 1743
                },
                {
                    "src": "assets/store/exploding-booze-android-7.f89a21538d.webp",
                    "width": 800,
                    "height": 1778
                }
            ],
            "ios": [
                {
                    "src": "assets/store/exploding-booze-ios-1.79f46161be.webp",
                    "width": 800,
                    "height": 1739
                },
                {
                    "src": "assets/store/exploding-booze-ios-2.9f764d1441.webp",
                    "width": 800,
                    "height": 1739
                },
                {
                    "src": "assets/store/exploding-booze-ios-3.45c1f18454.webp",
                    "width": 800,
                    "height": 1739
                },
                {
                    "src": "assets/store/exploding-booze-ios-4.ae38b068e9.webp",
                    "width": 800,
                    "height": 1739
                },
                {
                    "src": "assets/store/exploding-booze-ios-5.ceb966b414.webp",
                    "width": 800,
                    "height": 1739
                },
                {
                    "src": "assets/store/exploding-booze-ios-6.8abf26f138.webp",
                    "width": 800,
                    "height": 1739
                },
                {
                    "src": "assets/store/exploding-booze-ios-7.c8a9099727.webp",
                    "width": 800,
                    "height": 1739
                }
            ]
        }
    },
    "mazebound": {
        "name": "Mazebound: Simple TD",
        "googlePlay": "https://play.google.com/store/apps/details?id=nl.valentijnkeijser.towerdefense",
        "screenshots": {
            "android": [
                {
                    "src": "assets/store/mazebound-android-1.5e55789212.webp",
                    "width": 800,
                    "height": 367
                },
                {
                    "src": "assets/store/mazebound-android-2.ca8eb2a379.webp",
                    "width": 800,
                    "height": 367
                },
                {
                    "src": "assets/store/mazebound-android-3.480e2c1079.webp",
                    "width": 800,
                    "height": 367
                },
                {
                    "src": "assets/store/mazebound-android-4.430d531425.webp",
                    "width": 800,
                    "height": 367
                },
                {
                    "src": "assets/store/mazebound-android-5.7aa8c7a287.webp",
                    "width": 800,
                    "height": 367
                },
                {
                    "src": "assets/store/mazebound-android-6.72a1e2e5bd.webp",
                    "width": 800,
                    "height": 367
                }
            ],
            "ios": []
        }
    }
} /* STORE_DATA_END */;
const dialog = document.getElementById('gallery-dialog');
const galleryImage = document.getElementById('gallery-image');
const galleryCounter = document.getElementById('gallery-counter');
const galleryStore = document.getElementById('gallery-store');
const platformGroup = document.getElementById('gallery-platforms');
const platformButtons = [...document.querySelectorAll('[data-platform]')];
let currentProject = 'watchworld';
let currentPlatform = 'android';
let currentIndex = 0;

function currentScreenshots() {
    return projects[currentProject].screenshots[currentPlatform];
}
function renderScreenshot() {
    const project = projects[currentProject];
    const screenshots = currentScreenshots();
    const shot = screenshots[currentIndex];
    const platform = currentPlatform === 'ios' ? 'App Store' : 'Google Play';
    galleryImage.src = shot.src;
    galleryImage.width = shot.width;
    galleryImage.height = shot.height;
    galleryImage.alt = `${project.name}: official ${platform} screenshot ${currentIndex + 1} of ${screenshots.length}`;
    galleryCounter.textContent = `${currentIndex + 1} / ${screenshots.length}`;
    galleryStore.href = currentPlatform === 'ios' ? project.appStore : project.googlePlay;
    galleryStore.textContent = platform + ' ↗';
}
function selectPlatform(platform) {
    if (!projects[currentProject].screenshots[platform]?.length) return;
    currentPlatform = platform;
    currentIndex = 0;
    platformButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.platform === platform)));
    renderScreenshot();
}
platformButtons.forEach(button => button.addEventListener('click', () => selectPlatform(button.dataset.platform)));

document.querySelectorAll('[data-gallery]').forEach(button => {
    button.addEventListener('click', event => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        const project = projects[button.dataset.gallery];
        if (!project?.screenshots.android.length) return;
        event.preventDefault();
        currentProject = button.dataset.gallery;
        document.getElementById('gallery-title').textContent = project.name;
        platformGroup.hidden = !project.screenshots.ios.length;
        selectPlatform('android');
        dialog.showModal();
        document.body.classList.add('gallery-open');
    });
});
function changeScreenshot(direction) {
    const count = currentScreenshots().length;
    currentIndex = (currentIndex + direction + count) % count;
    renderScreenshot();
}
document.querySelector('.gallery-prev').addEventListener('click', () => changeScreenshot(-1));
document.querySelector('.gallery-next').addEventListener('click', () => changeScreenshot(1));
document.querySelector('.gallery-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => document.body.classList.remove('gallery-open'));
dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        changeScreenshot(event.key === 'ArrowLeft' ? -1 : 1);
    }
});

document.getElementById('year').textContent = new Date().getFullYear();
document.querySelectorAll('.app-dock a').forEach(link => {
    link.addEventListener('click', () => {
        if (document.getElementById(link.hash.slice(1))?.hidden) applyFilter('all');
    });
});
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.06 });
    document.querySelectorAll('.project-card, .about-section').forEach(element => {
        element.classList.add('reveal');
        observer.observe(element);
    });
    if (!prefersReducedMotion.matches) document.body.classList.add('has-motion');
    prefersReducedMotion.addEventListener('change', () => document.body.classList.toggle('has-motion', !prefersReducedMotion.matches));
}
