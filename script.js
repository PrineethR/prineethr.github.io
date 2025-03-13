document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('open');
            sidebar.classList.toggle('open');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (sidebar.classList.contains('open') && 
            !sidebar.contains(event.target) && 
            !menuToggle.contains(event.target)) {
            menuToggle.classList.remove('open');
            sidebar.classList.remove('open');
        }
    });

    // Dynamic headline functionality
    const navItems = document.querySelectorAll('.top-nav-item');
    const headline = document.getElementById('dynamic-headline');
    
    // Set initial active state for top nav
    navItems[0].classList.add('active');
    
    // Define headlines for each audience
    const headlines = {
        'anyone': "I'm a systems thinker with a high bar for quality. From process to pixels, I'll collaborate with you, learn from you, and help make something we're proud of.",
        'recruiters': "I bring 5+ years of design experience across digital products. My background in both engineering and design helps me bridge technical and user needs effectively.",
        'designers': "I value collaborative design processes and strong design systems. Let's share insights on creating cohesive, scalable experiences that delight users."
    };
    
    // Add click event listeners to top navigation items
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            navItems.forEach(navItem => {
                navItem.classList.remove('active');
                navItem.setAttribute('aria-selected', 'false');
            });
            
            // Add active class to clicked item
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');
            
            // Animate headline change
            headline.style.opacity = '0';
            headline.style.transform = 'translateY(10px)';
            
            // Update headline based on selected audience
            setTimeout(() => {
                const audience = this.getAttribute('data-audience');
                headline.textContent = headlines[audience];
                headline.style.opacity = '1';
                headline.style.transform = 'translateY(0)';
            }, 300);
        });
    });
    
    // Project filtering
    const workFilters = document.querySelectorAll('.work-filter');
    const workItems = document.querySelectorAll('.work-item');
    
    workFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            workFilters.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked filter
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter work items
            workItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
    
    // Timeline animation with Intersection Observer
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
    
    // Sidebar navigation active state with Intersection Observer
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
    const sections = document.querySelectorAll('.content-section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // Update sidebar navigation
                sidebarLinks.forEach(link => {
                    link.classList.remove('active');
                    link.removeAttribute('aria-current');
                    
                    if (link.getAttribute('href').slice(1) === id) {
                        link.classList.add('active');
                        link.setAttribute('aria-current', 'page');
                    }
                });
            }
        });
    }, { threshold: 0.3 });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Smooth scroll for sidebar navigation
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Close mobile menu if open
            if (sidebar.classList.contains('open')) {
                menuToggle.classList.remove('open');
                sidebar.classList.remove('open');
            }
            
            document.querySelector('.main-content').scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });
    
    // Theme toggle functionality
    const lightToggle = document.querySelector('.light-mode');
    const darkToggle = document.querySelector('.dark-mode');
    
    lightToggle.addEventListener('click', () => {
        document.body.classList.add('light-theme');
        darkToggle.classList.remove('active');
        lightToggle.classList.add('active');
    });
    
    darkToggle.addEventListener('click', () => {
        document.body.classList.remove('light-theme');
        lightToggle.classList.remove('active');
        darkToggle.classList.add('active');
    });
    
    // Handle form submission (prevent default for demo)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message (in a real implementation, you'd send data to server)
            const formGroups = this.querySelectorAll('.form-group');
            const submitBtn = this.querySelector('.submit-btn');
            
            submitBtn.textContent = 'Message Sent!';
            submitBtn.disabled = true;
            
            formGroups.forEach(group => {
                const input = group.querySelector('input, textarea');
                input.disabled = true;
            });
            
            // Reset form after 3 seconds
            setTimeout(() => {
                this.reset();
                submitBtn.textContent = 'Send Message';
                submitBtn.disabled = false;
                
                formGroups.forEach(group => {
                    const input = group.querySelector('input, textarea');
                    input.disabled = false;
                });
            }, 3000);
        });
    }
    
    // Section entrance animations
    const animateSections = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        sections.forEach(section => {
            observer.observe(section);
        });
    };
    
    animateSections();
    
    // Hide scroll indicator when scrolling down
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        const mainContent = document.querySelector('.main-content');
        
        mainContent.addEventListener('scroll', () => {
            if (mainContent.scrollTop > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '0.6';
            }
        });
    }
    
    // Add keyboard accessibility for work items
    const workItemLinks = document.querySelectorAll('.work-item');
    
    workItemLinks.forEach(item => {
        item.setAttribute('tabindex', '0');
        
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                // In a real project, this would navigate to the project details
                e.preventDefault();
                console.log('Project clicked:', item.querySelector('h3').textContent);
            }
        });
    });
});