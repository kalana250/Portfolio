
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
});

document.addEventListener("DOMContentLoaded", function() {
    function isMobile() {
        return /Mobi|Android/i.test(navigator.userAgent);
    }

    if (isMobile()) {
        document.getElementById('mobile-message').classList.remove('hidden');
    }
});




const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
    const formData = new FormData(form);
    e.preventDefault();

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    result.innerHTML = "Please wait..."

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = json.message;
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
});
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;
    const subject = document.getElementById('sub').value;
    const message = document.getElementById('message').value;

    const mailtoLink = `mailto:heshankalana168@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        'Name: ' + name + '\n' +
        'Email: ' + email + '\n' +
        'Mobile: ' + mobile + '\n' +
        'Message: ' + message
    )}`;

    window.location.href = mailtoLink;
});
const texts = ["Software Engineer", "Full Stack Developer"];
let index = 0;
let charIndex = 0;
let isAdding = true;
let currentText = texts[index];

function typeWriter() {
    const element = document.querySelector(".typewriter");
    if (isAdding) {
        if (charIndex < currentText.length) {
            element.innerHTML += currentText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100);
        } else {
            isAdding = false;
            setTimeout(typeWriter, 1000);
        }
    } else {
        if (charIndex > 0) {
            element.innerHTML = currentText.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(typeWriter, 100);
        } else {
            isAdding = true;
            index = (index + 1) % texts.length;
            currentText = texts[index];
            setTimeout(typeWriter, 1000);
        }
    }
}

typeWriter();

