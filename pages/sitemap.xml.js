import React from "react";
import fs from "fs";

const Sitemap = () => {};

export const getServerSideProps = async ({ res }) => {
    const request = await fetch(`https://api.somelist.tk/sitemap`)
    const data = await request.json()
  const baseUrl = {
    development: "http://localhost:3000",
    production: "https://somelist.tk",
  }[process.env.NODE_ENV];

  const staticPages = fs
    .readdirSync({
        development: 'pages',
        production: './',
    }[process.env.NODE_ENV])    
    .filter((staticPage) => {
      return ![
        "_app.js",
        "_document.js",
        "_error.js",
        "sitemap.xml.js",
        "403.js",
        "404.js",
        "500.js",
        'bot',
        'profile'
      ].includes(staticPage);
    })
    .map((staticPagePath) => {
      return `${baseUrl}/${staticPagePath}`;
    });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
        .map((url) => {
          return `
            <url>
              <loc>${url.replace('.js', '')}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join("")}
        ${
            data.bots.map((bot)=>{
            return `
                <url>
                  <loc>${baseUrl}/bot/${bot}</loc>
                  <lastmod>${new Date().toISOString()}</lastmod>
                  <changefreq>monthly</changefreq>
                  <priority>1.0</priority>
                </url>
              `;
            })
        }

        ${
            data.users.map((user)=>{
            return `
                <url>
                  <loc>${baseUrl}/profile/${user}</loc>
                  <lastmod>${new Date().toISOString()}</lastmod>
                  <changefreq>monthly</changefreq>
                  <priority>1.0</priority>
                </url>
              `;
            })
        }
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;