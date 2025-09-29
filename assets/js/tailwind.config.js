// Tailwind CSS Configuration
tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                'sans': ['Instrument Sans', 'sans-serif'],
            },
            colors: {
                'brand-red': '#FF3621',
                'brand-gray': '#E0EAE4',
                'brand-dark': '#121212',
                'brand-light': '#525252',
            },
            fontSize: {
                'display': '100px',
                'heading': '78px',
                'subheading': '64px',
            },
            spacing: {
                '128': '32rem',
                '144': '36rem',
            },
            borderRadius: {
                'xl': '20px',
                '2xl': '25px',
                '3xl': '30px',
            },
            boxShadow: {
                'custom': '2px 2px 1px 10px rgba(0, 0, 0, 0.01)',
            }
        }
    }
}