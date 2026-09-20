import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'dark-primary' | 'dark-secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-full font-modern-sans font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold-400/30 disabled:cursor-not-allowed disabled:opacity-50";

    const variants = {
      // For light/cream surfaces (default across most of the site)
      primary: 'brand-btn-primary',
      secondary: 'brand-btn-secondary',
      ghost: 'brand-btn-ghost',
      // For dark surfaces (Hero, Meditation dark mode, footer panels)
      'dark-primary': 'divine-btn-primary text-forest-950',
      'dark-secondary': 'divine-btn-secondary text-slate-100',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-4 text-base',
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export default Button;
