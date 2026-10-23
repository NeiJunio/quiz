"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { getReaction, questions, type ReactionCue } from "@/data/questions";
import type { QuizAct, QuizAnswers } from "@/types/quiz";

import ConversationBeat from "./ConversationBeat";
import Intro from "./Intro";
import NameStep from "./NameStep";
import Progress from "./Progress";
import QuestionCard from "./QuestionCard";
import Reaction from "./Reaction";
import Success from "./Success";
import styles from "./Quiz.module.css";

type Screen =
    | "inicio"
    | "apresentacao"
    | "pergunta"
    | "reacao"
    | "intervalo"
    | "enviando"
    | "erroEnvio"
    | "concluido";

const actDetails: Record<QuizAct, { title: string; shortLabel: string }> = {
    1: {
        title: "Conhecendo seus gostos",
        shortLabel: "Gostos",
    },
    2: {
        title: "Descobrindo suas preferências",
        shortLabel: "Preferências",
    },
    3: {
        title: "Um pouquinho além do óbvio",
        shortLabel: "Além do óbvio",
    },
};

export default function Quiz() {
    const [nome, setNome] = useState("");
    const [tela, setTela] = useState<Screen>("inicio");
    const [website, setWebsite] = useState("");
    const [respostas, setRespostas] = useState<QuizAnswers>({});
    const [indicePergunta, setIndicePergunta] = useState(0);
    const [reacao, setReacao] = useState<ReactionCue | null>(null);
    const [mensagemErroEnvio, setMensagemErroEnvio] = useState("");
    const envioIdRef = useRef<string | null>(null);

    const perguntaAtual = questions[indicePergunta];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [tela, indicePergunta]);

    function responder(resposta: string) {
        setRespostas((anteriores) => ({
            ...anteriores,
            [perguntaAtual.id]: resposta,
        }));

        const novaReacao = getReaction(perguntaAtual.id, resposta, nome);

        if (novaReacao !== null) {
            setReacao(novaReacao);
            setTela("reacao");
            return;
        }

        if (indicePergunta < questions.length - 1) {
            setIndicePergunta((atual) => atual + 1);
        } else {
            setTela("intervalo");
        }
    }

    useEffect(() => {
        if (tela !== "reacao" || reacao === null) {
            return;
        }

        const temporizador = window.setTimeout(() => {
            setReacao(null);

            if (indicePergunta < questions.length - 1) {
                setIndicePergunta((atual) => atual + 1);
                setTela("pergunta");
            } else {
                setTela("intervalo");
            }
        }, reacao.duration);

        return () => window.clearTimeout(temporizador);
    }, [tela, reacao, indicePergunta]);

    useEffect(() => {
        if (tela !== "intervalo") {
            return;
        }

        const temporizador = window.setTimeout(() => {
            async function enviarRespostas() {
                setTela("enviando");

                const envioId = envioIdRef.current ?? crypto.randomUUID();
                envioIdRef.current = envioId;

                try {
                    const respostaHTTP = await fetch("/api/respostas", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            nome,
                            respostas,
                            envioId,
                            website,
                        }),
                    });

                    if (respostaHTTP.status === 429) {
                        throw new Error(
                            "Muitas tentativas de envio foram realizadas. Aguarde alguns minutos antes de tentar novamente.",
                        );
                    }

                    const resultado: unknown = await respostaHTTP.json();
                    const envioConfirmado =
                        typeof resultado === "object" &&
                        resultado !== null &&
                        "ok" in resultado &&
                        resultado.ok === true;

                    if (!respostaHTTP.ok || !envioConfirmado) {
                        throw new Error("Não foi possível enviar as respostas.");
                    }

                    setTela("concluido");
                } catch (erro) {
                    console.error("Erro ao enviar respostas:", erro);

                    const mensagem =
                        erro instanceof Error &&
                        erro.message.startsWith("Muitas tentativas de envio")
                            ? erro.message
                            : "Não conseguimos confirmar o envio das suas respostas. Tente novamente.";

                    setMensagemErroEnvio(mensagem);
                    setTela("erroEnvio");
                }
            }

            void enviarRespostas();
        }, 4400);

        return () => window.clearTimeout(temporizador);
    }, [tela, nome, respostas, website]);

    function voltar() {
        if (indicePergunta === 0) {
            setTela("apresentacao");
            return;
        }

        setIndicePergunta((atual) => atual - 1);
    }

    function avancar() {
        const nomeLimpo = nome.trim();

        if (nomeLimpo.length < 2) {
            return;
        }

        setNome(nomeLimpo);
        setTela("apresentacao");
    }

    let content: ReactNode;

    if (tela === "apresentacao") {
        content = (
            <Intro
                nome={nome}
                onStart={() => setTela("pergunta")}
                onBack={() => setTela("inicio")}
            />
        );
    } else if (tela === "reacao" && reacao !== null) {
        content = (
            <Reaction text={reacao.text} symbol={reacao.symbol} tone={reacao.tone} />
        );
    } else if (tela === "pergunta") {
        const act = perguntaAtual.act;
        const details = actDetails[act];

        content = (
            <section className={styles.quizPanel} aria-label={`Ato ${act}: ${details.title}`}>
                <Progress
                    current={indicePergunta + 1}
                    total={questions.length}
                    act={act}
                    actTitle={details.title}
                />

                <QuestionCard
                    key={perguntaAtual.id}
                    pergunta={perguntaAtual}
                    numero={indicePergunta + 1}
                    respostaSelecionada={respostas[perguntaAtual.id] ?? null}
                    onResponder={responder}
                />

                <div className={styles.panelFooter}>
                    <button className={styles.backButton} type="button" onClick={voltar}>
                        <span aria-hidden="true">←</span> Voltar
                    </button>
                    <p aria-hidden="true">{details.shortLabel} · {indicePergunta + 1}/11</p>
                </div>
            </section>
        );
    } else if (tela === "intervalo") {
        content = (
            <ConversationBeat
                lines={[
                    "Tá… 👀",
                    "Acho que já descobri bastante coisa.",
                    "Mas falta te contar uma coisinha…",
                ]}
            />
        );
    } else if (tela === "enviando") {
        content = (
            <section className={styles.statusCard} role="status" aria-live="polite">
                <div className={styles.loader} aria-hidden="true">
                    <span />
                </div>
                <p className={styles.statusEyebrow}>Organizando as pistas</p>
                <h1>Só um instante…</h1>
                <p>Estamos finalizando o Quiz Misterioso com cuidado.</p>
            </section>
        );
    } else if (tela === "erroEnvio") {
        content = (
            <section className={`${styles.statusCard} ${styles.errorCard}`}>
                <div className={styles.errorMark} aria-hidden="true">!</div>
                <p className={styles.statusEyebrow}>As pistas continuam seguras</p>
                <h1>O envio não foi confirmado.</h1>
                <p className={styles.errorMessage} role="alert">
                    {mensagemErroEnvio}
                </p>
                <p>
                    Suas respostas continuam preenchidas nesta página. Você pode tentar
                    novamente ou revisar a última pergunta.
                </p>
                <div className={styles.statusActions}>
                    <button type="button" onClick={() => setTela("intervalo")}>
                        Tentar novamente <span aria-hidden="true">→</span>
                    </button>
                    <button
                        className={styles.secondaryButton}
                        type="button"
                        onClick={() => {
                            setIndicePergunta(questions.length - 1);
                            setTela("pergunta");
                        }}
                    >
                        Voltar à última pergunta
                    </button>
                </div>
            </section>
        );
    } else if (tela === "concluido") {
        content = <Success nome={nome} />;
    } else {
        content = (
            <NameStep
                nome={nome}
                onNomeChange={setNome}
                onContinuar={avancar}
                website={website}
                onWebsiteChange={setWebsite}
            />
        );
    }

    const actVisual: QuizAct =
        tela === "pergunta" || tela === "reacao"
            ? perguntaAtual.act
            : tela === "inicio" || tela === "apresentacao"
                ? 1
                : 3;

    return (
        <div className={styles.experience} data-act={actVisual}>
            <div className={styles.ambientGlow} aria-hidden="true" />
            <div className={styles.orbit} aria-hidden="true">
                <span />
            </div>
            <div className={styles.starField} aria-hidden="true" />

            <div className={styles.stage}>{content}</div>

            <p className={styles.cornerMark} aria-hidden="true">
                QM <span>·</span> arquivo particular
            </p>
        </div>
    );
}
