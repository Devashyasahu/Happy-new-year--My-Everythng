// 1. NON-REPEATING RANDOM MUSIC LOGIC
const songs = [
  "assests/music/song1.mp3",
  "assests/music/song2.mp3",
  "assests/music/song3.mp3",
  "assests/music/song4.mp3",
  "assests/music/song5.mp3",
  "assests/music/song6.mp3"
];

function getNextSong() {
  // Use SessionStorage to track played songs so they don't repeat on refresh
  let playedSongs = JSON.parse(sessionStorage.getItem('playedSongs')) || [];

  // Reset if all 6 songs have been heard
  if (playedSongs.length >= songs.length) {
    playedSongs = [];
  }

  // Filter for songs not yet played in this session
  const availableSongs = songs.filter(song => !playedSongs.includes(song));
  
  // Pick a random song from the available pool
  const randomIndex = Math.floor(Math.random() * availableSongs.length);
  const selectedSong = availableSongs[randomIndex];

  // Save selection to history
  playedSongs.push(selectedSong);
  sessionStorage.setItem('playedSongs', JSON.stringify(playedSongs));

  return selectedSong;
}

const bgMusic = document.getElementById("bgMusic");
const startOverlay = document.getElementById("start-overlay");
const startBtn = document.getElementById("start-btn");

// Initialize with a fresh song
bgMusic.src = getNextSong();
bgMusic.volume = 0.5;

// 2. ROMANTIC TYPEWRITER EFFECT
// Your custom emotional message
const text = "Every second with you is magic and a blessing of Shri Radha ✨. I never express this, but I feel incredibly lucky to have you in my life 💖. You know that some of the questions are still in my mind about us, but I leave them to the future ⏳... but yeah, at the end, every song I used here is a song where I feel you are with me in every note 🎶. Happy New Year to my everything! 🌹";

let charIndex = 0;
const letter = document.getElementById("letterText");

function typeWriter() {
  if (charIndex < text.length) {
    letter.innerHTML += text.charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, 65); // Smooth speed for mobile reading
  }
}

// 3. START BUTTON INTERACTION
startBtn.addEventListener("click", () => {
  // Start music (Mobile browsers require this click to play audio)
  bgMusic.play().catch(err => console.log("Audio play blocked:", err));
  
  // Smoothly fade out the overlay
  startOverlay.style.transition = "opacity 1s ease";
  startOverlay.style.opacity = "0";
  
  setTimeout(() => {
    startOverlay.style.display = "none";
    typeWriter(); // Start the letter animation after the overlay is gone
  }, 1000);
});

// 4. COMBINED ANIMATION (Butterflies & Blossoms)
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

class Particle {
  constructor(type) {
    this.type = type; 
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    // Butterflies fly UP from bottom, petals fall DOWN from top
    this.y = this.type === 'butterfly' ? canvas.height + 20 : -20;
    this.size = Math.random() * 4 + 2;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = this.type === 'butterfly' ? -(Math.random() * 1.2 + 0.5) : (Math.random() * 1.2 + 0.8);
    this.angle = Math.random() * Math.PI * 2;
    this.spin = Math.random() * 0.04;
  }

  update() {
    this.x += this.speedX + Math.sin(this.angle) * 0.5;
    this.y += this.speedY;
    this.angle += this.spin;

    // Reset particle when it leaves the screen
    if (this.y < -30 || this.y > canvas.height + 30) this.reset();
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.beginPath();
    
    // Aesthetic colors: Pink for butterflies, Soft Blush for petals
    ctx.fillStyle = this.type === 'butterfly' ? "rgba(255, 105, 180, 0.6)" : "rgba(255, 192, 203, 0.4)";
    
    if (this.type === 'butterfly') {
        // Simple elegant butterfly shape
        ctx.ellipse(0, 0, this.size, this.size/2, 0, 0, Math.PI*2);
    } else {
        // Simple petal/blossom shape
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
    }
    ctx.fill();
    ctx.restore();
  }
}

// Performance: Lower particle count for mobile phones
const isMobile = window.innerWidth < 768;
const butterflyCount = isMobile ? 15 : 25;
const petalCount = isMobile ? 20 : 40;

const particles = [];
for (let i = 0; i < butterflyCount; i++) particles.push(new Particle('butterfly'));
for (let i = 0; i < petalCount; i++) particles.push(new Particle('petal'));

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}
animate();

// 5. SLIDESHOW LOGIC
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;
if(slides.length > 0) {
  setInterval(() => {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
  }, 3500);
}

// 6. VOICE MESSAGE LOGIC
const voiceAudio = document.getElementById("voiceAudio");
const voiceBox = document.getElementById("voiceBox");
if(voiceBox && voiceAudio) {
  voiceBox.onclick = () => {
    voiceAudio.paused ? voiceAudio.play() : voiceAudio.pause();
  };
}