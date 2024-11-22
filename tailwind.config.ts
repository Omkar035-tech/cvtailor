import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			// keyframes: {
			// 	'slide-right': {
			// 		'0%': { transform: 'translateX(-100%)' },
			// 		'100%': { transform: 'translateX(0)' }
			// 	},
			// 	'slide-left': {
			// 		'0%': { transform: 'translateX(100%)' },
			// 		'100%': { transform: 'translateX(0)' }
			// 	}
			// },
			// animation: {
			// 	'slide-right': 'slide-right 1s ease-out',
			// 	'slide-left': 'slide-left 1s ease-out'
			// },

			keyframes: {
				'scroll-down': {
					// '0%': { transform: 'translateY(-100%)' },
					// '100%': { transform: 'translateY(0)' }
					'0%': {
						transform: 'translateY(calc(-40% + 50vh))',
						'-webkit-transform': 'translateY(calc(-50% + 50vh))',
					},
					'25%': {
						transform: 'translateY(0%)',
						'-webkit-transform': 'translateY(0%)',
					},
					'75%': {
						transform: 'translateY(calc(-100% + 100vh))',
						'-webkit-transform': 'translateY(calc(-100% + 100vh))',
					},
					'100%': {
						transform: 'translateY(calc(-40% + 50vh))',
						'-webkit-transform': 'translateY(calc(-50% + 50vh))',
					},
				},
				'scroll-up': {
					// '0%': { transform: 'translateY(0)' },
					// '100%': { transform: 'translateY(-50%)' }
					'0%': {
						transform: 'translateY(calc(-70% + 100vh))',
						'-webkit-transform': 'translateY(calc(-70% + 100vh))',
					},
					'25%': {
						transform: 'translateY(calc(-100% + 100vh))',
						'-webkit-transform': 'translateY(calc(-100% + 100vh))',
					},
					'75%': {
						transform: 'translateY(0%)',
						'-webkit-transform': 'translateY(0%)',
					},
					'100%': {
						transform: 'translateY(calc(-70% + 100vh))',
						'-webkit-transform': 'translateY(calc(-70% + 100vh))',
					},
				},
				'scroll-right': {
					'0%': { transform: 'translateX(-70%)' },
					// '25%': { transform: 'translateX(-0%)' },
					'50%': { transform: 'translateX(0%)' },
					// '75%': { transform: 'translateX(-50%)' },
					'100%': { transform: 'translateX(-70%)' }
					// '0%': {
					// 	transform: 'translateX(calc(0% + 0vw))',
					// 	'-webkit-transform': 'translateX(calc(-50% + 50vw))',
					// },
					// '25%': {
					// 	transform: 'translateX(0%)',
					// 	'-webkit-transform': 'translateX(0%)',
					// },
					// '75%': {
					// 	transform: 'translateX(calc(-100% + 100vw))',
					// 	'-webkit-transform': 'translateX(calc(-100% + 100vw))',
					// },
					// '100%': {
					// 	transform: 'translateX(calc(-50% + 50vw))',
					// 	'-webkit-transform': 'translateX(calc(-50% + 50vw))',
					// },
				},
				'scroll-left': {
					// '0%': { transform: 'translateX(0)' },
					// '100%': { transform: 'translateX(-100%)' }
					'0%': { transform: 'translateX(0%)' },
					// '25%': { transform: 'translateX(-0%)' },
					'50%': { transform: 'translateX(-100%)' },
					// '75%': { transform: 'translateX(-50%)' },
					'100%': { transform: 'translateX(0%)' }
					// '0%': {
					// 	transform: 'translateX(calc(-45% + 50vw))',
					// 	'-webkit-transform': 'translateX(calc(-45% + 50vw))',
					// },
					// '25%': {
					// 	transform: 'translateX(calc(-100% + 100vw))',
					// 	'-webkit-transform': 'translateX(calc(-100% + 100vw))',
					// },
					// '75%': {
					// 	transform: 'translateX(0%)',
					// 	'-webkit-transform': 'translateX(0%)',
					// },
					// '100%': {
					// 	transform: 'translateX(calc(-45% + 50vw))',
					// 	'-webkit-transform': 'translateX(calc(-45% + 50vw))',
					// },
				}
			},
			animation: {
				'scroll-down': 'scroll-down 20s linear infinite',
				'scroll-up': 'scroll-up 20s linear infinite',
				'scroll-right': 'scroll-right 15s linear infinite',
				'scroll-left': 'scroll-left 15s linear infinite'
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
