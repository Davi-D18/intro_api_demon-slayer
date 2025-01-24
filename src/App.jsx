import axios from "axios";
import { useEffect, useState } from "react";
import { Loader } from "./components/Loader/Loader";
import { Personagem } from "./components/Personagem/Personagem";
import "./styles/index.scss";

export function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [detalhes, setDetalhes] = useState({ id: null, exibir: false });

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 8) + 1;
    axios.get(`https://thingproxy.freeboard.io/fetch/https://www.demonslayer-api.com/api/v1/characters?limit=6&page=${randomNumber}`)
      .then(response => {
        setCharacters(response.data);

        setTimeout(() => {
          setLoading(false);
        }, 2000);
      })
      .catch(error => {
        console.error("Erro ao buscar os personagens:", error);
        setError("Falha ao carregar personagens.");
        setLoading(false);
      });
  }, []);

  if (error) return (
    <main>
      <header>
          <h1 translate="no" className="title">Kimetsu no Yaiba</h1>
          <h2>Personagens de Demon Slayer</h2>
      </header>
      <p className="error">{error} :(</p>
      <p>Tente novamente</p>
    </main>
  );

  function exibirDetalhes(id) {
    setDetalhes({
      id: id,
      exibir: true
    });
  }

  function fecharModal() {
    setDetalhes({ id: null, exibir: false }); // Fecha o modal
  };

  return (
    <main>
      <header>
          <h1 translate="no" className="title">Kimetsu no Yaiba</h1>
          <h2>Personagens de Demon Slayer</h2>
      </header>

      {loading ? (
        <div className="loader">
          <Loader />
        </div>
      ) : (
        <>
        <div className="container-main">
          <section className="characters-container">
            {characters.content.map((char, index) => {
              const delay = index * 540; // incrementa o tempo de delay em 540ms para cada elemento

              return (
                <article
                  key={char.id}
                  className="character-card aparecer-card"
                  style={{ animationDelay: `${delay}ms` }}
                  onClick={() => exibirDetalhes(char.id)}
                >
                  <h3 translate="no">{char.name}</h3>
                  <img src={char.img} alt={char.name} loading="lazy" />
                  <p>{char.description}</p>
                </article>
              );
            })}
          </section>

          {detalhes.exibir && (
            <Personagem id={detalhes.id} onClose={fecharModal}/>
          )}
        </div>
      </>
      )}
    </main>
  );
};
