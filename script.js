document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.querySelector('.overlay');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');



  // Set Active Class on Navigation Links
	
  const links = document.querySelectorAll('.nav-links a');
  links.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add('active'); // Add active class to the current link
    }
  });	



  // Hamburger Navigation Toggle
	
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });

  document.addEventListener('click', (event) => {
    if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) {
      navLinks.classList.remove('show');
    }
  });



  // Image Header Fade on Scroll
	
  const headerImage = document.querySelector('.header-images');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY || window.pageYOffset;

    if (scrollY > 70) {
        headerImage.classList.add('fade-out'); // Add fade-out class
    } else {
        headerImage.classList.remove('fade-out'); // Remove fade-out class
    }
});

	
	
  // Polaroid Pictures Overlay
	
  const images = [
    'polaroid/polaroid_01.jpg', 'polaroid/polaroid_09.jpg', 'polaroid/polaroid_17.jpg',
    'polaroid/polaroid_25.jpg', 'polaroid/polaroid_33.jpg', 'polaroid/polaroid_02.jpg', 
    'polaroid/polaroid_10.jpg', 'polaroid/polaroid_18.jpg', 'polaroid/polaroid_26.jpg', 
    'polaroid/polaroid_34.jpg', 'polaroid/polaroid_03.jpg', 'polaroid/polaroid_11.jpg', 
    'polaroid/polaroid_19.jpg', 'polaroid/polaroid_27.jpg', 'polaroid/polaroid_35.jpg',                  
    'polaroid/polaroid_04.jpg', 'polaroid/polaroid_12.jpg', 'polaroid/polaroid_20.jpg', 
    'polaroid/polaroid_28.jpg', 'polaroid/polaroid_36.jpg', 'polaroid/polaroid_05.jpg', 
    'polaroid/polaroid_13.jpg', 'polaroid/polaroid_21.jpg', 'polaroid/polaroid_29.jpg', 
    'polaroid/polaroid_37.jpg', 'polaroid/polaroid_06.jpg', 'polaroid/polaroid_14.jpg', 
    'polaroid/polaroid_22.jpg', 'polaroid/polaroid_30.jpg', 'polaroid/polaroid_38.jpg',
    'polaroid/polaroid_07.jpg', 'polaroid/polaroid_15.jpg', 'polaroid/polaroid_23.jpg', 
    'polaroid/polaroid_31.jpg', 'polaroid/polaroid_39.jpg', 'polaroid/polaroid_08.jpg', 
    'polaroid/polaroid_16.jpg', 'polaroid/polaroid_24.jpg', 'polaroid/polaroid_32.jpg', 
    'polaroid/polaroid_40.jpg', 'polaroid/polaroid_41.jpg', 'polaroid/polaroid_49.jpg', 
    'polaroid/polaroid_57.jpg', 'polaroid/polaroid_65.jpg', 'polaroid/polaroid_73.jpg',
    'polaroid/polaroid_42.jpg', 'polaroid/polaroid_50.jpg', 'polaroid/polaroid_58.jpg', 
    'polaroid/polaroid_66.jpg', 'polaroid/polaroid_74.jpg', 'polaroid/polaroid_43.jpg', 
    'polaroid/polaroid_51.jpg', 'polaroid/polaroid_59.jpg', 'polaroid/polaroid_67.jpg', 
    'polaroid/polaroid_75.jpg', 'polaroid/polaroid_44.jpg', 'polaroid/polaroid_52.jpg', 
    'polaroid/polaroid_60.jpg', 'polaroid/polaroid_68.jpg', 'polaroid/polaroid_76.jpg',
    'polaroid/polaroid_45.jpg', 'polaroid/polaroid_53.jpg', 'polaroid/polaroid_61.jpg', 
    'polaroid/polaroid_69.jpg', 'polaroid/polaroid_77.jpg', 'polaroid/polaroid_46.jpg', 
    'polaroid/polaroid_54.jpg', 'polaroid/polaroid_62.jpg', 'polaroid/polaroid_70.jpg', 
    'polaroid/polaroid_78.jpg', 'polaroid/polaroid_47.jpg', 'polaroid/polaroid_55.jpg', 
    'polaroid/polaroid_63.jpg', 'polaroid/polaroid_71.jpg', 'polaroid/polaroid_79.jpg',
    'polaroid/polaroid_48.jpg', 'polaroid/polaroid_56.jpg', 'polaroid/polaroid_64.jpg', 
    'polaroid/polaroid_72.jpg', 'polaroid/polaroid_80.jpg',
  ];

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function addImages() {
    images.forEach(image => {
      const img = document.createElement('img');
      img.src = image;

      let overlapDetected = true;
      while (overlapDetected) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const imgWidth = 200;
        const imgHeight = (imgWidth * 3) / 4; // Assuming a 4:3 aspect ratio
        img.style.top = `${getRandomInt(0, viewportHeight - imgHeight)}px`;
        img.style.left = `${getRandomInt(0, viewportWidth - imgWidth)}px`;

        overlapDetected = checkCollision(img, overlay.children);
      }

      img.style.width = '200px';
      img.style.height = 'auto';

      img.style.opacity = 0;
      img.style.transform = `rotate(${getRandomInt(-5, 5)}deg)`; // Apply a random tilt angle

      overlay.appendChild(img);

      setTimeout(() => {
        fadeIn(img);
      }, getRandomInt(700, 5000)); // Delay each image's fade-in randomly between 700ms and 5000ms

      setTimeout(() => {
        fadeOut(img);
      }, getRandomInt(7000, 10000)); // Delay each image's fade-out randomly between 7000ms and 10000ms
    });
  }

  function checkCollision(newImg, existingImgs) {
    const newImgRect = newImg.getBoundingClientRect();

    for (const existingImg of existingImgs) {
      const existingImgRect = existingImg.getBoundingClientRect();

      if (!(newImgRect.right < existingImgRect.left || 
            newImgRect.left > existingImgRect.right || 
            newImgRect.bottom < existingImgRect.top || 
            newImgRect.top > existingImgRect.bottom)) {
        return true; // Collision detected
      }
    }

    return false; // No collision detected
  }

  function fadeIn(img) {
    let opacity = 0;
    const fadeInInterval = setInterval(() => {
      opacity += 0.03;
      img.style.opacity = opacity;
      if (opacity >= 1) {
        clearInterval(fadeInInterval);
      }
    }, 20); // Adjust the interval for smoother or faster fade-in effect
  }

  function fadeOut(img) {
    let opacity = 1;
    const fadeOutInterval = setInterval(() => {
      opacity -= 0.03;
      img.style.opacity = opacity;
      if (opacity <= 0) {
        clearInterval(fadeOutInterval);
        img.remove();
      }
    }, 20); // Adjust the interval for smoother or faster fade-out effect
  }

  overlay.addEventListener('click', () => {
    overlay.remove();
  });
  
  addImages(); // Initialize the image addition
  setTimeout(() => {
    overlay.remove();
  }, 15000); // Adjust the time according to animation duration
});



// Image Gallery and Lightbox

document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');
    const galleryImages = document.querySelectorAll('.gallery-item img');
    let currentIndex = 0;

    function openLightbox(index) {
        const enlargedSrc = galleryImages[index].getAttribute('data-enlarged-src'); // Get the enlarged image source
        lightboxImg.src = enlargedSrc;
        lightbox.style.display = 'flex';
        currentIndex = index;
    }

    galleryImages.forEach((item, index) => {
        item.addEventListener('click', () => {
            openLightbox(index);
        });
    });

    closeLightbox.addEventListener('click', () => {
        closeLightboxFunction();
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg && e.target !== closeLightbox) {
            closeLightboxFunction();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'ArrowLeft') {
                // Navigate to the previous image
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : galleryImages.length - 1;
                openLightbox(currentIndex);
            } else if (e.key === 'ArrowRight') {
                // Navigate to the next image
                currentIndex = (currentIndex < galleryImages.length - 1) ? currentIndex + 1 : 0;
                openLightbox(currentIndex);
            } else if (e.key === 'Escape') {
                // Close the lightbox
                closeLightboxFunction();
            }
        }
    });

    let startX = 0; // Touch events for swipe navigation
    let endX = 0;

    lightbox.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    lightbox.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        if (startX > endX + 50) {
            // Swipe left
            currentIndex = (currentIndex < galleryImages.length - 1) ? currentIndex + 1 : 0;
            openLightbox(currentIndex);
        } else if (startX + 50 < endX) {
            // Swipe right
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : galleryImages.length - 1;
            openLightbox(currentIndex);
        }
    }

    function closeLightboxFunction() { // Function to close the lightbox
        lightbox.style.display = 'none';
        lightboxImg.src = '';
    }
});