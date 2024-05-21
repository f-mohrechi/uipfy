import React, { useEffect, useState } from "react";
import TitleTwoColors from "../components/typography/TitleTwoColors";
import SongBox from "../components/boxes/SongBox";
import ViewMoreButton from "../components/buttons/ViewMoreButton";
import MusicTrack from "../components/boxes/MusicTrack";
import ArtistBox from "../components/boxes/ArtistBox";
import AlbumBox from "../components/boxes/AlbumBox";
import PlaylistBox from "../components/boxes/PlaylistBox";
import CategoryBox from "../components/boxes/CategoryBox";
import {
  getArtists,
  getCategories,
  getFeaturedPlaylists,
  getNewReleaseAlbums,
  getRecomTracks,
  getToken,
} from "../services/spotify";

export default function Home() {
  const [recomSongs, setRecomSongs] = useState([]);

  const [artists, setArtists] = useState([]);

  const [videos, setVideos] = useState([
    {
      id: 1,
      name: "Someone Like You",
      artist: "Adele",
      img: "/img/video-1.svg",
      view: "3M views",
      link: "/",
    },
    {
      id: 2,
      name: "Someone Like You",
      artist: "Adele",
      img: "/img/video-1.svg",
      view: "3M views",
      link: "/",
    },
    {
      id: 3,
      name: "Someone Like You",
      artist: "Adele",
      img: "/img/video-1.svg",
      view: "3M views",
      link: "/",
    },
  ]);

  const [albums, setAlbums] = useState([]);
  const [categories, setCategories] = useState([]);

  const [playlist, setPlaylist] = useState([]);
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    getToken().then((access_token) => {
      getNewReleaseAlbums(access_token).then((album) => {
        setAlbums(album);
      });

      getRecomTracks(access_token).then((songs) => {
        setRecomSongs(songs);
      });

      getCategories(access_token).then((cats) => {
        setCategories(cats);
      });
      getFeaturedPlaylists(access_token).then((fPlaylist) => {
        setFeaturedPlaylists(fPlaylist);
      });
      getArtists(access_token).then((artists) => {
        setArtists(artists);
      });
    });
  }, []);

  const currentAlbumItems = albums.slice(0, ITEMS_PER_PAGE);
  const currentFeaturedPlaylists = featuredPlaylists.slice(0, ITEMS_PER_PAGE);
  const currentCategoriesItems = categories.slice(0, ITEMS_PER_PAGE);

  console.log(categories, "plgj");
  return (
    <div className="px-20 py-10">
      {/* weekly top songs */}
      <div>
        <TitleTwoColors text={"Recomendation "} colorText={"Songs"} />

        <div className="grid grid-cols-6 gap-x-10 mt-6 items-center">
          {recomSongs &&
            recomSongs.map((item, index) => {
              return <SongBox data={item} key={item.id} />;
            })}
        </div>
      </div>

      {/* popular playlists */}
      <div className="my-14">
        <TitleTwoColors text={"Popular"} colorText={"Playlists"} />

        <div className="grid grid-cols-6 gap-x-10 mt-6 items-center">
          {featuredPlaylists &&
            currentFeaturedPlaylists.map((album) => {
              return (
                <div className="my-5">
                  <PlaylistBox data={album} />
                </div>
              );
            })}
          {ITEMS_PER_PAGE < featuredPlaylists.length && (
            <div className="flex justify-end">
              <ViewMoreButton
                text={"Popular Playlists"}
                dataType={"Playlists"}
              />
            </div>
          )}
        </div>
      </div>

      {/* trending songs */}
      {/* <div className="my-14">
        <TitleTwoColors text={"Trending "} colorText={"Songs"} />

        <div className="mt-6">
          {songs &&
            songs.map((item, index) => {
              return (
                <div className="my-5">
                  <MusicTrack data={item} key={item.id} />
                </div>
              );
            })}
          <div className="flex justify-center mt-5">
            <ViewMoreButton />
          </div>
        </div>
      </div> */}

      {/* artists */}
      {/* <div className="my-14">
        <TitleTwoColors text={"Popular "} colorText={"Artists"} />

        <div className="mt-6 grid grid-cols-7 gap-x-10 items-center">
          {artists.map((item, index) => {
            return (
              <div className="my-5">
                <ArtistBox data={item} key={item.id} />
              </div>
            );
          })}
          <div className="flex justify-end mt-5">
            <ViewMoreButton />
          </div>
        </div>
      </div> */}

      {/* categories */}
      <div className="my-14">
        <TitleTwoColors text={"All "} colorText={"Categories"} />

        <div className="mt-6 grid grid-cols-6 gap-x-10 items-center">
          {categories &&
            currentCategoriesItems.map((item) => {
              return (
                <div className="my-5">
                  <CategoryBox
                    data={item}
                    key={item.id}
                    dataType={"Category"}
                  />
                </div>
              );
            })}

          {ITEMS_PER_PAGE < categories.length && (
            <div className="flex justify-end">
              <ViewMoreButton text={"Categories"} dataType={"Categories"} />
            </div>
          )}
        </div>
      </div>

      {/* albums */}
      {/* <div className="my-14">
        <TitleTwoColors
          text={"Top "}
          colorText={"Albums"}
          color={"text-cyan-400"}
        />

        <div className="mt-6 grid grid-cols-6 gap-x-10 items-center">
          {albums.map((item, index) => {
            return (
              <div className="my-5">
                <AlbumBox data={item} key={item.id} />
              </div>
            );
          })}
          <div className="flex justify-end">
            <ViewMoreButton />
          </div>
        </div>
      </div> */}

      {/* new release Albums */}
      <div className="my-14">
        <TitleTwoColors text={"New Release "} colorText={"Albums"} />

        <div className="mt-6 grid grid-cols-6 gap-x-10 items-center h-full">
          {playlist &&
            currentAlbumItems.map((album) => {
              return (
                <div className="my-5">
                  <AlbumBox data={album} />
                </div>
              );
            })}

          {ITEMS_PER_PAGE < playlist.length && (
            <div className="flex justify-end">
              <ViewMoreButton text={"New Release Albums"} dataType={"Albums"} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
