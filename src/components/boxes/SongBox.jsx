import React from "react";

export default function SongBox({ data }) {
  return (
    <div className="bg-dark-800 p-4 rounded-xl flex flex-col">
      <div className="flex justify-center w-full">
        <img className="w-44 rounded-lg" src={data.img} alt="" />
      </div>

      <div className="pt-3">
        <p className="text-white font-semibold">{data.name}</p>
        <div className="flex justify-between w-full">
          <p className="text-dark-200 text-xs">{data.artist}</p>
          <img src="/icons/music.svg" alt="" />
        </div>
      </div>
    </div>
  );
}