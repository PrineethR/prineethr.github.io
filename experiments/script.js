document.addEventListener('DOMContentLoaded', () => {
    // Project mappings
    const projectLinks = {
        '1': '/bloopdance.html', 
        '2': '/rising.html',      
        '3': '/yaycelebrate.html',
        '4': '/oceanblanket.html' 
    };

    // Handle thumbnail clicks
    document.querySelectorAll('.project-cell').forEach(cell => {
        cell.addEventListener('click', () => {
            const projectId = cell.getAttribute('data-project');
            const projectUrl = projectLinks[projectId];
            
            if (projectUrl) {
                window.location.href = projectUrl;
            }
        });
    });
});