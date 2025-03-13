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
        if (sidebar && sidebar.classList.contains('open') && 
            !sidebar.contains(event.target) && 
            menuToggle && !menuToggle.contains(event.target)) {
            menuToggle.classList.remove('open');
            sidebar.classList.remove('open');
        }
    });

    // Dynamic headline functionality
    const navItems = document.querySelectorAll('.top-nav-item');
    const headline = document.getElementById('dynamic-headline');
    
    if (navItems.length > 0 && headline) {
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
    }
    
    // Archive filtering functionality
    const archiveFilters = document.querySelectorAll('.archive-filter');
    const archiveItems = document.querySelectorAll('.archive-item');
    const archiveSearch = document.getElementById('archive-search');
    const sortProjects = document.getElementById('sort-projects');
    
    if (archiveFilters.length > 0 && archiveItems.length > 0) {
        // Filter function
        const filterArchive = () => {
            const activeFilter = document.querySelector('.archive-filter.active').getAttribute('data-filter');
            const searchTerm = archiveSearch ? archiveSearch.value.toLowerCase() : '';
            
            archiveItems.forEach(item => {
                const category = item.getAttribute('data-category');
                const title = item.querySelector('h3').textContent.toLowerCase();
                const description = item.querySelector('.archive-description').textContent.toLowerCase();
                const tags = Array.from(item.querySelectorAll('.archive-tags span')).map(tag => tag.textContent.toLowerCase());
                
                const matchesFilter = activeFilter === 'all' || category === activeFilter;
                const matchesSearch = searchTerm === '' || 
                                    title.includes(searchTerm) || 
                                    description.includes(searchTerm) || 
                                    tags.some(tag => tag.includes(searchTerm));
                
                if (matchesFilter && matchesSearch) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Update pagination after filtering
            updatePagination();
        };
        
        // Sort function
        const sortArchive = () => {
            const sortValue = sortProjects ? sortProjects.value : 'newest';
            const archiveGrid = document.querySelector('.archive-grid');
            
            if (!archiveGrid) return;
            
            const items = Array.from(archiveItems);
            
            items.sort((a, b) => {
                const dateA = a.querySelector('.archive-date').textContent;
                const dateB = b.querySelector('.archive-date').textContent;
                const titleA = a.querySelector('h3').textContent;
                const titleB = b.querySelector('h3').textContent;
                
                if (sortValue === 'newest') {
                    return parseInt(dateB) - parseInt(dateA);
                } else if (sortValue === 'oldest') {
                    return parseInt(dateA) - parseInt(dateB);
                } else if (sortValue === 'a-z') {
                    return titleA.localeCompare(titleB);
                }
                
                return 0;
            });
            
            // Remove all items
            items.forEach(item => archiveGrid.removeChild(item));
            
            // Add sorted items back
            items.forEach(item => archiveGrid.appendChild(item));
            
            // Apply current filter after sorting
            filterArchive();
        };
        
        // Pagination functionality
        const itemsPerPage = 6;
        let currentPage = 1;
        
        const updatePagination = () => {
            const paginationNumbers = document.querySelector('.pagination-numbers');
            const prevButton = document.querySelector('.pagination-prev');
            const nextButton = document.querySelector('.pagination-next');
            
            if (!paginationNumbers || !prevButton || !nextButton) return;
            
            // Get visible items after filtering
            const visibleItems = Array.from(archiveItems).filter(item => 
                item.style.display !== 'none'
            );
            
            const totalPages = Math.ceil(visibleItems.length / itemsPerPage);
            
            // Clear pagination numbers
            paginationNumbers.innerHTML = '';
            
            // Create pagination numbers
            for (let i = 1; i <= totalPages; i++) {
                const button = document.createElement('button');
                button.className = 'pagination-number' + (i === currentPage ? ' active' : '');
                button.textContent = i;
                
                button.addEventListener('click', () => {
                    currentPage = i;
                    showPage(currentPage);
                    updateActivePageButton();
                });
                
                paginationNumbers.appendChild(button);
            }
            
            // Show current page
            showPage(currentPage);
            
            // Update button states
            prevButton.disabled = currentPage === 1;
            nextButton.disabled = currentPage === totalPages || totalPages === 0;
        };
        
        const showPage = (page) => {
            const visibleItems = Array.from(archiveItems).filter(item => 
                item.style.display !== 'none'
            );
            
            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            
            visibleItems.forEach((item, index) => {
                if (index >= startIndex && index < endIndex) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        };
        
        const updateActivePageButton = () => {
            const pageButtons = document.querySelectorAll('.pagination-number');
            
            pageButtons.forEach((button, index) => {
                if (index + 1 === currentPage) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
            });
        };
        
        // Attach event listeners
        archiveFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                // Remove active class from all filters
                archiveFilters.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked filter
                this.classList.add('active');
                
                // Reset to first page when filter changes
                currentPage = 1;
                
                // Apply filter
                filterArchive();
            });
        });
        
        if (archiveSearch) {
            archiveSearch.addEventListener('input', () => {
                // Reset to first page when search changes
                currentPage = 1;
                filterArchive();
            });
        }
        
        if (sortProjects) {
            sortProjects.addEventListener('change', sortArchive);
        }
        
        // Pagination button handlers
        const prevButton = document.querySelector('.pagination-prev');
        const nextButton = document.querySelector('.pagination-next');
        
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    showPage(currentPage);
                    updateActivePageButton();
                    updatePagination();
                }
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                const visibleItems = Array.from(archiveItems).filter(item => 
                    item.style.display !== 'none'
                );
                const totalPages = Math.ceil(visibleItems.length / itemsPerPage);
                
                if (currentPage < totalPages) {
                    currentPage++;
                    showPage(currentPage);
                    updateActivePageButton();
                    updatePagination();
                }
            });
        }
        
        // Initialize archive
        updatePagination();
    }
    
    // Project filtering functionality (for backward compatibility)
    const workFilters = document.querySelectorAll('.work-filter');
    const workItems = document.querySelectorAll('.work-item');
    
    if (workFilters.length > 0 && workItems.length > 0) {
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
    }
    
    // Timeline animation with Intersection Observer
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems.length > 0 && 'IntersectionObserver' in window) {
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
    }
    
    // Sidebar navigation active state with Intersection Observer
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
    const sections = document.querySelectorAll('.content-section');
    
    if (sidebarLinks.length > 0 && sections.length > 0 && 'IntersectionObserver' in window) {
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
                
                if (!targetSection) return;
                
                // Close mobile menu if open
                if (sidebar && sidebar.classList.contains('open') && menuToggle) {
                    menuToggle.classList.remove('open');
                    sidebar.classList.remove('open');
                }
                
                const mainContent = document.querySelector('.main-content');
                if (mainContent) {
                    mainContent.scrollTo({
                        top: targetSection.offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Project page navigation
    const projectNavLinks = document.querySelectorAll('.project-nav a');
    
    if (projectNavLinks.length > 0) {
        projectNavLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (!targetSection) return;
                
                // Account for fixed header
                const headerOffset = 120;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            });
        });
    }
    
    // Theme toggle functionality
    const lightToggle = document.querySelector('.light-mode');
    const darkToggle = document.querySelector('.dark-mode');
    
    if (lightToggle && darkToggle) {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            darkToggle.classList.remove('active');
            lightToggle.classList.add('active');
        }
        
        lightToggle.addEventListener('click', () => {
            document.body.classList.add('light-theme');
            darkToggle.classList.remove('active');
            lightToggle.classList.add('active');
            localStorage.setItem('theme', 'light');
        });
        
        darkToggle.addEventListener('click', () => {
            document.body.classList.remove('light-theme');
            lightToggle.classList.remove('active');
            darkToggle.classList.add('active');
            localStorage.setItem('theme', 'dark');
        });
    }
    
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
                if (input) input.disabled = true;
            });
            
            // Reset form after 3 seconds
            setTimeout(() => {
                this.reset();
                submitBtn.textContent = 'Send Message';
                submitBtn.disabled = false;
                
                formGroups.forEach(group => {
                    const input = group.querySelector('input, textarea');
                    if (input) input.disabled = false;
                });
            }, 3000);
        });
    }
    
    // Section entrance animations
    const animateSections = () => {
        if (!('IntersectionObserver' in window)) return;
        
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
    
    if (sections.length > 0) {
        animateSections();
    }
    
    // Project page section animations
    const projectSections = document.querySelectorAll('.project-section');
    
    if (projectSections.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        projectSections.forEach(section => {
            observer.observe(section);
        });
    }
    
    // Hide scroll indicator when scrolling down
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        const mainContent = document.querySelector('.main-content');
        
        if (mainContent) {
            mainContent.addEventListener('scroll', () => {
                if (mainContent.scrollTop > 100) {
                    scrollIndicator.style.opacity = '0';
                } else {
                    scrollIndicator.style.opacity = '0.6';
                }
            });
        }
    }
    
    // Add keyboard accessibility for work items
    const workItemLinks = document.querySelectorAll('.work-item');
    
    if (workItemLinks.length > 0) {
        workItemLinks.forEach(item => {
            item.setAttribute('tabindex', '0');
            
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    // In a real project, this would navigate to the project details
                    e.preventDefault();
                    const projectTitle = item.querySelector('h3');
                    if (projectTitle) {
                        console.log('Project clicked:', projectTitle.textContent);
                    }
                }
            });
        });
    }
    
    // Add keyboard accessibility for featured items
    const featuredItems = document.querySelectorAll('.featured-item');
    
    if (featuredItems.length > 0) {
        featuredItems.forEach(item => {
            item.setAttribute('tabindex', '0');
            
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const link = item.querySelector('a.view-project-btn');
                    if (link) {
                        window.location.href = link.getAttribute('href');
                    }
                }
            });
        });
    }
    
    // Add keyboard accessibility for archive items
    const archiveItemsAccessibility = document.querySelectorAll('.archive-item');
    
    if (archiveItemsAccessibility.length > 0) {
        archiveItemsAccessibility.forEach(item => {
            item.setAttribute('tabindex', '0');
            
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const link = item.querySelector('.archive-link');
                    if (link) {
                        window.location.href = link.getAttribute('href');
                    }
                }
            });
        });
    }
});