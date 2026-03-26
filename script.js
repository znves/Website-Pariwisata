document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const destCards = document.querySelectorAll('.dest-card');
    const contactForm = document.getElementById('mainContactForm');
    const formStatus = document.getElementById('formStatus');
    const exploreBtn = document.querySelector('a[href="#explore"]');
    const statNumbers = document.querySelectorAll('.stat-number');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    if (exploreBtn) {
        exploreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            const offsetTop = targetSection.offsetTop - navbar.offsetHeight;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        });
    }

    if (filterBtns.length > 0 && destCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filterValue = btn.getAttribute('data-filter');

                destCards.forEach(card => {
                    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    
                    setTimeout(() => {
                        if (filterValue === 'all' || card.classList.contains(filterValue)) {
                            card.style.display = 'flex';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'scale(1)';
                            }, 50);
                        } else {
                            card.style.display = 'none';
                        }
                    }, 300);
                });
            });
        });
    }

    const animateNumber = (element, target, duration) => {
        let start = null;
        const initialText = element.innerText;
        const suffix = initialText.replace(/[0-9]/g, '');
        const numericTarget = parseInt(target.replace(/[^0-9]/g, ''), 10);
        
        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const currentNum = Math.floor(progress * numericTarget);
            element.innerText = currentNum + suffix;
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.innerText = target;
            }
        };
        window.requestAnimationFrame(step);
    };

    const countObserverOptions = {
        threshold: 0.5
    };

    const countObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetText = entry.target.innerText;
                animateNumber(entry.target, targetText, 2000);
                observer.unobserve(entry.target);
            }
        });
    }, countObserverOptions);

    statNumbers.forEach(stat => {
        countObserver.observe(stat);
    });

    const scrollElements = document.querySelectorAll('.dest-card, .info-block, .intro-text, .intro-gallery');
    
    scrollElements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });

    const elementObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const elementObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, elementObserverOptions);

    scrollElements.forEach(el => {
        elementObserver.observe(el);
    });

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Transmitting Data...';
            btn.disabled = true;
            btn.style.opacity = '0.7';

            setTimeout(() => {
                contactForm.reset();
                btn.innerHTML = originalText;
                btn.disabled = false;
                btn.style.opacity = '1';
                formStatus.style.opacity = '0';
                formStatus.style.transition = 'opacity 0.3s ease';
                formStatus.innerHTML = '<div style="margin-top: 20px; padding: 20px; background-color: #ecfdf5; border-left: 4px solid #10b981; color: #065f46; border-radius: 4px; font-weight: 500; display: flex; align-items: center; gap: 10px;"><span>✓</span> Inquiry securely transmitted to Majalengka Tourism Board.</div>';
                
                setTimeout(() => {
                    formStatus.style.opacity = '1';
                }, 10);

                setTimeout(() => {
                    formStatus.style.opacity = '0';
                    setTimeout(() => {
                        formStatus.innerHTML = '';
                    }, 300);
                }, 6000);
            }, 2000);
        });
    }
});
