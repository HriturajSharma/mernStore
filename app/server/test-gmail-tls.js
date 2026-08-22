import tls from "tls";

const socket = tls.connect({
    host: "smtp.gmail.com",
    port: 587,
    servername: "smtp.gmail.com",
    rejectUnauthorized: false
});

socket.on("secureConnect", () => {
    console.log("✅ TLS connected");

    console.log("Authorized:", socket.authorized);
    console.log("Authorization error:", socket.authorizationError);

    const cert = socket.getPeerCertificate(true);

    console.log("Subject:", cert.subject);
    console.log("Issuer:", cert.issuer);

    socket.end();
});

socket.on("error", (error) => {
    console.error("❌ TLS error:", error);
});