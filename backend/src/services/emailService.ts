import { Resend } from 'resend';
import { config } from '../config/env';

const resend = new Resend(config.RESEND_API_KEY);

export const emailService = {
  /**
   * Send a notification to the admin when a new contact form is submitted.
   */
  async sendContactNotification(data: { name: string; email: string; message: string; typeOfWork?: string }) {
    if (!config.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY is not set. Email notification skipped.');
      return;
    }

    try {
      await resend.emails.send({
        from: 'Ayoola Platform <onboarding@resend.dev>', // Update this with your verified domain later
        to: config.ADMIN_EMAIL,
        subject: `New Contact: ${data.name}`,
        html: `
          <h2>New Contact Message</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Type of Work:</strong> ${data.typeOfWork || 'N/A'}</p>
          <p><strong>Message:</strong></p>
          <blockquote style="background: #f9f9f9; padding: 10px; border-left: 4px solid #ccc;">
            ${data.message.replace(/\n/g, '<br>')}
          </blockquote>
        `,
      });
      console.log('Contact notification email sent successfully.');
    } catch (error) {
      console.error('Failed to send contact notification email:', error);
      // Don't throw, just log. We don't want to fail the request if email fails.
    }
  },

  /**
   * Send an outreach email to a target.
   */
  async sendOutreachEmail(to: string, subject: string, htmlContent: string) {
    if (!config.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not set.');
    }

    try {
      const response = await resend.emails.send({
        from: 'Ayoola <onboarding@resend.dev>', // Update with verified domain
        to: to,
        subject: subject,
        html: htmlContent.replace(/\n/g, '<br>'),
      });
      return response;
    } catch (error) {
      console.error('Failed to send outreach email:', error);
      throw error;
    }
  }
};
