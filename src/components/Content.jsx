import { useEffect, useState } from "react";

export default function Content({ changeScore }) {
  
  const [pokemons, setPokemons] = useState([]);

  const [clicked, setClicked] = useState(new Set([]));

  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    }

    fetchPokemons();
  }, []);

  if (loading) {
    return (
      <main>
        <svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
          <path fill="#fff" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
          <animateTransform 
            attributeName="transform" 
            attributeType="XML" 
            type="rotate"
            dur="1s" 
            from="0 50 50"
            to="360 50 50" 
            repeatCount="indefinite" />
          </path>
        </svg>
      </main>
    );
  }

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
