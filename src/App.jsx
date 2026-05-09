import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";

/*
  Required packages:
  npm install framer-motion @iconify/react gsap

  Image setup:
  1. Add your photo in public folder:
     public/abhishek-pal.png

  2. Add portfolio images in public folder:
     public/portfolio-photography-course.png
     public/portfolio-fashion-ecommerce.png
     public/portfolio-preschool-website.png
     public/portfolio-dairy-equipment.png
     public/portfolio-ai-saas.png
     public/portfolio-doctor-clinic.png
*/

const PROFILE_IMAGE = "/abhishek-pal.png";

const WHATSAPP_NUMBER = "919971153106";
const CONTACT_EMAIL = "info@desipik.com";

const createWhatsAppLink = (
  message = "Hello, I want to discuss a website project."
) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const navLinks = [
  { label: "About Me", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

const stats = [
  { icon: "solar:case-round-bold", value: "50+", label: "Projects Delivered" },
  { icon: "solar:code-square-bold", value: "Full Stack", label: "Development" },
  { icon: "solar:medal-ribbons-star-bold", value: "5+", label: "Years Experience" },
  { icon: "solar:chart-2-bold", value: "100%", label: "Business Focused" },
];

const services = [
  {
    title: "MERN Stack Development",
    icon: "logos:react",
    desc: "Modern full stack web applications using MongoDB, Express.js, React.js, Node.js, API integration, dashboards, authentication, and scalable UI.",
  },
  {
    title: "PHP & Laravel Development",
    icon: "logos:laravel",
    desc: "Custom Laravel websites, ecommerce systems, admin panels, enquiry systems, product management, order flow, APIs, and secure backend logic.",
  },
  {
    title: "WordPress Website Development",
    icon: "logos:wordpress-icon",
    desc: "Business websites, Elementor layouts, custom themes, landing pages, speed optimization, SEO structure, forms, and plugin setup.",
  },
  {
    title: "Shopify Store Development",
    icon: "logos:shopify",
    desc: "Professional Shopify stores with product pages, collections, theme customization, conversion sections, app setup, and mobile-first design.",
  },
  {
    title: "Ecommerce Website Development",
    icon: "solar:cart-large-bold",
    desc: "Complete ecommerce websites with product catalogue, cart, checkout, coupon, enquiry CTA, WhatsApp integration, and admin management.",
  },
  {
    title: "API & Backend Integration",
    icon: "solar:server-bold",
    desc: "REST APIs, payment gateways, courier/shipping APIs, CRM forms, email setup, database structure, and third-party service integrations.",
  },
  {
    title: "UI/UX & Frontend Development",
    icon: "solar:smartphone-bold",
    desc: "Responsive interfaces using React, JavaScript, HTML, CSS, Tailwind CSS, Bootstrap, animations, and conversion-focused layouts.",
  },
  {
    title: "SEO Ready Website Structure",
    icon: "solar:ranking-bold",
    desc: "SEO-friendly page structure, meta-ready layouts, schema sections, performance improvements, internal linking support, and content-focused design.",
  },
];

const whyChoose = [
  {
    icon: "solar:code-square-bold",
    title: "Complete Full Stack Skillset",
    desc: "Frontend, backend, database, admin panel, API integration, and deployment-level planning.",
  },
  {
    icon: "solar:smartphone-update-bold",
    title: "Responsive & Modern UI",
    desc: "Clean professional layouts for mobile, tablet, laptop, and desktop screens.",
  },
  {
    icon: "solar:shield-check-bold",
    title: "Business Practical Approach",
    desc: "Websites built for leads, enquiries, product management, orders, and conversions.",
  },
  {
    icon: "solar:graph-up-bold",
    title: "SEO & Performance Focus",
    desc: "Proper headings, clean structure, faster loading mindset, and search-friendly sections.",
  },
];

const portfolio = [
  {
    title: "Photography Course Website",
    kicker: "Online Course Landing Page",
    keyword: "Photography Course Website Design",
    category: "Education",
    websiteType: "Course / Training Website",
    link: "https://example.com/photography-course-website",
    icon: "solar:camera-bold",
    image: "/portfolio-photography-course.png",
    desc: "Premium photography course website with hero video CTA, course cards, lead capture form, reviews and gift voucher section.",
    tags: ["Course UI", "Lead Form", "Mobile First"],
  },
  {
    title: "Fashion Ecommerce Store",
    kicker: "Premium Clothing Brand",
    keyword: "Fashion Ecommerce Website Design",
    category: "Ecommerce",
    websiteType: "Ecommerce Website",
    link: "https://example.com/fashion-ecommerce-store",
    icon: "solar:cart-large-bold",
    image: "/portfolio-fashion-ecommerce.png",
    desc: "Modern fashion ecommerce layout with product grid, category navigation, offers bar, new arrivals and trust badges.",
    tags: ["Product Grid", "Offers Bar", "Checkout Ready"],
  },
  {
    title: "Preschool Website",
    kicker: "Kids School Admission Website",
    keyword: "Preschool Website Design",
    category: "School",
    websiteType: "Preschool / School Website",
    link: "https://example.com/preschool-website",
    icon: "solar:book-2-bold",
    image: "/portfolio-preschool-website.png",
    desc: "Colorful preschool website with admission banner, activities, parent reviews, newsletter and child-friendly mobile design.",
    tags: ["Admission UI", "Activities", "Parent Reviews"],
  },
  {
    title: "Dairy Equipment Website",
    kicker: "B2B Manufacturing Website",
    keyword: "Dairy Equipment Manufacturer Website",
    category: "Manufacturer",
    websiteType: "B2B Manufacturer Website",
    link: "https://example.com/dairy-equipment-website",
    icon: "solar:buildings-3-bold",
    image: "/portfolio-dairy-equipment.png",
    desc: "Professional manufacturer website with industrial hero section, product category blocks, catalogue cards and enquiry CTAs.",
    tags: ["B2B UI", "Catalogue", "Enquiry CTA"],
  },
  {
    title: "AI SaaS Landing Page",
    kicker: "AI Powered Platform",
    keyword: "AI SaaS Landing Page Design",
    category: "SaaS",
    websiteType: "SaaS / AI Product Website",
    link: "https://example.com/ai-saas-landing-page",
    icon: "solar:magic-stick-3-bold",
    image: "/portfolio-ai-saas.png",
    desc: "Dark premium AI SaaS landing page with feature badges, pricing CTA, metrics cards and product positioning.",
    tags: ["SaaS UI", "Dark Theme", "Pricing CTA"],
  },
  {
    title: "Aesthetic Doctor Website",
    kicker: "Clinic & Treatments Website",
    keyword: "Doctor Clinic Website Design",
    category: "Healthcare",
    websiteType: "Doctor / Clinic Website",
    link: "https://example.com/doctor-clinic-website",
    icon: "solar:health-bold",
    image: "/portfolio-doctor-clinic.png",
    desc: "Elegant healthcare website for aesthetic clinic with treatment search, appointment CTA, service cards and trust metrics.",
    tags: ["Clinic UI", "Appointment", "Treatments"],
  },
];

const skillCards = [
  { name: "React", value: 92, icon: "logos:react" },
  { name: "Laravel", value: 90, icon: "logos:laravel" },
  { name: "WordPress", value: 95, icon: "logos:wordpress-icon" },
  { name: "Shopify", value: 84, icon: "logos:shopify" },
  { name: "PHP", value: 88, icon: "logos:php" },
  { name: "JavaScript", value: 91, icon: "logos:javascript" },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState("All");

  const categories = useMemo(
    () => ["All", ...new Set(portfolio.map((item) => item.category))],
    []
  );

  const filteredPortfolio =
    activeProject === "All"
      ? portfolio
      : portfolio.filter((item) => item.category === activeProject);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      gsap.utils.toArray(".gsap-fade-up").forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 34 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      gsap.utils.toArray(".gsap-scale").forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, scale: 0.96, y: 16 },
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      gsap.utils.toArray(".reveal-title").forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, yPercent: 12 },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.8,
            ease: "power4.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      gsap.utils.toArray(".reveal-card").forEach((el, index) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            delay: index * 0.035,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      mm.add("(min-width: 1024px)", () => {
        gsap.utils.toArray(".parallax-soft").forEach((el) => {
          gsap.to(el, {
            yPercent: -6,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.1,
            },
          });
        });
      });

      gsap.to(".hero-float", {
        y: -10,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.18,
      });

      gsap.to(".bg-orbit", {
        rotate: 360,
        duration: 34,
        repeat: -1,
        ease: "none",
      });
    });

    document.documentElement.style.scrollBehavior = "smooth";
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-[#FAF8F3] text-[#151515] antialiased">
      <BackgroundDecor />
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Services />
        <WhyChooseMe />
        <Portfolio
          categories={categories}
          activeProject={activeProject}
          setActiveProject={setActiveProject}
          filteredPortfolio={filteredPortfolio}
        />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Logo() {
  return (
    <a href="#home" className="flex items-center gap-3">
      <div className="relative flex h-11 w-12 items-center justify-center">
        <span className="absolute text-[34px] font-black leading-none tracking-[-0.18em] text-[#C89B43]">
          AP
        </span>
        <span className="absolute left-0 top-1 h-9 w-[2px] rotate-45 rounded-full bg-[#D9B66C]" />
      </div>
      <div>
        <h1 className="text-sm font-black uppercase leading-none tracking-[0.12em] text-[#111] sm:text-base">
          Abhishek Pal
        </h1>
        <p className="mt-1 text-[8px] font-bold uppercase tracking-[0.2em] text-[#5F5A50] sm:text-[9px]">
          Full Stack Developer
        </p>
      </div>
    </a>
  );
}

function Navbar({ menuOpen, setMenuOpen }) {
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed left-0 top-0 z-50 w-full px-3 pt-3 sm:px-4 lg:px-8">
      <div className="mx-auto max-w-[1440px] rounded-[24px] border border-white/70 bg-white/80 px-4 py-2.5 shadow-[0_18px_55px_rgba(30,30,30,0.10)] backdrop-blur-2xl sm:px-5">
        <div className="flex items-center justify-between">
          <Logo />

          <nav className="hidden items-center gap-7 lg:flex xl:gap-9">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group relative text-[13px] font-bold text-[#171717] transition hover:text-[#C89B43]"
              >
                {link.label}
                <span className="absolute -bottom-3 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#C89B43] opacity-0 transition group-hover:scale-150 group-hover:opacity-100" />
              </a>
            ))}
          </nav>

          <a
            href={createWhatsAppLink(
              "Hello, I want to discuss a full stack website project."
            )}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-[#D8A84D] to-[#B8862F] px-5 py-2.5 text-xs font-black text-white shadow-[0_12px_28px_rgba(200,155,67,0.3)] transition hover:-translate-y-0.5 lg:flex"
          >
            Hire Me
            <span className="grid h-7 w-7 place-items-center rounded-full bg-[#1D1D1D]">
              <Icon icon="solar:arrow-right-up-linear" width="16" />
            </span>
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-[70] grid h-10 w-10 place-items-center rounded-full bg-[#1D1D1D] text-white shadow-[0_10px_24px_rgba(0,0,0,0.18)] lg:hidden"
            aria-label="Toggle menu"
          >
            <Icon icon={menuOpen ? "mdi:close" : "mdi:menu"} width="23" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu overlay"
              onClick={closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[55] bg-black/45 backdrop-blur-sm lg:hidden"
            />

            <motion.aside
              initial={{ x: "-105%" }}
              animate={{ x: 0 }}
              exit={{ x: "-105%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="fixed left-0 top-0 z-[60] h-dvh w-[86vw] max-w-[360px] overflow-y-auto rounded-r-[26px] bg-[#111] p-5 text-white shadow-[25px_0_80px_rgba(0,0,0,0.35)] lg:hidden"
            >
              <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-3xl font-black tracking-[-0.14em] text-[#D8A84D]">
                    AP
                  </p>
                  <p className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-white/55">
                    Full Stack Developer
                  </p>
                </div>
                <button
                  onClick={closeMenu}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white"
                  aria-label="Close menu"
                >
                  <Icon icon="mdi:close" width="22" />
                </button>
              </div>

              <motion.nav
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.06 } },
                }}
                className="grid gap-2.5"
              >
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={closeMenu}
                    variants={{
                      hidden: { opacity: 0, x: -24 },
                      show: { opacity: 1, x: 0 },
                    }}
                    className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-black transition hover:bg-[#D8A84D] hover:text-[#151515]"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-[11px] text-[#D8A84D] transition group-hover:text-[#151515]">
                        0{index + 1}
                      </span>
                      {link.label}
                    </span>
                    <Icon icon="solar:arrow-right-up-linear" width="18" />
                  </motion.a>
                ))}
              </motion.nav>

              <div className="mt-6 rounded-2xl bg-[#D8A84D] p-4 text-[#151515]">
                <p className="text-[10px] font-black uppercase tracking-[0.22em]">
                  Available for work
                </p>
                <h3 className="mt-2 text-xl font-black leading-tight tracking-[-0.04em]">
                  MERN, Laravel, WordPress & Shopify projects.
                </h3>
                <a
                  href={createWhatsAppLink(
                    "Hello, I want to discuss a website development project."
                  )}
                  target="_blank"
                  rel="noreferrer"
                  onClick={closeMenu}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#151515] px-4 py-2.5 text-xs font-black text-white"
                >
                  Contact Now
                  <Icon icon="solar:arrow-right-linear" width="16" />
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const floatingIcons = [
    { icon: "logos:react", className: "top-8 left-8 sm:top-12 sm:left-12" },
    { icon: "logos:laravel", className: "top-16 right-7 sm:top-20 sm:right-10" },
    { icon: "logos:wordpress-icon", className: "bottom-28 left-5 sm:bottom-32 sm:left-8" },
    { icon: "logos:shopify", className: "bottom-24 right-6 sm:bottom-28 sm:right-8" },
    { icon: "logos:javascript", className: "top-[48%] left-0 sm:left-2" },
  ];

  return (
    <section
      id="home"
      className="relative z-10 overflow-hidden bg-[linear-gradient(135deg,#fff8ec_0%,#f8e8c8_38%,#fffdf8_68%,#f3dfb6_100%)] px-4 pb-12 pt-28 sm:px-5 sm:pt-32 lg:px-8 lg:pb-14 lg:pt-36"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_18%,rgba(216,168,77,0.28),transparent_32%),radial-gradient(circle_at_10%_85%,rgba(184,134,47,0.18),transparent_34%)]" />

      <div className="relative z-10 mx-auto max-w-[1440px]">
        <div className="flex flex-col-reverse items-center gap-8 lg:grid lg:min-h-[590px] lg:grid-cols-[1.08fr_0.92fr] lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="relative z-10 w-full"
          >
            <p className="mb-5 flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.24em] text-[#C89B43] sm:text-xs sm:tracking-[0.36em]">
              <span className="h-[2px] w-10 bg-[#C89B43]" />
              Full Stack Developer
            </p>

            <h2 className="reveal-title max-w-4xl font-serif text-[46px] font-bold leading-[1.05] tracking-[-0.045em] text-[#151515] min-[390px]:text-[52px] sm:text-6xl md:text-7xl xl:text-[92px]">
              Abhishek <span className="text-[#C89B43]">Pal</span>
            </h2>

            <div className="mt-5 inline-flex max-w-full rounded-full border border-[#ECE3D4] bg-white/90 px-4 py-2.5 text-[9px] font-black uppercase tracking-[0.14em] text-[#4C463D] shadow-sm backdrop-blur-xl sm:px-5 sm:text-[11px] md:tracking-[0.24em]">
              MERN Stack • PHP Laravel • WordPress • Shopify
              <span className="ml-2 text-[#C89B43]">✦</span>
            </div>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-[#55504A] sm:text-base sm:leading-8">
              I build premium full stack websites, ecommerce experiences, admin panels,
              dashboards, APIs, and business-focused digital platforms that help brands grow online.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#portfolio"
                className="group flex items-center gap-3 rounded-full bg-gradient-to-r from-[#D8A84D] to-[#B8862F] px-5 py-3 text-xs font-black text-white shadow-[0_16px_34px_rgba(200,155,67,0.3)] transition hover:-translate-y-0.5 sm:px-6 sm:text-sm"
              >
                Explore My Work
                <span className="grid h-7 w-7 place-items-center rounded-full bg-[#1D1D1D] transition group-hover:rotate-45">
                  <Icon icon="solar:arrow-right-linear" width="16" />
                </span>
              </a>

              <a
                href={createWhatsAppLink("Hello, I want to start a project.")}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full px-3 py-2.5 text-xs font-black text-[#151515] transition hover:text-[#C89B43] sm:text-sm"
              >
                Start a Project
                <Icon icon="solar:arrow-right-up-linear" className="text-[#C89B43]" width="18" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.12 }}
            className="parallax-soft relative mx-auto mt-2 flex h-[360px] w-full max-w-[380px] items-center justify-center sm:h-[460px] sm:max-w-[480px] md:h-[560px] md:max-w-[600px] lg:mt-0"
          >
            <div className="absolute h-[250px] w-[250px] rounded-full bg-gradient-to-br from-[#f6d28a] to-[#fff2d1] blur-[2px] sm:h-[350px] sm:w-[350px] md:h-[445px] md:w-[445px]" />
            <div className="bg-orbit absolute h-[285px] w-[285px] rounded-full border border-[#D8A84D]/40 sm:h-[400px] sm:w-[400px] md:h-[500px] md:w-[500px]" />

            {floatingIcons.map((item, index) => (
              <motion.div
                key={index}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3 + index, repeat: Infinity }}
                className={`absolute ${item.className} z-30 grid h-10 w-10 place-items-center rounded-xl border border-white/60 bg-white/92 shadow-[0_14px_38px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:h-12 sm:w-12 md:h-14 md:w-14`}
              >
                <Icon icon={item.icon} className="text-[22px] sm:text-[26px] md:text-[30px]" />
              </motion.div>
            ))}

            <div className="hero-float absolute right-0 top-14 z-30 hidden max-w-[210px] rounded-2xl border border-white/70 bg-white/88 p-4 shadow-[0_20px_60px_rgba(20,20,20,0.08)] backdrop-blur-xl md:block">
              <p className="text-xs font-bold text-[#C89B43]">Full Stack Developer</p>
              <h3 className="mt-3 max-w-[180px] text-lg font-bold leading-tight text-[#151515]">
                Building Modern Websites & Web Applications
              </h3>
              <div className="mt-4 h-[2px] w-10 bg-[#C89B43]" />
              <p className="mt-4 font-serif text-2xl italic text-[#C89B43]">
                Abhishek Pal
              </p>
            </div>

            <div className="absolute bottom-[64px] z-20 flex h-[220px] w-[220px] items-end justify-center overflow-hidden rounded-full border-[8px] border-white bg-white shadow-[0_24px_70px_rgba(216,168,77,0.26)] sm:bottom-[68px] sm:h-[310px] sm:w-[310px] md:h-[390px] md:w-[390px]">
              <div className="absolute inset-0 rounded-full border-[4px] border-dashed border-[#D8A84D]/40 animate-spin [animation-duration:18s]" />
              <img
                src={PROFILE_IMAGE}
                alt="Abhishek Pal"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
                className="relative z-10 h-full w-full object-contain object-bottom"
              />
            </div>

            <div className="absolute bottom-0 z-30 w-full rounded-2xl border border-white/60 bg-white/88 p-3.5 text-[#151515] shadow-[0_16px_45px_rgba(0,0,0,0.1)] backdrop-blur-xl sm:w-[92%] sm:p-4">
              <div className="flex items-center gap-3">
                <div className="text-4xl font-black tracking-[-0.18em] text-[#D8A84D]">
                  AP
                </div>
                <div className="h-10 w-px bg-[#D8A84D]/30" />
                <div>
                  <p className="font-serif text-2xl italic text-[#151515] md:text-3xl">
                    Abhishek Pal
                  </p>
                  <p className="mt-1 text-[8px] font-bold uppercase tracking-[0.2em] text-[#6c6458] sm:text-[9px]">
                    MERN • Laravel • WordPress • Shopify
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <StatsBar />
      </div>
    </section>
  );
}

function StatsBar() {
  return (
    <div className="relative z-20 mx-auto mt-8 grid max-w-[1360px] gap-3 rounded-2xl border border-white bg-white/90 p-3 shadow-[0_20px_60px_rgba(20,20,20,0.08)] backdrop-blur-xl sm:p-4 md:grid-cols-2 xl:grid-cols-[repeat(4,1fr)_1.4fr]">
      {stats.map((item) => (
        <div key={item.label} className="flex items-center gap-3 rounded-xl p-2.5">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#D5A24A] text-white">
            <Icon icon={item.icon} width="21" />
          </div>
          <div>
            <h3 className="text-xl font-black tracking-[-0.04em] sm:text-2xl">{item.value}</h3>
            <p className="text-xs text-[#5F5A50]">{item.label}</p>
          </div>
        </div>
      ))}

      <div className="hidden items-center gap-5 border-l border-[#E9E1D5] pl-7 xl:flex">
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#5F5A50]">
          Works On
        </p>
        <div className="flex items-center gap-4 text-sm font-black text-[#111]">
          <span>Web Apps</span>
          <span>Ecommerce</span>
          <span>CMS</span>
        </div>
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="section-padding relative z-10 px-4 sm:px-5 lg:px-8">
      <div className="mx-auto grid max-w-[1360px] gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="gsap-fade-up">
          <div className="mb-6 rounded-2xl border border-[#E8DFD1] bg-white/85 p-5 shadow-[0_18px_55px_rgba(20,20,20,0.06)] backdrop-blur-xl">
            <h3 className="font-serif text-5xl font-bold leading-none text-[#C89B43]">5+</h3>
            <p className="mt-3 text-xs font-black uppercase leading-6 tracking-[0.14em] text-[#151515]">
              Years of Development Experience
            </p>
          </div>

          <SectionMini title="About Me" />

          <SectionTitle>
            I Develop Complete Websites, Ecommerce Stores &{" "}
            <span className="text-[#C89B43]">Web Applications.</span>
          </SectionTitle>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#5F5A50] sm:text-base sm:leading-8">
            I am Abhishek Pal, a Full Stack Developer with practical experience in MERN Stack,
            PHP, Laravel, WordPress, and Shopify. I create websites that are easy to use,
            responsive, SEO-ready, and focused on generating real business enquiries.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5F5A50] sm:text-base sm:leading-8">
            I can manage the complete development process including UI design, frontend coding,
            backend logic, database, admin panel, API integration, ecommerce setup, and website optimization.
          </p>

          <p className="mt-5 font-serif text-3xl italic text-[#151515]">Abhishek Pal</p>
        </div>

        <div className="gsap-scale grid gap-0 overflow-hidden rounded-2xl border border-white bg-white shadow-[0_22px_65px_rgba(20,20,20,0.08)] sm:grid-cols-2">
          {services.slice(0, 4).map((service, index) => (
            <div
              key={service.title}
              className={`reveal-card p-5 ${index % 2 === 0 ? "sm:border-r" : ""} ${index < 2 ? "border-b" : ""
                } border-[#ECE3D4]`}
            >
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-[#F7F0E4] text-[#C89B43]">
                <Icon icon={service.icon} width="25" />
              </div>
              <h3 className="text-base font-black tracking-[-0.02em]">{service.title}</h3>
              <p className="mt-2 text-xs leading-6 text-[#665F56] sm:text-sm">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section-padding relative z-10 px-4 sm:px-5 lg:px-8">
      <div className="mx-auto max-w-[1360px]">
        <SectionHeader eyebrow="Skills" title="Full Stack Development Skills" />

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
          {skillCards.map((skill) => (
            <motion.div
              whileHover={{ y: -5 }}
              key={skill.name}
              className="gsap-scale rounded-2xl border border-white bg-white p-4 shadow-[0_16px_45px_rgba(20,20,20,0.06)]"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-[#fff5df] shadow-inner">
                  <Icon icon={skill.icon} width="23" />
                </div>

                <div className="text-right">
                  <p className="text-sm font-black text-[#151515]">{skill.name}</p>
                  <p className="text-[10px] font-bold text-[#8a7f70]">Expertise</p>
                </div>
              </div>

              <div className="mt-5 flex justify-center">
                <div
                  className="relative flex h-[96px] w-[96px] items-center justify-center rounded-full"
                  style={{
                    background: `conic-gradient(#D8A84D ${skill.value * 3.6}deg, #f1e8d7 0deg)`,
                  }}
                >
                  <div className="flex h-[80px] w-[80px] flex-col items-center justify-center rounded-full bg-white shadow-inner">
                    <span className="text-xl font-black text-[#151515]">{skill.value}%</span>
                    <span className="mt-1 text-[8px] font-bold uppercase tracking-[0.16em] text-[#8a7f70]">
                      Progress
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="section-padding relative z-10 px-4 sm:px-5 lg:px-8">
      <div className="mx-auto max-w-[1360px]">
        <SectionHeader eyebrow="Services" title="Development Services" />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <motion.div
              whileHover={{ y: -5 }}
              key={service.title}
              className="reveal-card rounded-2xl border border-white bg-white p-5 shadow-[0_16px_50px_rgba(20,20,20,0.06)] transition"
            >
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-[#F7F0E4] text-[#C89B43]">
                <Icon icon={service.icon} width="25" />
              </div>
              <h3 className="text-base font-black tracking-[-0.02em] text-[#151515]">
                {service.title}
              </h3>
              <p className="mt-2 text-xs leading-6 text-[#665F56] sm:text-sm">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChooseMe() {
  return (
    <section id="why-choose" className="section-padding relative z-10 px-4 sm:px-5 lg:px-8">
      <div className="mx-auto max-w-[1360px]">
        <div className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="gsap-fade-up">
            <SectionMini title="Why Choose Me" />
            <SectionTitle>
              One Developer For Complete Website Planning, Design & Development.
            </SectionTitle>
            <p className="mt-5 text-sm leading-7 text-[#5F5A50] sm:text-base sm:leading-8">
              I focus on clean design, practical backend functionality, mobile responsiveness,
              SEO-friendly structure, and business growth. Whether it is a portfolio website,
              ecommerce store, CMS website, or full stack web application, I can build it with a clear process.
            </p>
            <a
              href={createWhatsAppLink(
                "Hello, I want to discuss my website development project."
              )}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#151515] px-5 py-3 text-xs font-black text-white transition hover:-translate-y-0.5 hover:bg-[#C89B43] sm:text-sm"
            >
              Discuss Your Project
              <Icon icon="solar:arrow-right-up-linear" width="18" />
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {whyChoose.map((item) => (
              <div
                key={item.title}
                className="gsap-scale reveal-card rounded-2xl border border-white bg-white p-5 shadow-[0_18px_55px_rgba(20,20,20,0.07)]"
              >
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-[#F7F0E4] text-[#C89B43]">
                  <Icon icon={item.icon} width="26" />
                </div>
                <h3 className="text-lg font-black tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-2 text-xs leading-6 text-[#665F56] sm:text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Portfolio({
  categories,
  activeProject,
  setActiveProject,
  filteredPortfolio,
}) {
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    setActiveSlide(0);
    if (sliderRef.current) sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
  }, [activeProject]);

  const scrollToSlide = (index) => {
    if (!sliderRef.current || !filteredPortfolio.length) return;
    const slide = sliderRef.current.querySelector(`[data-slide-index="${index}"]`);
    if (!slide) return;
    sliderRef.current.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
    setActiveSlide(index);
  };

  const nextSlide = () => {
    if (!filteredPortfolio.length) return;
    scrollToSlide((activeSlide + 1) % filteredPortfolio.length);
  };

  const prevSlide = () => {
    if (!filteredPortfolio.length) return;
    scrollToSlide((activeSlide - 1 + filteredPortfolio.length) % filteredPortfolio.length);
  };

  const handleScroll = () => {
    if (!sliderRef.current) return;
    const scrollLeft = sliderRef.current.scrollLeft;
    const width = sliderRef.current.clientWidth;
    const index = Math.round(scrollLeft / width);
    setActiveSlide(Math.min(index, filteredPortfolio.length - 1));
  };

  return (
    <section id="portfolio" className="section-padding relative z-10 px-4 sm:px-5 lg:px-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-7 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="gsap-fade-up">
            <SectionMini title="Portfolio" />
            <h2 className="reveal-title mt-4 max-w-4xl text-[34px] font-black uppercase leading-[0.96] tracking-[-0.065em] text-[#151515] sm:text-[42px] md:text-6xl xl:text-[74px]">
              Selected Work <span className="text-[#C89B43]">Showcase</span>
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5F5A50] sm:text-base sm:leading-8">
              Responsive website portfolio with clear project category, strong image preview,
              and enquiry-focused call-to-action.
            </p>
          </div>

          <div className="flex max-w-3xl gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveProject(cat)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${activeProject === cat
                    ? "bg-[#151515] text-white"
                    : "border border-[#E6DDCF] bg-white text-[#5F5A50] hover:border-[#C89B43] hover:text-[#C89B43]"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="gsap-scale relative overflow-hidden rounded-2xl border border-white bg-[#111] shadow-[0_28px_90px_rgba(20,20,20,0.18)] sm:rounded-[28px]">
          <div
            ref={sliderRef}
            onScroll={handleScroll}
            className="salient-slider scrollbar-hide flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
          >
            <AnimatePresence mode="popLayout">
              {filteredPortfolio.map((item, index) => (
                <motion.article
                  data-slide-index={index}
                  layout
                  key={`${item.title}-${activeProject}`}
                  className="portfolio-slide-inner group relative min-w-full snap-start overflow-hidden bg-[radial-gradient(circle_at_85%_18%,rgba(216,168,77,0.22),transparent_28%),linear-gradient(135deg,#151515,#201A12_50%,#0D0D0D)] p-4 pb-20 text-white sm:p-6 lg:min-h-[560px] lg:p-8"
                >
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] opacity-35" />
                  <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#D8A84D]/20 blur-3xl" />
                  <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                  <div className="absolute right-6 top-6 hidden text-[110px] font-black uppercase leading-none tracking-[-0.12em] text-white/[0.035] lg:block">
                    0{index + 1}
                  </div>

                  <div className="relative z-10 grid gap-6 lg:min-h-[455px] lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-8">
                    <motion.div
                      initial={{ opacity: 0, rotate: -1, scale: 0.97 }}
                      whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7 }}
                      className="order-1 relative rounded-2xl border border-white/15 bg-white/10 p-3 shadow-[0_22px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-4 lg:order-2"
                    >
                      <div className="absolute -left-3 top-7 z-20 hidden rounded-xl bg-[#D8A84D] px-3 py-2 text-[#151515] shadow-[0_20px_45px_rgba(0,0,0,0.25)] lg:block">
                        <p className="text-[9px] font-black uppercase tracking-[0.2em]">Type</p>
                        <p className="mt-1 max-w-[190px] text-sm font-black leading-tight">
                          {item.websiteType}
                        </p>
                      </div>

                      <div className="overflow-hidden rounded-2xl bg-[#F6EFE2] p-2">
                        <div className="mb-2 hidden items-center justify-between px-2 pt-1 lg:flex">
                          <div className="flex gap-1.5">
                            <span className="h-2.5 w-2.5 rounded-full bg-[#E85C4A]" />
                            <span className="h-2.5 w-2.5 rounded-full bg-[#E8B84A]" />
                            <span className="h-2.5 w-2.5 rounded-full bg-[#52B788]" />
                          </div>
                          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#5F5A50]">
                            Live Preview
                          </p>
                        </div>

                        <div className="relative overflow-hidden rounded-xl bg-white shadow-[0_16px_42px_rgba(0,0,0,0.14)] sm:rounded-2xl">
                          <img
                            src={item.image}
                            alt={`${item.title} - ${item.websiteType}`}
                            className="block w-full object-contain"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://placehold.co/1400x900/151515/D8A84D?text=Portfolio+Image";
                            }}
                          />
                        </div>
                      </div>
                    </motion.div>

                    <div className="order-2 flex h-full flex-col justify-center lg:order-1">
                      <div>
                        <div className="mb-5 hidden items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 backdrop-blur-xl lg:inline-flex">
                          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#D8A84D] text-[#151515]">
                            <Icon icon={item.icon} width="18" />
                          </span>
                          <span className="text-[10px] font-black uppercase tracking-[0.24em] text-white/80">
                            {item.category}
                          </span>
                        </div>

                        <motion.p
                          initial={{ opacity: 0, y: 18 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          className="hidden text-[11px] font-black uppercase tracking-[0.36em] text-[#D8A84D] lg:block"
                        >
                          {item.kicker}
                        </motion.p>

                        <motion.h3
                          initial={{ opacity: 0, y: 28 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.08 }}
                          className="max-w-3xl text-[31px] font-black uppercase leading-[0.95] tracking-[-0.055em] sm:text-5xl md:text-6xl xl:text-[78px]"
                        >
                          {item.title}
                        </motion.h3>

                        <p className="mt-4 max-w-xl text-sm font-medium leading-7 text-white/72 sm:text-base sm:leading-8">
                          {item.desc}
                        </p>

                        <div className="mt-5 hidden items-center gap-3 rounded-xl border border-[#D8A84D]/35 bg-[#D8A84D]/12 px-4 py-3 text-[#F6D48B] lg:inline-flex">
                          <Icon icon="solar:monitor-smartphone-bold" width="22" />
                          <div>
                            <p className="text-[9px] font-black uppercase tracking-[0.22em] text-white/50">
                              Website Type
                            </p>
                            <p className="mt-1 text-sm font-black text-white">
                              {item.websiteType}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                        <a
                          href={createWhatsAppLink(
                            `Hello, I am interested in this portfolio project: ${item.title}. Website type: ${item.websiteType}. Please share details.`
                          )}
                          target="_blank"
                          rel="noreferrer"
                          className="group inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-black text-[#151515] transition hover:-translate-y-0.5 hover:bg-[#D8A84D] sm:px-5 sm:py-3"
                        >
                          View Project
                          <span className="grid h-7 w-7 place-items-center rounded-full bg-[#151515] text-white transition group-hover:rotate-45">
                            <Icon icon="solar:arrow-right-up-linear" width="16" />
                          </span>
                        </a>

                        <div className="flex flex-wrap gap-2">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-bold text-white/75 sm:text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-2.5 backdrop-blur-xl">
            {filteredPortfolio.map((item, index) => (
              <button
                key={item.title}
                onClick={() => scrollToSlide(index)}
                className={`h-2 rounded-full transition-all ${activeSlide === index
                    ? "w-8 bg-[#D8A84D]"
                    : "w-2 bg-white/35 hover:bg-white"
                  }`}
                aria-label={`Go to ${item.title}`}
              />
            ))}
          </div>

          <button
            onClick={prevSlide}
            className="absolute bottom-5 left-3 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-xl transition hover:bg-white hover:text-[#151515] md:h-12 md:w-12 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2"
            aria-label="Previous project"
          >
            <Icon icon="solar:arrow-left-linear" width="22" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute bottom-5 right-3 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-[#D8A84D] text-[#151515] backdrop-blur-xl transition hover:bg-white md:h-12 md:w-12 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2"
            aria-label="Next project"
          >
            <Icon icon="solar:arrow-right-linear" width="22" />
          </button>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const whatsappMessage = `New Website Development Enquiry\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService: ${formData.service}\nBudget / Timeline: ${formData.budget}\n\nMessage:\n${formData.message}`;

    window.open(createWhatsAppLink(whatsappMessage), "_blank");
  };

  return (
    <section id="contact" className="section-padding relative z-10 px-4 sm:px-5 lg:px-8">
      <div className="mx-auto grid max-w-[1360px] gap-7 lg:grid-cols-[1fr_1.1fr]">
        <div className="gsap-fade-up">
          <SectionMini title="Contact" />
          <SectionTitle>
            Let’s Build Your Website Or Web App{" "}
            <span className="text-[#C89B43]">Together.</span>
          </SectionTitle>
          <p className="mt-5 max-w-xl text-sm leading-7 text-[#5F5A50] sm:text-base sm:leading-8">
            Share your requirement and I will help you plan a website, ecommerce store,
            admin panel, WordPress website, Shopify store, Laravel project, or MERN stack application.
          </p>

          <div className="mt-7 grid gap-3">
            <ContactItem
              icon="solar:letter-bold"
              title="Email"
              text={CONTACT_EMAIL}
              href={`mailto:${CONTACT_EMAIL}`}
            />
            <ContactItem
              icon="solar:phone-bold"
              title="Phone"
              text="+91 9971153106"
              href="tel:+919971153106"
            />
            <ContactItem icon="solar:map-point-bold" title="Location" text="India" href="#" />
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="gsap-scale rounded-2xl border border-white bg-white p-4 shadow-[0_22px_70px_rgba(20,20,20,0.08)] md:p-6"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="rounded-xl border border-[#E8DFD1] bg-[#FFFEFB] px-4 py-3 text-sm outline-none transition focus:border-[#C89B43]"
              placeholder="Your Name"
            />
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="rounded-xl border border-[#E8DFD1] bg-[#FFFEFB] px-4 py-3 text-sm outline-none transition focus:border-[#C89B43]"
              placeholder="Your Email"
            />
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="rounded-xl border border-[#E8DFD1] bg-[#FFFEFB] px-4 py-3 text-sm outline-none transition focus:border-[#C89B43]"
              placeholder="Phone Number"
            />
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="rounded-xl border border-[#E8DFD1] bg-[#FFFEFB] px-4 py-3 text-sm text-[#5F5A50] outline-none transition focus:border-[#C89B43]"
            >
              <option value="">Select Service</option>
              {services.map((service) => (
                <option key={service.title} value={service.title}>
                  {service.title}
                </option>
              ))}
            </select>
            <input
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="rounded-xl border border-[#E8DFD1] bg-[#FFFEFB] px-4 py-3 text-sm outline-none transition focus:border-[#C89B43] md:col-span-2"
              placeholder="Estimated Budget / Timeline"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="6"
              className="rounded-xl border border-[#E8DFD1] bg-[#FFFEFB] px-4 py-3 text-sm outline-none transition focus:border-[#C89B43] md:col-span-2"
              placeholder="Tell me about your project"
            />
            <button
              type="submit"
              className="group flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#D8A84D] to-[#B8862F] px-5 py-3 text-sm font-black text-white shadow-[0_16px_34px_rgba(200,155,67,0.28)] transition hover:-translate-y-0.5 md:col-span-2"
            >
              Send Project Enquiry
              <span className="grid h-7 w-7 place-items-center rounded-full bg-[#1D1D1D] transition group-hover:rotate-45">
                <Icon icon="solar:arrow-right-linear" width="16" />
              </span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function ContactItem({ icon, title, text, href }) {
  return (
    <a
      href={href}
      className="flex items-center gap-4 rounded-2xl border border-white bg-white p-4 shadow-[0_14px_42px_rgba(20,20,20,0.06)] transition hover:-translate-y-0.5 hover:border-[#C89B43]/40"
    >
      <span className="grid h-10 w-10 place-items-center rounded-full bg-[#F7F0E4] text-[#C89B43]">
        <Icon icon={icon} width="20" />
      </span>
      <span>
        <span className="block text-sm font-black">{title}</span>
        <span className="mt-1 block text-xs text-[#5F5A50] sm:text-sm">{text}</span>
      </span>
    </a>
  );
}

function SectionMini({ title }) {
  return (
    <p className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#151515] sm:text-xs">
      <span className="text-[#C89B43]">✦</span> {title}
    </p>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 className="reveal-title mt-4 max-w-3xl font-serif text-[30px] font-bold leading-[1.15] tracking-[-0.03em] text-[#151515] sm:text-[36px] md:text-[42px] xl:text-[50px]">
      {children}
    </h2>
  );
}

function SectionHeader({ eyebrow, title, noMargin }) {
  return (
    <div className={noMargin ? "" : "mb-8 gsap-fade-up"}>
      <SectionMini title={eyebrow} />
      <h2 className="reveal-title mt-4 max-w-4xl text-[30px] font-black leading-[1.02] tracking-[-0.045em] text-[#151515] sm:text-[36px] md:text-[42px] xl:text-[52px]">
        {title}
      </h2>
    </div>
  );
}

function BackgroundDecor() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_15%_12%,rgba(216,168,77,0.12),transparent_28%),radial-gradient(circle_at_90%_20%,rgba(216,168,77,0.1),transparent_30%),linear-gradient(180deg,#FFFEFB,#FAF8F3)]" />
      <div className="pointer-events-none fixed left-[-150px] top-[380px] z-0 h-[300px] w-[300px] rounded-full border border-[#D8A84D]/25" />
      <div className="pointer-events-none fixed right-[-120px] top-[220px] z-0 h-[230px] w-[230px] rounded-full border border-[#D8A84D]/22" />
      <div className="pointer-events-none fixed bottom-8 left-2 z-0 text-[120px] font-black tracking-[-0.18em] text-[#C89B43]/5">
        AP
      </div>
      <style>{`
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: #0f0f0f; border-radius: 50px; }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #E5C27A 0%, #D8A84D 45%, #B8862F 100%);
          border-radius: 50px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #F2D08D 0%, #E0B45B 45%, #C89B43 100%);
        }
        ::-webkit-scrollbar-corner { background: #0f0f0f; }
        html { scrollbar-width: thin; scrollbar-color: #D8A84D #0f0f0f; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .salient-slider { scroll-snap-type: x mandatory; }
        .reveal-title, .gsap-fade-up, .gsap-scale, .reveal-card, .portfolio-slide-inner {
          will-change: transform, opacity;
        }
        .reveal-title {
          text-wrap: balance;
        }
        body {
          text-rendering: geometricPrecision;
        }
        .section-padding {
          padding-top: 3.5rem;
          padding-bottom: 3.5rem;
        }
        @media (min-width: 640px) {
          .section-padding {
            padding-top: 4rem;
            padding-bottom: 4rem;
          }
        }
        @media (min-width: 1024px) {
          .section-padding {
            padding-top: 4.5rem;
            padding-bottom: 4.5rem;
          }
        }
      `}</style>
    </>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-[#E8DFD1] px-4 py-6 sm:px-5 lg:px-8">
      <div className="mx-auto flex max-w-[1360px] flex-col items-center justify-between gap-4 text-center md:flex-row">
        <Logo />
        <p className="text-xs text-[#5F5A50] sm:text-sm">
          © {new Date().getFullYear()} Abhishek Pal Full Stack Developer. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default App;
