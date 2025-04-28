$(document).ready(function() {

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1) {
            $(".header-area").addClass("sticky");
        } else {
            $(".header-area").removeClass("sticky");
        }
        updateActiveSection();
    });
  
    $(".header ul li a").click(function(e) {
        e.preventDefault(); 
    
        var target = $(this).attr("href");
    
        if ($(target).hasClass("active-section")) {
            return; 
        }
    
        if (target === "#home") {
            $("html, body").animate({
                scrollTop: 0 
            }, 500);
        } else {
            var offset = $(target).offset().top - 40; 
    
            $("html, body").animate({
                scrollTop: offset
            }, 500);
        }
    
        $(".header ul li a").removeClass("active");
        $(this).addClass("active");
    });
  
    ScrollReveal({
        distance: "100px",
        duration: 2000,
        delay: 200
    });
    
    ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", {
        origin: "left"
    });
    ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", {
        origin: "right"
    });
    ScrollReveal().reveal(".project-title, .contact-title", {
        origin: "top"
    });
    ScrollReveal().reveal(".projects, .contact", {
        origin: "bottom"
    });
  
    // Contact form to Google Sheets
    const scriptURL = 'https://script.google.com/macros/s/AKfycbybx_lwkexzadWlo3z6yUiIsIKXQcuUAAKJibwTQAVXbrg-bOT5X6ftW3atxxXEE77h/exec'; // Replace with your actual script URL
    const form = document.forms['submitToGoogleSheet'];
    const msg = document.getElementById("msg");
  
    // Handle form submission
    form.addEventListener('submit', e => {
        e.preventDefault();
        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(response => {
                msg.innerHTML = "Thank you for your message! I will get back to you soon.";
                setTimeout(function () {
                    msg.innerHTML = ""; // Clear message after 5 seconds
                }, 5000);
                form.reset(); // Reset the form fields
            })
            .catch(error => {
                msg.innerHTML = "Oops! Something went wrong. Please try again later.";
                console.error('Error!', error.message);
            });
    });
    
    // Function to update the active section in the header based on scroll position
    function updateActiveSection() {
        var scrollPosition = $(window).scrollTop();
    
        if (scrollPosition === 0) {
            $(".header ul li a").removeClass("active");
            $(".header ul li a[href='#home']").addClass("active");
            return;
        }
    
        $("section").each(function() {
            var target = $(this).attr("id");
            var offset = $(this).offset().top;
            var height = $(this).outerHeight();
    
            if (scrollPosition >= offset - 40 && scrollPosition < offset + height - 40) {
                $(".header ul li a").removeClass("active");
                $(".header ul li a[href='#" + target + "']").addClass("active");
            }
        });
    }

});
