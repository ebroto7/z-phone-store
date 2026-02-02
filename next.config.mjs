/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración de imágenes remotas para next/image
  // Necesario porque las imágenes vienen de la API externa
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "prueba-tecnica-api-tienda-moviles.onrender.com",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
