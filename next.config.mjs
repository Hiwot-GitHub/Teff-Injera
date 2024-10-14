/** @type {import('next').NextConfig} */

const nextConfig = {
    async headers() {
      return [
        {
          // Apply these headers to all routes in your app
          source: '/(.*)', // Matches all routes
          headers: [
            {
              key: 'Content-Security-Policy',
              value: "default-src 'self'; script-src 'self' https://www.gstatic.com; connect-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline';"
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;
  
