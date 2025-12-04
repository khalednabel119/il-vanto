/* -----------------------------------------------------
   PRODUCT DATA (Mock Database)
----------------------------------------------------- */
const productsData = [
    {
        id: 1,
        title: "Placket Casual Hoodie",
        category: "mens",
        price: 189.00,
        oldPrice: 250.00,
        image: "[1].jpg",
        description: "DAZY Men's Solid Color Raglan Sleeve Zipper Placket Casual Hoodie, Autumn.",
        tags: ["trending", "sale"],
        rating: 4.8
    },
    {
        id: 2,
        title: "Hatti Cropped Leather Jacket",
        category: "women",
        price: 350.00,
        oldPrice: null,
        image: "images/jp1w.jpg",
        description: "Hatti Cropped Leather JacketA cropped jacket in buttery leather. Softly tailored with dropped shoulders and a cinched waist..",
        tags: ["trending"],
        rating: 4.9
    },
    {
        id: 3,
        title: "Manfinity Homme Denim Jeans",
        category: "mens",
        price: 320.00,
        oldPrice: null,
        image: "images/IMG_3335[1].jpg",
        description: "Manfinity Homme Men Washed Faded Denimeans jeans.",
        tags: ["new"],
        rating: 4.7
    },
    {
        id: 4,
        title: "Hooded Jacket and Drawstring Pants",
        category: "women",
        price: 450.00,
        oldPrice: 500.00,
        image: "images/jp2w.jpg",
        description: "- Active Wear Zipper Long Sleeve Hooded Jacket and Drawstring Pants Two Piece Set.",
        tags: ["sale"],
        rating: 5.0
    },
    {
        id: 5,
        title: "Solid Color KnitSweater",
        category: "mens",
        price: 185.00,
        oldPrice: null,
        image: "images/IMG_3338[1].jpg",
        description: "DAZY Men's Solid Color KnitSweater, Simple Fashion Casual For Daily Wear, Fall.",
        tags: [],
        rating: 4.5
    },
    {
        id: 6,
        title: "Belted Cropped Cotton-Twill Jacket",
        category: "women",
        price: 375.00,
        oldPrice: null,
        image: "images/jp3w.jpg",
        description: "Valentina belted cropped cotton-twill jacket.",
        tags: ["trending"],
        rating: 4.6
    },
    {
        id: 7,
        title: "Zipper Jacket",
        category: "mens",
        price: 175.00,
        oldPrice: null,
        image: "images/IMG_3339[1].jpg",
        description: "DAZY Men’s Solid color Basic Zipper Jacket,Fall clothes.",
        tags: [],
        rating: 4.4
    },
    {
        id: 8,
        title: "Harlee Shoulder Bag",
        category: "women",
        price: 230.00,
        oldPrice: null,
        image: "images/jp3wb.jpg",
        description: "Harlee Shoulder Bag - Ivory.",
        tags: ["sale", "new"],
        rating: 4.8
    },
    {
        id: 9,
        title: "Manfinity EZcore Fit Jeans",
        category: "mens",
        price: 225.00,
        oldPrice: null,
        image: "images/IMG_3340[1].jpg",
        description: "Manfinity EZcore Men'sVintage Loose Fit Jeans, Plain Wide Long Distressed Baggy Light Blue Jeans, For Husband, Boyfriend Gifts.",
        tags: ["sale", "new"],
        rating: 4.8
    },
    {
        id: 10,
        title: "Denim Jacket",
        category: "women",
        price: 300.00,
        oldPrice: null,
        image: "images/jp8w.jpg",
        description: "Seelio Spring & Autumn New Women Casual Rolled Sleeve Denim Jacket, Versatile Daily Wear Back To School Fashion.",
        tags: ["sale", "new"],
        rating: 4.8
    },
    {
        id: 11,
        title: " Loose Fit Casual Sweatpants",
        category: "mens",
        price: 245.00,
        oldPrice: null,
        image: "images/IMG_3341[1].jpg",
        description: "Men's Straight Knit Pants, Loose Fit Casual Sweatpants, Versatile For Spring And Autumn.",
        tags: ["sale", "new"],
        rating: 4.8
    },
    {
        id: 12,
        title: "Waffle Knit Hoodie",
        category: "women",
        price: 295.00,
        oldPrice: 350.00,
        image: "images/jp7w.jpg",
        description: "Slit Drawstring Waffle Knit Hoodie.",
        tags: ["sale", "new"],
        rating: 4.8
    },
    {
        id: 13,
        title: "Half Zip Stand Collar Sweater",
        category: "mens",
        price: 220.00,
        oldPrice: null,
        image: "images/IMG_3343[2].jpg",
        description: "Men's Solid Color Long Sleeve Casual Versatile Half Zip Stand Collar Sweater, Fall/ Winter.",
        tags: ["sale", "new"],
        rating: 4.8
    },
    {
        id: 14,
        title: "Hana Medium Faux Suede Tote Bag",
        category: "women",
        price: 190.00,
        oldPrice: null,
        image: "images/IMG_4093.JPG",
        description: "Hana Medium Faux Suede Tote Bag Dark Olive.",
        tags: ["sale", "new"],
        rating: 4.8
    },
    {
        id: 15,
        title: "Men's Short Wallet High-End PU Leather",
        category: "mens",
        price: 135.00,
        oldPrice: null,
        image: "images/jb1mb.jpg",
        description: "Men's Short Wallet High-End PU Leather Youth Lychee Patterned Zipper Card Wallet Coin For Men Wallet Purse Wallet Men WalletLeather.",
        tags: ["sale", "new"],
        rating: 4.8
    },
    {
        id: 16,
        title: "T-Lock Leather Shoulder Bag",
        category: "women",
        price: 285.00,
        oldPrice: 450.00,
        image: "images/IMG_4094.JPG",
        description: "T-Lock leather shoulder bag.",
        tags: ["sale", "new"],
        rating: 4.8
    },
    {
        id: 17,
        title: "women's Small Wallet Letter Graphic",
        category: "women",
        price: 125.00,
        oldPrice: null,
        image: "images/jb2mb.jpg",
        description: "MIYIN Minimalist Style Small Wallet Letter Graphic Women Wallet Trifold Zipper CoinPurse With Card Slot ID Window PU Leather, Black.",
        tags: ["sale", "new"],
        rating: 4.8
    },
    {
        id: 18,
        title: "Men's Small Wallet MetalDecor",
        category: "mens",
        price: 145.00,
        oldPrice: null,
        image: "images/jb3mb.jpg",
        description: "Small Wallet MetalDecor Credit Card Holder Portable Cash White-Collar Workers- brown.",
        tags: ["sale", "new"],
        rating: 4.8
    },
    {
        id: 19,
        title: "Jeans Pants",
        category: "mens",
        price: 215.00,
        oldPrice: null,
        image: "images/jp1m.jpg",
        description: "Men's Cargo jeans pants.",
        tags: ["sale", "new"],
        rating: 4.8
    },
    {
        id: 20,
        title: "Black Wide-Leg Jeans",
        category: "women",
        price: 295.00,
        oldPrice: 350.00,
        image: "images/jp6w.jpg",
        description: "Stretch-Cotton Wide-Leg Jeans in Black.",
        tags: ["sale", "new"],
        rating: 4.8
    },
    {
        id: 21,
        title: " Sleeve Jacket",
        category: "mens",
        price: 295.00,
        oldPrice: null,
        image: "images/jp2m.jpg",
        description: "Manfinity CasualCool Plus Size Men Street Casual Outdoor Long Sleeve Jacket, Fall.",
        tags: ["sale", "new"],
        rating: 4.8
    },
    {
        id: 22,
        title: "wide-leg organic jeans",
        category: "women",
        price: 295.00,
        oldPrice: 350.00,
        image: "images/jp5w.jpg",
        description: "Clara Baggy low-rise wide-leg organic jeans.",
        tags: ["sale", "new"],
        rating: 4.8
    },
    {
        id: 23,
        title: "Leather Jacket",
        category: "mens",
        price: 300.00,
        oldPrice: null,
        image: "images/jp3m.jpg",
        description: "Seoul Class Leather Jacket.",
        tags: ["sale", "new"],
        rating: 4.8
    },
    {
        id: 24,
        title: "Burgundy Jacket",
        category: "women",
        price: 325.00,
        oldPrice: null,
        image: "images/jp4w.jpg",
        description: "Faux Leather Burgundy Jacket.",
        tags: ["sale", "new"],
        rating: 4.8
    },
    {
        id: 25,
        title: "Oversized Zipper Hoodie",
        category: "mens",
        price: 175.00,
        oldPrice: null,
        image: "images/jp4m.jpg",
        description: "ultimate ease oversized zipper hoodie.",
        tags: ["sale", "new"],
        rating: 4.8
    },
];

/* -----------------------------------------------------
   USER AUTHENTICATION SYSTEM
----------------------------------------------------- */

// Load users or create empty array
let users = JSON.parse(localStorage.getItem("users")) || [];

// Save users back to localStorage
function saveUsers() {
    localStorage.setItem("users", JSON.stringify(users));
}

// Register new user
function registerUser(name, email, password) {
    const exists = users.find(u => u.email === email);
    if (exists) return false;

    users.push({ name, email, password });
    saveUsers();
    return true;
}

// Login user
function loginUser(email, password) {
    return users.find(u => u.email === email && u.password === password);
}
