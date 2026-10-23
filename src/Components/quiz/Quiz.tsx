"use client";

import { useState, useEffect, useRef } from "react";

// Componentes
import NameStep from "./NameStep";
import Intro from "./Intro";
import QuestionCard from "./QuestionCard";
import Success from "./Success";
import Progress from "./Progress";
import Reaction from "./Reaction";
import ConversationBeat from "./ConversationBeat";

// Data
import { questions, getReaction, type ReactionCue } from "@/data/questions";

// Types
import type { QuizAnswers } from "@/types/quiz";

// styles
import styles from "./Quiz.module.css";

export default function Quiz() {

    const [nome, setNome] = useState("");
    const [tela, setTela] = useState("inicio");
    const [website, setWebsite] = useState("");

    const [respostas, setRespostas] = useState<QuizAnswers>({});
    const [indicePergunta, setIndicePergunta] = useState(0);

    const [reacao, setReacao] = useState<ReactionCue | null>(null);

    const [mensagemErroEnvio, setMensagemErroEnvio] = useState("");

    const envioIdRef = useRef<string | null>(null);

    function responder(resposta: string) {
        const perguntaAtual = questions[indicePergunta];

        setRespostas((anteriores) => ({
            ...anteriores,
            [perguntaAtual.id]: resposta,
        }));

        const novaReacao = getReaction(
            perguntaAtual.id,
            resposta,
            nome
        );

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

        const temporizador = setTimeout(() => {
            setReacao(null);

            if (indicePergunta < questions.length - 1) {
                setIndicePergunta((atual) => atual + 1);
                setTela("pergunta");
            } else {
                setTela("intervalo");
            }
        }, reacao.duration);

        return () => {
            clearTimeout(temporizador);
        };
    }, [tela, reacao, indicePergunta]);



    useEffect(() => {
        if (tela !== "intervalo") {
            return;
        }

        const temporizador = setTimeout(() => {

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
                            nome: nome,
                            respostas: respostas,
                            envioId,
                            website
                        }),
                    });


                    if (respostaHTTP.status === 429) {
                        throw new Error(
                            "Muitas tentativas de envio foram realizadas. " +
                            "Aguarde alguns minutos antes de tentar novamente."
                        );
                    }

                    const resultado = await respostaHTTP.json();

                    if (!respostaHTTP.ok || resultado.ok !== true) {
                        throw new Error(
                            "Não foi possível enviar as respostas."
                        );
                    }

                    setTela("concluido");
                }
                catch (erro) {
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

        return () => {
            clearTimeout(temporizador);
        };
    }, [tela, nome, respostas]);



    function voltar() {
        if (indicePergunta === 0) {
            setTela("apresentacao");
            return;
        }

        setIndicePergunta((atual) => atual - 1);
    }


    function avancar() {
        if (nome.trim() === "") {
            return
        }
        setTela("apresentacao");
    }

    if (tela === "apresentacao") {
        return (
            <Intro
                nome={nome}
                onStart={() => setTela("pergunta")}
                onBack={() => setTela("inicio")}
            />
        );
    }

    if (tela === "reacao" && reacao !== null) {
        return (
            <Reaction
                text={reacao.text}
                tone={reacao.tone}
            />
        );
    }

    if (tela === "pergunta") {
        const perguntaAtual = questions[indicePergunta];


        const atoAtual =
            indicePergunta < 3 ? 1 :
                indicePergunta < 7 ? 2 : 3;


        const tituloAto =
            atoAtual === 1
                ? "Quebrando o gelo"
                : atoAtual === 2
                    ? "Conhecendo seus gostos"
                    : "Últimas curiosidades";


        const classeAto =
            atoAtual === 1
                ? styles.ato1
                : atoAtual === 2
                    ? styles.ato2
                    : styles.ato3;


        return (
            <section className={`${styles.container} ${classeAto}`}>

                <p>
                    <strong>Ato {atoAtual}</strong> — {tituloAto}
                </p>

                <Progress
                    current={indicePergunta + 1}
                    total={questions.length}
                />

                <QuestionCard
                    key={perguntaAtual.id}
                    pergunta={perguntaAtual}
                    respostaSelecionada={
                        respostas[perguntaAtual.id] ?? null
                    }
                    onResponder={responder}
                />

                <button type="button" onClick={voltar}>
                    Voltar
                </button>


            </section >
        );
    }


    if (tela === "intervalo") {
        return (
            <ConversationBeat
                lines={[
                    "Tá… 👀",
                    "Acho que já descobri bastante coisa.",
                    "Mas falta te contar uma coisinha…",
                ]}
            />
        );
    }


    if (tela === "enviando") {
        return (
            <section role="status" aria-live="polite">
                <h2>Enviando suas respostas... 💌</h2>

                <p>
                    Estamos finalizando o Quiz Misterioso.
                </p>
            </section>
        );
    }


    if (tela === "erroEnvio") {
        return (
            <section>
                <h2>Ops, tivemos um probleminha! 😅</h2>


                <p role="alert">
                    {mensagemErroEnvio}
                </p>


                <p>
                    Mas não se preocupe, suas respostas continuam
                    preenchidas nesta página.
                </p>

                <button
                    type="button"
                    onClick={() => setTela("intervalo")}
                >
                    Tentar novamente
                </button>

                <button
                    type="button"
                    onClick={() => {
                        setIndicePergunta(questions.length - 1);
                        setTela("pergunta");
                    }}
                >
                    Voltar à última pergunta
                </button>
            </section>
        );
    }



    // if (tela === "concluído") {
    //     return (
    //         <Success
    //             nome={nome}
    //             onBack={() => {
    //                 setIndicePergunta(questions.length - 1);
    //                 setTela("pergunta");
    //             }}
    //         />
    //     );
    // }


    if (tela === "concluido") {
        return <Success nome={nome} />;
    }


    return (
        <NameStep
            nome={nome}
            onNomeChange={setNome}
            onContinuar={avancar}
            website={website}
            onWebsiteChange={setWebsite}
        />
    )
}