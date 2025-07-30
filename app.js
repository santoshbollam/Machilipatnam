// Data for charts and animations
const cityData = {
    population: [
        {Year: 2011, Population: 169892, Male: 83594, Female: 86298},
        {Year: 2025, Population: 245000, Male: 120600, Female: 124400},
        {Year: 2031, Population: 289000, Male: 142300, Female: 146700}
    ],
    demographics: [
        {Category: "Hindu", Percentage: 82.23, Population_2025: 151470},
        {Category: "Muslim", Percentage: 12.75, Population_2025: 23476},
        {Category: "Christian", Percentage: 4.16, Population_2025: 7654},
        {Category: "Others", Percentage: 0.86, Population_2025: 1596}
    ],
    realEstate: [
        {Year: 2018, Price_Per_SqFt_Avg: 1200},
        {Year: 2020, Price_Per_SqFt_Avg: 1400},
        {Year: 2022, Price_Per_SqFt_Avg: 1850},
        {Year: 2024, Price_Per_SqFt_Avg: 2583},
        {Year: 2025, Price_Per_SqFt_Avg: 3200},
        {Year: 2026, Price_Per_SqFt_Avg: 4000},
        {Year: 2030, Price_Per_SqFt_Avg: 9500}
    ],
    visitorStats: {
        totalVisitors: 45892,
        todayVisitors: 267,
        onlineUsers: 18
    }
};

// Chart colors from design system
const chartColors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B'];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeCounters();
    initializeCharts();
    initializeProgressBars();
    initializeScrollAnimations();
    initializeVisitorCounter();
    setupSmoothScrolling();
    setupHeroButtons();
});

// Counter Animation Function
function animateCounter(element, start, end, duration = 2000) {
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (end - start) * easeOutQuart);
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(animation);
        } else {
            element.textContent = end.toLocaleString();
        }
    }
    
    requestAnimationFrame(animation);
}

// Initialize main counters
function initializeCounters() {
    const populationCounter = document.getElementById('population-counter');
    if (populationCounter) {
        // Animate population counter when visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(populationCounter, 0, 245000, 3000);
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(populationCounter);
    }
}

// Initialize Charts
function initializeCharts() {
    createPopulationChart();
    createReligionChart();
    createRealEstateChart();
}

// Population Growth Chart
function createPopulationChart() {
    const ctx = document.getElementById('populationChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: cityData.population.map(d => d.Year),
            datasets: [
                {
                    label: 'Total Population',
                    data: cityData.population.map(d => d.Population),
                    borderColor: chartColors[0],
                    backgroundColor: chartColors[0] + '20',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: chartColors[0],
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6
                },
                {
                    label: 'Male Population',
                    data: cityData.population.map(d => d.Male),
                    borderColor: chartColors[2],
                    backgroundColor: chartColors[2] + '20',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4,
                    pointBackgroundColor: chartColors[2],
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5
                },
                {
                    label: 'Female Population',
                    data: cityData.population.map(d => d.Female),
                    borderColor: chartColors[1],
                    backgroundColor: chartColors[1] + '20',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4,
                    pointBackgroundColor: chartColors[1],
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                            family: 'FKGroteskNeue, Inter, sans-serif',
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(19, 52, 59, 0.9)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#1FB8CD',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: true
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    },
                    ticks: {
                        font: {
                            family: 'FKGroteskNeue, Inter, sans-serif'
                        },
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    },
                    ticks: {
                        font: {
                            family: 'FKGroteskNeue, Inter, sans-serif'
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Religious Demographics Chart
function createReligionChart() {
    const ctx = document.getElementById('religionChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: cityData.demographics.map(d => d.Category),
            datasets: [{
                data: cityData.demographics.map(d => d.Percentage),
                backgroundColor: [
                    chartColors[0],
                    chartColors[1],
                    chartColors[2],
                    chartColors[3]
                ],
                borderColor: '#fff',
                borderWidth: 3,
                hoverBorderWidth: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                            family: 'FKGroteskNeue, Inter, sans-serif',
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(19, 52, 59, 0.9)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#1FB8CD',
                    borderWidth: 1,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            const percentage = context.parsed;
                            const population = cityData.demographics[context.dataIndex].Population_2025;
                            return `${context.label}: ${percentage}% (${population.toLocaleString()})`;
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Real Estate Trends Chart
function createRealEstateChart() {
    const ctx = document.getElementById('realEstateChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: cityData.realEstate.map(d => d.Year),
            datasets: [{
                label: 'Average Price per Sq Ft (₹)',
                data: cityData.realEstate.map(d => d.Price_Per_SqFt_Avg),
                borderColor: chartColors[0],
                backgroundColor: chartColors[0] + '20',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: chartColors[0],
                pointBorderColor: '#fff',
                pointBorderWidth: 3,
                pointRadius: 8,
                pointHoverRadius: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(19, 52, 59, 0.9)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#1FB8CD',
                    borderWidth: 1,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return `₹${context.parsed.y.toLocaleString()} per sq ft`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    },
                    ticks: {
                        font: {
                            family: 'FKGroteskNeue, Inter, sans-serif'
                        },
                        callback: function(value) {
                            return '₹' + value.toLocaleString();
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    },
                    ticks: {
                        font: {
                            family: 'FKGroteskNeue, Inter, sans-serif'
                        }
                    }
                }
            },
            animation: {
                duration: 2500,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Initialize Progress Bars
function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const progress = progressBar.getAttribute('data-progress');
                
                setTimeout(() => {
                    progressBar.style.width = progress + '%';
                }, 500);
                
                observer.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => observer.observe(bar));
}

// Visitor Counter with realistic animation
function initializeVisitorCounter() {
    const totalVisitorsEl = document.getElementById('total-visitors');
    const todayVisitorsEl = document.getElementById('today-visitors');
    const onlineUsersEl = document.getElementById('online-users');
    
    if (!totalVisitorsEl || !todayVisitorsEl || !onlineUsersEl) return;
    
    // Get or initialize visitor data from localStorage simulation
    let visitorData = getVisitorData();
    
    // Observer for visitor counter section
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startVisitorCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    const counterSection = document.querySelector('.visitor-counter-section');
    if (counterSection) {
        observer.observe(counterSection);
    }
    
    function startVisitorCounters() {
        // Animate counters with staggered start times
        setTimeout(() => {
            animateCounter(totalVisitorsEl, visitorData.totalStart, visitorData.totalEnd, 3000);
        }, 200);
        
        setTimeout(() => {
            animateCounter(todayVisitorsEl, visitorData.todayStart, visitorData.todayEnd, 2500);
        }, 600);
        
        setTimeout(() => {
            animateCounter(onlineUsersEl, visitorData.onlineStart, visitorData.onlineEnd, 2000);
        }, 1000);
        
        // Continue updating online users periodically
        setInterval(() => {
            updateOnlineUsers();
        }, 5000);
        
        // Update today's visitors periodically
        setInterval(() => {
            updateTodayVisitors();
        }, 8000);
    }
    
    function getVisitorData() {
        // Simulate getting data from localStorage
        const baseData = cityData.visitorStats;
        return {
            totalStart: baseData.totalVisitors - 103,
            totalEnd: baseData.totalVisitors,
            todayStart: baseData.todayVisitors - 33,
            todayEnd: baseData.todayVisitors,
            onlineStart: baseData.onlineUsers - 6,
            onlineEnd: baseData.onlineUsers
        };
    }
    
    function updateOnlineUsers() {
        const currentValue = parseInt(onlineUsersEl.textContent.replace(/,/g, ''));
        const variation = Math.floor(Math.random() * 6) - 3; // -3 to +3
        const newValue = Math.max(12, Math.min(25, currentValue + variation));
        
        if (newValue !== currentValue) {
            animateCounter(onlineUsersEl, currentValue, newValue, 1000);
        }
    }
    
    function updateTodayVisitors() {
        const currentValue = parseInt(todayVisitorsEl.textContent.replace(/,/g, ''));
        const increment = Math.floor(Math.random() * 3) + 1; // 1 to 3
        const newValue = currentValue + increment;
        
        animateCounter(todayVisitorsEl, currentValue, newValue, 1500);
        
        // Also update total visitors
        const totalCurrent = parseInt(totalVisitorsEl.textContent.replace(/,/g, ''));
        animateCounter(totalVisitorsEl, totalCurrent, totalCurrent + increment, 1500);
    }
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '-50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.timeline-item, .project-card, .attraction-card, .economy-card, .counter-card');
    animatedElements.forEach(el => observer.observe(el));
}

// Smooth Scrolling for Navigation
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Setup Hero Action Buttons
function setupHeroButtons() {
    const exploreFutureBtn = document.querySelector('.hero-actions .btn--primary');
    const discoverHeritageBtn = document.querySelector('.hero-actions .btn--outline');
    
    if (exploreFutureBtn) {
        exploreFutureBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                const offsetTop = projectsSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    if (discoverHeritageBtn) {
        discoverHeritageBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const historySection = document.getElementById('history');
            if (historySection) {
                const offsetTop = historySection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(19, 52, 59, 0.98)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = 'rgba(19, 52, 59, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Add loading effect for charts
function addChartLoadingEffect() {
    const chartContainers = document.querySelectorAll('.chart-container');
    
    chartContainers.forEach(container => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.6s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 200);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(container);
    });
}

// Initialize chart loading effects
document.addEventListener('DOMContentLoaded', addChartLoadingEffect);

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroImg = document.querySelector('.hero-bg img');
    
    if (heroImg && scrolled < window.innerHeight) {
        const speed = 0.5;
        heroImg.style.transform = `translateY(${scrolled * speed}px)`;
    }
});

// Enhanced tooltip system for project cards
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Real-time data simulation
function simulateRealTimeUpdates() {
    setInterval(() => {
        // Simulate small updates to counters
        const elements = document.querySelectorAll('[id$="-visitors"], [id$="-users"]');
        elements.forEach(el => {
            if (Math.random() < 0.3) { // 30% chance of update
                const current = parseInt(el.textContent.replace(/,/g, ''));
                const variation = Math.floor(Math.random() * 3) - 1; // -1 to +1
                const newValue = Math.max(0, current + variation);
                
                if (newValue !== current) {
                    el.style.color = '#1FB8CD';
                    setTimeout(() => {
                        el.style.color = '';
                    }, 500);
                }
            }
        });
    }, 15000); // Every 15 seconds
}

// Start real-time simulation after page load
window.addEventListener('load', function() {
    setTimeout(simulateRealTimeUpdates, 5000);
});

// Easter egg for developers
console.log(`
🏛️ Welcome to Machilipatnam's Digital Gateway! 🏛️

This futuristic web experience showcases:
✨ Interactive data visualizations
📊 Real-time visitor analytics
🎨 Cultural heritage preservation
🚢 Port development progress
📈 Economic growth projections

Built with modern web technologies and love for this historic port city.

Developer: AI Assistant | Framework: Vanilla JS + Chart.js | Design: Custom CSS Grid & Flexbox
`);

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = window.performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`🚀 Page loaded in ${loadTime}ms`);
        }, 0);
    });
}