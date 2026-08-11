import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail, ArrowRight } from "lucide-react";

const socialLinks = [
    {
        id: "github",
        label: "GitHub",
        href: "https://github.com/code-sensei",
        icon: Github,
    },
    {
        id: "linkedin",
        label: "LinkedIn",
        href: "https://linkedin.com/in/btsowa",
        icon: Linkedin,
    },
    {
        id: "email",
        label: "Email",
        href: "mailto:babangidatsowa@gmail.com",
        icon: Mail,
    },
] as const;

const stats = [
    { value: "7+", label: "Years Experience" },
    { value: "20+", label: "Projects Delivered" },
    { value: "18+", label: "Happy Clients" },
] as const;

/**
 * Hero region — primary introduction, CTAs, portrait, and credibility stats.
 *
 * @returns {JSX.Element} Full-viewport hero section with scroll targets.
 */
export default function Hero() {
    /**
     * Smooth-scrolls to a section by DOM id (accounts for floating nav height).
     *
     * @param {string} id - Section element id (e.g. `"projects"`).
     * @returns {void}
     */
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition =
                elementPosition + window.pageYOffset - offset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
    };

    /**
     * Opens social links in a new tab or triggers mail client for `mailto:` URLs.
     *
     * @param {string} href - Destination URL.
     * @returns {void}
     */
    const handleSocialClick = (href: string) => {
        if (href.startsWith("mailto:")) {
            window.location.href = href;
        } else {
            window.open(href, "_blank", "noopener,noreferrer");
        }
    };

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden"
        >
            {/* Layered backdrop — soft glow + geometric blocks */}
            <div className="absolute inset-0 -z-10" aria-hidden="true">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-30%,hsl(var(--primary)/0.14),transparent_55%)] dark:bg-[radial-gradient(ellipse_120%_80%_at_50%_-30%,hsl(var(--primary)/0.22),transparent_55%)]" />
                <div className="absolute top-[18%] right-[8%] size-48 rounded-3xl border border-primary/25 bg-primary/[0.06] rotate-6 blur-[1px] hidden lg:block motion-reduce:hidden" />
                <div className="absolute bottom-[12%] left-[5%] size-36 rounded-2xl bg-primary/10 -rotate-6 hidden md:block motion-reduce:hidden" />
            </div>

            <div className="container-wide relative">
                <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-20 items-center">
                    {/* Copy */}
                    <div className="text-center lg:text-left space-y-8 order-2 lg:order-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/25 bg-primary/10 text-primary text-xs font-semibold tracking-wide">
                            <span
                                className="size-1.5 rounded-full bg-primary motion-safe:animate-pulse"
                                aria-hidden
                            />
                            Available for opportunities
                        </div>

                        <div className="space-y-3">
                            <p className="text-muted-foreground text-body-md">
                                Hi, I'm
                            </p>
                            <h1 className="text-display-lg md:text-display-xl">
                                Babangida Tsowa
                            </h1>
                            <h2 className="text-heading-lg md:text-display-sm text-muted-foreground font-normal font-heading">
                                Product & AI Engineer
                            </h2>
                            <p className="text-primary font-medium">
                                Organizer, AI Tinkerers Abuja
                            </p>
                        </div>

                        <p className="text-muted-foreground text-body-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            I partner with forward-thinking organizations to
                            architect intelligent systems and scalable products
                            that drive measurable impact—from AI-powered
                            platforms to mission-critical applications.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                            <Button
                                size="lg"
                                onClick={() => scrollToSection("projects")}
                                className="group rounded-xl shadow-lg shadow-primary/20 cursor-pointer"
                            >
                                View My Work
                                <ArrowRight className="ml-2 size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                onClick={() => scrollToSection("about")}
                                className="group rounded-xl border-border/80 bg-card/60 backdrop-blur-sm cursor-pointer"
                            >
                                Learn More
                                <ArrowDown className="ml-2 size-4 transition-transform duration-200 group-hover:translate-y-0.5" />
                            </Button>
                        </div>

                        <div className="flex gap-2 justify-center lg:justify-start">
                            {socialLinks.map((link) => {
                                const Icon = link.icon;
                                return (
                                    <Button
                                        key={link.id}
                                        variant="ghost"
                                        size="icon"
                                        onClick={() =>
                                            handleSocialClick(link.href)
                                        }
                                        className="rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer min-h-11 min-w-11"
                                        aria-label={link.label}
                                    >
                                        <Icon className="size-5" />
                                    </Button>
                                );
                            })}
                        </div>

                        <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-8 border-t border-border/80">
                            {stats.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="text-center lg:text-left min-w-[7rem]"
                                >
                                    <div className="text-display-sm text-foreground font-semibold font-heading">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Portrait */}
                    <div className="flex justify-center lg:justify-end order-1 lg:order-2">
                        <div className="relative w-full max-w-[22rem]">
                            <div
                                className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/15 via-transparent to-primary/5 blur-2xl -z-10"
                                aria-hidden
                            />
                            <div className="relative aspect-[4/5] w-full rounded-[2rem] overflow-hidden border border-border bg-muted shadow-2xl shadow-primary/10 ring-1 ring-black/[0.04] dark:ring-white/[0.08]">
                                <img
                                    src="/profile-image.png"
                                    alt="Babangida Tsowa"
                                    className="size-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                <button
                    type="button"
                    onClick={() => scrollToSection("about")}
                    className="p-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors duration-200 cursor-pointer focus-ring"
                    aria-label="Scroll to about section"
                >
                    <ArrowDown className="size-5 motion-safe:animate-bounce" />
                </button>
            </div>
        </section>
    );
}
