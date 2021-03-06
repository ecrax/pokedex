import Head from "next/head";
import PokeCard from "../components/PokeCard";

import styles from "../styles/Home.module.css";

export default function Home({ data }) {
  const limit = 40;
  const offset = 0;

  const cards = buildCards(limit, offset, data);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.grid}>{cards}</main>

      <footer></footer>
    </div>
  );
}

function buildCards(limit, offset, data) {
  const cards = [];
  for (let i = 0; i < limit; i++) {
    const d = data.results[i + offset];
    const element = (
      <PokeCard id={i + 1 + offset} name={d.name} key={i + offset} />
    );
    cards.push(element);
  }
  return cards;
}

export const getStaticProps = async (ctx) => {
  const limit = 40;
  const offset = 0;

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
  );

  const data = await response.json();

  return {
    props: {
      data: data,
    },
    revalidate: 3600, // Every Hour
  };
};
