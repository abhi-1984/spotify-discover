import useSpotify from "../hooks/useSpotify";
import { useEffect, useState } from "react";

function TopGenres() {
  const [topArtists, setTopArtists] = useState([]);
  const spotifyApi = useSpotify();

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getMyTopArtists({
          offset: 1,
          limit: 50,
        })
        .then(
          function (data) {
            let genres = [];
            let result = {};
            console.log("top artists are inside graph", data.body.items);
            setTopArtists(data.body.items);

            data.body.items.forEach((song) => {
              song.genres.forEach((genre) => genres.push(genre));
            });

            for (var i = 0; i < genres.length; ++i) {
              if (!result[genres[i]]) result[genres[i]] = 0;
              ++result[genres[i]];
            }

            console.log(
              "genres are ",
              [...new Set(genres)],
              " and result is ",
              result
            );
          },
          function (err) {
            console.log("Something went wrong!", err);
          }
        );
    }
  }, [spotifyApi]);

  return (
    <div className="">
      <h2 className="text-3xl font-extrabold mb-6">What you like</h2>
      <div className="w-full aspect-square bg-white/5"></div>
    </div>
  );
}

export default TopGenres;
