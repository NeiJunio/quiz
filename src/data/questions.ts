import type { AnswerKey, QuizQuestion } from "@/types/quiz";

export const questions: readonly QuizQuestion[] = [
    {
        id: "preferenciaRestaurante",
        prompt: "Se alguém te chamasse para comer alguma coisa, qual dessas opções teria mais chance de te conquistar?",
        type: "choice",
        act: 1,
        options: [
            { label: "Uma pizzaria ou hamburgueria", emoji: "🍕", value: "pizzaria_hamburgueria" },
            { label: "Um restaurante japonês", emoji: "🍣", value: "restaurante_japones" },
            { label: "Um restaurante com uma comida bem gostosa", emoji: "🍝", value: "comida_bem_gostosa" },
            { label: "Uma saída só para comer uma sobremesa", emoji: "🍨", value: "so_sobremesa" },
        ],
    },
    {
        id: "preferenciaLancheBebida",
        prompt: "Agora uma escolha difícil: qual dessas paradas você dificilmente recusaria?",
        type: "choice",
        act: 1,
        options: [
            { label: "Um café bem gostoso", emoji: "☕", value: "cafe" },
            { label: "Um açaí caprichado", emoji: "🍧", value: "acai" },
            { label: "Um sorvete ou milk-shake", emoji: "🍦", value: "sorvete_milkshake" },
            { label: "Um lugar para tomar alguma coisa e conversar", emoji: "🥤", value: "bebida_e_conversa" },
        ],
    },
    {
        id: "programaSabado",
        prompt: "Se pudesse escolher o programa perfeito para um sábado, qual seria?",
        type: "choice",
        act: 1,
        options: [
            { label: "Sair para jantar ou conhecer algum restaurante", emoji: "🍽️", value: "jantar_restaurante" },
            { label: "Ir ao cinema ou assistir a um filme", emoji: "🎬", value: "cinema_filme" },
            { label: "Fazer um passeio e conhecer um lugar diferente", emoji: "🚗", value: "passeio_lugar_novo" },
            { label: "Fazer algo divertido, como jogar boliche ou experimentar uma atividade diferente", emoji: "🎳", value: "atividade_diferente" },
        ],
    },
    {
        id: "estiloPlanejamento",
        prompt: "Quando aparece a oportunidade de fazer alguma coisa diferente, você é do tipo que...",
        type: "choice",
        act: 2,
        options: [
            { label: "Gosta de combinar tudo com antecedência", emoji: "📅", value: "com_antecedencia" },
            { label: "Decide em cima da hora e vê no que dá", emoji: "😂", value: "em_cima_da_hora" },
            { label: "Depende do lugar e da companhia", emoji: "🤔", value: "depende_do_contexto" },
            { label: "Adora uma surpresa, desde que seja boa", emoji: "✨", value: "gosta_de_surpresa" },
        ],
    },
    {
        id: "destinoFimDeSemana",
        prompt: "Se pudesse escolher um lugar para passar um final de semana, qual seria seu destino?",
        type: "choice",
        act: 2,
        options: [
            { label: "Uma praia com um pôr do sol bonito", emoji: "🌊", value: "praia_por_do_sol" },
            { label: "Um lugar tranquilo, cercado pela natureza", emoji: "🌿", value: "natureza_tranquila" },
            { label: "Uma cidade com restaurantes e coisas para conhecer", emoji: "🌆", value: "cidade_e_restaurantes" },
            { label: "Um lugar aconchegante para descansar", emoji: "🏡", value: "lugar_aconchegante" },
        ],
    },
    {
        id: "coisasQueFazemSorrir",
        prompt: "Qual dessas pequenas coisas tem mais chance de arrancar um sorriso seu?",
        type: "choice",
        act: 2,
        options: [
            { label: "Uma surpresa completamente inesperada", emoji: "🎁", value: "surpresa_inesperada" },
            { label: "Descobrir uma música perfeita", emoji: "🎧", value: "musica_perfeita" },
            { label: "Alguém lembrar de um detalhe que contei", emoji: "💌", value: "lembrar_de_um_detalhe" },
            { label: "Um momento simples que acaba sendo especial", emoji: "☕", value: "momento_simples_especial" },
        ],
    },
    {
        id: "ambientePreferido",
        prompt: "Na hora de escolher um lugar para passar um tempo e conversar, qual ambiente combina mais com você?",
        type: "choice",
        act: 2,
        options: [
            { label: "Uma cafeteria tranquila e aconchegante", emoji: "☕", value: "cafeteria_tranquila" },
            { label: "Um restaurante com um ambiente agradável", emoji: "🍽️", value: "restaurante_agradavel" },
            { label: "Um lugar mais movimentado, com música e gente", emoji: "🎶", value: "lugar_movimentado" },
            { label: "Um lugar ao ar livre, tranquilo e sem pressa", emoji: "🌳", value: "ao_ar_livre" },
        ],
    },
    {
        id: "descobertaSobreVoce",
        prompt: "O que alguém provavelmente só descobriria sobre você depois de te conhecer melhor?",
        type: "choice",
        act: 3,
        options: [
            { label: "Meu senso de humor é meio duvidoso", emoji: "😂", value: "humor_duvidoso" },
            { label: "Sou mais sentimental do que pareço", emoji: "💜", value: "mais_sentimental" },
            { label: "Tenho um lado competitivo escondido", emoji: "🏆", value: "lado_competitivo" },
            { label: "Reparo em detalhes que quase ninguém percebe", emoji: "👀", value: "repara_nos_detalhes" },
        ],
    },
    {
        id: "comidaIrresistivel",
        prompt: "Qual comida você dificilmente recusaria?",
        type: "text",
        act: 3,
        placeholder: "Pode ser qualquer coisa...",
        maxLength: 80,
    },
    {
        id: "perguntaQueFaltou",
        prompt: "Tem alguma pergunta que você gostaria que eu tivesse feito, mas não fiz? 👀",
        type: "text",
        act: 3,
        placeholder: "Pode contar, fiquei curioso...",
        maxLength: 200,
    },
    {
        id: "sugestaoComentario",
        prompt: "Antes de terminar... quer deixar alguma sugestão ou comentário? 💌",
        type: "text",
        act: 3,
        placeholder: "Esse espaço é todo seu...",
        maxLength: 350,
    },
] satisfies readonly QuizQuestion[];


export interface ReactionCue {
    text: string;
    symbol: string;
    duration: number;
    tone: "quick" | "turn";
}


export function getReaction(
    perguntaId: AnswerKey,
    resposta: string,
    nome: string
): ReactionCue | null {

    if (perguntaId === "preferenciaRestaurante") {
        const mensagens: Record<string, string> = {
            pizzaria_hamburgueria: "Clássico que funciona. Boa pista pra começar.",
            restaurante_japones: "Opa… essa pista já valeu bastante.",
            comida_bem_gostosa: "Sem rótulo, desde que seja muito bom. Justo.",
            so_sobremesa: "Começar pela sobremesa? Respeito essa estratégia.",
        };

        return {
            text: mensagens[resposta] ?? "Primeira pista registrada.",
            symbol: "01",
            duration: 2250,
            tone: "quick",
        };
    }

    if (perguntaId === "estiloPlanejamento") {
        const mensagens: Record<string, string> = {
            com_antecedencia: `${nome}, você gosta do plano antes da aventura. Anotado.`,
            em_cima_da_hora: "Um pouco de caos organizado… entendi.",
            depende_do_contexto: "A resposta mais sensata — e mais misteriosa também.",
            gosta_de_surpresa: "Surpresa boa passou no teste. Informação valiosa.",
        };

        return {
            text: mensagens[resposta] ?? "Essa eu precisava saber.",
            symbol: "04",
            duration: 2250,
            tone: "quick",
        };
    }

    if (perguntaId === "coisasQueFazemSorrir") {
        const mensagens: Record<string, string> = {
            surpresa_inesperada: "Então o inesperado ainda tem seus méritos.",
            musica_perfeita: "Uma música certa muda o clima inteiro. Boa escolha.",
            lembrar_de_um_detalhe: "Você nota quando alguém realmente prestou atenção. Entendi.",
            momento_simples_especial: "Os melhores momentos às vezes chegam sem anúncio.",
        };

        return {
            text: mensagens[resposta] ?? "Mais uma pista guardada.",
            symbol: "06",
            duration: 2250,
            tone: "quick",
        };
    }

    if (perguntaId === "descobertaSobreVoce") {
        const mensagens: Record<string, string> = {
            humor_duvidoso: "Humor duvidoso costuma render as melhores histórias.",
            mais_sentimental: "A parte menos óbvia costuma ser a mais interessante.",
            lado_competitivo: "Competitividade secreta detectada. Vou lembrar disso.",
            repara_nos_detalhes: "Então nada passa despercebido… pista importante.",
        };

        return {
            text: mensagens[resposta] ?? "Agora entramos na parte menos óbvia.",
            symbol: "08",
            duration: 2250,
            tone: "turn",
        };
    }

    return null;
}
