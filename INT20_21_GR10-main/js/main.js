/*
 * animation with js
 */
$("#animateDiv").animate(
    {
        height: "50px",
        width: "200px",
    },
    {
        // options parameter
        duration: 5000,
        complete: function () {
            $(this).animate(
                {
                    height: "0px",
                    width: "100px",
                },
                5000,
                function () {
                    $("#animateMsgDiv").text("Animation completed..");
                }
            );
        },
        start: function () {
            $("#animateMsgDiv").append("starting animation..");
        },
    }
);


$(document).ready(function () {
    // accordion
    $(".toggle").click(function (event) {
        let $this = $(this);
        accordionAnimate($this, event);
    });

    // start web worker
    startWorker();

    // Add smooth scrolling to all links
    $("a").click(function (event) {
        let $this = $(this);
        linkSmoothScroll($this, event);
    });
});

function updateBackground(isDark) {
    const bstyle = document.body.style;

    if (isDark) {
        bstyle.backgroundColor = "rgb(189, 189, 189)";
    } else {
        bstyle.backgroundColor = "rgb(255, 255, 255)";
    }
}

function linkSmoothScroll($this, event) {
    const href = $this.attr("href"); // get href from clicked item
    if (href.length > 0) {
        const hrefParts = href.split("#");
        if (hrefParts[1].trim().length > 0) {
            const hash = "#" + hrefParts[1];
            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $("html, body").animate(
                {
                    scrollTop: $(hash).offset().top,
                },
                800,
                function () {
                    // Add hash (#) to URL when done scrolling (default click behavior)
                    window.location.hash = hash;
                }
            );
        }
    }
}

function accordionAnimate($this, e) {
    e.preventDefault();

    if ($this.next().hasClass("show")) {
        $this.next().removeClass("show");
        $this.next().slideUp(350);
    } else {
        $this.parent().parent().find("li .inner").removeClass("show");
        $this.parent().parent().find("li .inner").slideUp(350);
        $this.next().toggleClass("show");
        $this.next().slideToggle(350);
    }
}

/*
* form validation
*/

var isEmailValid = false;
const email = document.getElementById("mail");

function checkFormValidity() {
    if (!isEmailValid) {
        checkEmailValidity(email);
    }
    return isEmailValid;
}

const form = document.getElementsByTagName("form")[0];
if (form) {
    const formToValidate = document.getElementsByClassName("form-validate")[0];

    if (formToValidate.classList.contains("form-validate")) {
        if (email) {
            email.addEventListener("input", function (event) {
                checkEmailValidity(email);
            });
        }
    }
}

function checkEmailValidity(email) {
    const emailError = document.querySelector("#mail + span.error");
    if (emailError) {
        const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const emailMinLength = 8;

        let message;
        if (!email.value.match(emailRegExp)) {
            message = `Entered value needs to be an e-mail address.`;
            showError(emailError, message);
            isEmailValid = false;
            return;
        } else if (email.value.length < emailMinLength) {
            message = `Email should be at least ${emailMinLength} characters; you entered ${email.value.length}.`;
            showError(emailError, message);
            isEmailValid = false;
            return;
        } else {
            showError(emailError);
            isEmailValid = true;
            return;
        }
    }
}

function showError(errorPlace, message) {
    if (message) {
        errorPlace.textContent = message;
    } else {
        errorPlace.textContent = ""; // Reset the content of the message
        errorPlace.className = "error"; // Reset the visual state of the message
    }
}

function startWorker() {
    if(typeof(Worker) !== "undefined") {
        let worker;
        if(typeof(worker) == "undefined") {
            worker = new Worker("./js/web-worker.js");
        }
        worker.onmessage = function(event) {
            updateBackground(event.data)
        };
    } else {
        console.log('Sorry, your browser does not support Web Workers...');
    }
}
