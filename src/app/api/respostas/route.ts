
import { Resend } from "resend";
import { questions } from "@/data/questions";

export const runtime = "nodejs";

// Verifica se um valor é um objeto válido.
function ehObjeto(
    valor: unknown
): valor is Record<string, unknown> {
    return (
        typeof valor === "object" &&
        valor !== null &&
        !Array.isArray(valor)
    );
}

export async function POST(request: Request) {
    let dados: unknown;

    // 1. Lê o JSON recebido.
    try {
        const corpo = await request.text();

        if (corpo.length > 10000) {
            return Response.json(
                { ok: false, erro: "Dados muito grandes." },
                { status: 413 }
            );
        }

        dados = JSON.parse(corpo);
    } catch {
        return Response.json(
            { ok: false, erro: "JSON inválido." },
            { status: 400 }
        );
    }

    // 2. Verifica a estrutura dos dados.
    if (!ehObjeto(dados)) {
        return Response.json(
            { ok: false, erro: "Dados inválidos." },
            { status: 400 }
        );
    }

    const { nome, respostas, envioId, website } = dados;


    if (website !== undefined && typeof website !== "string") {
        return Response.json(
            {
                ok: false,
                erro: "Dados inválidos.",
            },
            { status: 400 }
        );
    }

    if (typeof website === "string" && website.trim() !== "") {
        console.log("Solicitação suspeita ignorada.");

        return Response.json({
            ok: true,
            mensagem: "Solicitação recebida.",
        });
    }


    if (
        typeof nome !== "string" ||
        nome.trim().length < 2 ||
        nome.trim().length > 80 ||
        !ehObjeto(respostas)
    ) {
        return Response.json(
            { ok: false, erro: "Nome ou respostas inválidos." },
            { status: 400 }
        );
    }


    const envioIdValido =
        typeof envioId === "string" &&
        /^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(envioId);

    if (!envioIdValido) {
        return Response.json(
            {
                ok: false,
                erro: "Identificador de envio inválido.",
            },
            { status: 400 }
        );
    }


    // 3. Valida as dez respostas.
    for (const pergunta of questions) {
        const resposta = respostas[pergunta.id];

        if (
            typeof resposta !== "string" ||
            resposta.trim().length < 2
        ) {
            return Response.json(
                {
                    ok: false,
                    erro: `Resposta inválida: ${pergunta.id}`,
                },
                { status: 400 }
            );
        }

        if (pergunta.type === "choice") {
            const opcaoValida = pergunta.options?.some(
                (opcao) => opcao.value === resposta
            );

            if (!opcaoValida) {
                return Response.json(
                    {
                        ok: false,
                        erro: `Alternativa inválida: ${pergunta.id}`,
                    },
                    { status: 400 }
                );
            }
        }

        if (
            pergunta.type === "text" &&
            resposta.length > (pergunta.maxLength ?? 200)
        ) {
            return Response.json(
                {
                    ok: false,
                    erro: `Texto muito longo: ${pergunta.id}`,
                },
                { status: 400 }
            );
        }
    }

    // 4. Monta o conteúdo do e-mail.
    const conteudoRespostas = questions
        .map((pergunta, indice) => {
            const resposta = respostas[pergunta.id] as string;

            return (
                `${indice + 1}. ${pergunta.prompt}\n` +
                `Resposta: ${resposta.trim()}`
            );
        })
        .join("\n\n");

    const corpoEmail = `
NOVA RESPOSTA — QUIZ MISTERIOSO

Pessoa: ${nome.trim()}

----------------------------------------

${conteudoRespostas}

----------------------------------------

Fim das respostas.
`.trim();

    // 5. Verifica as configurações do Resend.
    const apiKey = process.env.RESEND_API_KEY;
    const destino = process.env.EMAIL_DESTINO;
    const remetente = process.env.RESEND_FROM_EMAIL;

    if (!apiKey || !destino || !remetente) {
        console.error("Configuração de e-mail ausente.");

        return Response.json(
            { ok: false, erro: "Serviço indisponível." },
            { status: 500 }
        );
    }

    // 6. Envia o e-mail.
    try {
        const resend = new Resend(apiKey);


        const { data, error } = await resend.emails.send(
            {
                from: remetente,
                to: [destino],
                subject: `Respostas do Quiz Misterioso - ${nome.trim()}`,
                text: corpoEmail,
            },
            {
                idempotencyKey: `quiz-misterioso/${envioId}`,
            }
        );


        if (error) {
            console.error("Erro do Resend:", error);

            return Response.json(
                {
                    ok: false,
                    erro: "Não foi possível enviar as respostas.",
                },
                { status: 502 }
            );
        }

        return Response.json({
            ok: true,
            mensagem: "E-mail aceito para envio.",
            id: data?.id,
        });
    } catch (error) {
        console.error("Falha no envio:", error);

        return Response.json(
            {
                ok: false,
                erro: "Falha inesperada no envio.",
            },
            { status: 500 }
        );
    }
}
