// Function to update count in animation
const updateCount = (el) => {
    const value = parseInt(el.dataset.value);
    const increment = Math.ceil(value / 1000); // Increment per step
    let initialValue = 0;
  
    // Set an interval to increment the number
    const increaseCount = setInterval(() => {
      initialValue += increment;
  
      // If the incremented value exceeds the final value, stop the animation
      if (initialValue >= value) {
        el.textContent = `${value}+`;
        clearInterval(increaseCount);
        return;
      }
  
      // Update the text content with the current value
      el.textContent = `${initialValue}+`;
    }, 1); // Update every 1ms for smoother animation
  };
  
  // Function to trigger counting when the element is in view
  const isElementInView = (el) => {
    const rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
  };
  
  // Wait until DOM is fully loaded
  document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".number");
  
    // Function to handle the scroll event and start counting when in view
    const handleScroll = () => {
      counters.forEach((el) => {
        // Start the counting animation only if the element is in view
        if (isElementInView(el) && !el.classList.contains("counted")) {
          el.classList.add("counted"); // Prevent multiple counting
          updateCount(el);
        }
      });
    };
  
    // Listen to the scroll event
    window.addEventListener("scroll", handleScroll);
  
    // Trigger counting on initial load if elements are already in view
    handleScroll();
  
    // Dark Mode Logic
    const toggleButton = document.getElementById("toggle-dark-mode");
    const modeIcon = document.getElementById("mode-icon");
  
    // Check if Dark Mode was previously enabled
    if (localStorage.getItem("dark-mode") === "enabled") {
      document.body.classList.add("dark-mode");
      modeIcon.textContent = "\u263D"; // Moon icon for dark mode
    }
  
    // Event listener for the Dark Mode toggle button
    toggleButton.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
  
      // Toggle the icon and save the user's preference
      if (document.body.classList.contains("dark-mode")) {
        modeIcon.textContent = "\u263D"; // Moon icon for dark mode
        localStorage.setItem("dark-mode", "enabled");
      } else {
        modeIcon.textContent = "\u2600"; // Sun icon for light mode
        localStorage.setItem("dark-mode", "disabled");
      }
    });
  });
  