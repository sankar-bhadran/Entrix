$(window).on("popstate", function () {
  location.reload(true);
});

// CUSTOM FILE UPLOAD BUTTON IN FORM
$(document).on("change", ".btn-file :file", function () {
  var input = $(this),
    numFiles = input.get(0).files ? input.get(0).files.length : 1,
    label = input.val().replace(/\\/g, "/").replace(/.*\//, "");
  input.trigger("fileselect", [numFiles, label]);
});

$(document).ready(function () {
  $(".btn-file :file").on("fileselect", function (event, numFiles, label) {
    console.log("teste");
    var input_label = $(this).closest(".input-group").find(".file-input-label"),
      log = numFiles > 1 ? numFiles + " files selected" : label;

    if (input_label.length) {
      input_label.text(log);
    } else {
      if (log) alert(log);
    }
  });
});

// LOAD MORE POST
var batch = 6;
$(".load-more-post-item").each(function (index) {
  if (index >= batch) {
    $(this).fadeOut("slow").addClass("hide");
  }
});
$(".load-more-btn").on("click", function (e) {
  e.preventDefault();
  $(".load-more-post-item:hidden").slice(0, batch).fadeIn("slow");
  if ($(".load-more-post-item:hidden").length == 0) {
    $(this).fadeOut("slow");
  }
});
if ($(".load-more-post-item:hidden").length == 0) {
  $(".load-more-btn").fadeOut("slow");
} else {
  $(".load-more-btn").fadeIn("slow");
}

// POST CAROUSEL SLICK
$(document).ready(function () {
  $(".postCarousel").slick({
    slidesToShow: 2,
    dots: false,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 700,
    infinite: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
  });
});

$(document).ready(function () {
  $(".myvideoslider").slick({
    dots: true, // Enables pagination dots
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // Adjust as needed
    arrows: true,
  });
});

// CLIENT CAROUSEL SLICK
$(document).ready(function () {
  $(".clientCarousel").slick({
    slidesToShow: 7,
    dots: false,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 700,
    infinite: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          centerPadding: "40px",
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 991,
        settings: {
          centerPadding: "40px",
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 575,
        settings: {
          centerPadding: "40px",
          slidesToShow: 2,
        },
      },
    ],
  });
});

// TESTIMONIAL CAROUSEL SLICK
$(document).ready(function () {
  $(".testmonialCarousel").slick({
    slidesToShow: 1,
    dots: false,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 700,
    infinite: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
  });
});

// case-studies-slide
$(document).ready(function () {
  $(".case-studies-slide").slick({
    dots: false,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 700,
    dots: false,
    slidesToShow: 3,
    centerMode: true,
    infinite: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 1530,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });
});

// TYPING TEXT
document.body.classList.add("js");
const hidden = "hidden";

Array.from(document.body.querySelectorAll(".typing-text")).forEach(
  async (typingText) => {
    let duration = 1000;
    let hold = 5000; // code
    // to not let delay affect both start and end
    // I will be handling with js (instead of css)
    let delay = 200; // empty

    let length = 1;

    let cnt = 0;

    const codes = [];
    const codesEl = [];
    const isCursor = typingText.classList.contains("cursor");
    Array.from(typingText.children).forEach((item) => {
      if (isCursor) {
        item.append(" "); // space for cursor
      }

      codesEl.push(item);
      codes.push(item.textContent);

      item.classList.add(hidden);
    });
    Array.from(typingText.childNodes).forEach((item) => item.remove());
    // add back children
    Array.from(codesEl).forEach((item) => typingText.appendChild(item));

    function updateText() {
      const indx = cnt % codes.length;
      const last = (cnt - 1 + codes.length) % codes.length;
      codesEl[indx].classList.remove(hidden);
      codesEl[last].classList.add(hidden);

      const text = codes[indx];

      duration = (text.length + 1) * 150; // 150ms to type a letter
      hold = 3000 + text.length * 100; // longer text is taking more time
      length = text.length;

      cnt++;
    }

    function setProperty() {
      typingText.style.setProperty("--duration", `${duration}ms`);
      typingText.style.setProperty("--length", length);
    }

    typingText.style.width = "0em";
    if (isCursor) {
      typingText.style.setProperty("--cursor-animation-name", "none");
    }
    await sleep(10); // I guess I have to wait for width to be set to 0 (?)

    for (;;) {
      updateText();
      setProperty();

      typingText.style.width = "100%";
      await sleep(duration);
      if (isCursor) {
        typingText.style.removeProperty("--cursor-animation-name");
      }
      await sleep(hold);

      // erase faster
      duration /= 2;
      setProperty();

      typingText.style.width = "0%";
      if (isCursor) {
        typingText.style.setProperty("--cursor-animation-name", "none");
      }
      await sleep(duration + delay);
    }
  }
);

async function sleep(time) {
  return new Promise((res) => setTimeout(res, time));
}

const $carousel = $("#carouselExampleIndicators");
const $videos = $carousel.find("video");

function pauseAllVideos() {
  $videos.each(function () {
    this.pause();
  });
}

function playCurrentVideo() {
  const $activeItem = $carousel.find(".carousel-item.active");
  const $video = $activeItem.find("video");
  if ($video.length) {
    $video[0].play();
    $video.on("ended", function () {
      const $nextButton = $carousel.find(".carousel-control-next");
      $nextButton.click();
    });
  }
}

$carousel.on("slide.bs.carousel", function () {
  pauseAllVideos();
});

$carousel.on("slid.bs.carousel", function () {
  playCurrentVideo();
});

// Ensure the first video plays automatically if it's the first slide
playCurrentVideo();

$(document).ready(function () {
  function handleInteractions() {
    // Screen size for hover (1025px to 3680px)
    if (window.innerWidth >= 1025 && window.innerWidth <= 3680) {
      // Add hover functionality
      $(".custom-link, .custom-megamenu").hover(
        function () {
          $(".navbar").addClass("open-m-menu");
        },
        function () {
          $(".navbar").removeClass("open-m-menu");
        }
      );
      // Remove click functionality if it exists
      $(".custom-link-arrow").off("click");
    }
    // Screen size for click (200px to 1024px)
    else if (window.innerWidth >= 200 && window.innerWidth <= 1366) {
      // Add click functionality
      $(".custom-link-arrow").on("click", function () {
        $(".navbar").toggleClass("open-m-menu");
      });
      // Remove hover functionality if it exists
      $(".custom-link").off("mouseenter mouseleave");
    } else {
      // Remove both hover and click if not in the defined ranges
      $(".custom-link").off("mouseenter mouseleave");
      $(".custom-link-arrow").off("click");
    }
  }

  // Run the function on page load and when the window is resized
  handleInteractions();
  $(window).resize(function () {
    handleInteractions();
  });
});

// $(document).ready(function() {
//     $(window).on('scroll', function() {
//         var scrollTop = $(window).scrollTop();
//         var windowHeight = $(window).height();
//         var windowWidth = $(window).width();
//         var elementOffset = $('.translateX-parent').offset().top;
//         var outlineTextWidth = $('.translateX-right .outline-text').outerWidth();
//         var maxTranslateX = windowWidth - outlineTextWidth - 250;

//         if (scrollTop + windowHeight > elementOffset) {
//             var scrollDistance = scrollTop + windowHeight - elementOffset;

//             var translateX = Math.min(scrollDistance * 4, maxTranslateX);

//             $('.translateX-right').css({
//                 'transform': `translate3d(${translateX}px, 0px, 0px)`
//             });

//             console.log('Outline Text Width: ' + outlineTextWidth + 'px');
//         }
//     });
// });

$(window).on("scroll", function () {
  var scrollAmount = $(window).scrollTop();
  var finalscrollamount = scrollAmount / 2;
  $(".cus-rota-img").css("transform", "rotate(" + finalscrollamount + "deg)");
});

// -----Country Code Selection
// $("#mobile_code").intlTelInput({
// 	initialCountry: "in",
// 	separateDialCode: true,
// 	// utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.4/js/utils.js"
// });

// var $cursor1 = $('.cursor1');
// var $cursorinner = $('.cursor2');
// var $links = $('a');

// $(document).on('mousemove', function(e){
//   var x = e.clientX;
//   var y = e.clientY;
//   $cursor1.css('transform', `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`);
//   $cursorinner.css({
//     'left': x + 'px',
//     'top': y + 'px'
//   });
// });

// $(document).on('mousedown', function(){
//   $cursor1.addClass('click');
//   $cursorinner.addClass('cursorinnerhover');
// });

// $(document).on('mouseup', function(){
//   $cursor1.removeClass('click');
//   $cursorinner.removeClass('cursorinnerhover');
// });

// $links.on('mouseover', function(){
//   $cursor1.addClass('cus-hover');
// });

// $links.on('mouseleave', function(){
//   $cursor1.removeClass('cus-hover');
// });

$(document).ready(function () {
  const carousel = $("#carouselExampleIndicators");
  let currentIndex = 0;
  let video = $("video")[0];
  let interval;

  function pauseAllVideos() {
    carousel.find("video").each(function () {
      this.pause();
    });
  }

  function loadVideo(index) {
    let $carouselItem = $(".carousel-item").eq(index);
    let videoElement = $carouselItem.find("video")[0];
    if (videoElement) {
      video = videoElement;
      currentIndex = index;

      $("progress").hide();
      $(`#progress-bar-${index}`).show().val(0);

      video.currentTime = 0;
      video.play();

      clearInterval(interval);

      interval = setInterval(function () {
        if (video.duration) {
          let progressValue = (video.currentTime / video.duration) * 100;
          $(`#progress-bar-${index}`).val(progressValue);
          if (progressValue >= 100) {
            currentIndex = (currentIndex + 1) % $(".carousel-item").length;
            $("#carouselExampleIndicators").carousel("next");
            loadVideo(currentIndex);
          }
        }
      }, 100);
    } else {
      // If no video found, ensure the interval is cleared
      clearInterval(interval);
    }
  }

  $(".carousel-indicators span").on("click", function () {
    pauseAllVideos();
    currentIndex = $(this).index();
    carousel.carousel(currentIndex);
    loadVideo(currentIndex);
  });

  carousel.on("slid.bs.carousel", function (e) {
    let nextIndex = $(e.relatedTarget).index();
    pauseAllVideos();
    loadVideo(nextIndex);
  });

  carousel.carousel({ interval: false });
  carousel.carousel("pause");
  loadVideo(0);
});

// MVP TABS
// Define tab content data including the image path for each tab
const tabData = {
  consulting: {
    heading: "MVP Consulting & Market Analysis",
    text: "Get expert assistance with conceptualizing your idea, defining the essential features, and conducting thorough market analysis to ensure your MVP aligns with market needs.",
    links: [
      "Conceptualization and Idea Validation",
      "Technical Feasibility Analysis",
      "Feature Prioritization and Roadmap Planning",
    ],
    image: "web-assets/images/mvp/tabsContentPic.png", // Image for this tab
  },
  prototyping: {
    heading: "MVP Prototyping Services",
    text: "Create rapid prototypes of your product to visualize its functionality and ensure user alignment.",
    links: ["Wireframes and Mockups", "Clickable Prototypes", "User Testing"],
    image: "web-assets/images/mvp/tabsContentPic.png", // Image for this tab
  },
  "web-development": {
    heading: "Web Development Services",
    text: "Build robust web platforms tailored to your MVP requirements with cutting-edge technology.",
    links: [
      "Custom Web Development",
      "Responsive Design",
      "Integration Services",
    ],
    image: "web-assets/images/mvp/tabsContentPic.png", // Image for this tab
  },
  "app-development": {
    heading: "App Development Services",
    text: "Develop scalable and user-friendly applications for your MVP product.",
    links: [
      "iOS & Android Development",
      "Cross-Platform Support",
      "App Deployment",
    ],
    image: "web-assets/images/mvp//tabsContentPic.png", // Image for this tab
  },
  fullscale: {
    heading: "Fullscale Development Solutions",
    text: "Launch your product with a fully-functional solution that meets market demands.",
    links: [
      "End-to-End Development",
      "Scalable Architecture",
      "Ongoing Support",
    ],
    image: "web-assets/images/mvp/tabsContentPic.png", // Image for this tab
  },
};

// Function to update the content based on the selected tab
function updateContent(tabKey) {
  const content = tabData[tabKey];
  document.getElementById("content-heading").textContent = content.heading;
  document.getElementById("content-text").textContent = content.text;

  // Update links dynamically
  const linksContainer = document.getElementById("content-links");
  linksContainer.innerHTML = content.links
    .map((link) => `<span>${link}</span>`)
    .join("");

  // Update the image based on the selected tab
  document.getElementById("content-image").src = content.image;
}

// Add event listeners to tabs
document.querySelectorAll(".tabs").forEach((tab) => {
  tab.addEventListener("click", () => {
    // Remove active state from all tabs
    document.querySelectorAll(".tabs").forEach((t) => {
      t.classList.remove("active-tab");
      const img = t.querySelector("img");
      img.src = "web-assets/images/mvp/tabinactivearrow.svg"; // Set to inactive icon
    });

    // Add active state to clicked tab
    tab.classList.add("active-tab");
    const img = tab.querySelector("img");
    img.src = "web-assets/images/mvp/tabactivearrow.svg"; // Set to active icon

    // Get the corresponding tab data and update content
    const tabKey = tab.getAttribute("data-tab");
    updateContent(tabKey);
  });
});

// Initially set the first tab to be active and display its content
document.querySelector(".tabs").classList.add("active-tab");
document.querySelector(".tabs img").src =
  "web-assets/images/mvp/tabactivearrow.svg";
updateContent("consulting");
