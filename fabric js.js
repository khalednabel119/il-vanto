// --- 1. DATA: Fabric Database ---
const fabrics = [
    {
        name: "Cotton",
        image: "images/cream-linen-fabric.jpg",
        desc: "The world's most popular natural fiber.",
        props: "Breathable, Absorbent, Soft",
        pros: "Hypoallergenic, Durable, Biodegradable",
        cons: "Wrinkles easily, Shrinks in hot water",
        rating: 10
    },
    {
        name: "Polyester",
        image: "images/green-fabric.jpg",
        desc: "A durable, synthetic petroleum-based fiber.",
        props: "Strong, Quick-drying, Wrinkle-resistant",
        pros: "Cheap, Holds shape well",
        cons: "Traps sweat/heat, Microplastic pollution",
        rating: 4
    },
    {
        name: "Linen",
        image: "images/close-up-texture-linen-fabric.jpg",
        desc: "Made from the flax plant, ideal for hot weather.",
        props: "Very Strong, Highly Breathable, Crisp",
        pros: "Antibacterial, Cool to touch",
        cons: "Wrinkles instantly, Expensive",
        rating: 9
    },
    {
        name: "Silk",
        image: "images/WhatsApp Image 2025-12-02 at 10.01.31 PM.jpeg",
        desc: "A luxurious protein fiber produced by silkworms.",
        props: "Shimmering, Smooth, Thermal regulator",
        pros: "Great for skin/hair, Luxurious feel",
        cons: "Delicate, High maintenance care",
        rating: 8
    },
    {
        name: "Wool",
        image: "images/flat-lay-fabric-texture (1).jpg",
        desc: "Natural fiber from sheep, great for insulation.",
        props: "Insulating, Water-repellent, Elastic",
        pros: "Warm, Fire-resistant, Durable",
        cons: "Can be itchy, Prone to moths",
        rating: 6
    },
    {
        name: "Nylon",
        image: "images/rough-studio-shot-fabric-horizontal-material.jpg",
        desc: "The first fully synthetic fiber ever made.",
        props: "Exceptionally strong, Elastic, Smooth",
        pros: "Water-resistant, Lightweight",
        cons: "Melts easily, Not breathable",
        rating: 3
    },
    {
        name: "Rayon",
        image: "images/nylon.jpg",
        desc: "Semi-synthetic fiber made from regenerated cellulose.",
        props: "Silky, Drapey, Absorbent",
        pros: "Imitates Silk/Cotton, Soft",
        cons: "Weak when wet, Production is chemical-heavy",
        rating: 7
    },
    {
        name: "Spandex",
        image: "images/colorful-knitted-fabric-art-background.jpg",
        desc: "A synthetic fiber known for exceptional elasticity.",
        props: "Stretchy, Durable, Lightweight",
        pros: "Allows movement, Retains shape",
        cons: "Non-breathable, Sensitive to heat",
        rating: 3
    },
    {
        name: "Denim",
        image: "images/flat-lay-fabric-texture.jpg",
        desc: "A sturdy cotton warp-faced textile.",
        props: "Thick, Durable, Rigid",
        pros: "Long-lasting, Protects skin",
        cons: "Heavy when wet, Slow to dry",
        rating: 8
    },
    {
        name: "Velvet",
        image: "images/fabric-textured-layers-background.jpg",
        desc: "A woven tufted fabric with a short, dense pile.",
        props: "Soft, Warm, Distinctive feel",
        pros: "Luxurious look",
        cons: "Dust magnet, Difficult to clean",
        rating: 7
    }
];

// --- 2. GENERATE CARDS ---
const grid = document.getElementById('fabricGrid');

fabrics.forEach((fabric, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div class="card-img" style="background-image: url('${fabric.image}')"></div>
        <div class="card-content">
            <h3>${fabric.name}</h3>
            <div class="rating-badge">Sensitivity Score: ${fabric.rating}/10</div>
            <p>${fabric.desc}</p>
            <button class="learn-btn" onclick="openModal(${index})">Learn More</button>
        </div>
    `;
    grid.appendChild(card);
});

// --- 3. MODAL LOGIC ---
const modal = document.getElementById('fabricModal');
const modalBody = document.getElementById('modalBody');
const closeBtn = document.querySelector('.close-btn');

function openModal(index) {
    const f = fabrics[index];
    const ratingColor = f.rating >= 8 ? 'green' : (f.rating >= 5 ? 'orange' : 'red');

    modalBody.innerHTML = `
        <h2 style="color:var(--primary-brown); border-bottom: 2px solid var(--accent-gold); display:inline-block; margin-bottom:15px;">${f.name}</h2>
        <div class="modal-detail-row">
            <strong>Key Properties:</strong><br>${f.props}
        </div>
        <div class="modal-detail-row">
            <strong>✅ Pros:</strong> ${f.pros}
        </div>
        <div class="modal-detail-row">
            <strong>❌ Cons:</strong> ${f.cons}
        </div>
        <div style="margin-top: 15px; font-size: 1.1rem;">
            <strong>Sensitivity Rating:</strong> 
            <span style="color:${ratingColor}; font-weight:bold;">${f.rating}/10</span>
        </div>
    `;
    modal.style.display = 'block';
}

closeBtn.onclick = () => modal.style.display = 'none';
window.onclick = (e) => {
    if (e.target == modal) modal.style.display = 'none';
}

// --- 4. ACCORDION LOGIC ---
const accHeaders = document.querySelectorAll('.accordion-header');

accHeaders.forEach(header => {
    header.addEventListener('click', () => {
        header.classList.toggle('active');
        const body = header.nextElementSibling;
        if (header.classList.contains('active')) {
            body.style.maxHeight = body.scrollHeight + "px";
        } else {
            body.style.maxHeight = 0;
        }
    });
});

// --- 5. SCROLL EFFECTS (Sticky Nav, ScrollSpy, Animation) ---
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');
const cards = document.querySelectorAll('.card');

window.addEventListener('scroll', () => {
    // Sticky Nav
    if (window.scrollY > 50) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }

    // Scroll Spy (Active Link)
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });

    // Scroll Animation for Cards
    const triggerBottom = window.innerHeight / 5 * 4;
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < triggerBottom) {
            card.classList.add('visible');
        }
    });
});