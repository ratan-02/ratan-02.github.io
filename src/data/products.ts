export interface Product {
  id: number;
  name: string;
  type: string;
  price: number;
  oldPrice: number | null;
  category: "running" | "basketball" | "lifestyle";
  tag: "New" | "Sale" | null;
  img: string;
  description: string;
}

export const products: Product[] = [

  {
    id: 1,
    name: "Air Max Sport 2026",
    type: "Men's Road Running",
    price: 129.99,
    oldPrice: null,
    category: "running",
    tag: "New",
    img: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=600",
    description: "Equipped with revolutionary Air cushioning, the Air Max Sport 2026 brings elite-level energy return and comfort for every mile."
  },
  {
    id: 3,
    name: "ZoomX Invincible 3",
    type: "Women's Training Shoes",
    price: 180.00,
    oldPrice: null,
    category: "running",
    tag: null,
    img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=600",
    description: "Engineered with ZoomX foam, the Invincible 3 offers maximum support, extreme bounce, and unmatched comfort for all training sessions."
  },
  {
    id: 5,
    name: "Vaporfly Next% 3",
    type: "Professional Racing",
    price: 250.00,
    oldPrice: null,
    category: "running",
    tag: "New",
    img: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=600",
    description: "Built for the record-breakers. Featuring a full-length carbon fiber flyplate and responsive foam to push you past your limits."
  },
  {
    id: 10,
    name: "Cloudrunner Pro v2",
    type: "Unisex Trail Runner",
    price: 135.00,
    oldPrice: 160.00,
    category: "running",
    tag: "Sale",
    img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=600",
    description: "Tackle uneven terrain with ultra-durable rubber outsoles and responsive Cloudfoam cushioning designed for rocky trails."
  },
  {
    id: 11,
    name: "Pegasus Turbo Light",
    type: "Men's Light Trainer",
    price: 140.00,
    oldPrice: null,
    category: "running",
    tag: null,
    img: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=600",
    description: "The daily workhorse with wings. Returns with featherweight mesh and reactive ZoomAir pods under the forefoot."
  },
  {
    id: 12,
    name: "GEL-Nimbus Ultra 26",
    type: "Women's Comfort Cushion",
    price: 160.00,
    oldPrice: 195.00,
    category: "running",
    tag: "Sale",
    img: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?q=80&w=600",
    description: "Experience maximum shock absorption on hard asphalt surfaces. Engineered with soft knit collars and advanced gel technology."
  },
  {
    id: 13,
    name: "UltraBoost Core 5.0",
    type: "Men's Everyday Runner",
    price: 190.00,
    oldPrice: null,
    category: "running",
    tag: null,
    img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600",
    description: "Iconic Primeknit wraps the foot with targeted support, while signature boost capsules supply continuous energy return."
  },
  {
    id: 14,
    name: "Speed Glide Marathon",
    type: "Professional Racer",
    price: 220.00,
    oldPrice: null,
    category: "running",
    tag: "New",
    img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600",
    description: "Ultralight aerodynamic upper coupled with curved carbon-composite rocker geometry designed to shave seconds off your personal bests."
  },
  {
    id: 15,
    name: "React Infinity Comfort",
    type: "Women's Stability Runner",
    price: 110.00,
    oldPrice: 150.00,
    category: "running",
    tag: "Sale",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600",
    description: "Specifically structured to reduce runner injury rates, utilizing wide base platforms and extra responsive React foam layers."
  },
  {
    id: 16,
    name: "Flow Velocity Wind",
    type: "Men's Speed Trainer",
    price: 150.00,
    oldPrice: null,
    category: "running",
    tag: null,
    img: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=600",
    description: "Rubberless construction connects you closer to the road, featuring warp mesh that holds the foot firmly for sudden pacing switches."
  },
  {
    id: 17,
    name: "Supernova Rise Sport",
    type: "Unisex Daily Jogger",
    price: 95.00,
    oldPrice: 130.00,
    category: "running",
    tag: "Sale",
    img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=600",
    description: "An accessible entry-level daily shoe featuring Dreamstrike+ foam outsoles and soft heel cushions for premium comfort."
  },
  {
    id: 18,
    name: "Gore-Tex Trail Shield",
    type: "Men's Waterproof Trail",
    price: 175.00,
    oldPrice: null,
    category: "running",
    tag: "New",
    img: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=600",
    description: "Waterproof lining protects your stride against deep puddles and thick mud, completed with sticky deep lug treads."
  },

  {
    id: 4,
    name: "Court Vision Low",
    type: "Men's Basketball Style",
    price: 75.00,
    oldPrice: null,
    category: "basketball",
    tag: null,
    img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=600",
    description: "Combining 80s hoops culture with modern fast-break style, the Court Vision features a crisp upper and retro details."
  },
  {
    id: 9,
    name: "Elite Hooper Pro 3",
    type: "Men's Basketball",
    price: 115.00,
    oldPrice: null,
    category: "basketball",
    tag: "New",
    img: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=600",
    description: "Rule the hardwood with high-top ankle protection, explosive forefoot energy pods, and multidirectional grip patterns."
  },
  {
    id: 20,
    name: "LeBron Crown Flight",
    type: "Premium Hoops Gear",
    price: 210.00,
    oldPrice: null,
    category: "basketball",
    tag: "New",
    img: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?q=80&w=600",
    description: "Armed with full-length Zoom Air and protective Max Air wraps in the heel, engineered to withstand aggressive court maneuvers."
  },
  {
    id: 21,
    name: "Giannis Freak Strike",
    type: "Low-Cut Fast Play",
    price: 125.00,
    oldPrice: 155.00,
    category: "basketball",
    tag: "Sale",
    img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600",
    description: "Engineered for sudden crossovers and lateral cuts, featuring midfoot lock straps and responsive dual-compression pods."
  },
  {
    id: 22,
    name: "KD Trey 5 Captain",
    type: "Men's Precision Shoes",
    price: 100.00,
    oldPrice: null,
    category: "basketball",
    tag: null,
    img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600",
    description: "Lightweight mesh upper meets supportive collar designs for responsive court transitions and fluid jump-shot releases."
  },
  {
    id: 23,
    name: "Air Jordan Legacy v4",
    type: "Retro Court Edition",
    price: 185.00,
    oldPrice: null,
    category: "basketball",
    tag: "New",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600",
    description: "Honoring the golden era of basketball, featuring authentic full grain leather overlays and standard circular pivot rings."
  },
  {
    id: 24,
    name: "Harden Stepback 3",
    type: "Unisex Street Hoops",
    price: 85.00,
    oldPrice: 110.00,
    category: "basketball",
    tag: "Sale",
    img: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=600",
    description: "A Bounce-cushioned midsole delivers lightweight spring, while a wide tread pattern handles concrete outdoor courts with ease."
  },
  {
    id: 25,
    name: "Kyrie HyperGuard Lite",
    type: "Men's Guard Specialized",
    price: 130.00,
    oldPrice: null,
    category: "basketball",
    tag: null,
    img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=600",
    description: "Engineered with rounded rubber side walls that wrap the edges, providing critical grip during extreme banking angles."
  },
  {
    id: 26,
    name: "Dame Certified v2",
    type: "Point Guard Elite",
    price: 90.00,
    oldPrice: 120.00,
    category: "basketball",
    tag: "Sale",
    img: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=600",
    description: "A comfortable responsive trainer built for players who lead. Synthetic uppers provide targeted durability during collisions."
  },
  {
    id: 27,
    name: "Donovan Spida Venom",
    type: "Explosive Vertical Edition",
    price: 120.00,
    oldPrice: null,
    category: "basketball",
    tag: null,
    img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=600",
    description: "High-grade propulsion plate accelerates quick jumps and explosive blocks, combined with structured heel locking wings."
  },
  {
    id: 28,
    name: "Curry Splash Zone",
    type: "Long-Range Specialist",
    price: 160.00,
    oldPrice: null,
    category: "basketball",
    tag: "New",
    img: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=600",
    description: "Revolutionary grip compound operates completely silent on indoor floors, providing stopping power in an instant."
  },
  {
    id: 29,
    name: "Zion Beast Power",
    type: "Heavy Hoops Armor",
    price: 150.00,
    oldPrice: 180.00,
    category: "basketball",
    tag: "Sale",
    img: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?q=80&w=600",
    description: "Dual-layer cushioning handles high impacts for power players, structured with wide lateral outriggers to prevent ankle rolling."
  },

  {
    id: 2,
    name: "Classic Leather White",
    type: "Unisex Casual Sneakers",
    price: 65.00,
    oldPrice: 90.00,
    category: "lifestyle",
    tag: "Sale",
    img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600",
    description: "A timeless streetwear legend. Crafted with soft, premium leather and designed for long-lasting, everyday wear."
  },
  {
    id: 6,
    name: "Cloudfoam Pure Pro",
    type: "Kids Daily Wear",
    price: 55.00,
    oldPrice: 70.00,
    category: "lifestyle",
    tag: "Sale",
    img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600",
    description: "A flexible and breathable shoe for kids on the go. The memory foam sockliner molds to the foot for personalized comfort."
  },
  {
    id: 7,
    name: "Terrain Hiker Ultimate",
    type: "Outdoor & Trekking",
    price: 145.00,
    oldPrice: null,
    category: "lifestyle",
    tag: null,
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600",
    description: "Conquer any trail with absolute stability. Heavy-duty traction outsole combined with waterproof panels to keep you dry."
  },
  {
    id: 8,
    name: "All-Star Retro Canvas",
    type: "Vintage High Top",
    price: 60.00,
    oldPrice: 80.00,
    category: "lifestyle",
    tag: "Sale",
    img: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=600",
    description: "The classic high top design featuring organic cotton canvas. Loved by generations, ready to define your look today."
  },
  {
    id: 30,
    name: "Club C Vintage Cream",
    type: "Retro Court Sneaker",
    price: 85.00,
    oldPrice: null,
    category: "lifestyle",
    tag: "New",
    img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=600",
    description: "Clean minimalistic panels featuring subtle vintage cream colors and exceptionally soft inner sock liners."
  },
  {
    id: 31,
    name: "Gazelle Craft Indigo",
    type: "Classic Suede Casual",
    price: 90.00,
    oldPrice: 110.00,
    category: "lifestyle",
    tag: "Sale",
    img: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=600",
    description: "Rich suede textures meet iconic serrated stripes, adding an instant collegiate premium aesthetic to any casual outfit."
  },
  {
    id: 32,
    name: "Air Force Platform Sage",
    type: "Women's Elevated Style",
    price: 110.00,
    oldPrice: null,
    category: "lifestyle",
    tag: null,
    img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=600",
    description: "A thick platform sole gives you stylish height, complete with clean rolled leather seams and matching metal lace tags."
  },
  {
    id: 33,
    name: "Retro Runner Nylon 77",
    type: "Vintage Trainer Look",
    price: 70.00,
    oldPrice: 95.00,
    category: "lifestyle",
    tag: "Sale",
    img: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=600",
    description: "Combining breathable nylon panels and hairy suede textures, built with retro waffle tread traction outsoles."
  },
  {
    id: 34,
    name: "Clean Court Minimalist",
    type: "Unisex Smart Sneakers",
    price: 120.00,
    oldPrice: null,
    category: "lifestyle",
    tag: "New",
    img: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?q=80&w=600",
    description: "Sleek low-profile shape without excess stitching, crafted using Italian calfskin leather and ortholite comfortable midsoles."
  },
  {
    id: 35,
    name: "Metro slip-On Comfort",
    type: "Daily Travel Loafer",
    price: 65.00,
    oldPrice: null,
    category: "lifestyle",
    tag: null,
    img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600",
    description: "Elastic side gores make slipping these on completely effortless, with padded collar details preventing rub and discomfort."
  },
  {
    id: 36,
    name: "Street Style High-Top",
    type: "Men's Urban Sneakers",
    price: 95.00,
    oldPrice: 125.00,
    category: "lifestyle",
    tag: "Sale",
    img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600",
    description: "Premium padded collars supply continuous ankle support, featuring retro overlays that make a statement on the street."
  },
  {
    id: 37,
    name: "Desert Oasis Sand",
    type: "Summer Light Trainer",
    price: 130.00,
    oldPrice: null,
    category: "lifestyle",
    tag: "New",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600",
    description: "Sand-colored knit structures allow complete heat dispersion, crafted with recycled eco-friendly ocean plastics."
  }
];
