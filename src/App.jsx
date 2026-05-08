import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";

/*
  Required packages:
  npm install framer-motion @iconify/react gsap

  Image setup:
  1. Add your photo in public folder, example: public/abhishek-pal.png
  2. Add these portfolio images in public folder with the same names:
     public/portfolio-photography-course.png
     public/portfolio-fashion-ecommerce.png
     public/portfolio-preschool-website.png
     public/portfolio-dairy-equipment.png
     public/portfolio-ai-saas.png
     public/portfolio-doctor-clinic.png

  3. Portfolio images are shown inside the right-side preview column, not as background images.
     Suggested size: 1920x1080 or 1600x1000.
*/

const PROFILE_IMAGE = "/abhishek-pal.png";

const WHATSAPP_NUMBER = "919971153106";
const CONTACT_EMAIL = "info@desipik.com";

const createWhatsAppLink = (message = "Hello, I want to discuss a website project.") =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const createMailToLink = ({ name, email, phone, service, budget, message }) => {
  const subject = "New Website Project Enquiry - DesiPik";
  const body = `Name: ${name || ""}
Email: ${email || ""}
Phone: ${phone || ""}
Service: ${service || ""}
Budget / Timeline: ${budget || ""}

Message:
${message || ""}`;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};


const navLinks = [
  { label: "About Me", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Why Choose Me", href: "#why-choose" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

const stats = [
  { icon: "solar:case-round-bold", value: "50+", label: "Projects Delivered" },
  { icon: "solar:users-group-rounded-bold", value: "30+", label: "Happy Clients" },
  { icon: "solar:medal-ribbons-star-bold", value: "5+", label: "Years Experience" },
  { icon: "solar:chart-2-bold", value: "100%", label: "Growth Focused" },
];

const services = [
  {
    title: "Ecommerce Website Design",
    icon: "solar:cart-large-bold",
    desc: "High-converting ecommerce websites with product pages, cart flow, enquiry CTA, WhatsApp integration, and mobile-first UI.",
  },
  {
    title: "Business Website Development",
    icon: "solar:monitor-bold",
    desc: "Professional websites for companies, agencies, manufacturers, service providers, and personal brands.",
  },
  {
    title: "Brand Identity Design",
    icon: "solar:pen-new-round-bold",
    desc: "Premium logo direction, color system, typography, brand style, and visual communication for modern businesses.",
  },
  {
    title: "UI/UX Design",
    icon: "solar:smartphone-bold",
    desc: "Clean website and app interfaces designed for better trust, readability, navigation, and conversions.",
  },
  {
    title: "Digital Marketing & SEO",
    icon: "solar:ranking-bold",
    desc: "SEO-ready structure, keyword-focused content sections, landing page strategy, and conversion optimization.",
  },
  {
    title: "Creative Content Design",
    icon: "solar:camera-bold",
    desc: "Social media creatives, ad banners, portfolio visuals, campaign assets, and premium digital content design.",
  },
];

const whyChoose = [
  {
    icon: "solar:target-bold",
    title: "Conversion-Focused Design",
    desc: "Every section is planned to guide visitors toward enquiry, trust, and business action.",
  },
  {
    icon: "solar:smartphone-update-bold",
    title: "Fully Responsive UI",
    desc: "Your website looks premium on mobile, tablet, laptop, and large desktop screens.",
  },
  {
    icon: "solar:code-square-bold",
    title: "Clean React Code",
    desc: "Reusable sections, smooth animations, modern UI structure, and easy customization.",
  },
  {
    icon: "solar:graph-up-bold",
    title: "SEO & Growth Ready",
    desc: "Content is written with keyword-friendly headings and business-focused positioning.",
  },
];

const skills = [
  ["Figma", "logos:figma"],
  ["Photoshop", "logos:adobe-photoshop"],
  ["Illustrator", "logos:adobe-illustrator"],
  ["HTML", "logos:html-5"],
  ["CSS", "logos:css-3"],
  ["JavaScript", "logos:javascript"],
  ["React", "logos:react"],
  ["WordPress", "logos:wordpress-icon"],
  ["Laravel", "logos:laravel"],
  ["SEO", "solar:ranking-bold"],
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
    desc: "Premium photography course website with hero video CTA, course cards, lead capture form, mobile layout, reviews and gift voucher section.",
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
    desc: "Modern fashion ecommerce layout with product grid, category navigation, offers bar, new arrivals, best sellers and trust badges.",
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
    desc: "Colorful preschool website with admission banner, activities, parent reviews, newsletter, contact details and child-friendly mobile design.",
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
    desc: "Professional manufacturer website with industrial hero section, product category blocks, machine catalogue cards and enquiry-focused CTAs.",
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
    desc: "Dark premium AI SaaS landing page with feature badges, pricing CTA, brand trust row, metrics cards and high-conversion product positioning.",
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
    desc: "Elegant healthcare website for aesthetic clinic with treatment search, appointment CTA, service cards, trust metrics and responsive mobile UI.",
    tags: ["Clinic UI", "Appointment", "Treatments"],
  },
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
          { autoAlpha: 0, y: 56 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 84%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      gsap.utils.toArray(".gsap-scale").forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, scale: 0.92, y: 24 },
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      gsap.utils.toArray(".reveal-title").forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, yPercent: 18, rotateX: -12 },
          {
            autoAlpha: 1,
            yPercent: 0,
            rotateX: 0,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: el,
              start: "top 86%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      gsap.utils.toArray(".reveal-card").forEach((el, index) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 44, rotate: index % 2 ? 1.4 : -1.4 },
          {
            autoAlpha: 1,
            y: 0,
            rotate: 0,
            duration: 0.85,
            delay: index * 0.04,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      mm.add("(min-width: 1024px)", () => {
        gsap.utils.toArray(".parallax-soft").forEach((el) => {
          gsap.to(el, {
            yPercent: -10,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.1,
            },
          });
        });

        gsap.utils.toArray(".portfolio-slide-inner").forEach((el) => {
          gsap.fromTo(
            el,
            { scale: 0.96 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            }
          );
        });
      });

      gsap.to(".hero-float", {
        y: -16,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2,
      });

      gsap.to(".bg-orbit", {
        rotate: 360,
        duration: 30,
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
    <a href="#home" className="flex items-center gap-4">
      <div className="relative flex h-14 w-16 items-center justify-center">
        <span className="absolute text-[46px] font-black leading-none tracking-[-0.18em] text-[#C89B43]">
          AP
        </span>
        <span className="absolute left-0 top-1 h-12 w-[2px] rotate-45 rounded-full bg-[#D9B66C]" />
      </div>
      <div>
        <h1 className="text-lg font-black uppercase leading-none tracking-[0.14em] text-[#111] sm:text-xl">
          Abhishek Pal
        </h1>
        <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.38em] text-[#5F5A50] sm:text-[10px]">
          Creative Agency
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
    <header className="fixed left-0 top-0 z-50 w-full px-3 pt-3 sm:px-4 sm:pt-4 lg:px-10">
      <div className="mx-auto max-w-[1800px] rounded-[22px] border border-white bg-white/88 px-4 py-3 shadow-[0_20px_70px_rgba(30,30,30,0.08)] backdrop-blur-2xl sm:rounded-[28px] sm:px-6 sm:py-4">
        <div className="flex items-center justify-between">
          <Logo />

          <nav className="hidden items-center gap-9 xl:gap-12 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group relative text-sm font-semibold text-[#171717] transition hover:text-[#C89B43]"
              >
                {link.label}
                <span className="absolute -bottom-4 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#C89B43] opacity-0 transition group-hover:scale-150 group-hover:opacity-100" />
              </a>
            ))}
          </nav>

          <a
            href={createWhatsAppLink("Hello, I want to discuss a website project.")}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-3 rounded-full bg-gradient-to-r from-[#D8A84D] to-[#B8862F] px-7 py-4 text-sm font-bold text-white shadow-[0_15px_35px_rgba(200,155,67,0.35)] transition hover:-translate-y-1 lg:flex"
          >
            Let’s Work Together
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#1D1D1D]">
              <Icon icon="solar:arrow-right-up-linear" width="20" />
            </span>
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-[70] grid h-11 w-11 place-items-center rounded-full bg-[#1D1D1D] text-white shadow-[0_12px_30px_rgba(0,0,0,0.18)] lg:hidden"
            aria-label="Toggle menu"
          >
            <Icon icon={menuOpen ? "mdi:close" : "mdi:menu"} width="25" />
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
              className="fixed left-0 top-0 z-[60] h-dvh w-[86vw] max-w-[390px] overflow-y-auto rounded-r-[34px] bg-[#111] p-6 text-white shadow-[25px_0_80px_rgba(0,0,0,0.35)] lg:hidden"
            >
              <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-3xl font-black tracking-[-0.14em] text-[#D8A84D]">AP</p>
                  <p className="mt-1 text-xs font-black uppercase tracking-[0.26em] text-white/55">
                    Creative Agency
                  </p>
                </div>
                <button
                  onClick={closeMenu}
                  className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white"
                  aria-label="Close menu"
                >
                  <Icon icon="mdi:close" width="24" />
                </button>
              </div>

              <motion.nav
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.07 } },
                }}
                className="grid gap-3"
              >
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={closeMenu}
                    variants={{
                      hidden: { opacity: 0, x: -28 },
                      show: { opacity: 1, x: 0 },
                    }}
                    className="group flex items-center justify-between rounded-3xl border border-white/10 bg-white/[0.06] px-5 py-4 text-base font-black transition hover:bg-[#D8A84D] hover:text-[#151515]"
                  >
                    <span className="flex items-center gap-4">
                      <span className="text-xs text-[#D8A84D] transition group-hover:text-[#151515]">
                        0{index + 1}
                      </span>
                      {link.label}
                    </span>
                    <Icon icon="solar:arrow-right-up-linear" width="20" />
                  </motion.a>
                ))}
              </motion.nav>

              <div className="mt-8 rounded-[28px] bg-[#D8A84D] p-5 text-[#151515]">
                <p className="text-xs font-black uppercase tracking-[0.25em]">Ready to start?</p>
                <h3 className="mt-3 text-2xl font-black leading-tight tracking-[-0.04em]">
                  Let’s build your next premium website.
                </h3>
                <a
                  href={createWhatsAppLink("Hello, I want to start a website project.")}
                  target="_blank"
                  rel="noreferrer"
                  onClick={closeMenu}
                  className="mt-5 inline-flex items-center gap-3 rounded-full bg-[#151515] px-5 py-3 text-sm font-black text-white"
                >
                  Contact Now
                  <Icon icon="solar:arrow-right-linear" width="18" />
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
  return (
    <section id="home" className="relative z-10 px-5 pb-12 pt-32 sm:pt-36 lg:px-10 lg:pt-44">
      <div className="mx-auto max-w-[1700px]">
        <div className="flex min-h-[auto] flex-col-reverse items-center gap-12 lg:grid lg:min-h-[680px] lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <p className="mb-8 flex items-center gap-5 text-xs font-black uppercase tracking-[0.36em] text-[#C89B43] sm:text-sm sm:tracking-[0.5em]">
              <span className="h-[2px] w-14 bg-[#C89B43]" />
              Creative Agency
            </p>

            <h2 className="reveal-title max-w-5xl text-[46px] font-black uppercase leading-[0.88] tracking-[-0.075em] min-[390px]:text-[52px] sm:text-7xl md:text-8xl xl:text-[116px]">
              Abhishek <span className="text-[#C89B43]">Pal</span>
            </h2>

            <div className="mt-6 inline-flex max-w-full rounded-full border border-[#ECE3D4] bg-white px-5 py-3 text-[10px] font-black uppercase tracking-[0.18em] text-[#4C463D] shadow-sm sm:px-6 sm:text-xs md:tracking-[0.35em]">
              Premium Web Design • Branding • Growth Marketing
              <span className="ml-3 text-[#C89B43]">✦</span>
            </div>

            <p className="mt-8 max-w-2xl text-base leading-8 text-[#55504A] md:text-lg md:leading-9">
              I build premium websites, ecommerce experiences, brand identities,
              and digital marketing assets that help businesses look professional,
              generate enquiries, and grow with confidence.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <a
                href="#portfolio"
                className="group flex items-center gap-4 rounded-full bg-gradient-to-r from-[#D8A84D] to-[#B8862F] px-7 py-4 text-sm font-black text-white shadow-[0_18px_40px_rgba(200,155,67,0.32)] transition hover:-translate-y-1"
              >
                Explore My Work

                <span className="grid h-8 w-8 place-items-center rounded-full bg-[#1D1D1D] transition group-hover:rotate-45">
                  <Icon icon="solar:arrow-right-linear" width="18" />
                </span>
              </a>

              <a
                href={createWhatsAppLink("Hello, I want to start a project.")}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-full px-4 py-3 text-sm font-black text-[#151515] transition hover:text-[#C89B43]"
              >
                Start a Project

                <Icon
                  icon="solar:arrow-right-up-linear"
                  className="text-[#C89B43]"
                  width="20"
                />
              </a>
            </div>
          </motion.div>

          {/* RIGHT IMAGE SECTION */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="parallax-soft relative mx-auto mt-4 flex h-[430px] w-full max-w-[420px] items-center justify-center sm:h-[560px] sm:max-w-[560px] md:h-[650px] md:max-w-[680px] lg:mt-0"
          >

            {/* BACKGROUND CIRCLE */}
            <div className="absolute h-[300px] w-[300px] rounded-full bg-[#F1D59D] sm:h-[420px] sm:w-[420px] md:h-[520px] md:w-[520px]" />

            {/* ORBIT */}
            <div className="bg-orbit absolute h-[340px] w-[340px] rounded-full border border-[#D8A84D]/40 sm:h-[470px] sm:w-[470px] md:h-[580px] md:w-[580px]" />

            {/* FLOATING CARD */}
            <div className="hero-float absolute hidden md:block right-2 top-3 z-30 max-w-[170px] rounded-[20px] border border-white bg-white/90 p-3 shadow-[0_25px_80px_rgba(20,20,20,0.1)] backdrop-blur-xl sm:right-0 sm:top-20 sm:max-w-none sm:rounded-[30px] sm:p-5 md:p-7">
              <p className="text-sm font-bold text-[#C89B43]">
                Creative Director
              </p>

              <h3 className="mt-4 max-w-[210px] text-xl font-bold leading-tight md:text-2xl">
                Turning Ideas Into Impactful Digital Brands
              </h3>

              <div className="mt-6 h-[2px] w-12 bg-[#C89B43]" />

              <p className="mt-5 font-serif text-3xl italic text-[#C89B43]">
                Abhishek Pal
              </p>
            </div>

            {/* PROFILE IMAGE */}
            <div className="absolute bottom-[82px] z-20 flex h-[260px] w-[260px] items-end justify-center overflow-hidden rounded-full sm:bottom-[80px] sm:h-[380px] sm:w-[380px] md:h-[470px] md:w-[470px]">

              <img
                src={PROFILE_IMAGE}
                alt="Abhishek Pal"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
                className="h-full w-full object-contain object-bottom"
              />
            </div>

            {/* BLACK INFO CARD */}
            <div className="absolute bottom-0 z-30 w-full rounded-[20px] bg-[#171717] p-4 text-white shadow-[0_20px_60px_rgba(0,0,0,0.25)] sm:w-[92%] sm:rounded-[26px] sm:p-5 md:p-6">

              <div className="flex items-center gap-5">
                <div className="text-5xl font-black tracking-[-0.18em] text-[#D8A84D]">
                  AP
                </div>

                <div className="h-12 w-px bg-white/20" />

                <div>
                  <p className="font-serif text-3xl italic text-white md:text-4xl">
                    Abhishek Pal
                  </p>

                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.25em] text-white/60">
                    Web Designer • Brand Strategist
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
    <div className="relative z-20 mx-auto mt-10 grid max-w-[1600px] gap-4 rounded-[26px] border border-white bg-white/90 p-5 shadow-[0_24px_80px_rgba(20,20,20,0.08)] backdrop-blur-xl md:grid-cols-2 xl:grid-cols-[repeat(4,1fr)_1.7fr]">
      {stats.map((item) => (
        <div key={item.label} className="flex items-center gap-5 rounded-2xl p-3">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#D5A24A] text-white">
            <Icon icon={item.icon} width="25" />
          </div>
          <div>
            <h3 className="text-3xl font-black tracking-[-0.04em]">{item.value}</h3>
            <p className="text-sm text-[#5F5A50]">{item.label}</p>
          </div>
        </div>
      ))}

      <div className="hidden items-center gap-8 border-l border-[#E9E1D5] pl-10 xl:flex">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-[#5F5A50]">
          Built For
        </p>
        <div className="flex items-center gap-6 text-lg font-black text-[#111]">
          <span>Brands</span>
          <span>Startups</span>
          <span>Ecommerce</span>
        </div>
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="relative z-10 px-5 py-16 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto grid max-w-[1600px] gap-10 lg:grid-cols-[0.75fr_1fr_1.15fr]">
        <div className="gsap-fade-up flex items-center border-l border-[#D8A84D]/50 pl-8">
          <div>
            <h3 className="text-7xl font-light text-[#C89B43]">5+</h3>
            <p className="mt-3 text-sm font-black uppercase leading-6 tracking-[0.08em]">
              Years of <br /> Creative Experience
            </p>
          </div>
        </div>

        <div className="gsap-fade-up">
          <SectionMini title="About Me" />
          <SectionTitle>
            I Design Digital Experiences That Create <span className="text-[#C89B43]">Business Impact.</span>
          </SectionTitle>
          <p className="mt-7 max-w-xl text-lg leading-9 text-[#5F5A50]">
            I am Abhishek Pal, a web designer, creative strategist, and digital
            growth professional. My work combines premium UI design, smart content,
            responsive development, and SEO-friendly structure to help businesses
            build a strong online presence.
          </p>
          <p className="mt-5 max-w-xl text-lg leading-9 text-[#5F5A50]">
            From ecommerce websites to agency portfolios and business landing pages,
            I create designs that look modern, communicate clearly, and convert
            visitors into enquiries.
          </p>
          <p className="mt-7 font-serif text-4xl italic text-[#151515]">Abhishek Pal</p>
        </div>

        <div className="gsap-scale grid gap-0 overflow-hidden rounded-[30px] border border-white bg-white shadow-[0_25px_80px_rgba(20,20,20,0.08)] sm:grid-cols-2">
          {services.slice(0, 4).map((service, index) => (
            <div
              key={service.title}
              className={`reveal-card p-8 ${index % 2 === 0 ? "sm:border-r" : ""} ${index < 2 ? "border-b" : ""} border-[#ECE3D4]`}
            >
              <div className="mb-5 grid h-16 w-16 place-items-center rounded-full bg-[#F7F0E4] text-[#C89B43]">
                <Icon icon={service.icon} width="30" />
              </div>
              <h3 className="text-lg font-black tracking-[-0.02em]">{service.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#665F56]">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="relative z-10 px-5 py-14 sm:py-16 lg:px-10">
      <div className="mx-auto max-w-[1600px]">
        <SectionHeader eyebrow="Skills" title="Tools, Design Skills & Growth Expertise" />
        <div className="gsap-scale rounded-[24px] border border-white bg-white p-5 shadow-[0_20px_70px_rgba(20,20,20,0.07)]">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10">
            {skills.map(([skill, icon]) => (
              <motion.div
                whileHover={{ y: -8 }}
                key={skill}
                className="flex min-h-[120px] flex-col items-center justify-center rounded-2xl border border-[#EFE6D9] bg-[#FFFEFB] p-4 text-center transition hover:border-[#C89B43]/60 hover:shadow-[0_18px_40px_rgba(200,155,67,0.16)]"
              >
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white shadow-[0_12px_30px_rgba(20,20,20,0.08)]">
                  <Icon icon={icon} width="30" />
                </div>
                <p className="mt-3 text-xs font-bold text-[#151515]">{skill}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyChooseMe() {
  return (
    <section id="why-choose" className="relative z-10 px-5 py-16 sm:py-20 lg:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="gsap-fade-up">
            <SectionMini title="Why Choose Me" />
            <SectionTitle>
              Premium Design With Business Strategy, Not Just Decoration.
            </SectionTitle>
            <p className="mt-6 text-lg leading-9 text-[#5F5A50]">
              I focus on clarity, trust, performance, and conversion. Every design
              decision is made to improve user experience, communicate your value,
              and support your business goals.
            </p>
            <a
              href={createWhatsAppLink("Hello, I want to discuss my project.")}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-4 rounded-full bg-[#151515] px-7 py-4 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-[#C89B43]"
            >
              Discuss Your Project
              <Icon icon="solar:arrow-right-up-linear" width="20" />
            </a>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {whyChoose.map((item) => (
              <div
                key={item.title}
                className="gsap-scale reveal-card rounded-[28px] border border-white bg-white p-7 shadow-[0_20px_65px_rgba(20,20,20,0.07)]"
              >
                <div className="mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-[#F7F0E4] text-[#C89B43]">
                  <Icon icon={item.icon} width="32" />
                </div>
                <h3 className="text-xl font-black tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#665F56]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Portfolio({ categories, activeProject, setActiveProject, filteredPortfolio }) {
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
    <section id="portfolio" className="relative z-10 px-4 py-14 sm:px-5 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1700px]">
        <div className="mb-8 flex flex-col justify-between gap-6 md:mb-10 md:flex-row md:items-end">
          <div className="gsap-fade-up">
            <SectionMini title="Portfolio" />
            <h2 className="reveal-title mt-4 max-w-4xl text-[34px] font-black uppercase leading-[0.92] tracking-[-0.07em] text-[#151515] sm:text-[42px] md:text-6xl xl:text-[82px]">
              Selected Work <span className="text-[#C89B43]">Showcase</span>
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#5F5A50] sm:text-lg">
              Responsive website portfolio with clear project category, website type,
              strong image preview, and enquiry-focused call-to-action.
            </p>
          </div>

          <div className="flex max-w-3xl gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:gap-3 sm:overflow-visible">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveProject(cat)}
                className={`shrink-0 rounded-full px-5 py-2 hidden md:block text-sm font-bold transition ${activeProject === cat
                  ? "bg-[#151515] text-white"
                  : "border border-[#E6DDCF] bg-white text-[#5F5A50] hover:border-[#C89B43] hover:text-[#C89B43]"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="gsap-scale relative overflow-hidden rounded-[28px] border border-white bg-[#111] shadow-[0_35px_110px_rgba(20,20,20,0.18)] sm:rounded-[36px]">
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
                  className="portfolio-slide-inner group relative min-w-full snap-start overflow-hidden bg-[radial-gradient(circle_at_85%_18%,rgba(216,168,77,0.22),transparent_28%),linear-gradient(135deg,#151515,#201A12_50%,#0D0D0D)] p-4 pb-24 text-white sm:p-8 lg:min-h-[720px] lg:p-12"
                >
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
                  <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full bg-[#D8A84D]/20 blur-3xl" />
                  <div className="absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
                  <div className="absolute right-8 top-8 hidden text-[150px] font-black uppercase leading-none tracking-[-0.12em] text-white/[0.035] lg:block">
                    0{index + 1}
                  </div>

                  <div className="relative z-10 grid gap-6 lg:min-h-[580px] lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-10">
                    {/* Mobile image first / Desktop right image */}
                    <motion.div
                      initial={{ opacity: 0, rotate: -1.5, scale: 0.96 }}
                      whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="order-1 relative rounded-[24px] border border-white/15 bg-white/10 p-3 shadow-[0_25px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:rounded-[30px] sm:p-5 lg:order-2 lg:min-h-[500px]"
                    >
                      <div className="absolute -left-4 top-8 z-20 hidden rounded-2xl bg-[#D8A84D] px-4 py-3 text-[#151515] shadow-[0_24px_60px_rgba(0,0,0,0.25)] lg:block">
                        <p className="text-[10px] font-black uppercase tracking-[0.22em]">Type</p>
                        <p className="mt-1 max-w-[230px] text-base font-black leading-tight">
                          {item.websiteType}
                        </p>
                      </div>

                      <div className="overflow-hidden rounded-[20px] bg-[#F6EFE2] p-2 sm:rounded-[28px] sm:p-3">
                        <div className="mb-3 hidden items-center justify-between px-2 pt-1 lg:flex">
                          <div className="flex gap-2">
                            <span className="h-3 w-3 rounded-full bg-[#E85C4A]" />
                            <span className="h-3 w-3 rounded-full bg-[#E8B84A]" />
                            <span className="h-3 w-3 rounded-full bg-[#52B788]" />
                          </div>
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5F5A50]">
                            Live Preview
                          </p>
                        </div>

                        <div className="relative overflow-hidden rounded-[18px] bg-white shadow-[0_18px_50px_rgba(0,0,0,0.14)] sm:rounded-[22px]">
                          <img
                            src={item.image}
                            alt={`${item.title} - ${item.websiteType}`}
                            className="block w-full object-contain"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.src = "https://placehold.co/1400x900/151515/D8A84D?text=Portfolio+Image";
                            }}
                          />
                        </div>
                      </div>
                    </motion.div>

                    {/* Content */}
                    <div className="order-2 flex h-full flex-col justify-center lg:order-1 lg:justify-between">
                      <div>
                        <div className="mb-6 hidden items-center gap-4 rounded-full border border-white/15 bg-white/10 px-5 py-3 backdrop-blur-xl lg:inline-flex">
                          <span className="grid h-10 w-10 place-items-center rounded-full bg-[#D8A84D] text-[#151515]">
                            <Icon icon={item.icon} width="21" />
                          </span>
                          <span className="text-xs font-black uppercase tracking-[0.28em] text-white/80">
                            {item.category}
                          </span>
                        </div>

                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          className="hidden text-xs font-black uppercase tracking-[0.42em] text-[#D8A84D] lg:block"
                        >
                          {item.kicker}
                        </motion.p>

                        <motion.h3
                          initial={{ opacity: 0, y: 35 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.08 }}
                          className="max-w-3xl text-[31px] font-black uppercase leading-[0.93] tracking-[-0.055em] sm:text-5xl md:text-6xl xl:text-[92px]"
                        >
                          {item.title}
                        </motion.h3>

                        <p className="mt-4 max-w-xl text-sm font-medium leading-7 text-white/72 sm:mt-5 sm:text-base sm:leading-8 lg:max-w-2xl lg:text-lg">
                          {item.desc}
                        </p>

                        <div className="mt-6 hidden items-center gap-3 rounded-2xl border border-[#D8A84D]/35 bg-[#D8A84D]/12 px-5 py-4 text-[#F6D48B] lg:inline-flex">
                          <Icon icon="solar:monitor-smartphone-bold" width="24" />
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/50">
                              Website Type
                            </p>
                            <p className="mt-1 text-base font-black text-white">
                              {item.websiteType}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center lg:mt-10">
                        <a
                          href={createWhatsAppLink(`Hello, I am interested in this portfolio project: ${item.title}. Website type: ${item.websiteType}. Please share details.`)}
                          target="_blank"
                          rel="noreferrer"
                          className="group inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-xs font-black text-[#151515] transition hover:-translate-y-1 hover:bg-[#D8A84D] sm:px-7 sm:py-4 sm:text-sm"
                        >
                          View Project
                          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#151515] text-white transition group-hover:rotate-45">
                            <Icon icon="solar:arrow-right-up-linear" width="18" />
                          </span>
                        </a>

                        <div className="flex flex-wrap gap-2">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-bold text-white/75 sm:px-4 sm:py-2 sm:text-xs"
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

          <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/15 bg-black/40 px-4 py-3 backdrop-blur-xl">
            {filteredPortfolio.map((item, index) => (
              <button
                key={item.title}
                onClick={() => scrollToSlide(index)}
                className={`h-2.5 rounded-full transition-all ${activeSlide === index ? "w-10 bg-[#D8A84D]" : "w-2.5 bg-white/35 hover:bg-white"
                  }`}
                aria-label={`Go to ${item.title}`}
              />
            ))}
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-3 bottom-6 z-20 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-xl transition hover:bg-white hover:text-[#151515] md:left-5 md:h-14 md:w-14 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2"
            aria-label="Previous project"
          >
            <Icon icon="solar:arrow-left-linear" width="24" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-3 bottom-6 z-20 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-[#D8A84D] text-[#151515] backdrop-blur-xl transition hover:bg-white md:right-5 md:h-14 md:w-14 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2"
            aria-label="Next project"
          >
            <Icon icon="solar:arrow-right-linear" width="24" />
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

    const whatsappMessage = `New Website Project Enquiry

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Service: ${formData.service}
Budget / Timeline: ${formData.budget}

Message:
${formData.message}`;

    window.open(createWhatsAppLink(whatsappMessage), "_blank");
  };

  return (
    <section id="contact" className="relative z-10 px-5 py-16 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto grid max-w-[1600px] gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div className="gsap-fade-up">
          <SectionMini title="Contact" />
          <SectionTitle>
            Let’s Build Something Amazing <span className="text-[#C89B43]">Together.</span>
          </SectionTitle>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#5F5A50]">
            Have a project in mind? Share your requirement and I will help you
            plan a premium website, landing page, ecommerce store, or complete
            creative brand experience.
          </p>

          <div className="mt-10 grid gap-5">
            <ContactItem icon="solar:letter-bold" title="Email" text={CONTACT_EMAIL} href={`mailto:${CONTACT_EMAIL}`} />
            <ContactItem icon="solar:phone-bold" title="Phone" text="+91 9971153106" href="tel:+919971153106" />
            <ContactItem icon="solar:map-point-bold" title="Location" text="India" href="#" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="gsap-scale rounded-[30px] border border-white bg-white p-5 shadow-[0_25px_80px_rgba(20,20,20,0.08)] md:p-8">
          <div className="grid gap-5 md:grid-cols-2">
            <input name="name" value={formData.name} onChange={handleChange} required className="rounded-2xl border border-[#E8DFD1] bg-[#FFFEFB] px-5 py-4 text-sm outline-none transition focus:border-[#C89B43]" placeholder="Your Name" />
            <input name="email" type="email" value={formData.email} onChange={handleChange} required className="rounded-2xl border border-[#E8DFD1] bg-[#FFFEFB] px-5 py-4 text-sm outline-none transition focus:border-[#C89B43]" placeholder="Your Email" />
            <input name="phone" value={formData.phone} onChange={handleChange} className="rounded-2xl border border-[#E8DFD1] bg-[#FFFEFB] px-5 py-4 text-sm outline-none transition focus:border-[#C89B43]" placeholder="Phone Number" />
            <select name="service" value={formData.service} onChange={handleChange} className="rounded-2xl border border-[#E8DFD1] bg-[#FFFEFB] px-5 py-4 text-sm text-[#5F5A50] outline-none transition focus:border-[#C89B43]">
              <option value="">Select Service</option>
              {services.map((service) => (
                <option key={service.title} value={service.title}>
                  {service.title}
                </option>
              ))}
            </select>
            <input name="budget" value={formData.budget} onChange={handleChange} className="rounded-2xl border border-[#E8DFD1] bg-[#FFFEFB] px-5 py-4 text-sm outline-none transition focus:border-[#C89B43] md:col-span-2" placeholder="Estimated Budget / Timeline" />
            <textarea name="message" value={formData.message} onChange={handleChange} rows="8" className="rounded-2xl border border-[#E8DFD1] bg-[#FFFEFB] px-5 py-4 text-sm outline-none transition focus:border-[#C89B43] md:col-span-2" placeholder="Tell me about your project" />
            <button type="submit" className="group flex items-center justify-center gap-4 rounded-2xl bg-gradient-to-r from-[#D8A84D] to-[#B8862F] px-7 py-4 text-sm font-black text-white shadow-[0_18px_40px_rgba(200,155,67,0.28)] transition hover:-translate-y-1 md:col-span-2">
              Send Project Enquiry
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#1D1D1D] transition group-hover:rotate-45">
                <Icon icon="solar:arrow-right-linear" width="18" />
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
    <a href={href} className="flex items-center gap-5 rounded-3xl border border-white bg-white p-5 shadow-[0_14px_45px_rgba(20,20,20,0.06)] transition hover:-translate-y-1 hover:border-[#C89B43]/40">
      <span className="grid h-12 w-12 place-items-center rounded-full bg-[#F7F0E4] text-[#C89B43]">
        <Icon icon={icon} width="22" />
      </span>
      <span>
        <span className="block text-sm font-black">{title}</span>
        <span className="mt-1 block text-sm text-[#5F5A50]">{text}</span>
      </span>
    </a>
  );
}

function SectionMini({ title }) {
  return (
    <p className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.22em] text-[#151515] sm:text-sm">
      <span className="text-[#C89B43]">✦</span> {title}
    </p>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 className="reveal-title mt-5 max-w-3xl text-[34px] font-black leading-[1.3] tracking-[-0.055em] sm:text-[38px] md:text-5xl xl:text-6xl">
      {children}
    </h2>
  );
}

function SectionHeader({ eyebrow, title, noMargin }) {
  return (
    <div className={noMargin ? "" : "mb-10 gsap-fade-up"}>
      <SectionMini title={eyebrow} />
      <h2 className="reveal-title mt-4 max-w-4xl text-[34px] font-black leading-[0.98] tracking-[-0.055em] sm:text-[38px] md:text-5xl xl:text-6xl">
        {title}
      </h2>
    </div>
  );
}

function BackgroundDecor() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_15%_12%,rgba(216,168,77,0.14),transparent_28%),radial-gradient(circle_at_90%_20%,rgba(216,168,77,0.13),transparent_30%),linear-gradient(180deg,#FFFEFB,#FAF8F3)]" />
      <div className="pointer-events-none fixed left-[-160px] top-[420px] z-0 h-[360px] w-[360px] rounded-full border border-[#D8A84D]/30" />
      <div className="pointer-events-none fixed right-[-120px] top-[240px] z-0 h-[260px] w-[260px] rounded-full border border-[#D8A84D]/25" />
      <div className="pointer-events-none fixed bottom-8 left-2 z-0 text-[160px] font-black tracking-[-0.18em] text-[#C89B43]/5">
        AP
      </div>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .salient-slider { scroll-snap-type: x mandatory; }
        .portfolio-bg-image { background-size: cover; background-position: center; }
        @media (max-width: 767px) {
          .portfolio-bg-image { background-position: center top; opacity: 0.58; }
        }
        .reveal-title, .gsap-fade-up, .gsap-scale, .reveal-card, .portfolio-slide-inner { will-change: transform, opacity; }
      `}</style>
    </>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-[#E8DFD1] px-5 py-8 lg:px-10">
      <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-5 text-center md:flex-row">
        <Logo />
        <p className="text-sm text-[#5F5A50]">
          © {new Date().getFullYear()} Abhishek Pal Creative Agency. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default App;
