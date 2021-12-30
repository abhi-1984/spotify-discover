import Image from "next/image";
import { useEffect, useState } from "react";
import { usePalette } from "react-palette";
import useSpotify from "../hooks/useSpotify";

function RecentlyPlayed() {
  const [recents, setRecents] = useState([]);
  const spotifyAPI = useSpotify();
  const [happyPercentage, setHappyPercentage] = useState(null);

  const { data, loading, error } = usePalette(
    recents[0]?.track.album.images[0].url
  );

  const getHappySongPercentage = (data) => {
    console.log("data is ", data);
    let count = data.length;
    let total = 0;

    let happinessPercentages = [];
    data.forEach((song) => {
      happinessPercentages.push(Math.round(song.valence * 100, 2));
      total += Math.round(song.valence * 100, 2);
    });

    console.log(
      "happinessPercentages are ",
      happinessPercentages,
      " and total is ",
      total
    );

    setHappyPercentage(total / count);
  };

  useEffect(() => {
    if (spotifyAPI.getAccessToken()) {
      spotifyAPI
        .getMyRecentlyPlayedTracks({
          limit: 20,
        })
        .then(
          function (data) {
            // Output items
            console.log(
              "Your 20 most recently played tracks are:",
              data.body.items
            );
            setRecents(data.body.items);

            let trackIds = [];

            data.body.items.forEach((item) => trackIds.push(item.track.id));

            console.log("trackIds", trackIds);

            spotifyAPI.getAudioFeaturesForTracks(trackIds).then(
              function (data) {
                getHappySongPercentage(data.body.audio_features);
              },
              function (err) {
                done(err);
              }
            );
          },
          function (err) {
            console.log("Something went wrong!", err);
          }
        );
    }
  }, [spotifyAPI]);

  return (
    <div className="">
      <h2 className="text-3xl font-extrabold mb-8">Recently Played</h2>
      <div className="grid w-full grid-cols-2 grid-rows-2 gap-4 items-center">
        {recents &&
          recents
            .sort(() => 0.5 - Math.random())
            .slice(0, 4)
            .map((track, index) => {
              return (
                <div
                  key={index}
                  className="w-full h-full aspect-square relative"
                >
                  <Image
                    width={600}
                    height={600}
                    layout="responsive"
                    className="w-full h-full object-cover block"
                    quality={100}
                    src={track.track.album.images[0].url}
                    alt={track.track.name}
                  />
                </div>
              );
            })}
      </div>
      <div className="mt-6 space-y-6">
        <p className="text-lg font-medium">
          <span style={{ color: data.vibrant }}>
            {Math.round(happyPercentage)}%
          </span>{" "}
          <span className="opacity-70">
            of your recently played tracks are full of happy vibes.
          </span>
        </p>
        <button className="px-10 py-2 bg-white bg-opacity-5 ">View All</button>
      </div>
    </div>
  );
}

export default RecentlyPlayed;
