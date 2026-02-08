/* =====================================================
   Smart Irrigation & Soil Monitoring System
   Interactive Dashboard JavaScript
   ===================================================== */

// ─────────────────────────────────────────────────────
// Initialize Lucide Icons
// ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Initialize all components
    initNavigation();
    initMoistureSimulation();
    initThresholdControl();
    initTimerControl();
    initMotorToggle();
    initScrollAnimations();
    initHeroGauge();
});

// ─────────────────────────────────────────────────────
// Dashboard State
// ─────────────────────────────────────────────────────
const dashboardState = {
    moisture: 65,
    threshold: 35,
    timerDuration: 5,
    motorOn: false,
    manualMode: false,
    timerRunning: false,
    timerRemaining: 0,
    cycleCount: 3,
    waterUsed: 2.4,
    runtime: 18,
    waterSaved: 1.2
};

// ─────────────────────────────────────────────────────
// Navigation
// ─────────────────────────────────────────────────────
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle
    navToggle?.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = navToggle.querySelector('svg');
        if (navMenu.classList.contains('active')) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = navToggle?.querySelector('svg');
            if (icon) {
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ─────────────────────────────────────────────────────
// Hero Gauge Animation
// ─────────────────────────────────────────────────────
function initHeroGauge() {
    const heroGauge = document.getElementById('heroGauge');
    const heroGaugeValue = document.getElementById('heroGaugeValue');

    if (heroGauge && heroGaugeValue) {
        // Animate to current moisture value
        setTimeout(() => {
            updateHeroGauge(dashboardState.moisture);
        }, 500);
    }
}

function updateHeroGauge(value) {
    const heroGauge = document.getElementById('heroGauge');
    const heroGaugeValue = document.getElementById('heroGaugeValue');

    if (heroGauge && heroGaugeValue) {
        const circumference = 2 * Math.PI * 50; // radius = 50
        const offset = circumference - (value / 100) * circumference;
        heroGauge.style.strokeDasharray = circumference;
        heroGauge.style.strokeDashoffset = offset;
        heroGaugeValue.textContent = value;
    }
}

// ─────────────────────────────────────────────────────
// Moisture Simulation
// ─────────────────────────────────────────────────────
function initMoistureSimulation() {
    updateMoistureDisplay(dashboardState.moisture);

    // Simulate moisture changes
    setInterval(() => {
        if (!dashboardState.motorOn) {
            // Moisture decreases slowly when motor is off
            dashboardState.moisture = Math.max(10, dashboardState.moisture - Math.random() * 0.5);
        } else {
            // Moisture increases when motor is on
            dashboardState.moisture = Math.min(95, dashboardState.moisture + Math.random() * 2);
        }

        updateMoistureDisplay(dashboardState.moisture);
        updateHeroGauge(Math.round(dashboardState.moisture));
        checkAutomaticIrrigation();
    }, 3000);
}

function updateMoistureDisplay(value) {
    const moistureValue = document.getElementById('moistureValue');
    const moistureProgress = document.getElementById('moistureProgress');
    const moistureStatus = document.getElementById('moistureStatus');

    if (moistureValue) {
        moistureValue.textContent = Math.round(value);
    }

    if (moistureProgress) {
        // Calculate stroke-dashoffset for circular progress
        const circumference = 2 * Math.PI * 85; // radius = 85
        const offset = circumference - (value / 100) * circumference;
        moistureProgress.style.strokeDasharray = circumference;
        moistureProgress.style.strokeDashoffset = offset;

        // Update gradient color based on value
        if (value < 30) {
            moistureProgress.style.stroke = '#f59e0b'; // Warning - dry
        } else if (value > 70) {
            moistureProgress.style.stroke = '#3b82f6'; // Info - wet
        } else {
            moistureProgress.style.stroke = 'url(#moistureGradient)'; // Success - optimal
        }
    }

    if (moistureStatus) {
        moistureStatus.classList.remove('dry', 'wet');
        if (value < 30) {
            moistureStatus.textContent = 'Dry';
            moistureStatus.classList.add('dry');
        } else if (value > 70) {
            moistureStatus.textContent = 'Wet';
            moistureStatus.classList.add('wet');
        } else {
            moistureStatus.textContent = 'Optimal';
        }
    }
}

function checkAutomaticIrrigation() {
    if (dashboardState.manualMode) return;

    // Automatic irrigation logic
    if (dashboardState.moisture < dashboardState.threshold && !dashboardState.motorOn) {
        startMotor(true);
    } else if (dashboardState.moisture > dashboardState.threshold + 20 && dashboardState.motorOn) {
        stopMotor();
    }
}

// ─────────────────────────────────────────────────────
// Threshold Control
// ─────────────────────────────────────────────────────
function initThresholdControl() {
    const thresholdSlider = document.getElementById('thresholdSlider');
    const thresholdValue = document.getElementById('thresholdValue');

    if (thresholdSlider && thresholdValue) {
        // Update slider background gradient
        updateSliderBackground(thresholdSlider, thresholdSlider.value);

        thresholdSlider.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            thresholdValue.textContent = value;
            dashboardState.threshold = value;
            updateSliderBackground(thresholdSlider, value);

            // Show feedback animation
            thresholdValue.style.transform = 'scale(1.1)';
            setTimeout(() => {
                thresholdValue.style.transform = 'scale(1)';
            }, 150);
        });
    }
}

function updateSliderBackground(slider, value) {
    const min = slider.min || 10;
    const max = slider.max || 60;
    const percentage = ((value - min) / (max - min)) * 100;
    slider.style.background = `linear-gradient(to right, #22c55e 0%, #22c55e ${percentage}%, #e5e5e5 ${percentage}%, #e5e5e5 100%)`;
}

// ─────────────────────────────────────────────────────
// Timer Control
// ─────────────────────────────────────────────────────
function initTimerControl() {
    const timerInput = document.getElementById('timerInput');
    const timerDecrease = document.getElementById('timerDecrease');
    const timerIncrease = document.getElementById('timerIncrease');
    const presetBtns = document.querySelectorAll('.preset-btn');

    if (timerInput) {
        timerInput.addEventListener('change', (e) => {
            let value = parseInt(e.target.value);
            value = Math.max(1, Math.min(30, value));
            e.target.value = value;
            dashboardState.timerDuration = value;
            updatePresetButtons(value);
        });
    }

    timerDecrease?.addEventListener('click', () => {
        const currentValue = dashboardState.timerDuration;
        if (currentValue > 1) {
            dashboardState.timerDuration = currentValue - 1;
            if (timerInput) timerInput.value = dashboardState.timerDuration;
            updatePresetButtons(dashboardState.timerDuration);
        }
    });

    timerIncrease?.addEventListener('click', () => {
        const currentValue = dashboardState.timerDuration;
        if (currentValue < 30) {
            dashboardState.timerDuration = currentValue + 1;
            if (timerInput) timerInput.value = dashboardState.timerDuration;
            updatePresetButtons(dashboardState.timerDuration);
        }
    });

    presetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const time = parseInt(btn.dataset.time);
            dashboardState.timerDuration = time;
            if (timerInput) timerInput.value = time;
            updatePresetButtons(time);
        });
    });
}

function updatePresetButtons(selectedTime) {
    const presetBtns = document.querySelectorAll('.preset-btn');
    presetBtns.forEach(btn => {
        if (parseInt(btn.dataset.time) === selectedTime) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// ─────────────────────────────────────────────────────
// Motor Control
// ─────────────────────────────────────────────────────
function initMotorToggle() {
    const motorToggle = document.getElementById('motorToggle');

    motorToggle?.addEventListener('change', (e) => {
        dashboardState.manualMode = true;

        if (e.target.checked) {
            startMotor(false);
        } else {
            stopMotor();
            dashboardState.manualMode = false;
        }

        updateToggleStatus();
    });
}

function startMotor(automatic = false) {
    dashboardState.motorOn = true;

    // Update motor status displays
    updateMotorDisplay(true);

    if (!automatic) {
        // Start timer countdown for manual/automatic operation
        startTimerCountdown();
    }

    // Update stats
    dashboardState.cycleCount++;
    updateStats();

    // Update toggle if automatic
    if (automatic) {
        const motorToggle = document.getElementById('motorToggle');
        if (motorToggle) motorToggle.checked = true;
        updateToggleStatus();
    }
}

function stopMotor() {
    dashboardState.motorOn = false;
    dashboardState.timerRunning = false;

    // Update motor status displays
    updateMotorDisplay(false);

    // Hide timer progress
    const timerProgressContainer = document.getElementById('timerProgressContainer');
    if (timerProgressContainer) {
        timerProgressContainer.style.display = 'none';
    }

    // Update toggle
    const motorToggle = document.getElementById('motorToggle');
    if (motorToggle) motorToggle.checked = false;
    updateToggleStatus();
}

function updateMotorDisplay(isOn) {
    const motorRing = document.getElementById('motorRing');
    const motorBadge = document.getElementById('motorBadge');
    const motorState = document.getElementById('motorState');
    const motorMode = document.getElementById('motorMode');
    const lastActive = document.getElementById('lastActive');

    if (isOn) {
        motorRing?.classList.add('active');
        if (motorBadge) {
            motorBadge.textContent = 'ON';
            motorBadge.classList.add('active');
        }
        if (motorState) motorState.textContent = 'Running';
        if (lastActive) lastActive.textContent = 'Now';

        // Update floating card
        const floatCard2 = document.querySelector('.float-card-2 span');
        if (floatCard2) floatCard2.textContent = 'Motor ON';
    } else {
        motorRing?.classList.remove('active');
        if (motorBadge) {
            motorBadge.textContent = 'OFF';
            motorBadge.classList.remove('active');
        }
        if (motorState) motorState.textContent = 'Idle';
        if (lastActive) lastActive.textContent = 'Just now';

        // Update floating card
        const floatCard2 = document.querySelector('.float-card-2 span');
        if (floatCard2) floatCard2.textContent = 'Motor OFF';
    }

    if (motorMode) {
        motorMode.textContent = dashboardState.manualMode ? 'Manual' : 'Automatic';
    }
}

function updateToggleStatus() {
    const toggleStatus = document.getElementById('toggleStatus');
    const toggleMode = document.getElementById('toggleMode');

    if (toggleStatus) {
        toggleStatus.textContent = dashboardState.motorOn ? 'Motor is ON' : 'Motor is OFF';
    }

    if (toggleMode) {
        toggleMode.textContent = dashboardState.manualMode ? 'Manual Mode' : 'Automatic Mode';
    }
}

function startTimerCountdown() {
    if (dashboardState.timerRunning) return;

    dashboardState.timerRunning = true;
    dashboardState.timerRemaining = dashboardState.timerDuration * 60; // Convert to seconds

    const timerProgressContainer = document.getElementById('timerProgressContainer');
    const timerProgressFill = document.getElementById('timerProgressFill');
    const timerProgressText = document.getElementById('timerProgressText');

    if (timerProgressContainer) {
        timerProgressContainer.style.display = 'block';
    }

    const totalSeconds = dashboardState.timerDuration * 60;

    const countdownInterval = setInterval(() => {
        if (!dashboardState.timerRunning || dashboardState.timerRemaining <= 0) {
            clearInterval(countdownInterval);

            if (dashboardState.timerRemaining <= 0) {
                stopMotor();
                dashboardState.manualMode = false;
            }
            return;
        }

        dashboardState.timerRemaining--;

        // Update progress bar
        const progress = ((totalSeconds - dashboardState.timerRemaining) / totalSeconds) * 100;
        if (timerProgressFill) {
            timerProgressFill.style.width = `${progress}%`;
        }

        // Update time text
        const minutes = Math.floor(dashboardState.timerRemaining / 60);
        const seconds = dashboardState.timerRemaining % 60;
        if (timerProgressText) {
            timerProgressText.textContent = `${minutes}:${seconds.toString().padStart(2, '0')} remaining`;
        }

        // Update runtime stats
        dashboardState.runtime++;
        dashboardState.waterUsed += 0.02;
        updateStats();
    }, 1000);
}

function updateStats() {
    const waterUsed = document.getElementById('waterUsed');
    const cycleCount = document.getElementById('cycleCount');
    const runtime = document.getElementById('runtime');
    const waterSaved = document.getElementById('waterSaved');

    if (waterUsed) waterUsed.textContent = dashboardState.waterUsed.toFixed(1) + 'L';
    if (cycleCount) cycleCount.textContent = dashboardState.cycleCount;
    if (runtime) runtime.textContent = dashboardState.runtime + 'm';
    if (waterSaved) waterSaved.textContent = dashboardState.waterSaved.toFixed(1) + 'L';
}

// ─────────────────────────────────────────────────────
// Scroll Animations
// ─────────────────────────────────────────────────────
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.monitor-card, .control-card, .feature-card, .safety-item, .step-card'
    );

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// ─────────────────────────────────────────────────────
// Smooth Scroll for Navigation Links
// ─────────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ─────────────────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────────────────
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

function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ─────────────────────────────────────────────────────
// Console welcome message
// ─────────────────────────────────────────────────────
console.log(
    '%c🌱 Smart Irrigation System Dashboard',
    'font-size: 18px; font-weight: bold; color: #22c55e;'
);
console.log(
    '%cMonitoring soil moisture and optimizing water usage.',
    'font-size: 12px; color: #737373;'
);
lucide.createIcons();
