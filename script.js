document.addEventListener('DOMContentLoaded', function() {
    // Hero marquee functionality
   
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('open');
        });
    }

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
                if (filterValue === 'all' || item.getAttribute('data-category').split(' ').includes(filterValue)) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
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