
import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const destino = process.env.EMAIL_DESTINO;

if (!apiKey || !destino) {
  console.error("Configure as variáveis no .env.local.");
  process.exitCode = 1;
} else {
  const resend = new Resend(apiKey);

  const { data, error } = await resend.emails.send({
    from: "Quiz Misterioso <onboarding@resend.dev>",
    to: [destino],
    subject: "Teste de envio — Quiz Misterioso",
    text: "Olá! Este é o primeiro e-mail de teste do Quiz Misterioso. O envio pelo Resend está funcionando!",
  });

  if (error) {
    console.error("Falha ao enviar:", error.message);
    process.exitCode = 1;
  } else {
    console.log("E-mail aceito pelo Resend!");
    console.log("ID do envio:", data?.id);
  }
}
