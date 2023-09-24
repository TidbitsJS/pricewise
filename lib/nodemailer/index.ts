import nodemailer from 'nodemailer';

import { NotificationType, EmailProductInfo, EmailContent } from '@/types';

export const THRESHOLD_PERCENTAGE = 40;

export const Notification = {
  CHANGE_OF_STOCK: 'CHANGE_OF_STOCK',
  LOWEST_PRICE: 'LOWEST_PRICE',
  THRESHOLD_MET: 'THRESHOLD_MET',
};

// ======================== GENERATE EMAIL BODY
export function generateEmailBody(
  product: EmailProductInfo,
  type: NotificationType,
): any {
  let subject = '';
  let body = '';

  switch (type) {
    case Notification.CHANGE_OF_STOCK:
      subject = `${product.title} is now back in stock!`;
      body = `
        <div>
          <h4>Hey, the ${product.title} is now restocked! Grab yours before they run out again!</h4>
          <p>See the product <a href="${product.url}" target="_blank" rel="noopener noreferrer">here</a>.</p>
        </div>
      `;
      break;
    case Notification.LOWEST_PRICE:
      subject = `Lowest Price Alert for ${product.title}`;
      body = `
        <div>
          <h4>Hey, the ${product.title} has reached its lowest price ever!!</h4>
          <p>Grab the product <a href="${product.url}" target="_blank" rel="noopener noreferrer">here</a> now.</p>
        </div>
      `;
      break;
    case Notification.THRESHOLD_MET:
      subject = `Discount Alert for ${product.title}`;
      body = `
        <div>
          <h4>Hey, the ${product.title} is now available at a discount more than ${THRESHOLD_PERCENTAGE}%!</h4>
          <p>Grab it right away from <a href="${product.url}" target="_blank" rel="noopener noreferrer">here</a>.</p>
        </div>
      `;
      break;
    default:
      throw new Error('Invalid notification type.');
  }

  return { subject, body };
}

const transporter = nodemailer.createTransport({
  pool: true,
  service: 'hotmail',
  port: 2525,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  maxConnections: 1,
});

// ======================== SEND EMAIL
export async function sendEmail(emailContent: EmailContent, sendTo: string[]) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: sendTo,
    html: emailContent.body,
    subject: emailContent.subject,
  };

  transporter.sendMail(mailOptions, function (error: any, response: any) {
    if (error) {
      console.log('Error sending the mail: ', error);
      return;
    }
    console.log('Email sent successfully with response: ', response);
  });
}
