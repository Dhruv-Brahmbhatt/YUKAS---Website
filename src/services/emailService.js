/**
 * Email Notification Service
 * Integrated with EmailJS (https://www.emailjs.com/)
 * 
 * To use this service, install the dependency first:
 * npm install @emailjs/browser
 */

// import emailjs from '@emailjs/browser';

/**
 * Replace these with your actual EmailJS credentials
 * I recommend moving these to a .env file
 */
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || "YOUR_PUBLIC_KEY";

export const sendEmailNotification = async (type, payload) => {
  // Validate basic data
  if (!payload.email) return console.warn('No email address provided for notification.');

  const templateParams = {
    ...payload,
    notification_type: type,
    sent_at: new Date().toLocaleString(),
  };

  /**
   * MOCK MODE:
   * Delete the mock block below and uncomment the Real Integration block to go live.
   */

  // --- MOCK BLOCK START ---
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`[EmailJS Mock] Sent "${type}" notification to:`, payload.email);
      console.log('Template Params:', templateParams);
      resolve({ status: 200, text: 'OK (Mock)' });
    }, 1500);
  });
  // --- MOCK BLOCK END ---


  /* --- REAL INTEGRATION BLOCK ---
  try {
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );
    return response;
  } catch (error) {
    console.error('EmailJS Error:', error);
    throw error;
  }
  */
};
