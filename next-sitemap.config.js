/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://fasttools.vercel.app", // tu URL base
  generateRobotsTxt: true, // genera también robots.txt
  sitemapSize: 7000,
  exclude: ["/404"], // rutas que no quieres indexar
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
};
