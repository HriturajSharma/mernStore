import dotenv from 'dotenv';
import nodemailer from "nodemailer";

dotenv.config()

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});


try {
    await transporter.verify();
    console.log("✅ Gmail SMTP connection successful");
} catch (error) {
    console.error("❌ Gmail SMTP connection failed:", error);
}

const mailFire = async (toUser, title, content) => {
    try {
        const mailInfo = await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: toUser,
            subject: title,
            text: content
        });

        console.log("Mail sent successfully ✅");
        console.log("Message ID:", mailInfo.messageId);

    } catch (error) {
        console.error("Error while sending mail:", error);
    }
};

export default mailFire;