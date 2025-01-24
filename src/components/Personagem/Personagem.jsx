import axios from "axios";
import { useEffect, useState } from "react";
import S from './style/personagem.module.scss';

export function Personagem({ id, onClose }) { 

  const [character, setCharacter] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    axios.get(`https://thingproxy.freeboard.io/fetch/https://www.demonslayer-api.com/api/v1/characters?id=${id}`)
      .then(response => {
        const data = response.data.content[0]; 
        setCharacter(data);
      })
      .catch(error => {
        console.error("Erro ao buscar os personagens:", error);
        setError("Falha ao carregar personagem.");
      });
  }, [id]);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains(S.overlay)) {
      onClose();
    }
  };

  return (
    <div className={S.overlay} onClick={handleOverlayClick}>
      <div className={S.modal}>
        <button className={S.close_button} onClick={onClose}>X</button>

        {error ? (
          <p className={S.error}>{error}</p>
        ) : character ? (
          <>
            {/* Imagem e Nome */}
            <div className={S.header}>
              <img src={character.img} alt={character.name} />
              <h2 translate="no">{character.name}</h2>
            </div>

            {/* Informações Básicas */}
            <div className={S.info}>
              <div className={S.info_item}>
                <h3 translate="no">Idade</h3>
                <p>{character.age || "Desconhecida"}</p>
              </div>
              <div className={S.info_item}>
                <h3 translate="no">Gênero</h3>
                <p>{character.gender || "Não informado"}</p>
              </div>
            </div>

            {/* Descrição */}
            <section className={S.description}>
              <h3>Descrição</h3>
              <p>{character.description}</p>
            </section>

            {/* Estilos de Combate */}
            <section className={S.combat_styles}>
              <h3>Estilos de Combate</h3>
              <div className={S.styles_container}>
                {character.combat_style.map((style) => (
                  <div key={style.id} className={S.style_card}>
                    <h4>{style.name}</h4>
                    <p>{style.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          <p className={S.loading}>Carregando...</p>
        )}
      </div>
    </div>
  );
}
