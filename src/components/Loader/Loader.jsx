import { useEffect, useState } from "react";
import S from "./style/loader.module.scss";

// Lista de frases
const frases = [
  "Tanjiro está quase pronto, a jornada irá começar...",
  "A respiração do vento está se formando... algo grande vem aí!",
  "Só mais um momento... a missão de Tanjiro está chegando!",
  "Tudo está sendo preparado, a espera vai valer a pena!",
  "A paciência de Zenitsu está prestes a ser recompensada!",
  "Inosuke está quase pronto... a aventura está chegando!",
  "Aguarde... o sol vai nascer e tudo vai mudar!",
  "Algo especial está chegando... como a ajuda dos caçadores!",
  "Estamos quase lá... a jornada está se completando!",
  "A espera está quase no fim... algo incrível vem aí!"
];



const gifs = [
  "https://media.tenor.com/OAmAmF7ToK8AAAAi/bored-bored-nezuko.gif",
  "https://media.tenor.com/WIcJ4uCDt9QAAAAi/nezuko-running.gif",
]

export function Loader() {
  const [fraseAtual, setFraseAtual] = useState("");
  const [gifAtual, setGifAtual] = useState("");

  // Função para mudar a frase aleatoriamente a cada vez que o componente for renderizado
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * frases.length);
    const randomGifIndex = Math.floor(Math.random() * gifs.length);

    setGifAtual(gifs[randomGifIndex]);
    setFraseAtual(frases[randomIndex]);
  }, []);

  return (
    <div className={S.loading_container}>
      <div className={S.katana_wrapper}>
        <img src={gifAtual} />
      </div>
      <p>{fraseAtual}</p>
    </div>
  );
}
