// Email validation
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Phone validation
export const isValidPhone = (phone: string): boolean => {
    const phoneRegex = /^(\+91[\-\s]?)?[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/[\s\-()]/g, ''));
};

// Name validation
export const isValidName = (name: string): boolean => {
    return name.trim().length >= 2 && name.trim().length <= 50;
};

// Strong password validation
export const isStrongPassword = (password: string): boolean => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
};

// Sanitize HTML
export const sanitizeHtml = (html: string): string => {
    const div = document.createElement('div');
    div.textContent = html;
    return div.innerHTML;
};

// Truncate string
export const truncateString = (str: string, length: number): string => {
    if (str.length <= length) return str;
    return str.substring(0, length) + '...';
};

// Format currency
export const formatCurrency = (amount: number, currency: string = 'INR'): string => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: currency,
    }).format(amount);
};

// Format date
export const formatDate = (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(dateObj);
};

// Format time
export const formatTime = (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    }).format(dateObj);
};

// Generate slug from string
export const generateSlug = (str: string): string => {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

// Capitalize string
export const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Get initials from name
export const getInitials = (name: string): string => {
    return name
        .split(' ')
        .map((n) => n.charAt(0).toUpperCase())
        .join('')
        .slice(0, 2);
};

// Delay function
export const delay = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
