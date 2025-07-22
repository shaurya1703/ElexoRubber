document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-links a:not(.dropdown-toggle)').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Check if it's a dropdown menu item
            if (this.closest('.dropdown-menu')) {
                 // Close parent dropdown after selecting an item
                const parentDropdown = this.closest('.dropdown');
                if (parentDropdown) {
                    parentDropdown.classList.remove('open');
                }
            }

            e.preventDefault();

            // Close mobile menu if open
            const navToggle = document.querySelector('.nav-toggle');
            const navLinks = document.querySelector('.main-nav .nav-links');
            if (navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                navToggle.classList.remove('open');
            }

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                window.scrollTo({
                    top: targetSection.offsetTop - headerHeight,
                    behavior: 'smooth'
                });

                // Update active link class for top-level nav (excluding dropdown toggle itself)
                document.querySelectorAll('.nav-links > li > a:not(.dropdown-toggle)').forEach(link => {
                    link.classList.remove('active');
                });
                // For sub-menu items, mark their parent dropdown toggle as active if needed
                const parentDropdownLink = this.closest('.dropdown');
                if (parentDropdownLink) {
                    parentDropdownLink.querySelector('.dropdown-toggle').classList.add('active');
                } else {
                     this.classList.add('active');
                }
            }
        });
    });

    // Highlight active nav link on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0 // Intersection only
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentSectionId = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === currentSectionId) {
                        link.classList.add('active');
                    }
                     // If a dropdown menu item's section is active, highlight the main dropdown toggle
                    if (link.closest('.dropdown-menu') && link.getAttribute('href').substring(1) === currentSectionId) {
                        link.closest('.dropdown').querySelector('.dropdown-toggle').classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const mainNavLinks = document.querySelector('.main-nav .nav-links');

    navToggle.addEventListener('click', () => {
        mainNavLinks.classList.toggle('open');
        navToggle.classList.toggle('open');
        // Close any open dropdowns when toggling main nav
        document.querySelectorAll('.dropdown.open').forEach(dropdown => {
            dropdown.classList.remove('open');
        });
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
        if (!mainNavLinks.contains(e.target) && !navToggle.contains(e.target) && mainNavLinks.classList.contains('open')) {
            mainNavLinks.classList.remove('open');
            navToggle.classList.remove('open');
             document.querySelectorAll('.dropdown.open').forEach(dropdown => {
                dropdown.classList.remove('open');
            });
        }
    });

    // === Hero Section Background Image Slider ===
    const heroSlides = document.querySelectorAll('.hero-slide');
    let currentHeroSlide = 0;
    const heroSlideInterval = 4000; // 4 seconds

    function showHeroSlide(index) {
        heroSlides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    function nextHeroSlide() {
        currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
        showHeroSlide(currentHeroSlide);
    }

    showHeroSlide(currentHeroSlide);
    setInterval(nextHeroSlide, heroSlideInterval);

    // === Dropdown Menu Functionality ===
    const dropdownToggle = document.getElementById('aboutDropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const dropdownParent = document.querySelector('.dropdown');

    dropdownToggle.addEventListener('click', function(e) {
        e.preventDefault();
        // Prevent default smooth scroll behavior from the general smooth scroll logic
        e.stopPropagation(); // Stop propagation to prevent document click listener from immediately closing

        // Toggle 'open' class on the parent list item (li.dropdown)
        dropdownParent.classList.toggle('open');
    });

    // Close dropdown if clicked outside
    document.addEventListener('click', function(e) {
        if (dropdownParent.classList.contains('open') && !dropdownParent.contains(e.target)) {
            dropdownParent.classList.remove('open');
        }
    });


    // === Capabilities Section Slider ===
    const capabilitySlides = document.querySelectorAll('.capability-slide');
    const prevBtn = document.querySelector('.capabilities-slider-controls .prev-btn');
    const nextBtn = document.querySelector('.capabilities-slider-controls .next-btn');
    const dotsContainer = document.querySelector('.capabilities-slider-dots');

    let currentCapabilitySlide = 0;

    // Generate dots
    capabilitySlides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => showCapabilitySlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.capabilities-slider-dots .dot');

    function showCapabilitySlide(index) {
        // Ensure index wraps around if out of bounds
        if (index >= capabilitySlides.length) {
            index = 0;
        } else if (index < 0) {
            index = capabilitySlides.length - 1;
        }

        capabilitySlides.forEach((slide, i) => {
            slide.classList.remove('active');
            slide.style.transform = `translateX(${-index * 100}%)`; // Slide effect
        });
        capabilitySlides[index].classList.add('active');

        dots.forEach((dot, i) => {
            dot.classList.remove('active');
            if (i === index) {
                dot.classList.add('active');
            }
        });
        currentCapabilitySlide = index;
    }

    prevBtn.addEventListener('click', () => {
        showCapabilitySlide(currentCapabilitySlide - 1);
    });

    nextBtn.addEventListener('click', () => {
        showCapabilitySlide(currentCapabilitySlide + 1);
    });

    // Initial display
    showCapabilitySlide(currentCapabilitySlide);

    // Dynamic content for Career Section (remains the same)
    const jobDetailsContainer = document.getElementById('job-details');
    const careerLinks = document.querySelectorAll('.opportunity-item ul li a');

    const jobDescriptions = {
        "production-manager": `
            <h3>Production Manager</h3>
            <p><strong>Department:</strong> Manufacturing</p>
            <p><strong>Location:</strong> Elexo Factory, Rubber City</p>
            <p><strong>Responsibilities:</strong></p>
            <ul>
                <li>Oversee daily production operations and schedules.</li>
                <li>Ensure production targets are met efficiently and safely.</li>
                <li>Manage and mentor production teams.</li>
                <li>Implement and monitor quality control procedures.</li>
            </ul>
            <p><strong>Requirements:</strong> Bachelor's degree in Engineering or related field, 5+ years experience in rubber manufacturing, strong leadership skills.</p>
        `,
        "quality-engineer": `
            <h3>Quality Control Engineer</h3>
            <p><strong>Department:</strong> Quality Assurance</p>
            <p><strong>Location:</strong> Elexo Lab, Rubber City</p>
            <p><strong>Responsibilities:</strong></p>
            <ul>
                <li>Develop and implement quality control processes.</li>
                <li>Conduct inspections and tests on raw materials and finished products.</li>
                <li>Analyze data to identify areas for quality improvement.</li>
                <li>Collaborate with production teams to resolve quality issues.</li>
            </ul>
            <p><strong>Requirements:</strong> Bachelor's degree in Chemical/Mechanical Engineering, 3+ years experience in quality control, knowledge of ISO standards.</p>
        `,
        "sales-executive": `
            <h3>Sales Executive</h3>
            <p><strong>Department:</strong> Sales & Marketing</p>
            <p><strong>Location:</strong> Regional Office / Field-based</p>
            <p><strong>Responsibilities:</strong></p>
            <ul>
                <li>Identify and pursue new business opportunities.</li>
                <li>Build and maintain strong client relationships.</li>
                <li>Achieve sales targets and expand market share.</li>
                <li>Prepare and present sales proposals.</li>
            </ul>
            <p><strong>Requirements:</strong> Bachelor's degree in Business/Marketing, 2+ years experience in B2B sales (preferably industrial sector), excellent communication and negotiation skills.</p>
        `,
        "rnd-specialist": `
            <h3>R&D Specialist</h3>
            <p><strong>Department:</strong> Research & Development</p>
            <p><strong>Location:</strong> Elexo R&D Center, Rubber City</p>
            <p><strong>Responsibilities:</strong></p>
            <ul>
                <li>Conduct research on new rubber compounds and materials.</li>
                <li>Develop innovative rubber products and solutions.</li>
                <li>Perform laboratory tests and analyze results.</li>
                <li>Stay updated with industry trends and technologies.</li>
            </ul>
            <p><strong>Requirements:</strong> Master's or Ph.D. in Polymer Science/Materials Science, 3+ years experience in R&D (rubber industry preferred), strong analytical and problem-solving skills.</p>
        `
    };

    careerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const jobId = link.getAttribute('data-job');
            if (jobDescriptions[jobId]) {
                jobDetailsContainer.innerHTML = jobDescriptions[jobId];
                jobDetailsContainer.style.opacity = 0;
                setTimeout(() => {
                    jobDetailsContainer.style.transition = 'opacity 0.5s ease-in-out';
                    jobDetailsContainer.style.opacity = 1;
                }, 50);
            } else {
                jobDetailsContainer.innerHTML = `<h3>Job description not found.</h3>`;
            }
        });
    });

    // Simple Form Submission (for demonstration, no backend)
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon. (This is a demo submission.)');
            this.reset();
        });
    }

});