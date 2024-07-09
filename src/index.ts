document.addEventListener('DOMContentLoaded', function () {
  // Default scroll speed in milliseconds
  let defaultSpeed = 100000;

  // Elements
  const playButton = document.querySelector('[ns-autoscroll-element="play"]');
  const pauseButton = document.querySelector('[ns-autoscroll-element="pause"]');
  const speedButtons = document.querySelectorAll('[ns-autoscroll-speedbtn]');
  const customSpeedInput = document.querySelector('[ns-autoscroll-speed]');

  if (customSpeedInput) {
    const customSpeed = customSpeedInput.getAttribute('ns-autoscroll-speed');
    if (customSpeed) defaultSpeed = parseInt(customSpeed);
  }
  let currentSpeed = defaultSpeed;
  // Variables
  let autoScrollInterval: number | null;

  // Function to start auto-scrolling
  const startAutoScroll = (speed: number) => {
    stopAutoScroll();
    autoScrollInterval = setInterval(() => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        window.scrollTo(0, 0); // Scroll back to the top
      } else {
        window.scrollBy(0, 1);
      }
    }, speed / document.body.scrollHeight);
  };

  // Function to stop auto-scrolling
  const stopAutoScroll = () => {
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
      autoScrollInterval = null;
    }
  };

  // Event listeners
  if (playButton && pauseButton) {
    playButton.addEventListener('click', () => startAutoScroll(currentSpeed));
    pauseButton.addEventListener('click', stopAutoScroll);
  }

  speedButtons.forEach((button) => {
    const speedAttribute = button.getAttribute('ns-autoscroll-speedbtn');
    const speedMultiplier = speedAttribute ? parseFloat(speedAttribute) : 1;
    button.addEventListener('click', () => {
      currentSpeed = defaultSpeed / speedMultiplier;
      if (autoScrollInterval) {
        startAutoScroll(currentSpeed);
      }
    });
  });
});
