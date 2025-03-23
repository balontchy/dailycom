import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "store.storeimages.cdn-apple.com", // أضف نطاق Apple
      "image-us.samsung.com", // أضف نطاق Samsung
      "m.media-amazon.com", // أضف نطاق Amazon
    ], // أضف هنا أي نطاقات أخرى تستخدمها للصور
  },
};

export default nextConfig;
