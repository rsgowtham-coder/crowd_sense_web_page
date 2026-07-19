// Heat Map Canvas Setup
const canvas = document.getElementById('heatmapCanvas');
const ctx = canvas.getContext('2d');
const container = document.querySelector('.heatmap-container');
let isRealtime = true;
let zoomLevel = 1;
let panX = 0;
let panY = 0;
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;

// Sample crowd density data (simulating real-time data)
const crowdData = [
    { x: 100, y: 100, intensity: 0.8 },
    { x: 300, y: 150, intensity: 0.6 },
    { x: 500, y: 200, intensity: 0.9 },
    { x: 700, y: 250, intensity: 0.4 },
    { x: 200, y: 400, intensity: 0.7 },
    { x: 600, y: 450, intensity: 0.5 },
    { x: 400, y: 350, intensity: 0.85 },
];

// Resize canvas to fit container
function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    // Set canvas size with device pixel ratio for sharp rendering
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    // Scale context to match device pixel ratio
    ctx.scale(dpr, dpr);
    
    // Redraw after resize
    drawHeatmap();
}

// Initial resize
resizeCanvas();

// Handle window resize
window.addEventListener('resize', resizeCanvas);

// Color mapping for intensity
function getHeatColor(intensity) {
    if (intensity < 0.25) return 'rgb(0, 0, 255)'; // Blue - Low
    if (intensity < 0.5) return 'rgb(0, 255, 0)'; // Green - Medium
    if (intensity < 0.75) return 'rgb(255, 255, 0)'; // Yellow - High
    return 'rgb(255, 0, 0)'; // Red - Critical
}

// Draw heat map
function drawHeatmap() {
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
    
    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, displayWidth, displayHeight);

    // Save context state
    ctx.save();
    
    // Apply pan and zoom transformations
    ctx.translate(panX, panY);
    ctx.scale(zoomLevel, zoomLevel);

    // Draw grid lines
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1 / zoomLevel;
    const gridSpacing = 50;
    
    for (let i = 0; i <= displayWidth / zoomLevel; i += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(i - panX / zoomLevel, 0);
        ctx.lineTo(i - panX / zoomLevel, displayHeight / zoomLevel);
        ctx.stroke();
    }
    for (let i = 0; i <= displayHeight / zoomLevel; i += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, i - panY / zoomLevel);
        ctx.lineTo(displayWidth / zoomLevel, i - panY / zoomLevel);
        ctx.stroke();
    }

    // Draw heat points with gradient
    crowdData.forEach(point => {
        const radius = 60 * zoomLevel;
        const gradient = ctx.createRadialGradient(
            point.x, point.y, 0,
            point.x, point.y, radius
        );
        
        const color = getHeatColor(point.intensity);
        gradient.addColorStop(0, color);
        gradient.addColorStop(0.7, color + '80');
        gradient.addColorStop(1, color + '00');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
        ctx.fill();
    });

    // Draw intensity labels
    ctx.fillStyle = '#fff';
    ctx.font = `bold ${12 / zoomLevel}px Arial`;
    ctx.textAlign = 'center';
    crowdData.forEach(point => {
        ctx.fillText((point.intensity * 100).toFixed(0) + '%', point.x, point.y);
    });
    
    // Restore context state
    ctx.restore();
}

// Real-time toggle
document.getElementById('realtimeToggle').addEventListener('click', function() {
    isRealtime = !isRealtime;
    this.classList.toggle('active');
    
    if (isRealtime) {
        startRealtime();
    } else {
        stopRealtime();
    }
});

// Zoom controls
document.getElementById('zoomIn').addEventListener('click', function() {
    zoomLevel = Math.min(zoomLevel + 0.2, 3);
    drawHeatmap();
});

document.getElementById('zoomOut').addEventListener('click', function() {
    zoomLevel = Math.max(zoomLevel - 0.2, 0.5);
    drawHeatmap();
});

// Mouse wheel zoom
canvas.addEventListener('wheel', function(e) {
    e.preventDefault();
    
    const scrollDirection = e.deltaY > 0 ? -0.1 : 0.1;
    const newZoom = Math.max(0.5, Math.min(3, zoomLevel + scrollDirection));
    
    // Get mouse position relative to canvas
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Zoom towards mouse position
    const zoomChange = newZoom - zoomLevel;
    panX -= mouseX * zoomChange / zoomLevel;
    panY -= mouseY * zoomChange / zoomLevel;
    
    zoomLevel = newZoom;
    drawHeatmap();
}, { passive: false });

// Drag to pan
canvas.addEventListener('mousedown', function(e) {
    isDragging = true;
    dragStartX = e.clientX - panX;
    dragStartY = e.clientY - panY;
});

document.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    
    panX = e.clientX - dragStartX;
    panY = e.clientY - dragStartY;
    drawHeatmap();
});

document.addEventListener('mouseup', function() {
    isDragging = false;
});

// Touch support for mobile/tablet
canvas.addEventListener('touchstart', function(e) {
    if (e.touches.length === 1) {
        isDragging = true;
        dragStartX = e.touches[0].clientX - panX;
        dragStartY = e.touches[0].clientY - panY;
    }
});

canvas.addEventListener('touchmove', function(e) {
    if (!isDragging) return;
    e.preventDefault();
    
    if (e.touches.length === 1) {
        panX = e.touches[0].clientX - dragStartX;
        panY = e.touches[0].clientY - dragStartY;
        drawHeatmap();
    } else if (e.touches.length === 2) {
        // Pinch zoom
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const distance = Math.hypot(
            touch2.clientX - touch1.clientX,
            touch2.clientY - touch1.clientY
        );
        
        if (lastTouchDistance) {
            const zoomChange = distance > lastTouchDistance ? 0.05 : -0.05;
            zoomLevel = Math.max(0.5, Math.min(3, zoomLevel + zoomChange));
            drawHeatmap();
        }
        lastTouchDistance = distance;
    }
});

let lastTouchDistance = null;

canvas.addEventListener('touchend', function() {
    isDragging = false;
    lastTouchDistance = null;
});

// Real-time update simulation
let realtimeInterval;
function startRealtime() {
    realtimeInterval = setInterval(() => {
        // Simulate real-time data changes
        crowdData.forEach(point => {
            point.intensity += (Math.random() - 0.5) * 0.1;
            point.intensity = Math.max(0, Math.min(1, point.intensity));
        });
        drawHeatmap();
    }, 1000);
}

function stopRealtime() {
    clearInterval(realtimeInterval);
}