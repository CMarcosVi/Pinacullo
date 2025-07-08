// Auto‑scroll testimonials (pause on hover)
const track = document.getElementById('testimonialTrack');
let scrollPos = 0;
let autoScrollInterval;

function startAutoScroll() {
  autoScrollInterval = setInterval(() => {
    scrollPos += 1;
    if (scrollPos >= track.scrollWidth - track.clientWidth) scrollPos = 0;
    track.scrollTo({ left: scrollPos, behavior: 'smooth' });
  }, 25);
}

function stopAutoScroll() {
  clearInterval(autoScrollInterval);
}

track.addEventListener('mouseenter', stopAutoScroll);
track.addEventListener('mouseleave', startAutoScroll);
startAutoScroll();

// Highlight process steps on intersection
const steps = document.querySelectorAll('.step');
const observerOptions = {
  threshold: 0.6,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle('active', entry.isIntersecting);
  });
}, observerOptions);

steps.forEach((step) => observer.observe(step));
