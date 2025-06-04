// DOM Elements
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")
const navbar = document.getElementById("navbar")
const contactForm = document.getElementById("contactForm")

// Mobile Navigation Toggle
hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  hamburger.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    hamburger.classList.remove("active")
  })
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Add animation classes and observe elements
document.addEventListener("DOMContentLoaded", () => {
  // Add fade-in animation to sections
  const sections = document.querySelectorAll("section")
  sections.forEach((section, index) => {
    if (index > 0) {
      // Skip hero section
      section.classList.add("fade-in")
      observer.observe(section)
    }
  })

  // Add slide-in animations to specific elements
  const leftElements = document.querySelectorAll(".about-text, .contact-info")
  leftElements.forEach((el) => {
    el.classList.add("slide-in-left")
    observer.observe(el)
  })

  const rightElements = document.querySelectorAll(".about-education, .contact-form")
  rightElements.forEach((el) => {
    el.classList.add("slide-in-right")
    observer.observe(el)
  })

  // Animate skill bars when they come into view
  const skillBars = document.querySelectorAll(".skill-progress")
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progressBar = entry.target
        const width = progressBar.getAttribute("data-width")
        setTimeout(() => {
          progressBar.style.width = width + "%"
        }, 200)
      }
    })
  }, observerOptions)

  skillBars.forEach((bar) => {
    skillObserver.observe(bar)
  })
})

// Contact form handling
contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form data
  const formData = new FormData(contactForm)
  const name = formData.get("name")
  const email = formData.get("email")
  const subject = formData.get("subject")
  const message = formData.get("message")

  // Simple validation
  if (!name || !email || !subject || !message) {
    showNotification("Please fill in all fields", "error")
    return
  }

  if (!isValidEmail(email)) {
    showNotification("Please enter a valid email address", "error")
    return
  }

  // Simulate form submission
  showNotification("Message sent successfully! I'll get back to you soon.", "success")
  contactForm.reset()
})

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Notification system
function showNotification(message, type) {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification")
  if (existingNotification) {
    existingNotification.remove()
  }

  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "#10b981" : "#ef4444"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    `

  const notificationContent = notification.querySelector(".notification-content")
  notificationContent.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    `

  const closeButton = notification.querySelector(".notification-close")
  closeButton.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    `

  // Add to document
  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Close button functionality
  closeButton.addEventListener("click", () => {
    notification.style.transform = "translateX(400px)"
    setTimeout(() => {
      notification.remove()
    }, 300)
  })

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = "translateX(400px)"
      setTimeout(() => {
        notification.remove()
      }, 300)
    }
  }, 5000)
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Initialize typing animation when page loads
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle) {
    const originalText = heroTitle.innerHTML
    typeWriter(heroTitle, originalText, 50)
  }
})

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero")
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`
  }
})

// Add loading animation
window.addEventListener("load", () => {
  const loader = document.createElement("div")
  loader.className = "loader"
  loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <p>Loading...</p>
        </div>
    `

  loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `

  const loaderContent = loader.querySelector(".loader-content")
  loaderContent.style.cssText = `
        text-align: center;
        color: #6366f1;
    `

  const spinner = loader.querySelector(".loader-spinner")
  spinner.style.cssText = `
        width: 50px;
        height: 50px;
        border: 4px solid #e5e7eb;
        border-top: 4px solid #6366f1;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 1rem;
    `

  // Add spinner animation
  const style = document.createElement("style")
  style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `
  document.head.appendChild(style)

  document.body.appendChild(loader)

  // Remove loader after a short delay
  setTimeout(() => {
    loader.style.opacity = "0"
    setTimeout(() => {
      loader.remove()
    }, 500)
  }, 1000)
})

// Add scroll progress indicator
const scrollProgress = document.createElement("div")
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 4px;
    background: linear-gradient(90deg, #6366f1, #8b5cf6);
    z-index: 10001;
    transition: width 0.1s ease;
`
document.body.appendChild(scrollProgress)

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset
  const docHeight = document.body.scrollHeight - window.innerHeight
  const scrollPercent = (scrollTop / docHeight) * 100
  scrollProgress.style.width = scrollPercent + "%"
})
