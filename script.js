document.addEventListener('DOMContentLoaded', function() {
    
   
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
        'anyone': "I design interactions at the convergence of humans, play, tech and design that bridge physical and digital worlds. Let's turn speculations into reality that make both of us say 'wow, we made that.'",
        'recruiters': "An interaction designer with 6+ years of expertise in multimodal experiences, education, strategy, research and tech through more-than-human-centered design methodologies.",
        'designers': "Let's explore the messy, beautiful space of design, play experiences, and technology while questioning how we might dissolve artificial boundaries between users and interfaces.",
        'whenyoustumbleuponagoldmine': "Congratulations, explorer—you've found my secret garden where theatrical experiments bloom alongside research papers, where I'm equally likely to be coding and soldering, or designing cardboard roller coasters for reasons I can never explain but somehow always make sense in my head at the end."
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
            }, 1);
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
           'images/me/me2.jpg',
           'images/me/me3.jpg',
           'images/me/me4.jpg',
           'images/me/me5.jpg',
           'images/me/me6.jpg',
           'images/me/me7.jpg',
           'images/me/me8.jpg'
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
           const size = Math.floor(Math.random() * 80) + 150; // 
           img.style.width = `${size}px`;
           img.style.height = `${size}px`;
           
          
           img.style.position = 'absolute';
           img.style.left = `${x - size/2}px`;
           img.style.top = `${y - size/2}px`;
           
           
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