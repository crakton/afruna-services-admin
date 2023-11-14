/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination:
					"https://afruna-backend-cmsxg.ondigitalocean.app/api/v1/:path*",
			},
		];
	},
};

module.exports = nextConfig;
