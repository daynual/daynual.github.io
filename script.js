const container = document.querySelector('.button-container');
const yesButton = document.getElementById('yes');
const noButton = document.getElementById('no');
const mainGif = document.getElementById('mainGif');

// Center the buttons initially within the container.
document.addEventListener("DOMContentLoaded", function () {
  const gap = 20; // Desired gap between the two buttons
  
  // Get container dimensions
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;
  
  // Get button dimensions (assumed to be similar for both)
  const yesWidth = yesButton.offsetWidth;
  const noWidth = noButton.offsetWidth;
  const buttonHeight = yesButton.offsetHeight;
  
  // Calculate total width of both buttons plus the gap
  const totalWidth = yesWidth + gap + noWidth;
  
  // Compute the starting X (left) so that the two buttons are centered horizontally
  const startX = (containerWidth - totalWidth) / 2;
  // Compute the Y (top) position so that the buttons are vertically centered
  const startY = (containerHeight - buttonHeight) / 2;
  
  // Set the initial positions
  yesButton.style.left = startX + "px";
  yesButton.style.top = startY + "px";
  noButton.style.left = (startX + yesWidth + gap) + "px";
  noButton.style.top = startY + "px";
});

/**
 * Teleports the "No" button to a random location within the container.
 */
function teleportButton() {
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;
  const buttonWidth = noButton.offsetWidth;
  const buttonHeight = noButton.offsetHeight;
  
  // Generate random positions ensuring the button stays fully inside the container
  const randomLeft = Math.random() * (containerWidth - buttonWidth);
  const randomTop = Math.random() * (containerHeight - buttonHeight);
  
  noButton.style.left = randomLeft + 'px';
  noButton.style.top = randomTop + 'px';
}

/**
 * Makes the "No" button creep away gradually.
 */
function creepButton(event) {
  const containerRect = container.getBoundingClientRect();
  
  // Determine pointer coordinates (supporting both mouse and touch events)
  let pointerX, pointerY;
  if (event.touches && event.touches.length > 0) {
    pointerX = event.touches[0].clientX;
    pointerY = event.touches[0].clientY;
  } else {
    pointerX = event.clientX;
    pointerY = event.clientY;
  }
  
  // Convert pointer coordinates to container-relative coordinates
  const relativeX = pointerX - containerRect.left;
  const relativeY = pointerY - containerRect.top;
  
  // Get the current button position and compute its center
  const buttonLeft = noButton.offsetLeft;
  const buttonTop = noButton.offsetTop;
  const buttonCenterX = buttonLeft + noButton.offsetWidth / 2;
  const buttonCenterY = buttonTop + noButton.offsetHeight / 2;
  
  // Calculate the vector from the pointer to the button center
  let dx = buttonCenterX - relativeX;
  let dy = buttonCenterY - relativeY;
  let distance = Math.sqrt(dx * dx + dy * dy);
  
  // Define a threshold within which the button starts moving
  const threshold = 150; // pixels
  const minSpeed = 5;      // base speed in pixels per event
  const speedFactor = 0.5; // additional speed per pixel within the threshold
  
  if (distance < threshold) {
    // Prevent division by zero if the pointer is exactly at the button's center
    if (distance === 0) {
      dx = Math.random() - 0.5;
      dy = Math.random() - 0.5;
      distance = Math.sqrt(dx * dx + dy * dy);
    }
    
    // Compute the movement speed; the closer the pointer, the faster the button moves
    let moveSpeed = minSpeed + (threshold - distance) * speedFactor;
    const moveX = (dx / distance) * moveSpeed;
    const moveY = (dy / distance) * moveSpeed;
    
    let newLeft = buttonLeft + moveX;
    let newTop = buttonTop + moveY;
    
    // Clamp the new positions to ensure the button stays within the container
    newLeft = Math.max(0, Math.min(newLeft, container.offsetWidth - noButton.offsetWidth));
    newTop = Math.max(0, Math.min(newTop, container.offsetHeight - noButton.offsetHeight));
    
    noButton.style.left = newLeft + 'px';
    noButton.style.top = newTop + 'px';
  }
}

// Attach event listeners for the "creep away" behavior.
container.addEventListener('mousemove', creepButton);
container.addEventListener('touchmove', creepButton);

// Instantly teleport the "No" button if the user hovers directly over it.
noButton.addEventListener('mouseover', teleportButton);

// New functionality: Replace the current GIF and add text below it when Yes is clicked.
yesButton.addEventListener('click', function() {
  // Replace the current GIF by updating its src.
  mainGif.src = "https://codekagehq.github.io/Ask-out-your-Valentine/images/image2.gif";
  
  // Check if the message already exists to prevent duplication.
  if (!document.getElementById("yesMessage")) {
    let messageEl = document.createElement("p");
    messageEl.id = "yesMessage";  // assign a unique id
    messageEl.textContent = "Thank you for saying Yes!";
    messageEl.style.fontSize = "24px";
    messageEl.style.marginTop = "20px";
    
    // Insert the message element immediately after the main GIF.
    mainGif.insertAdjacentElement("afterend", messageEl);
  }
});

