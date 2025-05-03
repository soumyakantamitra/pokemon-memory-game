import { useEffect, useState } from "react";

export default function Content({ changeScore }) {
  
  const [pokemons, setPokemons] = useState([]);

  const [clicked, setClicked] = useState(new Set([]));

  function checkScore(currentCardClick) {
    if (clicked.has(currentCardClick)) {
      console.log("exists") 
      changeScore(0);
      setClicked(new Set([]));
    }
    else {
      let latest = new Set(clicked);
      latest.add(currentCardClick);
      if (latest.size == 12) {
        console.log("Congrats! You got all 12 correct");
      }
      changeScore(latest.size);
      setClicked(latest);
    }
  }

  useEffect(() => {
    async function fetchPokemons() {
      const promises = [];
      let unique = new Set([]);
      for (let i = 0; i < 12; i++) {
        let id = generateRandomId();
        while (unique.has(id) == true) {
          id = generateRandomId();
        }
        unique.add(id)
        const name = await getPokemonData(id);
        promises.push({id, name, image : `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`});
      }
      setPokemons(promises);
    }

    fetchPokemons();
  }, []);
  return (
    <main>
      {pokemons.map((data) => {
        return (
          <div className="card" 
              key={data.id} 
              onClick={() => {
                checkScore(data.id)
                setPokemons(shuffle(pokemons));
          }}>
            <div className="image">
              <img src={data.image} alt="" style={{width: "100%", height: "100%"}}/>
            </div>
            
            <div className="name">{data.name.toUpperCase()}</div>
          </div>
        )
      })}
    </main>
  );
}

async function getPokemonData(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokeData = await response.json();
  const pokeName = pokeData.name;
  return pokeName;
}

function generateRandomId() {
  const number = Math.floor(Math.random() * 150 + 1);
  return number;
}


function shuffle(array) {
  const copy = [...array];
  let currentIndex = copy.length;

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [copy[currentIndex], copy[randomIndex]] = [
      copy[randomIndex], copy[currentIndex]];
  }

  return copy;
}
