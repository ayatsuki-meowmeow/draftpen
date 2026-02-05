import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/admin/auth",
        headers: [
          {
            // GoogleOauthはポップアップを使うため、COOPヘッダーを追加してクロスオリジンのポップアップを許可する必要がある
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
