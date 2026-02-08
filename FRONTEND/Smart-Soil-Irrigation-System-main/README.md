# 🌱 Smart Irrigation & Soil Monitoring System

A modern, mobile-responsive web dashboard for an IoT-based smart irrigation system that monitors soil moisture in real-time and automatically controls water flow for optimal plant health.

![Dashboard Preview](https://img.shields.io/badge/Status-Active-success?style=flat-square)
![Mobile Responsive](https://img.shields.io/badge/Mobile-Responsive-blue?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## ✨ Features

### Real-Time Monitoring
- Live soil moisture level display with animated gauge
- Status indicators (Dry / Optimal / Wet)
- Motor status tracking (ON / OFF)
- Daily summary statistics

### Smart Controls
- **Moisture Threshold Slider** - Set the minimum moisture level for automatic irrigation
- **Timer Control** - Configure motor run duration with preset options
- **Manual Override Toggle** - Take direct control of the motor with one switch

### Automation Logic
- Automatic irrigation when soil drops below threshold
- Auto shut-off when optimal moisture is reached
- Timer-based motor control with countdown display
- Overwatering prevention

### Safety Features
- Overwater prevention system
- Automatic motor shut-off
- Manual override capability
- Scalable for IoT/cloud upgrades

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No backend or server required - runs entirely in the browser

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/Smart-Soil-Irrigation-System.git
```

2. Open `index.html` in your browser:
```bash
cd Smart-Soil-Irrigation-System
start index.html  # Windows
open index.html   # macOS
xdg-open index.html  # Linux
```

Or simply double-click the `index.html` file.

## 📁 Project Structure

```
Smart-Soil-Irrigation-System/
├── index.html          # Main HTML file with all sections
├── css/
│   └── style.css       # Complete styling with CSS variables
├── js/
│   └── script.js       # Interactive functionality & simulations
└── README.md           # Project documentation
```

## 🎨 Design Highlights

- **Mobile-First Design** - Optimized for all screen sizes
- **Premium UI** - Clean, modern aesthetic with smooth animations
- **Earth Tone Palette** - Calming greens and soft neutrals
- **Glassmorphism Effects** - Subtle backdrop blur on navigation
- **Micro-Animations** - Hover effects, gauges, and floating cards
- **Lucide Icons** - Beautiful, consistent iconography

## 🛠️ Technologies Used

- **HTML5** - Semantic markup structure
- **CSS3** - Custom properties, Flexbox, Grid, animations
- **JavaScript (ES6+)** - Interactive controls and simulations
- **Lucide Icons** - Modern icon library
- **Google Fonts** - Plus Jakarta Sans typography

## 📱 Responsive Breakpoints

| Screen Size | Behavior |
|-------------|----------|
| < 640px | Single column, mobile navigation |
| 640px - 768px | 2-column grids |
| 768px+ | Full desktop layout, horizontal navigation |
| 1024px+ | Wider spacing, larger floating cards |

## 🔧 Customization

### Changing Colors
Edit the CSS variables in `css/style.css`:

```css
:root {
    --primary-500: #22c55e;  /* Main green */
    --primary-600: #16a34a;  /* Darker green */
    /* ... more color tokens */
}
```

### Adjusting Default Values
Modify the initial state in `js/script.js`:

```javascript
const dashboardState = {
    moisture: 65,      // Starting moisture %
    threshold: 35,     // Default threshold %
    timerDuration: 5,  // Default timer minutes
    // ...
};
```

## 🌍 Sustainability Focus

This project promotes:
- **Water Conservation** - Smart irrigation reduces water waste by up to 40%
- **Efficient Farming** - Automated systems optimize resource usage
- **Scalable Solutions** - Ready for future IoT and cloud integrations

## 👥 Team

This is a student innovation project focused on smart agriculture and sustainable water management.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built with 💚 for a greener future
</p>