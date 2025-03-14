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

    // Image spawner for the about section
    const imageSpawner = document.getElementById('image-spawner');
    
    if (imageSpawner) {
        // Image paths - replace these with your actual image paths
        const images = [
            'https://placehold.co/400x400/222/fff?text=Design',
            'https://placehold.co/400x400/333/fff?text=Create',
            'https://placehold.co/400x400/444/fff?text=Play',
            'https://placehold.co/400x400/555/fff?text=Build',
            'https://placehold.co/400x400/666/fff?text=Explore'
        ];
        
        // Track if mouse is inside the container
        let isMouseInside = false;
        
        // Event listeners for mouse entering and leaving the container
        imageSpawner.addEventListener('mouseenter', function() {
            isMouseInside = true;
        });
        
        imageSpawner.addEventListener('mouseleave', function() {
            isMouseInside = false;
        });
        
        // Track mouse movement inside the container - using mousemove for more consistent tracking
        let lastSpawnTime = 0;
        const minSpawnInterval = 45; // milliseconds between spawns - imperceptible delay

        imageSpawner.addEventListener('mousemove', function(e) {
            if (!isMouseInside) return;
            
            // Check if enough time has passed since last spawn
            const now = Date.now();
            if (now - lastSpawnTime < minSpawnInterval) return;
            
            // Get mouse position relative to the container
            const rect = imageSpawner.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Spawn an image at the current mouse position
            spawnImage(x, y);
            
            // Update last spawn time
            lastSpawnTime = now;
            
            // Clean up after each spawn to maintain the maximum
            cleanupImages();
        });
        
        // Function to spawn an image at the cursor position
        function spawnImage(x, y) {
            // Create a new image element
            const img = document.createElement('img');
            
            // Set random image from the array
            const randomImage = images[Math.floor(Math.random() * images.length)];
            img.src = randomImage;
            
            // Set random size between 50px and 150px
            const size = Math.floor(Math.random() * 100) + 100;
            img.style.width = `${size}px`;
            img.style.height = `${size}px`;
            
            // Position the image at the cursor location
            img.style.position = 'absolute';
            img.style.left = `${x - size/2}px`;
            img.style.top = `${y - size/2}px`;
            
            // Add some styling
            img.style.objectFit = 'cover';
            img.style.borderRadius = '4px';
            img.style.pointerEvents = 'none'; // Prevent the image from interfering with mouse events
            img.style.zIndex = '1';
            
            // Append the image to the container
            imageSpawner.appendChild(img);
        }
        
        // Function to limit the number of images displayed
        function cleanupImages() {
            const images = imageSpawner.querySelectorAll('img');
            const maxImages = 10; // Updated to 7 as requested
            
            if (images.length > maxImages) {
                // Remove oldest images (first in the DOM)
                for (let i = 0; i < images.length - maxImages; i++) {
                    if (images[i]) {
                        images[i].remove();
                    }
                }
            }
        }
    }
});