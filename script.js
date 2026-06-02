document.addEventListener('DOMContentLoaded', () => {
    
    // Global tracker holding active open database key point
    let activeLocationKey = null;

    // --- Dynamic Hill Station Database Architecture ---
    const locationDatabase = {
        "nainital": {
            title: "Nainital, Uttarakhand",
            image: "file:///C:/Users/manis/OneDrive/Desktop/naintal.jpg",
            bestTime: "March to June & Sept to Nov",
            budget: "Budget-Friendly to Moderate",
            overview: "Nestled in a steep valley surrounding the emerald-green, pear-shaped Naini Lake, Nainital is one of India's most beloved hill stations. According to mythology, the lake was formed where the eyes (Naina) of Goddess Sati fell, giving the town its sacred roots and breathtaking views.",
            attractions: [
                "Naini Lake: The heart of the town, offering serene rowboat and paddleboat experiences beneath the mountains.",
                "Naina Devi Temple: A deeply revered spiritual site sitting gracefully on the northern shore of the lake.",
                "Tiffin Top (Dorothy's Seat): A scenic hilltop perch offering a complete 360-degree view of Nainital and the surrounding Kumaon hills."
            ],
            tip: "Take the aerial ropeway up to Snow View Point early in the morning. On clear days, it reveals an incredible, unobstructed vista of the majestic Nanda Devi peak!",
            comments: [
                { name: "Rahul Sharma", text: "The evening walk around Mall Road next to the lake is absolutely magical.", time: "2 days ago" }
            ]
        },
        "mussoorie": {
            title: "Mussoorie, Uttarakhand",
            image: "file:///C:/Users/manis/OneDrive/Desktop/mussoorie.jpeg",
            bestTime: "April to June & Sept to Nov",
            budget: "Moderate",
            overview: "Famously crowned as the 'Queen of the Hills,' Mussoorie stands on a horseshoe-shaped ridge overlooking the sprawling Doon Valley. With its colonial heritage, misty walkways, and cascading mountain falls, it offers a refreshing escape from the plains.",
            attractions: [
                "Kempty Falls: A historic, towering waterfall where water cascades down giant rock faces into public swimming pools.",
                "Gun Hill: The second-highest peak in Mussoorie, accessible by an exciting cable car ride with stunning Himalayan views.",
                "Camel's Back Road: A peaceful, 3km nature walk shaped naturally like a camel's hump."
            ],
            tip: "Skip the heavy crowds on Mall Road and head out to Landour (just 5km away). It's a quiet, old-world cantonment town famous for its pristine pine forests and Char Dukan's delicious pancakes.",
            comments: []
        },
        "rishikesh": {
            title: "Rishikesh, Uttarakhand",
            image: "file:///C:/Users/manis/OneDrive/Desktop/rishikesh.jpg",
            bestTime: "October to April",
            budget: "Budget-Friendly",
            overview: "Rishikesh effortlessly bridges two worlds: it is both the 'Yoga Capital of the World' and India's premier hub for high-adrenaline outdoor sports. Located right where the clear, holy Ganges River leaves the Himalayas, it carries a unique energy that attracts spiritual seekers and thrill-seekers alike.",
            attractions: [
                "Lakshman Jhula & Ram Jhula: Iconic, historic iron suspension bridges swinging high over the roaring Ganges.",
                "Triveni Ghat: The most sacred bathing spot in town, hosting an incredible, synchronized evening musical Maha Aarti.",
                "Shivpuri Rafting Hub: The starting point for world-class whitewater rafting rapids like 'Roller Coaster' and 'Golf Course'."
            ],
            tip: "If you try cliff jumping during your river rafting trip, always keep your running shoes on! The rocks on the riverbeds can be incredibly sharp and slippery.",
            comments: [
                { name: "Amit Verma", text: "Rafting in Shivpuri is an absolute must! The water is freezing but the rush is unbelievable.", time: "Yesterday" }
            ]
        },
        "shimla": {
            title: "Shimla, Himachal Pradesh",
            image: "file:///C:/Users/manis/OneDrive/Desktop/shimla.jpg",
            bestTime: "March to June & Nov to Feb",
            budget: "Moderate to High",
            overview: "Once the official summer capital of British India, Shimla retains its stunning colonial architecture, pedestrian-only avenues, and snow-capped pine backdrops. It is seamlessly connected by a historic mountain railway that feels like stepping back in time.",
            attractions: [
                "The Ridge & Christ Church: A wide, open-air cultural platform featuring a beautiful, neo-Gothic church built in 1857.",
                "Jakhoo Temple: Situated on Shimla's highest peak, dedicated to Lord Hanuman and home to a colossal 108-foot statue.",
                "Kalka-Shimla Toy Train: A UNESCO World Heritage mountain railway winding through 103 dramatic tunnels and old bridges."
            ],
            tip: "When hiking up to Jakhoo Temple, keep all food items, sunglasses, and loose phone strings safely zipped inside your bags. The local monkeys are expert pickpockets!",
            comments: []
        }
    };

    // --- Modal DOM Hooks ---
    const travelModal = document.getElementById('travelModal');
    const closeModalBtn = document.getElementById('closeModal');
    const shareModalBtn = document.getElementById('shareModal');
    const clickableCards = document.querySelectorAll('.clickable-card');
    const commentsContainer = document.getElementById('commentsContainer');
    const commentForm = document.getElementById('commentForm');

    // Render Scoped Localized Target Comments Array Loop
    function renderComments(locationKey) {
        commentsContainer.innerHTML = '';
        const commentsList = locationDatabase[locationKey].comments;

        if (commentsList.length === 0) {
            commentsContainer.innerHTML = `<div class="no-comments">No comments left yet. Write your thoughts down below!</div>`;
            return;
        }

        commentsList.forEach(comment => {
            const commentCard = document.createElement('div');
            commentCard.className = 'comment-card';
            commentCard.innerHTML = `
                <div class="comment-header">
                    <span class="comment-name">${comment.name}</span>
                    <span class="comment-time">${comment.time}</span>
                </div>
                <div class="comment-message">${comment.text}</div>
            `;
            commentsContainer.appendChild(commentCard);
        });
        
        commentsContainer.scrollTop = commentsContainer.scrollHeight;
    }

    // Modal Trigger Injection Hook Setup
    clickableCards.forEach(card => {
        card.addEventListener('click', () => {
            const locationKey = card.getAttribute('data-location');
            const data = locationDatabase[locationKey];

            if (data) {
                activeLocationKey = locationKey;

                // Value Node Population
                document.getElementById('modalImg').src = data.image;
                document.getElementById('modalTitle').textContent = data.title;
                document.getElementById('modalBestTime').textContent = data.bestTime;
                document.getElementById('modalBudget').textContent = data.budget;
                document.getElementById('modalOverview').textContent = data.overview;
                document.getElementById('modalTip').textContent = data.tip;

                // Array Checklist Mapper
                const listContainer = document.getElementById('modalAttractions');
                listContainer.innerHTML = '';
                data.attractions.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item;
                    listContainer.appendChild(li);
                });

                renderComments(locationKey);

                // Class Visual Toggles
                travelModal.classList.add('active');
                document.body.classList.add('modal-open');
            }
        });
    });

    // Form Event Handler Submissions
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById('commenterName');
        const textInput = document.getElementById('commenterText');

        if (activeLocationKey && nameInput.value.trim() && textInput.value.trim()) {
            locationDatabase[activeLocationKey].comments.push({
                name: nameInput.value.trim(),
                text: textInput.value.trim(),
                time: "Just now"
            });

            renderComments(activeLocationKey);

            nameInput.value = '';
            textInput.value = '';
        }
    });

    // --- Web Share & Clipboard Fallback Engine ---
    shareModalBtn.addEventListener('click', async () => {
        if (!activeLocationKey) return;
        const currentData = locationDatabase[activeLocationKey];
        
        const shareData = {
            title: currentData.title,
            text: `Take a look at this complete local insider travel guide overview for ${currentData.title}!`,
            url: window.location.href
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log("Device share sheet cancelled");
            }
        } else {
            try {
                await navigator.clipboard.writeText(`${shareData.text} - ${shareData.url}`);
                
                // Visual Button Feedback Feedback Toggles
                const icon = shareModalBtn.querySelector('i');
                icon.className = 'fas fa-check';
                shareModalBtn.style.backgroundColor = '#2ec4b6';
                
                alert(`Link copied directly to your clipboard for: ${currentData.title}!`);
                
                setTimeout(() => {
                    icon.className = 'fas fa-share-alt';
                    shareModalBtn.style.backgroundColor = '';
                }, 2000);
            } catch (err) {
                alert("Could not copy the text automatically.");
            }
        }
    });

    // Close Modals
    const closeModal = () => {
        travelModal.classList.remove('active');
        document.body.classList.remove('modal-open');
        activeLocationKey = null;
    };

    closeModalBtn.addEventListener('click', closeModal);
    travelModal.addEventListener('click', (e) => {
        if (e.target === travelModal) closeModal();
    });

    // --- Core Layout Mobile Navigation Logic ---
    const menuIcon = document.getElementById('menuIcon');
    const navLinks = document.getElementById('navLinks');

    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuIcon.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuIcon.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });

    // Active Section Tracking Menu Highlights
    const sections = document.querySelectorAll('section, body, header');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });

    // Theme Switcher Configuration
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        }
    }

    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        const icon = themeToggle.querySelector('i');
        
        if (theme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            icon.classList.replace('fa-sun', 'fa-moon');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            icon.classList.replace('fa-moon', 'fa-sun');
        }
    });

    // Card Core Simple Counter Like Handlers
    const likeButtons = document.querySelectorAll('.like-btn');
    likeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const likeCountSpan = button.querySelector('.like-count');
            let currentLikes = parseInt(likeCountSpan.textContent);
            
            button.classList.toggle('liked');
            
            if (button.classList.contains('liked')) {
                currentLikes++;
            } else {
                currentLikes--;
            }
            likeCountSpan.textContent = currentLikes;
        });
    });
});