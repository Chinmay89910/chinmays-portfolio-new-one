$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

    // <!-- contact form submit to pchinmay098@gmail.com -->
    $("#contact-form").submit(function (event) {
        event.preventDefault();

        const form = this;
        const submitBtn = $(form).find('button[type="submit"]');
        const originalBtnText = submitBtn.html();
        submitBtn.html('Sending... <i class="fa fa-spinner fa-spin"></i>').prop('disabled', true);

        const formData = {
            name: form.name ? form.name.value : '',
            "email_or_phone": form.email ? form.email.value : '',
            company: form.company ? form.company.value : '',
            position: form.position ? form.position.value : '',
            message: form.message ? form.message.value : '',
            _subject: "New Portfolio Message from " + (form.name ? form.name.value : 'Visitor'),
            _captcha: "false",
            _template: "table"
        };

        fetch("https://formsubmit.co/ajax/pchinmay098@gmail.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            submitBtn.html(originalBtnText).prop('disabled', false);
            if (data.success === "true" || data.success === true) {
                alert("Thank you! Your message has been sent successfully to pchinmay098@gmail.com.");
                form.reset();
            } else if (data.message && data.message.includes("Activation")) {
                alert("Form submitted! Note: A one-time activation link was sent to pchinmay098@gmail.com. Please confirm the link in your email once to start receiving all messages directly.");
                form.reset();
            } else {
                alert(data.message || "Message sent successfully!");
                form.reset();
            }
        })
        .catch(error => {
            console.error("AJAX form submission error:", error);
            submitBtn.html(originalBtnText).prop('disabled', false);
            // Native fallback to ensure delivery
            form.submit();
        });
    });
    // <!-- contact form submit to pchinmay098@gmail.com -->

});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Chinmay Patil";
            $("#favicon").attr("href", "assets/images/favicon.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "assets/images/favhand.png");
        }
    });


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["UI/UX design", "product design", "user research", "mobile UX", "frontend development", "data analytics"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
    let response
    const cacheBuster = "?t=" + Date.now();
    type === "skills" ?
        response = await fetch("skills.json" + cacheBuster, { cache: "no-store" })
        :
        response = await fetch("./projects/projects.json" + cacheBuster, { cache: "no-store" })
    const data = await response.json();
    return data;
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src=${skill.icon} alt="skill" />
                <span>${skill.name}</span>
              </div>
            </div>`
    });
    skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = "";
    projects.slice(0, 10).filter(project => project.category != "android").forEach(project => {
        projectHTML += `
        <div class="box tilt">
      <img draggable="false" src="./assets/images/projects/${project.image}.png?v=2" alt="project" />
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">
            <a href="https://github.com/Chinmay89910" class="btn" target="_blank" rel="noopener noreferrer"><i class="fas fa-eye"></i> View</a>
            <a href="https://github.com/Chinmay89910" class="btn" target="_blank" rel="noopener noreferrer">Code <i class="fas fa-code"></i></a>
          </div>
        </div>
      </div>
    </div>`
    });
    projectsContainer.innerHTML = projectHTML;

    // <!-- tilt js effect starts -->
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
    });
    // <!-- tilt js effect ends -->

    /* ===== SCROLL REVEAL ANIMATION ===== */
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    /* SCROLL PROJECTS */
    srtop.reveal('.work .box', { interval: 200 });

}

fetchData().then(data => {
    showSkills(data);
});

fetchData("projects").then(data => {
    showProjects(data);
});

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});
// <!-- tilt js effect ends -->


// pre loader start
// function loader() {
//     document.querySelector('.loader-container').classList.add('fade-out');
// }
// function fadeOut() {
//     setInterval(loader, 500);
// }
// window.onload = fadeOut;
// pre loader end

// disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}

// Start of Floating Quick Contact Widget (Direct to pchinmay098@gmail.com)
(function () {
    var qc = document.createElement("script");
    qc.async = true;
    qc.src = "./assets/js/quick-contact.js?v=20261015";
    document.head.appendChild(qc);
})();
// End of Floating Quick Contact Widget


/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* SCROLL HOME */
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .twitter', { interval: 1000 });
srtop.reveal('.home .telegram', { interval: 600 });
srtop.reveal('.home .instagram', { interval: 600 });
srtop.reveal('.home .email', { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });


/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL PROJECTS */
srtop.reveal('.work .box', { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

/* SCROLL CONTACT */
srtop.reveal('.contact .connect-header', { delay: 200 });
srtop.reveal('.contact .connect-form-card', { delay: 350 });
srtop.reveal('.contact .connect-art', { delay: 450 });

/* ===== HOBBIES IMAGE SLIDESHOW (Alternates every 10 seconds) ===== */
let currentHobbySlide = 0;
let hobbySlideInterval;

function showHobbySlide(index) {
  const slides = document.querySelectorAll('.hobbies-slider .hobby-slide');
  const dots = document.querySelectorAll('.hobbies-slider .dot');
  if (!slides.length) return;

  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
  currentHobbySlide = index;
}

function nextHobbySlide() {
  const slides = document.querySelectorAll('.hobbies-slider .hobby-slide');
  if (!slides.length) return;
  const next = (currentHobbySlide + 1) % slides.length;
  showHobbySlide(next);
}

function setHobbySlide(index) {
  showHobbySlide(index);
  clearInterval(hobbySlideInterval);
  hobbySlideInterval = setInterval(nextHobbySlide, 10000);
}

hobbySlideInterval = setInterval(nextHobbySlide, 10000);

// Universal click interceptor to guarantee all View and Code buttons open Chinmay's GitHub profile
document.addEventListener('click', function (e) {
    const targetLink = e.target.closest('.btns a, a.btn');
    if (targetLink) {
        const text = (targetLink.textContent || '').trim().toLowerCase();
        if (text.includes('view') || text.includes('code') || targetLink.querySelector('.fa-eye, .fa-code')) {
            e.preventDefault();
            e.stopPropagation();
            window.open('https://github.com/Chinmay89910', '_blank');
        }
    }
}, true);