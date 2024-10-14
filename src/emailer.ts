const nodemailer = require('nodemailer');


export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  }
});


export const emailTemplates = {
  seller: {
    subject: 'Welcome to Our Platform, Seller!',
    body: `
      <h1>Welcome, {name}!</h1>
      <p>Thank you for signing up as a seller on our platform. We're excited to have you on board!</p>
      <p>Here are some next steps to get started:</p>
      <ul>
        <li>Complete your seller profile</li>
        <li>Add your first product</li>
        <li>Set up your payment information</li>
      </ul>
      <p>If you have any questions, please don't hesitate to contact our seller support team.</p>
    `
  },
  buyer: {
    subject: 'Welcome to Our Platform!',
    body: `
      <h1>Welcome, {name}!</h1>
      <p>Thank you for joining our platform as a buyer. We're thrilled to have you with us!</p>
      <p>Here are some things you can do now:</p>
      <ul>
        <li>Browse our wide selection of products</li>
        <li>Save items to your wishlist</li>
        <li>Make your first purchase</li>
      </ul>
      <p>If you need any assistance, our customer support team is always here to help.</p>
    `
  },
  newsletter: {
    subject: 'Welcome to Our Newsletter!',
    body: `
      <h1>Hello, {name}!</h1>
      <p>Thank you for subscribing to our newsletter. We're excited to keep you updated with our latest news and offers!</p>
      <p>Here's what you can expect:</p>
      <ul>
        <li>Weekly product updates</li>
        <li>Exclusive deals and promotions</li>
        <li>Interesting articles and tips</li>
      </ul>
      <p>Stay tuned for our next edition!</p>
    `
  },
  jobApplicant: {
    subject: 'Thank You for Your Application',
    body: `
      <h1>Dear {name},</h1>
      <p>Thank you for applying for a position with our company. We appreciate your interest in joining our team!</p>
      <p>Here's what happens next:</p>
      <ul>
        <li>Our hiring team will review your application</li>
        <li>If your qualifications match our needs, we'll contact you for an interview</li>
        <li>If not, we'll keep your application on file for future opportunities</li>
      </ul>
      <p>We wish you the best in your job search!</p>
    `
  }
};


// export 