import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useScroll } from "framer-motion";
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  Trash2,
  Plus,
  Minus,
  Check,
  Send,
  ChevronRight,
  TrendingUp,
  Sun,
  Moon
} from "lucide-react";
import { products, type Product } from "./data/products";
import AnimatedButton from "./components/ui/animated-button";
import { Link004 } from "./components/ui/skiper-ui/skiper40";

interface CartItem extends Product {
  qty: number;
}

interface ToastMessage {
  id: string;
  message: string;
}

export default function App() {

  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sortOption, setSortOption] = useState<string>("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [cartPulse, setCartPulse] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const [activeSection, setActiveSection] = useState("home");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const showcaseRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: scrollContainerRef,
    target: showcaseRef,
    offset: ["start end", "end start"]
  });

  const gridScale = useTransform(scrollYProgress, [0.1, 0.6, 0.9], [0.7, 1.15, 1.25]);
  const gridOpacity = useTransform(scrollYProgress, [0.05, 0.15, 0.85, 0.95], [0, 1, 1, 0]);

  const textX = useTransform(scrollYProgress, [0.1, 0.9], ["25vw", "-65vw"]);
  const textOpacity = useTransform(scrollYProgress, [0.05, 0.15, 0.8, 0.9], [0, 1, 1, 0]);

  const [heroShoeId, setHeroShoeId] = useState<number>(1);
  const heroShoe = useMemo(() => {
    return products.find((p) => p.id === heroShoeId) || products[0];
  }, [heroShoeId]);

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState("");
  const [newsletterError, setNewsletterError] = useState("");

  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMsg, setContactMsg] = useState("");
  const [contactSuccess, setContactSuccess] = useState("");
  const [contactError, setContactError] = useState("");

  const mouseX = useMotionValue(200);
  const mouseY = useMotionValue(200);

  const rotateX = useTransform(mouseY, [0, 400], [15, -15]);
  const rotateY = useTransform(mouseX, [0, 400], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const xVal = e.clientX - rect.left;
    const yVal = e.clientY - rect.top;
    mouseX.set((xVal / width) * 400);
    mouseY.set((yVal / height) * 400);
  };

  const handleMouseLeave = () => {
    mouseX.set(200);
    mouseY.set(200);
  };

  const showToast = (message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setCartPulse(true);
    setTimeout(() => setCartPulse(false), 400);
    showToast(`✅ Added ${product.name} to cart!`);
  };

  const removeFromCart = (productId: number) => {
    const item = cart.find((i) => i.id === productId);
    setCart((prev) => prev.filter((item) => item.id !== productId));
    if (item) {
      showToast(`✕ Removed ${item.name} from cart.`);
    }
  };

  const updateQty = (productId: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === productId) {
            const nextQty = item.qty + delta;
            return { ...item, qty: nextQty };
          }
          return item;
        })
        .filter((item) => item.qty > 0)
    );
  };

  const cartTotals = useMemo(() => {
    const totalItems = cart.reduce((acc, curr) => acc + curr.qty, 0);
    const subtotal = cart.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
    const shipping = subtotal > 0 && subtotal < 100 ? 9.99 : 0;
    const total = subtotal + shipping;
    return { totalItems, subtotal, shipping, total };
  }, [cart]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.type.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    if (categoryFilter !== "all") {
      if (categoryFilter === "sale") {
        result = result.filter((p) => p.oldPrice !== null);
      } else {
        result = result.filter((p) => p.category === categoryFilter);
      }
    }

    if (sortOption === "low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [categoryFilter, sortOption, searchQuery]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const sections = ["home", "categories", "showcase", "products", "sale", "contact"];
    const observerOptions = {
      root: container,
      rootMargin: "-30% 0px -30% 0px",
      threshold: 0.05
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((secId) => {
      const el = document.getElementById(secId);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: el.offsetTop,
        behavior: "smooth"
      });
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterError("");
    setNewsletterSuccess("");

    if (!newsletterEmail.trim()) {
      setNewsletterError("Email address is required.");
      return;
    }
    if (!newsletterEmail.includes("@")) {
      setNewsletterError("Please enter a valid email address.");
      return;
    }

    setNewsletterSuccess("Welcome to the squad! 10% off code sent to your inbox. 🎉");
    setNewsletterEmail("");
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactError("");
    setContactSuccess("");

    if (!contactName.trim()) {
      setContactError("Name is required.");
      return;
    }
    if (!contactEmail.includes("@")) {
      setContactError("Please enter a valid email address.");
      return;
    }
    if (contactMsg.trim().length < 10) {
      setContactError("Message must be at least 10 characters.");
      return;
    }

    setContactSuccess(`Thanks, ${contactName}! We'll get back to you soon. ⚡`);
    setContactName("");
    setContactEmail("");
    setContactMsg("");
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const msg =
      cartTotals.subtotal >= 100
        ? `Order placed successfully! Total: $${cartTotals.total.toFixed(2)} with FREE shipping! 🎉`
        : `Order placed! Total: $${cartTotals.total.toFixed(2)} (Add $${(100 - cartTotals.subtotal).toFixed(2)} more next time for free shipping).`;

    setCart([]);
    setCartOpen(false);
    showToast(`✅ ${msg}`);
  };

  return (
    <div className="h-screen w-screen bg-[#faf9f6] text-zinc-900 dark:bg-[#07080e] dark:text-zinc-100 flex flex-col selection:bg-orange-600 selection:text-white dark:selection:bg-orange-500 relative overflow-hidden transition-colors duration-500">

      {}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-45 hidden md:flex flex-col gap-4">
        {[
          { id: "home", label: "Home" },
          { id: "categories", label: "Categories" },
          { id: "showcase", label: "Showcase" },
          { id: "products", label: "Catalog" },
          { id: "sale", label: "Sale" },
          { id: "contact", label: "Contact" }
        ].map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className="group flex items-center justify-end gap-3.5 focus:outline-none"
            >
              <span className={`text-[10px] uppercase font-black tracking-widest transition-all duration-300 opacity-0 group-hover:opacity-100 text-orange-600 dark:text-orange-500 translate-x-2 group-hover:translate-x-0`}>
                {sec.label}
              </span>
              <span
                className={`h-2.5 rounded-full transition-all duration-500 border ${
                  isActive
                    ? "w-8 bg-orange-600 dark:bg-orange-500 border-orange-600 dark:border-orange-500"
                    : "w-2.5 bg-transparent border-zinc-300 dark:border-zinc-700 group-hover:border-zinc-400 dark:group-hover:border-zinc-500"
                }`}
              />
            </button>
          );
        })}
      </div>

      {}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            x: [0, 90, -50, 0],
            y: [0, -110, 70, 0],
            scale: [1, 1.25, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-orange-500/[0.06] dark:bg-orange-500/10 blur-[130px]"
        />
        <motion.div
          animate={{
            x: [0, -70, 90, 0],
            y: [0, 90, -110, 0],
            scale: [1, 0.9, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-20 -right-20 w-80 h-80 rounded-full bg-amber-500/[0.04] dark:bg-amber-500/10 blur-[110px]"
        />
      </div>

      {}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#faf9f6]/90 dark:bg-[#07080e]/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-900 transition-colors duration-500">

        {}
        <div className="bg-orange-600 text-white text-center py-2 px-4 text-[10px] sm:text-xs font-semibold tracking-widest uppercase">
          🚀 Free Delivery on orders over $100! | Use code <span className="font-bold underline">STEPUP10</span> for 10% off
        </div>

        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
          {}
          <button onClick={() => scrollToSection("home")} className="text-3xl font-black tracking-widest text-zinc-900 dark:text-white hover:opacity-90 transition-opacity">
            STEP<span className="text-orange-600 dark:text-orange-500">UP</span>
          </button>

          {}
          <nav className="hidden md:flex items-center gap-1">
            {["home", "categories", "showcase", "products", "sale", "contact"].map((link) => (
              <button
                key={link}
                onClick={() => scrollToSection(link)}
                className={`px-3 py-1.5 text-[11px] uppercase font-black tracking-widest transition-all ${
                  link === activeSection ? "text-orange-600 dark:text-orange-500" : "text-zinc-600 dark:text-zinc-350 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                <Link004 href={`#${link}`}>{link === "showcase" ? "gallery" : link} {link === "sale" && "🔥"}</Link004>
              </button>
            ))}
          </nav>

          {}
          <div className="flex items-center gap-3">

            {}
            <div className="relative hidden sm:flex items-center">
              <input
                type="text"
                placeholder="Search kicks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#f3f2ed] border border-zinc-200 dark:bg-[#0f1123] dark:border-zinc-800 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 w-44 md:w-56 transition-all duration-300 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 text-zinc-900 dark:text-zinc-100"
              />
              <Search className="absolute right-3.5 top-2.5 h-4.5 w-4.5 text-zinc-400 dark:text-zinc-500" />
            </div>

            {}
            <button
              onClick={() => {
                const nextTheme = theme === "dark" ? "light" : "dark";
                setTheme(nextTheme);
                showToast(nextTheme === "dark" ? "🌙 Dark theme activated!" : "☀️ Light theme activated!");
              }}
              className="p-2.5 bg-[#f3f2ed] hover:bg-[#e7e5dc] dark:bg-[#0f1123] dark:hover:bg-[#1c203f] rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-200 transition-all active:scale-90 group"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-amber-500 group-hover:rotate-[45deg] transition-transform duration-300" />
              ) : (
                <Moon className="h-5 w-5 text-indigo-500 group-hover:rotate-[-20deg] transition-transform duration-300" />
              )}
            </button>

            {}
            <motion.button
              onClick={() => setCartOpen(true)}
              animate={{ scale: cartPulse ? 1.25 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="relative p-2.5 bg-[#f3f2ed] hover:bg-[#e7e5dc] dark:bg-[#0f1123] dark:hover:bg-[#1c203f] rounded-full border border-zinc-200 dark:border-zinc-800 transition-all group"
            >
              <ShoppingBag className="h-5 w-5 text-zinc-700 dark:text-zinc-100 group-hover:text-orange-500 transition-colors" />
              <AnimatePresence>
                {cartTotals.totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1.5 -right-1.5 bg-orange-600 dark:bg-orange-500 text-white text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center border-2 border-[#faf9f6] dark:border-zinc-950 shadow-lg"
                  >
                    {cartTotals.totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 bg-[#f3f2ed] dark:bg-[#0f1123] hover:bg-[#e7e5dc] dark:hover:bg-[#1a1e3b] rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-200"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-[#faf9f6]/95 dark:bg-[#07080e]/95 overflow-hidden transition-colors duration-500"
            >
              <div className="px-6 py-4 flex flex-col gap-2.5">
                {}
                <div className="relative flex items-center mb-2">
                  <input
                    type="text"
                    placeholder="Search kicks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-[#f3f2ed] border border-zinc-200 dark:bg-[#0f1123] dark:border-zinc-800 rounded-full py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:border-orange-500 w-full placeholder:text-zinc-400 dark:placeholder:text-zinc-500 text-zinc-900 dark:text-zinc-100"
                  />
                  <Search className="absolute right-3.5 top-3 h-4.5 w-4.5 text-zinc-400 dark:text-zinc-500" />
                </div>
                {["home", "categories", "showcase", "products", "sale", "contact"].map((link) => (
                  <button
                    key={link}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      scrollToSection(link);
                    }}
                    className={`py-2.5 text-left text-sm uppercase font-bold tracking-widest border-b border-zinc-200 dark:border-zinc-900 last:border-0 ${
                      link === activeSection ? "text-orange-600 dark:text-orange-500" : "text-zinc-600 dark:text-zinc-300"
                    }`}
                  >
                    {link === "showcase" ? "gallery" : link} {link === "sale" && "🔥"}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {}
      <main
        ref={scrollContainerRef}
        className="flex-grow overflow-y-auto md:overflow-y-scroll md:snap-y md:snap-mandatory h-full w-full scroll-smooth select-none relative z-10 pt-28"
      >

        {}
        <section
          id="home"
          className="min-h-screen md:h-screen w-full md:snap-start flex-shrink-0 flex items-center relative overflow-hidden px-6 py-12 md:py-0 md:pt-16"
        >
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {}
            <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 border border-orange-500/25 rounded-full text-orange-600 dark:text-orange-500 text-xs font-bold tracking-wider uppercase mb-6 mx-auto lg:mx-0 w-fit"
              >
                <TrendingUp className="h-3.5 w-3.5" />
                New Drops Available
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl sm:text-7xl md:text-9xl font-black leading-[0.85] tracking-tight uppercase mb-6"
              >
                {heroShoe.name.split(" ")[0]}
                <br />
                <span className="text-orange-600 dark:text-orange-500 neon-glow">
                  {heroShoe.name.split(" ").slice(1).join(" ")}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-zinc-650 dark:text-zinc-400 text-base sm:text-lg mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light"
              >
                {heroShoe.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
              >
                <AnimatedButton
                  as="button"
                  onClick={() => addToCart(heroShoe)}
                  className="w-full sm:w-auto bg-orange-600 hover:bg-orange-500 text-white rounded-full px-8 py-3.5 text-xs font-black tracking-widest uppercase transition-all shadow-lg hover:shadow-orange-500/20 shadow-orange-500/10 border border-orange-600"
                >
                  Buy Now — ${heroShoe.price.toFixed(2)}
                </AnimatedButton>
                <button
                  onClick={() => scrollToSection("products")}
                  className="w-full sm:w-auto text-center border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-[#f3f2ed]/45 hover:bg-[#e7e5dc]/45 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/40 text-zinc-900 dark:text-white rounded-full px-8 py-3.5 text-xs font-black tracking-widest uppercase transition-all"
                >
                  Explore Catalogue
                </button>
              </motion.div>

              {}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 flex flex-col gap-3 items-center lg:items-start"
              >
                <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 dark:text-zinc-400">
                  Choose Model Showcase:
                </span>
                <div className="flex gap-3">
                  {[1, 5, 3].map((id) => {
                    const item = products.find((p) => p.id === id);
                    if (!item) return null;
                    const isActive = heroShoeId === id;
                    return (
                      <button
                        key={id}
                        onClick={() => setHeroShoeId(id)}
                        className={`relative w-16 h-16 rounded-xl border overflow-hidden p-1 bg-[#f3f2ed] dark:bg-[#0f1123] transition-all ${
                          isActive
                            ? "border-orange-600 dark:border-orange-500 scale-110 shadow-lg shadow-orange-500/10"
                            : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                        }`}
                      >
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover rounded-lg rotate-[-10deg]" />
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {}
            <div
              className="lg:col-span-6 flex justify-center items-center relative min-h-[350px] sm:min-h-[450px] cursor-grab active:cursor-grabbing"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ perspective: 1000 }}
            >
              <div className="absolute w-[280px] h-[280px] bg-orange-500/[0.06] dark:bg-orange-500/10 rounded-full filter blur-3xl opacity-60 z-0"></div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={heroShoeId}
                  initial={{ opacity: 0, scale: 0.8, x: 100, rotate: 15 }}
                  animate={{ opacity: 1, scale: 1, x: 0, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: -100, rotate: -15 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                  className="w-full flex justify-center items-center relative z-10"
                >
                  <img
                    src={heroShoe.img}
                    alt={heroShoe.name}
                    className="w-[85%] sm:w-[75%] object-contain drop-shadow-[0_25px_35px_rgba(251,91,54,0.22)] dark:drop-shadow-[0_25px_35px_rgba(251,91,54,0.35)] select-none pointer-events-none animate-float"
                  />
                </motion.div>
              </AnimatePresence>

              {heroShoe.tag === "New" && (
                <motion.div
                  initial={{ scale: 0, rotate: 20 }}
                  animate={{ scale: 1, rotate: -15 }}
                  transition={{ type: "spring", delay: 0.4 }}
                  className="absolute top-10 right-10 sm:right-20 bg-orange-600 text-white font-black text-xs px-4 py-1.5 rounded-full tracking-widest uppercase shadow-xl z-20"
                >
                  NEW 2026
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {}
        <section
          id="categories"
          className="min-h-screen md:h-screen w-full md:snap-start flex-shrink-0 flex flex-col items-center justify-center px-6 py-12 md:py-0 relative"
        >
          <div className="max-w-7xl mx-auto w-full">
            <div className="flex flex-col items-center mb-12">
              <span className="text-orange-600 dark:text-orange-500 text-xs font-black tracking-widest uppercase mb-3">Targeted Gears</span>
              <h2 className="text-5xl sm:text-6xl font-black uppercase text-center tracking-wider">Shop by Category</h2>
              <div className="h-1 w-20 bg-orange-600 mt-4 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "running",
                  label: "Running",
                  img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600",
                  count: "12 items"
                },
                {
                  name: "basketball",
                  label: "Basketball",
                  img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=600",
                  count: "12 items"
                },
                {
                  name: "lifestyle",
                  label: "Lifestyle",
                  img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600",
                  count: "12 items"
                }
              ].map((cat, idx) => (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, type: "spring" }}
                  whileHover={{ y: -8 }}
                  onClick={() => {
                    setCategoryFilter(cat.name);
                    scrollToSection("products");
                  }}
                  className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer border border-zinc-200 dark:border-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-800 transition-all shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#faf9f6] via-[#faf9f6]/20 to-transparent dark:from-[#07080e] dark:via-[#07080e]/40 z-10 transition-opacity duration-300"></div>

                  <img
                    src={cat.img}
                    alt={cat.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  <div className="absolute bottom-6 left-6 z-20">
                    <span className="text-[10px] text-orange-600 dark:text-orange-400 font-bold tracking-widest uppercase bg-orange-500/10 px-2.5 py-1 rounded-full border border-orange-500/20">
                      {cat.count}
                    </span>
                    <h3 className="text-3xl font-black uppercase text-zinc-900 dark:text-white mt-2.5 flex items-center gap-1 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                      {cat.label}
                      <ChevronRight className="h-6 w-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {}
        <section
          id="showcase"
          ref={showcaseRef}
          className="h-[300vh] w-full snap-start relative overflow-visible"
        >
          <div
            className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#faf9f6] dark:bg-[#07080e]"
          >
            {}
            <div className="absolute top-1/4 left-10 opacity-[0.02] dark:opacity-[0.03] select-none pointer-events-none">
              <span className="text-[18vw] font-black tracking-tighter uppercase text-zinc-900 dark:text-white leading-none">
                STEP UP
              </span>
            </div>

            {}
            <motion.div
              style={{ x: textX, opacity: textOpacity }}
              className="absolute w-max select-none pointer-events-none z-20 whitespace-nowrap will-change-transform-opacity"
            >
              <h2 className="text-[11vw] font-black uppercase text-transparent tracking-tighter leading-none dark:[-webkit-text-stroke:1.5px_rgba(255,255,255,0.14)] [-webkit-text-stroke:1.5px_rgba(0,0,0,0.12)]">
                CRAFTED FOR SPEED • DESIGNED FOR THE BOLD
              </h2>
            </motion.div>

            {}
            <motion.div
              style={{
                scale: gridScale,
                opacity: gridOpacity
              }}
              className="w-[140vw] h-[140vh] grid grid-cols-3 grid-rows-3 gap-4 md:gap-10 p-6 md:p-12 pointer-events-none will-change-transform-opacity"
            >
              {[
                { cellClass: "col-start-1 row-start-1", p: products[0] },
                { cellClass: "col-start-3 row-start-1", p: products[1] },
                { cellClass: "col-start-2 row-start-2", p: products[3] },
                { cellClass: "col-start-1 row-start-3", p: products[4] },
                { cellClass: "col-start-3 row-start-3", p: products[6] }
              ].map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => addToCart(item.p)}
                  className={`${item.cellClass} relative w-full h-full bg-[#f3f2ed] dark:bg-[#0c0d18] border border-zinc-200 dark:border-zinc-900 rounded-2xl md:rounded-[32px] overflow-hidden flex flex-col justify-between p-3 md:p-6 shadow-md will-change-transform-opacity pointer-events-auto group cursor-pointer hover:scale-[1.05] hover:shadow-xl dark:hover:shadow-orange-500/5 hover:border-orange-500 dark:hover:border-orange-500/40 transition-all duration-300`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[8px] md:text-[9px] uppercase tracking-widest font-black text-orange-600 bg-orange-500/10 px-2.5 py-1 rounded-full border border-orange-500/20">
                      {item.p.category}
                    </span>
                    <span className="text-[8px] md:text-[10px] font-bold text-zinc-500 dark:text-zinc-600">0{idx + 1}</span>
                  </div>

                  <div className="flex-grow flex items-center justify-center p-1 md:p-3 relative">
                    <img
                      src={item.p.img}
                      alt={item.p.name}
                      className="w-[75%] object-contain rotate-[-15deg] group-hover:rotate-[0deg] group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div>
                    <h4 className="text-[10px] sm:text-xs md:text-sm font-black uppercase text-zinc-800 dark:text-zinc-300 truncate">{item.p.name}</h4>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-zinc-500 text-[8px] md:text-[10px] uppercase font-bold tracking-wider">{item.p.type}</span>
                      <span className="text-[10px] md:text-xs font-black text-zinc-900 dark:text-white">${item.p.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none opacity-50">
              <span className="text-[9px] tracking-widest uppercase font-bold text-zinc-500 dark:text-zinc-400">Keep Scrolling</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-6 bg-zinc-300 dark:bg-zinc-700 rounded-full flex justify-center p-0.5"
              >
                <div className="w-1 h-1.5 bg-orange-500 rounded-full" />
              </motion.div>
            </div>
          </div>
        </section>

        {}
        <section
          id="products"
          className="min-h-screen md:h-screen w-full md:snap-start flex-shrink-0 flex flex-col items-center justify-center px-6 relative"
        >
          <div className="max-w-7xl mx-auto w-full flex flex-col h-full justify-center pt-24 pb-8">
            <div className="flex flex-col items-center mb-6">
              <span className="text-orange-600 dark:text-orange-500 text-xs font-black tracking-widest uppercase mb-2">Fresh Stock</span>
              <h2 className="text-4xl sm:text-5xl font-black uppercase text-center tracking-wider font-display">Featured Products</h2>
              <div className="h-1 w-20 bg-orange-600 mt-2 rounded-full"></div>
            </div>

            {}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 border-b border-zinc-200 dark:border-zinc-900 pb-4">
              <div className="flex flex-wrap items-center justify-center gap-2">
                {[
                  { value: "all", label: "All Items" },
                  { value: "running", label: "Running" },
                  { value: "basketball", label: "Basketball" },
                  { value: "lifestyle", label: "Lifestyle" },
                  { value: "sale", label: "On Sale 🔥" }
                ].map((tab) => {
                  const isActive = categoryFilter === tab.value;
                  return (
                    <button
                      key={tab.value}
                      onClick={() => setCategoryFilter(tab.value)}
                      className={`relative px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 border ${
                        isActive
                          ? "bg-orange-600 border-orange-600 text-white font-black shadow-lg shadow-orange-600/15"
                          : "bg-[#f3f2ed] border-zinc-200 hover:border-zinc-300 dark:bg-zinc-900 dark:border-zinc-800 dark:hover:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 dark:text-zinc-400">Sort:</span>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="bg-[#f3f2ed] border border-zinc-200 dark:bg-[#0f1123] dark:border-zinc-800 rounded-xl px-3 py-2 text-[11px] font-semibold focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 cursor-pointer text-zinc-700 dark:text-zinc-300"
                >
                  <option value="default">Default</option>
                  <option value="low">Price: Low-High</option>
                  <option value="high">Price: High-Low</option>
                  <option value="name">Name A–Z</option>
                </select>
              </div>
            </div>

            {}
            <div className="overflow-y-auto max-h-none md:max-h-[50vh] pr-2 scrollbar-thin">
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {filteredAndSortedProducts.length > 0 ? (
                    filteredAndSortedProducts.map((product) => (
                      <motion.div
                        layout
                        key={product.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 15 }}
                        transition={{ type: "spring", stiffness: 260, damping: 25 }}
                        whileHover={{ scale: 1.03, y: -6 }}
                        className="group relative flex flex-col justify-between bg-[#f3f2ed]/30 border border-zinc-200 dark:bg-zinc-900/30 dark:border-zinc-900 rounded-3xl p-4 hover:border-zinc-300 dark:hover:border-zinc-800 hover:bg-[#f3f2ed]/60 dark:hover:bg-zinc-900/50 transition-all duration-300"
                      >
                        {product.tag && (
                          <div
                            className={`absolute top-4 left-4 px-3.5 py-1 text-[9px] font-black tracking-widest uppercase rounded-full shadow-lg z-20 ${
                              product.tag === "New"
                                ? "bg-blue-600 text-white"
                                : "bg-orange-600 text-white animate-pulse"
                            }`}
                          >
                            {product.tag}
                          </div>
                        )}

                        <div className="w-full aspect-[4/3] rounded-2xl bg-[#f3f2ed]/80 dark:bg-[#07080e] overflow-hidden flex justify-center items-center border border-zinc-200 dark:border-zinc-950 p-3 relative">
                          <img
                            src={product.img}
                            alt={product.name}
                            className="w-[80%] object-contain rotate-[-12deg] group-hover:rotate-[-5deg] group-hover:scale-105 transition-all duration-500 drop-shadow-[0_10px_10px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_15px_15px_rgba(0,0,0,0.4)]"
                          />
                        </div>

                        <div className="mt-4 flex flex-col flex-grow">
                          <span className="text-[9px] uppercase font-bold tracking-widest text-zinc-500 dark:text-zinc-400">
                            {product.type}
                          </span>
                          <h4 className="text-xl font-black uppercase text-zinc-800 dark:text-zinc-100 mt-1 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                            {product.name}
                          </h4>

                          <div className="flex items-center gap-2 mt-3">
                            {product.oldPrice && (
                              <span className="text-xs line-through text-zinc-500 dark:text-zinc-400 font-normal">
                                ${product.oldPrice.toFixed(2)}
                              </span>
                            )}
                            <span className="text-base font-bold text-zinc-900 dark:text-white tracking-wide">
                              ${product.price.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-900/60">
                          <AnimatedButton
                            as="button"
                            onClick={() => addToCart(product)}
                            className="w-full bg-[#f3f2ed] hover:bg-orange-600 hover:border-orange-600 text-zinc-800 hover:text-white border border-zinc-200 dark:bg-zinc-900 dark:hover:bg-orange-600 dark:border-zinc-800 dark:hover:border-orange-600 dark:text-white text-zinc-800 hover:text-white rounded-2xl py-2.5 text-[10px] font-black tracking-widest uppercase transition-all duration-300 shadow-md group-hover:border-zinc-300 dark:group-hover:border-zinc-700"
                          >
                            Add to Cart
                          </AnimatedButton>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="col-span-full py-16 text-center text-zinc-500 flex flex-col items-center gap-3"
                    >
                      <p className="text-lg font-bold">No kicks found matches your criteria.</p>
                      <button
                        onClick={() => {
                          setCategoryFilter("all");
                          setSearchQuery("");
                        }}
                        className="text-xs text-orange-600 dark:text-orange-500 font-bold uppercase tracking-widest hover:underline"
                      >
                        Reset All Filters
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </section>

        {}
        <section
          id="sale"
          className="min-h-screen md:h-screen w-full md:snap-start flex-shrink-0 flex items-center justify-center px-6 py-12 md:py-0 relative"
        >
          <div className="max-w-2xl mx-auto text-center relative z-10">
            <span className="text-orange-600 dark:text-orange-500 text-xs font-black tracking-widest uppercase mb-3 block">Don't Miss Out</span>
            <h2 className="text-5xl sm:text-6xl font-black uppercase tracking-wider mb-4 font-display">Join The Club. Get 10% Off.</h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-md mx-auto mb-8 font-light leading-relaxed">
              Subscribe to receive priority access to limited edition drops, secret discounts, and design insights.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-grow bg-[#f3f2ed] border border-zinc-200 dark:bg-[#0f1123] dark:border-zinc-800 rounded-2xl py-3.5 px-5 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                />
                <AnimatedButton
                  as="button"
                  type="submit"
                  className="w-full sm:w-auto bg-orange-600 hover:bg-orange-500 text-white rounded-2xl py-3.5 px-8 text-xs font-black tracking-widest uppercase border border-orange-600 transition-all whitespace-nowrap"
                >
                  Subscribe
                </AnimatedButton>
              </div>
            </form>

            <AnimatePresence mode="wait">
              {newsletterSuccess && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-emerald-500 text-xs font-bold mt-4"
                >
                  {newsletterSuccess}
                </motion.p>
              )}
              {newsletterError && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[#ff5a36] text-xs font-bold mt-4"
                >
                  ❌ {newsletterError}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </section>

        {}
        <section
          id="contact"
          className="min-h-screen md:h-screen w-full md:snap-start flex-shrink-0 flex flex-col justify-between px-6 pt-28 pb-8 relative"
        >
          <div className="max-w-xl mx-auto w-full flex-grow flex flex-col justify-center">
            <div className="flex flex-col items-center mb-8">
              <span className="text-orange-600 dark:text-orange-500 text-xs font-black tracking-widest uppercase mb-2">Support Desk</span>
              <h2 className="text-4xl font-black uppercase text-center tracking-wider">Get In Touch</h2>
              <div className="h-1 w-20 bg-orange-600 mt-2 rounded-full"></div>
            </div>

            <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 dark:text-zinc-400">Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="bg-[#f3f2ed] border border-zinc-200 dark:bg-[#0f1123] dark:border-zinc-800 rounded-2xl py-3 px-4 text-xs focus:outline-none focus:border-orange-500 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-650"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 dark:text-zinc-400">Email</label>
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="bg-[#f3f2ed] border border-zinc-200 dark:bg-[#0f1123] dark:border-zinc-800 rounded-2xl py-3 px-4 text-xs focus:outline-none focus:border-orange-500 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-650"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 dark:text-zinc-400">Your Message</label>
                <textarea
                  placeholder="How can we help your stride?"
                  rows={3}
                  value={contactMsg}
                  onChange={(e) => setContactMsg(e.target.value)}
                  className="bg-[#f3f2ed] border border-zinc-200 dark:bg-[#0f1123] dark:border-zinc-800 rounded-2xl py-3 px-4 text-xs focus:outline-none focus:border-orange-500 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-650 resize-none"
                ></textarea>
              </div>

              <AnimatedButton
                as="button"
                type="submit"
                className="bg-[#f3f2ed] hover:bg-orange-600 border border-zinc-200 hover:border-orange-600 dark:bg-[#0f1123] dark:hover:bg-orange-600 dark:border-zinc-800 dark:hover:border-orange-600 text-zinc-900 dark:text-white hover:text-white rounded-2xl py-3 text-xs font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2"
              >
                Send Message
                <Send className="h-3 w-3" />
              </AnimatedButton>

              <AnimatePresence mode="wait">
                {contactSuccess && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-emerald-500 text-xs font-bold text-center mt-2"
                  >
                    {contactSuccess}
                  </motion.p>
                )}
                {contactError && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-[#ff5a36] text-xs font-bold text-center mt-2"
                  >
                    ❌ {contactError}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </div>

          {}
          <footer className="w-full border-t border-zinc-200 dark:border-zinc-900 mt-8 pt-6 text-zinc-500 dark:text-zinc-400 text-xs flex-shrink-0">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-lg font-black text-zinc-900 dark:text-white tracking-widest">
                  STEP<span className="text-orange-600">UP</span>
                </span>
                <span className="text-zinc-500 dark:text-zinc-400">|</span>
                <p className="text-zinc-500 dark:text-zinc-400">© 2026 StepUp Shoe Company.</p>
              </div>
              <div className="flex gap-4 text-zinc-400 dark:text-zinc-500">
                <a href="#" className="hover:underline">Privacy Terms</a>
                <a href="#" className="hover:underline">Legal Notices</a>
              </div>
            </div>
          </footer>
        </section>

      </main>

      {}
      <AnimatePresence>
        {cartOpen && (
          <>
            {}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 bg-[#07080e]/60 dark:bg-zinc-950/70 backdrop-blur-sm z-[80]"
            ></motion.div>

            {}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-[#faf9f6] dark:bg-[#0f1123] border-l border-zinc-200 dark:border-zinc-800 shadow-2xl z-[90] flex flex-col justify-between transition-colors duration-500"
            >

              {}
              <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                <h3 className="text-2xl font-black uppercase text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
                  <ShoppingBag className="h-5.5 w-5.5 text-orange-500" />
                  Your Bag
                </h3>
                <button
                  onClick={() => setCartOpen(false)}
                  className="p-1.5 hover:bg-[#e7e5dc] dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {}
              <div className="flex-grow p-6 overflow-y-auto flex flex-col gap-4">
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -15 }}
                      key={item.id}
                      className="flex items-center gap-4 bg-[#f3f2ed] dark:bg-zinc-950 p-4 border border-zinc-205 dark:border-zinc-800 rounded-2xl group"
                    >
                      <div className="w-16 h-16 rounded-xl bg-[#faf9f6] dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2 flex justify-center items-center overflow-hidden flex-shrink-0">
                        <img src={item.img} alt={item.name} className="w-full object-contain rotate-[-10deg] group-hover:rotate-0 transition-transform duration-300" />
                      </div>

                      <div className="flex-grow">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 group-hover:text-orange-500 transition-colors">
                          {item.name}
                        </h4>
                        <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block mt-0.5">{item.type}</span>
                        <div className="flex items-center gap-2.5 mt-2">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="p-1 bg-[#faf9f6] dark:bg-zinc-900 hover:bg-[#e7e5dc] dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-lg transition-all"
                          >
                            <Minus className="h-3 w-3 text-zinc-500 dark:text-zinc-400" />
                          </button>
                          <span className="text-xs font-bold text-zinc-900 dark:text-white w-4 text-center">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="p-1 bg-[#faf9f6] dark:bg-zinc-900 hover:bg-[#e7e5dc] dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-lg transition-all"
                          >
                            <Plus className="h-3 w-3 text-zinc-500 dark:text-zinc-400" />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <span className="text-sm font-bold text-zinc-900 dark:text-white">${(item.price * item.qty).toFixed(2)}</span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1.5 hover:bg-[#faf9f6] dark:hover:bg-zinc-900 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-[#ff5a36] transition-all"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center gap-4 text-zinc-400 dark:text-zinc-500">
                    <ShoppingBag className="h-12 w-12 text-zinc-300 dark:text-zinc-800 stroke-[1.5]" />
                    <p className="text-sm font-semibold tracking-wide">Your bag is currently empty.</p>
                  </div>
                )}
              </div>

              {}
              {cart.length > 0 && (
                <div className="p-6 border-t border-zinc-200 dark:border-zinc-800 bg-[#f3f2ed]/60 dark:bg-zinc-900/60">
                  <div className="flex flex-col gap-3 mb-6 text-sm text-zinc-500 dark:text-zinc-400">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span className="font-bold text-zinc-800 dark:text-white">${cartTotals.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery:</span>
                      <span className="font-bold text-orange-600 dark:text-orange-500">
                        {cartTotals.shipping === 0 ? "FREE 🎉" : `$${cartTotals.shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-1"></div>
                    <div className="flex justify-between items-center text-base">
                      <span className="font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-100">Total:</span>
                      <span className="font-black text-xl text-orange-600 dark:text-orange-500">${cartTotals.total.toFixed(2)}</span>
                    </div>
                  </div>

                  <AnimatedButton
                    as="button"
                    onClick={handleCheckout}
                    className="w-full bg-orange-600 hover:bg-orange-500 text-white border border-orange-600 rounded-2xl py-4 text-xs font-black tracking-widest uppercase transition-all shadow-xl"
                  >
                    Proceed To Checkout
                  </AnimatedButton>
                </div>
              )}

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              layout
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="bg-[#faf9f6] dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white rounded-full px-6 py-3 shadow-2xl flex items-center gap-2 pointer-events-auto text-[10px] sm:text-xs font-bold tracking-wide uppercase select-none w-max max-w-[90vw]"
            >
              <Check className="h-4 w-4 text-orange-600 dark:text-orange-500 stroke-[3]" />
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}
