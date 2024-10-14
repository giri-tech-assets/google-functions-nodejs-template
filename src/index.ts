import { HttpFunction } from '@google-cloud/functions-framework/build/src/functions';
const nodemailer = require('nodemailer');

// Configure your email service
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  }
});

// Email templates
const emailTemplates = {
  seller: {
    subject: 'Welcome to Our Platform, Seller!',
    body: `
       <h3>Hi there!</h3>
      <p>Thank you for signing up for our waitlist! We're thrilled to have you with us.</p>
      <p>We appreciate your patience as we work to accommodate everyone. You'll be the first to know when spots become available or when we launch our next round</p>
      <p>
    In the meantime, feel free to reach out if you have any questions or just want to say hello at giri@giritoday.com. We're here for you!
      </p>
      <p>
      Thanks again for your interest!
      </p>
      <p>Thanks again for joining us!</p>
      <p>Best,</p>
      <p>Giri Team</p>
    `
  },
  buyer: {
    subject: 'Welcome to Giri!',
    body: `
      <h3>Hi there!</h3>
      <p>Thank you for signing up for our waitlist! We're thrilled to have you with us.</p>
      <p>We appreciate your patience as we work to accommodate everyone. You'll be the first to know when spots become available or when we launch our next round</p>
      <p>
    In the meantime, feel free to reach out if you have any questions or just want to say hello at giri@giritoday.com. We're here for you!
      </p>
      <p>
      Thanks again for your interest!
      </p>
      <p>Thanks again for joining us!</p>
      <p>Best,</p>
      <p>Giri Team</p>
    `
  },
  newsletter: {
    subject: 'Welcome to Our Newsletter!',
    body: `
      <h3>Hi there!</h3>
      <p>Thank you for signing up for our newsletter! We're excited to have you join our community.!</p>
      <p>You can look forward to regular updates packed with exclusive insights, special offers, the latest news, etc.</p>
      <p>
       In the meantime, feel free to explore our website and connect with us on social media for even more great content.
      </p>
      <p>
       If you have any questions or feedback, don't hesitate to reach out giri@giritoday.com
      </p>
      <p>Thanks again for joining us!</p>
      <p>Best,</p>
      <p>Giri Team</p>
    `
  },
  jobApplicant: {
    subject: 'Thank You for Your Application',
    body: `
      <h3>Dear {name},</h3>
      <p>Thank you for applying for a position at Giri! We appreciate your interest in joining our team.</p>
      <p>We are currently reviewing applications and will be in touch soon, regarding the next steps in the hiring process. If your qualifications align with our needs, we will reach out to schedule an interview.</p>
      <p>
        In the meantime, feel free to explore our website and learn more about our mission and values.
      </p>
      {coverLetter}
      <p>
       Thank you once again for your interest in GiriToday. We wish you the best of luck!
      </p>
      <p>Best regards,</p>
      <p>The GiriToday Team</p>
    `
  }
};

type MailerKey = keyof typeof emailTemplates

export const entry: HttpFunction = (req, res) => {
  const { email, name, type, coverLetter, resume } = req.body;

  if (!email || !type) {
    return res.status(400).send('Missing required fields: email, name, or type');
  }

  if (!emailTemplates[type as MailerKey]) {
    return res.status(400).send('Invalid type. Supported types: seller, buyer, newsletter, jobApplicant');
  }

  const template = emailTemplates[type as MailerKey];
  let html = template.body.replace('{name}', name);

  if (type === 'jobApplicant') {
    const coverLetterHtml = coverLetter
      ? `
        <h2>Cover Letter</h2>
        <div>${coverLetter}</div>
      `
      : '';
    html = html.replace('{coverLetter}', coverLetterHtml);
  }

  const mailOptions: any = {
    from: process.env.EMAIL,
    to: email,
    subject: template.subject,
    html: html
  };

  if (type === 'jobApplicant' && resume) {
    mailOptions.attachments = [{
      filename: 'resume.pdf',
      content: resume,
      encoding: 'base64'
    }];
  }

  transporter.sendMail(mailOptions)
    .then(() => {
      res.status(200).send('Email sent successfully');
    })
    .catch((error: any) => {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    });
};


export const index = entry;
export const helloWorld = entry;