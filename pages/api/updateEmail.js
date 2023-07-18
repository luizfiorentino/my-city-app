import nodemailer from "nodemailer";

export default async function handler(req, res) {
  const { to, subject, text, html } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Obs. Alternative example how to configure SMTP configs
    //   host: 'smtp.example.com', // SMTP server hostname
    //   port: 587, // SMTP server port
    //   secure: false, // Set to true if using a secure connection (e.g., TLS/SSL)
    //   auth: {
    //     user: 'your-username', // SMTP username
    //     pass: 'your-password', // SMTP password
    // });

    const mailOptions = {
      from: "sender@example.com",
      to,
      subject,
      text,
      html,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", result);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
}
