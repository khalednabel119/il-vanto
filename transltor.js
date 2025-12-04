// ================================
//  LANGUAGE DATA
// ================================
const translator = {
    en: {
        nav_home: "Home",
        nav_cart: "Cart",
        nav_fabric: "Fabric",
        nav_size: "Size",
        nav_signin: "Sign In",
        nav_logout: "Logout",

        hero_title: "Elegance Redefined",
        hero_subtitle: "Discover the new season collection.",
        hero_cta: "Shop Now",

        cat_all: "All",
        cat_mens: "Mens",
        cat_women: "Women",
        cat_trending: "Trending",

        search: "Search products...",

        sort_newest: "Newest",
        sort_low_high: "Price: Low to High",
        sort_high_low: "Price: High to Low",

        footer_text: "© 2024 il vanto. All rights reserved."
    },

    ar: {
        nav_home: "الرئيسية",
        nav_cart: "عربة التسوق",
        nav_fabric: "الأقمشة",
        nav_size: "المقاسات",
        nav_signin: "تسجيل الدخول",
        nav_logout: "تسجيل الخروج",

        hero_title: "أناقة بمعنى جديد",
        hero_subtitle: "اكتشف مجموعة الموسم الجديد.",
        hero_cta: "تسوق الآن",

        cat_all: "الكل",
        cat_mens: "رجالي",
        cat_women: "نسائي",
        cat_trending: "الأكثر رواجًا",

        search: "ابحث عن المنتجات...",

        sort_newest: "الأحدث",
        sort_low_high: "السعر: من الأقل للأعلى",
        sort_high_low: "السعر: من الأعلى للأقل",

        footer_text: "© 2024 il vanto. جميع الحقوق محفوظة."
    },

    zh: {
        nav_home: "首页",
        nav_cart: "购物车",
        nav_fabric: "面料",
        nav_size: "尺码",
        nav_signin: "登录",
        nav_logout: "退出登录",

        hero_title: "优雅再定义",
        hero_subtitle: "探索新季系列。",
        hero_cta: "立即购买",

        cat_all: "全部",
        cat_mens: "男装",
        cat_women: "女装",
        cat_trending: "流行",

        search: "搜索商品...",

        sort_newest: "最新",
        sort_low_high: "价格：从低到高",
        sort_high_low: "价格：从高到低",

        footer_text: "© 2024 il vanto. 版权所有。"
    }
};

// ================================
// APPLY LANGUAGE
// ================================
function applyLanguage(lang) {
    const elements = document.querySelectorAll("[data-translate]");
    const placeholders = document.querySelectorAll("[data-translate-placeholder]");

    elements.forEach(el => {
        let key = el.getAttribute("data-translate");
        if (translator[lang] && translator[lang][key]) {
            el.textContent = translator[lang][key];
        }
    });

    placeholders.forEach(el => {
        let key = el.getAttribute("data-translate-placeholder");
        if (translator[lang] && translator[lang][key]) {
            el.placeholder = translator[lang][key];
        }
    });

    // RTL for Arabic
    if (lang === "ar") {
        document.body.style.direction = "rtl";
        document.body.style.textAlign = "right";
    } else {
        document.body.style.direction = "ltr";
        document.body.style.textAlign = "left";
    }
}

// ================================
// SAVE & SWITCH LANGUAGE
// ================================
document.addEventListener("DOMContentLoaded", () => {

    const langLinks = document.querySelectorAll(".language-dropdown a");

    langLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const lang = link.dataset.lang;

            localStorage.setItem("site-lang", lang);
            applyLanguage(lang);
        });
    });

    const saved = localStorage.getItem("site-lang") || "en";
    applyLanguage(saved);
});

