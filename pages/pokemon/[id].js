import { useRouter } from "next/dist/client/router";

const Pokemon = ({ data }) => {
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export const getStaticPaths = async () => {
  const ids = [];
  for (let i = 1; i < 899; i++) {
    ids.push(i.toString());
  }

  const paths = ids.map((id) => ({
    params: { id: id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${params.id}/`
  );

  const data = await response.json();

  return {
    props: {
      data: data,
    },
  };
};

export default Pokemon;
