import { SpotifyLogo } from "../components/Icons";
import { signIn, getProviders } from "next-auth/react";

export default function Login({ providers }) {
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-between p-8 bg-black text-white">
      <div>
        <SpotifyLogo />
      </div>

      <div className="flex-1 flex items-center justify-center flex-col text-center space-y-6">
        <h3 className="text-4xl font-bold">Listening is everything</h3>
        <p className="text-2xl leading-normal max-w-prose mx-auto opacity-80">
          Immerse yourself in amazing music listening <br /> experiece with
          Spotify Focus.
        </p>

        {Object.values(providers).map((provider) => {
          return (
            <button
              key={provider.name}
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              className="bg-white text-black px-10 py-3 rounded-full font-bold"
            >
              Login with {provider.name}
            </button>
          );
        })}
      </div>

      <footer className="opacity-40">
        <p>© 2021 Spotify AB</p>
      </footer>
    </main>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
