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
       // Image paths with preloading for better performance
       const imagePaths = [
           'images/me/me1.jpg',
           'images/me/me2.JPG',
           'images/me/me3.JPG',
           'images/me/me4.JPG',
           'images/me/me5.JPG',
           'images/me/me6.JPG',
           'images/me/me7.JPG',
           'images/me/me8.JPG'
       ];
       
       // Preload images to improve performance
       const preloadedImages = [];
       imagePaths.forEach(src => {
           const img = new Image();
           img.src = src;
           preloadedImages.push(img);
       });
       
       // Track if mouse is inside the container
       let isMouseInside = false;
       
       // Event listeners for mouse entering and leaving the container
       imageSpawner.addEventListener('mouseenter', function() {
           isMouseInside = true;
       });
       
       imageSpawner.addEventListener('mouseleave', function() {
           isMouseInside = false;
       });
       
       // Track mouse movement inside the container
       let lastSpawnTime = 0;
       const minSpawnInterval = 65; // Increased from 65ms to 120ms for better performance
       
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
           
           // Use preloaded image for better performance
           const randomIndex = Math.floor(Math.random() * preloadedImages.length);
           img.src = preloadedImages[randomIndex].src;
           
           // Smaller size range for better performance
           const size = Math.floor(Math.random() * 80) + 150; // Adjusted to 100-180px range
           img.style.width = `${size}px`;
           img.style.height = `${size}px`;
           
           // Position the image at the cursor location
           img.style.position = 'absolute';
           img.style.left = `${x - size/2}px`;
           img.style.top = `${y - size/2}px`;
           
           // Add styling
           img.style.objectFit = 'cover';
           img.style.borderRadius = '4px';
           img.style.pointerEvents = 'none';
           img.style.zIndex = '1';
           
           // Add loading attribute for performance
           img.loading = 'lazy';
           
           // Append the image to the container
           imageSpawner.appendChild(img);
       }
       
       // Function to limit the number of images displayed
       function cleanupImages() {
           const images = imageSpawner.querySelectorAll('img');
           const maxImages = 15; // Reduced from 10 to 7 for better performance
           
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