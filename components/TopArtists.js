import Image from "next/image";
import { useEffect, useState } from "react";
import { usePalette } from "react-palette";
import useSpotify from "../hooks/useSpotify";

function TopArtists() {
  const [topArtists, setTopArtists] = useState([]);
  const spotifyApi = useSpotify();

  const { data, loading, error } = usePalette(topArtists[0]?.images[0].url);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getMyTopArtists({
          offset: 1,
          limit: 50,
        })
        .then(
          function (data) {
            console.log("top artists are ", data.body.items);
            setTopArtists(data.body.items);
          },
          function (err) {
            console.log("Something went wrong!", err);
          }
        );
    }
  }, [spotifyApi]);

  return (
    <div>
      <h2 className="text-3xl font-extrabold mb-6">Top Artist</h2>
      {topArtists && topArtists.length > 0 && (
        <div className="">
          <Image
            width={1000}
            height={1000}
            className="w-full object-cover z-10"
            quality={100}
            layout="responsive"
            src={topArtists[0].images[0].url}
            alt={topArtists[0].name}
          />
          <div className="mt-6 space-y-6">
            <p className="text-lg font-medium">
              <span className="opacity-70">
                You groove most on the songs of
              </span>{" "}
              <span style={{ color: data.vibrant }}>{topArtists[0].name}</span>
            </p>

            <button className="px-10 py-2 bg-white bg-opacity-5 ">
              View All
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TopArtists;
