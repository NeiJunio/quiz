
export type AnswerKey =
    | "preferenciaRestaurante"
    | "preferenciaLancheBebida"
    | "programaSabado"
    | "estiloPlanejamento"
    | "destinoFimDeSemana"
    | "coisasQueFazemSorrir"
    | "ambientePreferido"
    | "descobertaSobreVoce"
    | "comidaIrresistivel"
    | "perguntaQueFaltou"
    | "sugestaoComentario";

export type QuizAnswers = Partial<Record<AnswerKey, string>>;

export interface QuizOption {
    label: string;
    emoji: string;
    value: string;
}

export type QuizAct = 1 | 2 | 3;

type FourOptions = readonly [
    QuizOption,
    QuizOption,
    QuizOption,
    QuizOption,
];

interface BaseQuestion {
    id: AnswerKey;
    prompt: string;
    act: QuizAct;
}

export interface ChoiceQuestion extends BaseQuestion {
    type: "choice";
    options: FourOptions;
}

export interface TextQuestion extends BaseQuestion {
    type: "text";
    placeholder: string;
    maxLength: number;
}

export type QuizQuestion = ChoiceQuestion | TextQuestion;
