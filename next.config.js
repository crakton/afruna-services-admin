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
	images: {
		domains: ["afruna-bucket.nyc3.digitaloceanspaces.com","lh3.googleusercontent.com"],
	},
};

module.exports = nextConfig;
