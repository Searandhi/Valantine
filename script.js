// FLOATING BALLOONS & HEARTS
function createFloatingElements() {
  const container = document.querySelector(".floating-bg");
  if (!container) return;

  // Elements to float: balloons, red hearts, purple hearts
  const elements = [
    { emoji: "🎈", class: "balloon" },
    { emoji: "🎈", class: "balloon" },
    { emoji: "🎈", class: "balloon" },
    { emoji: "❤️", class: "heart-red" },
    { emoji: "❤️", class: "heart-red" },
    { emoji: "❤️", class: "heart-red" },
    { emoji: "❤️", class: "heart-red" },
    { emoji: "💜", class: "heart-purple" },
    { emoji: "💜", class: "heart-purple" },
    { emoji: "💜", class: "heart-purple" },
    { emoji: "💜", class: "heart-purple" },
    { emoji: "❤", class: "heart-red" },
    { emoji: "❤", class: "heart-red" },
    { emoji: "💕", class: "heart-red" },
    { emoji: "💕", class: "heart-red" },
    { emoji: "💗", class: "heart-purple" },
    { emoji: "💗", class: "heart-purple" },
    { emoji: "🎈", class: "balloon" },
    { emoji: "🎈", class: "balloon" },
    { emoji: "🎈", class: "balloon" }
  ];

  // Create 20 floating elements
  for (let i = 0; i < 20; i++) {
    const span = document.createElement("span");
    const elem = elements[i % elements.length];
    span.textContent = elem.emoji;
    span.className = elem.class;
    container.appendChild(span);
  }
}

// Initialize floating elements when page loads
createFloatingElements();

// NO button escape
const noBtn = document.getElementById("noBtn");
if (noBtn) {
  noBtn.addEventListener("mouseover", () => {
    noBtn.style.position = "absolute";
    noBtn.style.left = Math.random() * 80 + "%";
    noBtn.style.top = Math.random() * 80 + "%";
  });
}

// YES button
const yesBtn = document.getElementById("yesBtn");
if (yesBtn) {
  yesBtn.onclick = () => {
    // Add a quick farewell animation before leaving
    const card = document.querySelector(".proposal-card");
    if (card) {
      card.style.transition = "all 0.8s ease-in";
      card.style.opacity = "0";
      card.style.transform = "scale(1.5) blur(20px)";
    }

    setTimeout(() => {
      window.location.href = "love.html";
    }, 600);
  };
}

// CONTINUE button scroll logic
const continueBtn = document.getElementById("continueBtn");
if (continueBtn) {
  continueBtn.addEventListener("click", () => {
    const nextSection = document.getElementById("loveStartsHere");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  });
}

// IMAGE CLICK — VERY VISIBLE MOVE
document.querySelectorAll(".story img").forEach(img => {
  img.addEventListener("click", () => {
    img.classList.add("active");

    setTimeout(() => {
      img.classList.remove("active");
    }, 900);
  });
});

// LETTER OPEN
function openLetter() {
  document.querySelector(".letter-front").style.display = "none";
  document.querySelector(".letter-inside").style.display = "block";
}

// HEARTBEAT SYNC - SCROLL DETECTION
const heartIcon = document.getElementById("heartIcon");
const introHeartIcon = document.getElementById("introHeartIcon");
const unlockHeart = document.getElementById("unlockHeart");
const timerDisplay = document.getElementById("timerDisplay");

// FOREVER CLOCK LOGIC
function startForeverTimer() {
  const startDate = new Date();

  setInterval(() => {
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    if (timerDisplay) {
      timerDisplay.textContent = `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
  }, 1000);
}
startForeverTimer();

window.addEventListener("scroll", () => {
  const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  const scrollTop = window.scrollY;

  // LOCK FADING LOGIC
  if (unlockHeart) {
    const fadePoint = window.innerHeight * 0.5;
    const opacity = Math.max(0, 1 - (scrollTop / fadePoint));
    unlockHeart.style.opacity = opacity;
    if (opacity <= 0) {
      unlockHeart.style.pointerEvents = "none";
      unlockHeart.style.visibility = "hidden";
    } else {
      unlockHeart.style.pointerEvents = "all";
      unlockHeart.style.visibility = "visible";
    }
  }

  if (heartIcon) {
    heartIcon.classList.remove("fast", "faster", "fastest");
    if (scrollPercentage > 75) heartIcon.classList.add("fastest");
    else if (scrollPercentage > 50) heartIcon.classList.add("faster");
    else if (scrollPercentage > 25) heartIcon.classList.add("fast");
  }

  if (introHeartIcon) {
    // Speed up intro heart as we scroll away from it initially
    const speed = Math.max(0.25, 1.5 - (scrollPercentage / 50));
    introHeartIcon.style.animationDuration = `${speed}s`;
  }
});

// YOU CHANGED EVERYTHING - OBSERVER
const changeEverything = document.getElementById("youChangedEverything");
if (changeEverything) {
  const changeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        changeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  changeObserver.observe(changeEverything);
}

// (Removed memory unlock observer as blur/whispers are gone)

// PROMISE CANDLE - SCROLL INTO VIEW TEXT REVEAL
const candleText = document.getElementById("candleText");

if (candleText) {
  const candleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        candleObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  candleObserver.observe(candleText);
}

// FATE SCROLL - CINEMATIC TEXT REVEAL
const fateScroll = document.querySelector(".fate-scroll");

if (fateScroll) {
  const fateObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animation already triggered by CSS keyframes on scroll into view
        fateObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  fateObserver.observe(fateScroll);
}

// SECRET MESSAGE - CLICK TO REVEAL
const lockIcon = document.getElementById("lockIcon");
const secretContent = document.getElementById("secretContent");
const secretContainer = document.querySelector(".secret-container");

if (lockIcon && secretContainer) {
  secretContainer.addEventListener("click", () => {
    secretContent.classList.add("revealed");
    lockIcon.textContent = "🔓";
    lockIcon.style.pointerEvents = "none";
  });

  secretContainer.style.cursor = "pointer";
}

// CHOICE MOMENT - EMOTIONAL DECISION
const walkAwayBtn = document.getElementById("walkAwayBtn");
const stayForeverBtn = document.getElementById("stayForeverBtn");
const celebration = document.getElementById("celebration");
const choiceMessage = document.getElementById("choiceMessage");
const choiceMoment = document.querySelector(".choice-moment");

if (stayForeverBtn && walkAwayBtn) {
  // STAY FOREVER - CELEBRATION
  stayForeverBtn.addEventListener("click", () => {
    // Disable both buttons
    walkAwayBtn.disabled = true;
    stayForeverBtn.disabled = true;

    // Hide buttons
    document.querySelector(".choice-buttons").style.opacity = "0";
    document.querySelector(".choice-buttons").style.pointerEvents = "none";

    // Create falling hearts
    const hearts = ["❤️", "💖", "💕", "💗", "💝"];
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const heart = document.createElement("div");
        heart.className = "celebration-heart";
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + "%";
        heart.style.top = "-30px";

        const randomX = (Math.random() - 0.5) * 300;
        const randomY = window.innerHeight + 100;
        heart.style.setProperty("--tx", randomX + "px");
        heart.style.setProperty("--ty", randomY + "px");

        celebration.appendChild(heart);

        setTimeout(() => heart.remove(), 3000);
      }, i * 30);
    }

    // Show message
    setTimeout(() => {
      choiceMessage.classList.add("revealed");
    }, 500);
  });

  // WALK AWAY - FADE OUT
  walkAwayBtn.addEventListener("click", () => {
    choiceMoment.style.opacity = "0";
    choiceMoment.style.pointerEvents = "none";

    setTimeout(() => {
      document.body.innerHTML = "<div style='position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);display:flex;justify-content:center;align-items:center;font-size:2rem;color:white;font-weight:bold;z-index:9999;'>💔 It was nice while it lasted...</div>";
    }, 800);
  });
}

// LOVE MAP - MILESTONE HIGHLIGHTING
const milestones = document.querySelectorAll(".milestone");

if (milestones.length > 0) {
  const milestoneObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      } else {
        entry.target.classList.remove("active");
      }
    });
  }, { threshold: 0.5 });

  milestones.forEach(milestone => {
    milestoneObserver.observe(milestone);
  });
}

// IF I NEVER MET YOU - SCROLL FILL EFFECT
const ifNeverMet = document.querySelector(".if-never-met");
const meetingMainText = document.querySelector(".if-never-met .main-text");
const meetingEndText = document.querySelector(".if-never-met .end-text");

if (ifNeverMet) {
  const fillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Trigger reveal sequence
        setTimeout(() => {
          meetingMainText.classList.add("reveal");
        }, 100);

        setTimeout(() => {
          ifNeverMet.classList.add("fill-active");
        }, 800);

        setTimeout(() => {
          meetingEndText.classList.add("reveal");
        }, 1500);

        fillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  fillObserver.observe(ifNeverMet);
}

// WHY CHOOSE YOU - PROGRESSIVE REASON REVEAL
const reasonItems = document.querySelectorAll(".reason-item");
const choiceReason = document.getElementById("choiceReason");

if (reasonItems.length > 0) {
  const reasonObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
      }
    });
  }, { threshold: 0.5 });

  reasonItems.forEach(reason => {
    reasonObserver.observe(reason);
  });
}

if (choiceReason) {
  const reasonEndObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        reasonEndObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  reasonEndObserver.observe(choiceReason);
}


// LOVE ECHO - SCROLL REVEAL
const loveEcho = document.getElementById("loveEcho");

if (loveEcho) {
  const echoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        echoObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  echoObserver.observe(loveEcho);
}
