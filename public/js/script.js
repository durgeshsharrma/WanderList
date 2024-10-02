// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()




  const cards = document.querySelectorAll('.card');

    const observerOptions = {
        root: null, // Use the viewport as the container
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the card is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Stop observing once it's shown
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        observer.observe(card);
    });



    // this is for the flash alert

     // Function to show flash messages and then hide them
     function showFlashMessages() {
      const successMsg = document.getElementById('successMessage');
      const errorMsg = document.getElementById('errorMessage');

      if (successMsg) {
          successMsg.style.display = 'block';
          successMsg.style.opacity = '1';
          setTimeout(() => {
              successMsg.style.opacity = '0';
              setTimeout(() => {
                  successMsg.style.display = 'none';
              }, 500); // Match this to the CSS transition duration
          }, 3000); // Display for 3 seconds
      }

      if (errorMsg) {
          errorMsg.style.display = 'block';
          errorMsg.style.opacity = '1';
          setTimeout(() => {
              errorMsg.style.opacity = '0';
              setTimeout(() => {
                  errorMsg.style.display = 'none';
              }, 500); // Match this to the CSS transition duration
          }, 5000); // Display for 3 seconds
      }
  }

  // Call the function on page load
  document.addEventListener('DOMContentLoaded', showFlashMessages);