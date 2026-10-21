import type { QuizQuestion, AnswerKey } from "@/types/quiz";

export const questions: QuizQuestion[] = [
    {
        id: "doceOuSalgado",
        prompt: "Doce ou salgado?",
        type: "choice",
        options: [
            { label: "Doce", emoji: "🍫", value: "Doce" },
            { label: "Salgado", emoji: "🍕", value: "Salgado" },
        ],
    },
    {
        id: "cafeOuAcai",
        prompt: "E pra acompanhar?",
        type: "choice",
        options: [
            { label: "Café", emoji: "☕", value: "Café" },
            { label: "Açaí", emoji: "🍧", value: "Açaí" },
        ],
    },
    {
        id: "sairOuCasa",
        prompt: "Num sábado tranquilo, o que combina mais?",
        type: "choice",
        options: [
            { label: "Sair pra comer", emoji: "🍝", value: "Sair pra comer" },
            {
                label: "Pedir alguma coisa e ficar em casa",
                emoji: "🏠",
                value: "Ficar em casa",
            },
        ],
    },
    {
        id: "planejadoOuImproviso",
        prompt: "Quando o assunto é rolê...",
        type: "choice",
        options: [
            { label: "Planejar antes", emoji: "📅", value: "Planejar antes" },
            {
                label: "Decidir em cima da hora",
                emoji: "😂",
                value: "Decidir em cima da hora",
            },
        ],
    },
    {
        id: "praiaOuNatureza",
        prompt: "Qual dessas vibes te ganha?",
        type: "choice",
        options: [
            { label: "Praia", emoji: "🌊", value: "Praia" },
            {
                label: "Natureza / interior",
                emoji: "🌿",
                value: "Natureza / interior",
            },
        ],
    },
    {
        id: "diaOuNoite",
        prompt: "Você funciona melhor de dia ou à noite?",
        type: "choice",
        options: [
            { label: "Dia", emoji: "☀️", value: "Dia" },
            { label: "Noite", emoji: "🌙", value: "Noite" },
        ],
    },
    {
        id: "filmeOuMusica",
        prompt: "Pra desligar um pouco...",
        type: "choice",
        options: [
            { label: "Filme / série", emoji: "🎬", value: "Filme / série" },
            { label: "Música", emoji: "🎧", value: "Música" },
        ],
    },
    {
        id: "movimentadoOuTranquilo",
        prompt: "Quando você sai, prefere...",
        type: "choice",
        options: [
            {
                label: "Um lugar mais movimentado",
                emoji: "✨",
                value: "Lugar movimentado",
            },
            {
                label: "Algum lugar mais tranquilo",
                emoji: "🌙",
                value: "Lugar tranquilo",
            },
        ],
    },
    {
        id: "comidaIrresistivel",
        prompt: "Qual comida você dificilmente recusaria?",
        type: "text",
        placeholder: "Pode ser qualquer coisa...",
        maxLength: 80,
    },
    {
        id: "perguntaQueFaltou",
        prompt:
            "Tem alguma pergunta que você gostaria que eu tivesse feito, mas não fiz? 👀",
        type: "text",
        placeholder: "Pode contar, fiquei curioso...",
        maxLength: 200,
    },
    {
        id: "sugestaoComentario",
        prompt:
            "Antes de terminar... quer deixar alguma sugestão ou comentário? 💌",
        type: "text",
        placeholder: "Esse espaço é todo seu...",
        maxLength: 350,
    }
]


export interface ReactionCue {
    text: string;
    duration: number;
    tone: "quick" | "turn";
}


export function getReaction(
    perguntaId: AnswerKey,
    resposta: string,
    nome: string
): ReactionCue | null {

    if (perguntaId === "doceOuSalgado") {
        return {
            text:
                resposta === "Doce"
                    ? "Ok… já sei por onde começar então 🍫"
                    : "Hmm… informação importante 👀",
            duration: 2250,
            tone: "quick",
        };
    }

    if (perguntaId === "planejadoOuImproviso") {
        return {
            text:
                resposta === "Planejar antes"
                    ? `Hmm, ${nome}… essa eu precisava saber.`
                    : "Então surpresa não é um problema… anotado.",
            duration: 2250,
            tone: "quick",
        };
    }

    if (perguntaId === "diaOuNoite") {
        return {
            text: `${resposta}… essa resposta pode ser útil depois 👀`,
            duration: 2250,
            tone: "quick",
        };
    }

    if (perguntaId === "movimentadoOuTranquilo") {
        return {
            text: "Até agora tava fácil…\nAgora quero ver essa 👀",
            duration: 2250,
            tone: "turn",
        };
    }

    return null;
}
