import nodemailer, { type Transporter } from 'nodemailer';

export interface EmailPayload {
    to: string;
    subject: string;
    html: string;
}

let transporter: Transporter | null | undefined;

const getTransporter = (): Transporter | null => {
    if (transporter !== undefined) return transporter;

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD) {
        transporter = null;
        return transporter;
    }

    transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT),
        secure: Number(SMTP_PORT) === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
    });

    return transporter;
};

const sendEmail = async (payload: EmailPayload): Promise<boolean> => {
    const client = getTransporter();
    if (!client) return false;

    try {
        await client.sendMail({
            from: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER,
            to: payload.to,
            subject: payload.subject,
            html: payload.html,
        });
        return true;
    } catch {
        return false;
    }
};

export const sendWelcomeEmail = async (payload: EmailPayload): Promise<boolean> => sendEmail(payload);

export const sendBookingNotification = async (payload: EmailPayload): Promise<boolean> =>
    sendEmail(payload);
