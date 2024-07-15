// config/site.ts
export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "NxChange",
  description: "Make beautiful crypo reardless of your experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Login",
      href: "/login",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Upload",
      href: "/dashboard/upload",
    },
    {
      label: "Logout", 
      href: "/logout",
      color: "danger",
    },
  ],
  links: {
    login: "/login",
    register: "/register",
    twitter: "https://twitter.com/yourlink",
    github: "https://github.com/yourlink",
    discord: "https://discord.com/yourlink",
    sponsor: "https://github.com/sponsors/yourlink",
  },
};
