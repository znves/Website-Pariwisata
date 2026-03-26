document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const destCards = document.querySelectorAll('.dest-card');
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    const contactForm = document.getElementById('mainContactForm');
    const formStatus = document.getElementById('formStatus');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        document.querySelectorAll('.nav-menu li a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
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

    if (accordionHeaders.length > 0) {
        accordionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const item = header.parentElement;
                const isActive = item.classList.contains('active');
                
                document.querySelectorAll('.accordion-item').forEach(accItem => {
                    accItem.classList.remove('active');
                    accItem.querySelector('.accordion-content').style.maxHeight = null;
                });

                if (!isActive) {
                    item.classList.add('active');
                    const content = item.querySelector('.accordion-content');
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            });
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            btn.innerHTML = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                contactForm.reset();
                btn.innerHTML = 'Submit Inquiry';
                btn.disabled = false;
                formStatus.innerHTML = '<p style="color: #2b6e55; padding: 16px; background: #e8f5e9; border-radius: 8px; margin-top: 16px; font-weight: 600;">Thank you! Your inquiry has been successfully sent to the Majalengka Tourism Board.</p>';
                setTimeout(() => {
                    formStatus.innerHTML = '';
                }, 5000);
            }, 1500);
        });
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.showcase-item, .gastro-item, .culture-card, .tip-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        
        const animatedObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    animatedObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        animatedObserver.observe(el);
    });
});
