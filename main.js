document.addEventListener('DOMContentLoaded', () => {

    // 1. Header Scroll Event
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // 3. Parallax Hero Scroll Effect
    const heroBg = document.getElementById('hero-bg');
    const heroContent = document.querySelector('.hero-content');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Keep checking if element exists & restrict computation on smaller screen sizes if needed
        if (heroBg && window.innerWidth > 768) {
            // Background moves slower than scrolling speed (parallax)
            heroBg.style.transform = `translateY(${scrolled * 0.45}px)`;
            
            // Text content shifts slightly downward and fades out as user scrolls
            heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
            heroContent.style.opacity = `${1 - scrolled / 800}`;
        }
    });

    // 4. Scroll Reveal Animation using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Unobserve once shown to prevent repetitive triggering
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // 5. Portfolio Category Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            e.target.classList.add('active');

            const filterValue = e.target.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === cardCategory) {
                    // Smooth transition reset
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.85)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 400); // match CSS transitions
                }
            });
        });
    });

    // 6. Portfolio Lightbox Modal Detail Mapping
    const projectDetails = {
        'Vadi Evi': {
            cat: 'KONUT',
            desc: 'Orman sınırında konumlanmış Vadi Evi, doğal traverten taş kaplaması, lamine ahşap tavan kirişleri ve sürdürülebilir yalıtım sistemleriyle doğanın tüm renklerini ve sıcaklığını barındıran lüks bir müstakil konut projesidir. Başka İnşaat imzasıyla, geniş tabandan tavana cam cepheleri sayesinde gün ışığından maksimum seviyede faydalanmaktadır.'
        },
        'Onyx Plaza': {
            cat: 'TİCARİ',
            desc: 'Modern şehircilik anlayışını yansıtan minimalist dış cephesiyle Onyx Plaza, geniş ortak çalışma alanları, yeşil terasları ve çevre dostu enerji sistemlerine sahip A++ sınıfı modern bir ticari ofis projesidir. Başka İnşaat\'ın doğal krem panellerle şekillendirilmiş dış kabuğu güneş ışığını optimum seviyede filtreler.'
        },
        'Traverten & Bronz': {
            cat: 'DETAYLAR',
            desc: 'Doğal krem traverten taş plakaların, el yapımı fırçalanmış koyu bronz metal profillerle birleşiminden oluşan özel detay tasarımımız. Başka İnşaat\'ın işçilikteki kusursuzluk anlayışını ve kaliteli malzeme birleşimlerindeki vizyonunu en net yansıtan detaylardan biridir.'
        }
    };

    const lightbox = document.getElementById('project-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCat = document.getElementById('lightbox-cat');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const lightboxClose = document.getElementById('lightbox-close');

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const imgEl = card.querySelector('.project-img');
            const nameEl = card.querySelector('.project-name');
            const imgUrl = imgEl.getAttribute('src');
            const name = nameEl.textContent;

            // Map data
            lightboxImg.setAttribute('src', imgUrl);
            lightboxImg.setAttribute('alt', name);
            lightboxTitle.textContent = name;

            if (projectDetails[name]) {
                lightboxCat.textContent = projectDetails[name].cat;
                lightboxDesc.textContent = projectDetails[name].desc;
            }

            // Open Modal
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Lock scroll
        });
    });

    // Close Lightbox function
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Unlock scroll
    };

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
});
