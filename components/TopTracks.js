import Image from "next/image";
import { useEffect, useState } from "react";
import { usePalette } from "react-palette";
import useSpotify from "../hooks/useSpotify";

function UserTop() {
  const [topTracks, setTopTracks] = useState([]);

  const { data, loading, error } = usePalette(
    topTracks[0]?.album?.images[0].url
  );

  console.log("colors are ", data);

  const spotifyApi = useSpotify();

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getMyTopTracks({
          offset: 1,
          limit: 50,
        })
        .then(
          function (data) {
            console.log("top tracks are ", data.body.items);
            setTopTracks(data.body.items);
          },
          function (err) {
            console.log("Something went wrong!", err);
          }
        );

      spotifyApi.getNewReleases({ limit: 5, offset: 0, country: "SE" }).then(
        function (data) {
          console.log("new releases are ", data.body);
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );

      spotifyApi
        .getFeaturedPlaylists({
          limit: 3,
          offset: 1,
          country: "SE",
          locale: "sv_SE",
          timestamp: "2014-10-23T09:00:00",
        })
        .then(
          function (data) {
            console.log("featured ", data.body);
          },
          function (err) {
            console.log("Something went wrong!", err);
          }
        );
    }
  }, [spotifyApi]);

  return (
    <div>
      <h2 className="text-3xl font-extrabold mb-6">Most Played</h2>
      {topTracks && topTracks.length > 0 && (
        <div className="">
          <Image
            width={1000}
            height={1000}
            className="w-full object-cover z-10"
            quality={100}
            layout="responsive"
            src={topTracks[0].album.images[0].url}
            alt={topTracks[0].name}
          />
          <div className="mt-6 space-y-6">
            <p className="text-lg font-medium">
              <span style={{ color: data.vibrant }}>{topTracks[0].name}</span>{" "}
              <span className="opacity-70">
                by {topTracks[0].artists[0].name} has been on repeat.
              </span>
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

export default UserTop;
