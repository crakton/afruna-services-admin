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
	// images: {
	// 	remotePatterns: [
	// 		{ protocol: 'https', hostname: 'afruna-bucket.nyc3.digitaloceanspaces.com', pathname: '**' },
	// 		{ protocol: 'https', hostname: 'nyc3.digitaloceanspaces.com', pathname: '**' }
	// 	]
	// },
	// images: {
	// 	domains: [
	// 		"afruna-bucket.nyc3.digitaloceanspaces.com",
	// 		"lh3.googleusercontent.com",
	// 		// Add other allowed domains here if needed
	// 	],
	// },
	images: {
		domains: ["afruna-bucket.nyc3.digitaloceanspaces.com", 'nyc3.digitaloceanspaces.com', 'https', "lh3.googleusercontent.com", 'afruna-bucket.nyc3.digitaloceanspaces.com', 'nyc3.digitaloceanspaces.com/afruna-bucket/1701417858481'],
	},
};

module.exports = nextConfig;
