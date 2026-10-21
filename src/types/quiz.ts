
export type AnswerKey =
    | "doceOuSalgado"
    | "cafeOuAcai"
    | "sairOuCasa"
    | "planejadoOuImproviso"
    | "praiaOuNatureza"
    | "diaOuNoite"
    | "filmeOuMusica"
    | "movimentadoOuTranquilo"
    | "comidaIrresistivel"
    | "perguntaQueFaltou"
    | "sugestaoComentario"
    ;

export type QuizAnswers = Partial<Record<AnswerKey, string>>;

export interface QuizOption {
    label: string;
    emoji: string;
    value: string;
}

export interface QuizQuestion {
    id: AnswerKey;
    prompt: string;
    type: "choice" | "text";
    options?: QuizOption[];
    placeholder?: string;
    maxLength?: number;
}
