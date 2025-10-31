/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://fasttools.vercel.app", // tu URL base
  generateRobotsTxt: true, // genera también robots.txt
  sitemapSize: 7000,
  exclude: ["/404"], // excluye rutas que no deben indexarse
  changefreq: "daily",
  priority: 0.7,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" }, // permite el rastreo de todo
    ],
  },
};
