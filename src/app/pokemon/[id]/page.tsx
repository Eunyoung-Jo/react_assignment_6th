import React from "react";
import { fetchPokemonData } from "@/apis/pokemon";
import Image from "next/image";
import Link from "next/link";

const PokemonDetailPage = async ({ params }: { params: { id: string } }) => {
  const pokemonData = await fetchPokemonData(params.id);

  const renderTypes = () => {
    return pokemonData.types.map((type: any) => (
      <span key={type.type.name} className="px-2 py-1 bg-gray-200 rounded">
        {type.type.name}
      </span>
    ));
  };

  const renderAbilities = () => {
    return pokemonData.abilities.map((ability: any) => (
      <span key={ability.ability.name} className="px-2 py-1 bg-gray-200 rounded">
        {ability.ability.name}
      </span>
    ));
  };

  return (
    <div className="pokemon-details max-w-xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-gray-100 text-gray-800 text-center p-4">
        <h2 className="text-2xl font-bold">{pokemonData.korean_name}</h2>
        <p>No. {pokemonData.id.toString().padStart(4, "0")}</p>
      </div>
      <div className="p-4 text-black flex flex-col justify-start items-center">
        <Image
          src={pokemonData.sprites.front_default}
          alt={pokemonData.korean_name}
          className="mx-auto"
          width={96}
          height={96}
        />
        <p className="text-center text-xl my-2">이름: {pokemonData.korean_name}</p>
        <div className="flex gap-2">
          <p className="text-center">키: {pokemonData.height / 10} m</p>
          <p className="text-center">무게: {pokemonData.weight / 10} kg</p>
        </div>
        <div className="flex gap-2">
          <div className="text-center my-2 flex gap-1">
            <p className="font-bold">타입: </p>
            <div>{renderTypes()}</div>
          </div>
          <div className="text-center my-2 flex gap-1">
            <p className="font-bold">특성: </p>
            <div>{renderAbilities()}</div>
          </div>
        </div>

        <div className="text-center my-2">
          <p className="font-bold mb-5">기술: </p>
          <div className="flex flex-wrap gap-2 items-center text-center justify-center">
            {pokemonData.moves.map((move: any) => (
              <div key={move.move.name}>{move.move.name}</div>
            ))}
          </div>
        </div>
        <div className="text-center mt-4">
          <Link href="/" className="bg-gray-500 text-black px-4 py-2 rounded">
            뒤로 가기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailPage;
