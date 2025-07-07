// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Search functionality for Hall of Fame - FIXED VERSION
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const participantsTable = document.getElementById('participantsTable');
    
    if (!searchInput || !participantsTable) {
        console.log('Search elements not found, retrying...');
        setTimeout(initializeSearch, 100);
        return;
    }
    
    console.log('Search functionality initialized');
    
    // Function to perform search
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const tbody = participantsTable.querySelector('tbody');
        
        if (!tbody) {
            console.error('Table body not found');
            return;
        }
        
        const rows = tbody.querySelectorAll('tr');
        let visibleCount = 0;
        
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            let rowText = '';
            
            cells.forEach(cell => {
                rowText += cell.textContent.toLowerCase() + ' ';
            });
            
            if (searchTerm === '' || rowText.includes(searchTerm)) {
                row.style.display = '';
                visibleCount++;
            } else {
                row.style.display = 'none';
            }
        });
        
        // Show message if no results found
        showSearchResults(visibleCount, searchTerm);
    }
    
    // Show search results message
    function showSearchResults(count, term) {
        let messageDiv = document.getElementById('searchMessage');
        
        if (!messageDiv) {
            messageDiv = document.createElement('div');
            messageDiv.id = 'searchMessage';
            messageDiv.style.cssText = `
                text-align: center;
                padding: 1rem;
                margin: 1rem 0;
                border-radius: 10px;
                font-weight: 500;
            `;
            participantsTable.parentNode.insertBefore(messageDiv, participantsTable);
        }
        
        if (term && count === 0) {
            messageDiv.innerHTML = `
                <div style="color: #dc3545; background: #f8d7da; padding: 1rem; border-radius: 10px;">
                    <i class="fas fa-search"></i> No participants found matching "${term}"
                </div>
            `;
            messageDiv.style.display = 'block';
        } else if (term && count > 0) {
            messageDiv.innerHTML = `
                <div style="color: #155724; background: #d4edda; padding: 1rem; border-radius: 10px;">
                    <i class="fas fa-check"></i> Found ${count} participant${count !== 1 ? 's' : ''} matching "${term}"
                </div>
            `;
            messageDiv.style.display = 'block';
        } else {
            messageDiv.style.display = 'none';
        }
    }
    
    // Add event listeners
    searchInput.addEventListener('input', performSearch);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Add clear button functionality
    const searchContainer = searchInput.parentElement;
    let clearButton = searchContainer.querySelector('.clear-search');
    
    if (!clearButton) {
        clearButton = document.createElement('button');
        clearButton.className = 'clear-search';
        clearButton.innerHTML = '<i class="fas fa-times"></i>';
        clearButton.style.cssText = `
            position: absolute;
            right: 3rem;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: var(--dark-blue);
            cursor: pointer;
            font-size: 1rem;
            padding: 0.5rem;
            display: none;
        `;
        searchContainer.appendChild(clearButton);
    }
    
    // Show/hide clear button
    searchInput.addEventListener('input', function() {
        if (this.value.length > 0) {
            clearButton.style.display = 'block';
        } else {
            clearButton.style.display = 'none';
        }
    });
    
    // Clear search functionality
    clearButton.addEventListener('click', function() {
        searchInput.value = '';
        clearButton.style.display = 'none';
        performSearch();
        searchInput.focus();
    });
    
    console.log('Search event listeners added successfully');
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing search...');
    setTimeout(initializeSearch, 500); // Small delay to ensure all elements are rendered
});

// Also try to initialize search when the hall of fame section comes into view
const hallOfFameObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log('Hall of Fame section visible, initializing search...');
            initializeSearch();
            hallOfFameObserver.unobserve(entry.target); // Only initialize once
        }
    });
}, { threshold: 0.1 });

// Observe the hall of fame section
document.addEventListener('DOMContentLoaded', function() {
    const hallOfFameSection = document.getElementById('hall-of-fame');
    if (hallOfFameSection) {
        hallOfFameObserver.observe(hallOfFameSection);
    }
});


// Edition modal functionality
const modal = document.getElementById('editionModal');
const modalContent = document.getElementById('modalContent');
const closeBtn = document.querySelector('.close');

function openEdition(year) {
    const editionData = {
        2023: {
            title: "The Golden Ratio Challenge 2023",
            date: "May 20, 2023",
            location: "École Polytechnique, Palaiseau",
            participants: 1247,
            countries: 45,
            problems: [
                "Prove that φ² = φ + 1 where φ is the golden ratio",
                "Find all integer solutions to the Fibonacci recurrence",
                "Geometric construction using golden ratio properties",
                "Optimization problem involving golden rectangles",
                "Number theory application of continued fractions",
                "Advanced problem on Lucas sequences"
            ],
            podium: [
                { name: "Marie Dubois", country: "France", score: "42/42" },
                { name: "Alessandro Rossi", country: "Italy", score: "39/42" },
                { name: "Chen Wei", country: "China", score: "38/42" }
            ],
            statistics: {
                averageScore: 24.7,
                perfectScores: 1,
                goldMedals: 62,
                silverMedals: 125,
                bronzeMedals: 187
            }
        },
        2022: {
            title: "Infinite Series Mastery 2022",
            date: "May 21, 2022",
            location: "Sorbonne University, Paris",
            participants: 1089,
            countries: 38,
            problems: [
                "Convergence of alternating harmonic series",
                "Sum of reciprocals of perfect squares",
                "Telescoping series applications",
                "Power series representation of functions",
                "Fourier series convergence theorem",
                "Advanced infinite product evaluation"
            ],
            podium: [
                { name: "Chen Wei", country: "China", score: "42/42" },
                { name: "Priya Sharma", country: "India", score: "41/42" },
                { name: "Erik Larsson", country: "Sweden", score: "40/42" }
            ],
            statistics: {
                averageScore: 23.2,
                perfectScores: 1,
                goldMedals: 54,
                silverMedals: 109,
                bronzeMedals: 163
            }
        },
        2021: {
            title: "Graph Theory Expedition 2021",
            date: "May 22, 2021",
            location: "Online (COVID-19)",
            participants: 892,
            countries: 32,
            problems: [
                "Euler's theorem on planar graphs",
                "Hamiltonian path existence proof",
                "Graph coloring optimization",
                "Network flow maximum theorem",
                "Tree enumeration problem",
                "Advanced spectral graph theory"
            ],
            podium: [
                { name: "João Silva", country: "Brazil", score: "40/42" },
                { name: "Anna Kowalski", country: "Poland", score: "38/42" },
                { name: "Raj Patel", country: "India", score: "37/42" }
            ],
            statistics: {
                averageScore: 21.8,
                perfectScores: 0,
                goldMedals: 45,
                silverMedals: 89,
                bronzeMedals: 134
            }
        },
        2020: {
            title: "Number Theory Foundations 2020",
            date: "May 16, 2020",
            location: "Online (COVID-19)",
            participants: 756,
            countries: 28,
            problems: [
                "Prime number distribution theorem",
                "Diophantine equation solutions",
                "Modular arithmetic applications",
                "Quadratic residues and reciprocity",
                "Continued fraction expansions",
                "Advanced divisibility proofs"
            ],
            podium: [
                { name: "David Kim", country: "South Korea", score: "42/42" },
                { name: "Sofia Petrov", country: "Russia", score: "39/42" },
                { name: "Ahmed Hassan", country: "Egypt", score: "38/42" }
            ],
            statistics: {
                averageScore: 20.5,
                perfectScores: 1,
                goldMedals: 38,
                silverMedals: 76,
                bronzeMedals: 113
            }
        }
    };

    const data = editionData[year];
    if (!data) return;

    modalContent.innerHTML = `
        <h2>${data.title}</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 2rem 0;">
            <div><strong>Date:</strong> ${data.date}</div>
            <div><strong>Location:</strong> ${data.location}</div>
            <div><strong>Participants:</strong> ${data.participants}</div>
            <div><strong>Countries:</strong> ${data.countries}</div>
        </div>
        
        <h3>Problems</h3>
        <ol style="margin: 1rem 0;">
            ${data.problems.map(problem => `<li style="margin: 0.5rem 0;">${problem}</li>`).join('')}
        </ol>
        
        <h3>Podium</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1rem 0;">
            ${data.podium.map((winner, index) => `
                <div style="text-align: center; padding: 1rem; background: ${index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : '#CD7F32'}; border-radius: 10px;">
                    <div style="font-size: 2rem;">${index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}</div>
                    <div><strong>${winner.name}</strong></div>
                    <div>${winner.country}</div>
                    <div>${winner.score}</div>
                </div>
            `).join('')}
        </div>
        
        <h3>Statistics</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin: 1rem 0;">
            <div><strong>Average Score:</strong> ${data.statistics.averageScore}</div>
            <div><strong>Perfect Scores:</strong> ${data.statistics.perfectScores}</div>
            <div><strong>Gold Medals:</strong> ${data.statistics.goldMedals}</div>
            <div><strong>Silver Medals:</strong> ${data.statistics.silverMedals}</div>
            <div><strong>Bronze Medals:</strong> ${data.statistics.bronzeMedals}</div>
        </div>
    `;

    modal.style.display = 'block';
}

// Close modal functionality
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Animated counter for statistics
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Animate counters when they come into view
            if (entry.target.classList.contains('edition-stats')) {
                const numbers = entry.target.querySelectorAll('[data-count]');
                numbers.forEach(num => {
                    const target = parseInt(num.getAttribute('data-count'));
                    animateCounter(num, target);
                });
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.edition-card, .detail-card, .point, .rule-section');
    animatedElements.forEach(el => observer.observe(el));
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(27, 41, 81, 0.98)';
    } else {
        navbar.style.background = 'rgba(27, 41, 81, 0.95)';
    }
});

// Mathematical symbols animation in hero section
function animateSymbols() {
    const symbols = document.querySelectorAll('.mathematical-symbols span');
    symbols.forEach((symbol, index) => {
        symbol.style.animation = `float 3s ease-in-out ${index * 0.5}s infinite alternate`;
    });
}

// Add floating animation CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% { transform: translateY(0px); }
        100% { transform: translateY(-20px); }
    }
    
    .animate {
        animation: fadeInUp 0.8s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .edition-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease-out;
    }
    
    .edition-card.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .detail-card, .point, .rule-section {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease-out;
    }
    
    .detail-card.animate, .point.animate, .rule-section.animate {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    animateSymbols();
    
    // Add staggered animation to archive cards
    const archiveCards = document.querySelectorAll('.edition-card');
    archiveCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
});

// Form validation for registration (if form exists)
function validateRegistration(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.remove('error');
        }
    });
    
    return isValid;
}

// Add event listeners for CTA buttons
document.addEventListener('DOMContentLoaded', () => {
    const ctaButtons = document.querySelectorAll('.cta-button, .register-btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            // Scroll to next edition section or show registration modal
            const nextEdition = document.getElementById('next-edition');
            if (nextEdition) {
                nextEdition.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Easter egg: Konami code for special Euler quote
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        showEulerEasterEgg();
        konamiCode = [];
    }
});

function showEulerEasterEgg() {
    const easterEgg = document.createElement('div');
    easterEgg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--gold);
        color: var(--dark-blue);
        padding: 2rem;
        border-radius: 15px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        z-index: 3000;
        text-align: center;
        max-width: 500px;
        animation: bounceIn 0.8s ease-out;
    `;
    
    easterEgg.innerHTML = `
        <h3>🎉 Euler's Secret Quote! 🎉</h3>
        <p style="font-style: italic; margin: 1rem 0;">
            "For the sake of a single verse he would destroy the whole world."
        </p>
        <p style="font-size: 0.9rem; opacity: 0.8;">
            - Leonhard Euler (on the beauty of mathematics)
        </p>
        <button onclick="this.parentElement.remove()" style="
            background: var(--dark-blue);
            color: var(--gold);
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 25px;
            cursor: pointer;
            margin-top: 1rem;
        ">Close</button>
    `;
    
    document.body.appendChild(easterEgg);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        if (easterEgg.parentElement) {
            easterEgg.remove();
        }
    }, 10000);
}

// Add bounce animation for easter egg
const bounceStyle = document.createElement('style');
bounceStyle.textContent = `
    @keyframes bounceIn {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.3);
        }
        50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.05);
        }
        70% {
            transform: translate(-50%, -50%) scale(0.9);
        }
        100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
`;
document.head.appendChild(bounceStyle);

// Lazy loading for images (if any are added later)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(27, 41, 81, 0.98)';
    } else {
        navbar.style.background = 'rgba(27, 41, 81, 0.95)';
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

console.log('🧮 Euler\'s Challenges website loaded successfully!');
console.log('💡 Try the Konami code for a special surprise!');

