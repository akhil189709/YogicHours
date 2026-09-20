import React from 'react';
import { CONTACT_INFO } from '@/constants';

interface WhatsAppButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  label?: string;
  message?: string;
  phone?: string;
  variant?: 'solid' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles: Record<NonNullable<WhatsAppButtonProps['size']>, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

// WhatsApp's own brand green (#25D366) — recognisable as the service, and a far
// closer neighbour to the forest palette than the cyan this used to be.
const variantStyles: Record<NonNullable<WhatsAppButtonProps['variant']>, string> = {
  solid:
    'bg-[#25D366] text-[#0b3d20] shadow-lg shadow-[#25D366]/20 hover:bg-[#1eb855] hover:text-white',
  outline:
    'border border-[#25D366] bg-white text-[#0b3d20] shadow-sm hover:bg-[#25D366]/10',
};

const sanitizePhone = (phone: string): string => phone.replace(/[^0-9]/g, '');

const WhatsAppButton = React.forwardRef<HTMLAnchorElement, WhatsAppButtonProps>(
  (
    {
      label = 'Chat on WhatsApp',
      message,
      phone,
      variant = 'solid',
      size = 'md',
      href,
      className = '',
      ...props
    },
    ref
  ) => {
    const phoneNumber = sanitizePhone(phone || CONTACT_INFO.WHATSAPP);
    const encodedMessage = message ? `?text=${encodeURIComponent(message)}` : '';
    const link = href || `https://wa.me/${phoneNumber}${encodedMessage}`;

    return (
      <a
        ref={ref}
        href={link}
        target="_blank"
        rel="noreferrer"
        className={`inline-flex items-center justify-center gap-3 rounded-full font-semibold transition ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
        {...props}
      >
        <span>💬</span>
        <span>{label}</span>
      </a>
    );
  }
);

WhatsAppButton.displayName = 'WhatsAppButton';

export default WhatsAppButton;
