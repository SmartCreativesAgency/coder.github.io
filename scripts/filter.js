// Project filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects with animation
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Add shuffle animation to projects
    function shuffleProjects() {
        const grid = document.querySelector('.projects-grid');
        if (!grid) return;

        for (let i = grid.children.length; i >= 0; i--) {
            grid.appendChild(grid.children[Math.random() * i | 0]);
        }
    }

    // Optional: Add shuffle button
    const filterContainer = document.querySelector('.filter-buttons');
    if (filterContainer) {
        const shuffleBtn = document.createElement('button');
        shuffleBtn.className = 'filter-btn';
        shuffleBtn.innerHTML = '<i class="fas fa-random"></i> Shuffle';
        shuffleBtn.addEventListener('click', shuffleProjects);
        filterContainer.appendChild(shuffleBtn);
    }
});
