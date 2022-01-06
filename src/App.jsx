import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";

const Spinner = () => (
  <div className="flex items-center p-12">
    <div className="w-40 h-40 border-t-4 border-b-4 border-green-900 rounded-full animate-spin"></div>
  </div>
);

const Background = () => (
  <div className="w-screen h-screen fixed">
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full h-full relative"></div>
    {/* <div className="w-32 h-32 bg-white backdrop-fliter backdrop-blur-sm rounded-full max-w-lg absolute  inset-y-1/3"></div>
    <div className="w-40 h-40 bg-white backdrop-fliter backdrop-blur-sm rounded-full max-w-lg absolute -right-2 inset-y-2/3"></div> */}
  </div>
);

const Card = ({ img, data, isLoading }) => {
  const { name, types, id, stats } = data;

  return (
    <div className="relative">
      <div className="Circle w-32 h-32 bg-white backdrop-fliter backdrop-blur-sm rounded-full max-w-lg shadow-lg shadow-purple-500/40 absolute inset-y-1/4 -left-16"></div>
      <div className="Circle w-40 h-40 bg-white backdrop-fliter backdrop-blur-sm rounded-full max-w-lg shadow-lg shadow-rose-500/40 absolute inset-y-3/4 -right-16"></div>
      <div className="w-fit h-fit py-3 px-5 bg-white/50 backdrop-fillter backdrop-blur-lg rounded-xl relative shadow-lg shadow-indigo-500/40">
        <div className="Circle w-12 h-12 bg-white backdrop-fliter backdrop-blur-sm rounded-full max-w-lg shadow-lg shadow-indigo-500/40 absolute -top-7 left-12 "></div>
        {isLoading ? (
          <Spinner />
        ) : (
          <React.Fragment>
            <img src={img} alt="" className="w-40 mx-auto mt-3 lg:w-64" />
            <h1 className="text-center font-bold text-xl mt-2 capitalize lg:text-2xl ">
              {name}
            </h1>
            <div className="absolute top-4 right-4 font-bold bg-white px-2 py-1 rounded-full shadow-md shadow-purple-500/50 ">
              #{id}
            </div>
            <div className="flex justify-around mt-3">
              {types &&
                types.map((type) => (
                  <Type key={type.type.name} type={type.type.name} />
                ))}
            </div>
            <div className="flex justify-around mt-3">
              {stats && (
                <React.Fragment>
                  <Stats banner="Attack" stat={stats[1].base_stat} />
                  <Stats banner="Defence" stat={stats[2].base_stat} />
                  <Stats banner="Speed" stat={stats[5].base_stat} />
                </React.Fragment>
              )}
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

const Type = ({ type }) => {
  const backgrounds = {
    grass: "#49D0B0",
    fire: "#FC6C6D",
    water: "#8FD0FF",
    electric: "#FBC73F",
    fairy: "#F27CFC",
    normal: "#5E5E5E",
    bug: "#16DDAE",
    poison: "#D37FFB",
    ground: "#F9B34B",
    fighting: "#9C1B1B",
    rock: "#E46E6E",
    dragon: "#FF8A00",
    ghost: "#8C70FF",
    dark: "#252525",
    psychic: "#FF6CF0",
    steel: "#424141",
    flying: "#3CAAFB",
    ice: "#27DACF",
  };

  return (
    <div
      className="w-fit rounded-3xl px-3 py-1 font-semibold text-white lg:text-lg"
      style={{ backgroundColor: backgrounds[type] }}
    >
      {type}
    </div>
  );
};

const Stats = ({ banner, stat }) => (
  <div className="mx-2">
    <div className="text-center font-bold lg:text-lg">{stat}</div>
    <div className="text-center font-semibold text-gray-500">{banner}</div>
  </div>
);

const GenerateBtn = ({ handleGenerate }) => (
  <div
    className="button px-4 py-2 mt-3 w-fit font-semibold text-white ounded cursor-pointe relative backdrop-fliter backdrop-blur-sm bg-white/30 hover:bg-white/70 cursor-pointer shadow-lg shadow-rose-500/40"
    onClick={handleGenerate}
  >
    Generate
  </div>
);

function App() {
  const [id, setId] = useState(1);
  const [pokeData, setPokeData] = useState({});
  const [img, setImg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = () => {
    const random = Math.floor(Math.random() * 600 + 1);
    setId(random);
    setIsLoading(true);
    setImg("");
    fetchPokemon(id);
    setTimeout(() => setIsLoading(false), 1000);

    console.log("Fetched");
  };

  const fetchPokemon = async (id) => {
    await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => {
        // setImg(res.data.sprites.other["official-artwork"].front_default);
        setImg(res.data.sprites.other["home"].front_default);
        setPokeData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleGenerate();
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center relative">
      <Background />
      <Card img={img} data={pokeData} isLoading={isLoading} />
      <GenerateBtn handleGenerate={handleGenerate} />
    </div>
  );
}

export default App;
