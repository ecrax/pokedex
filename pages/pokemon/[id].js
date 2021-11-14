import { useRouter } from "next/dist/client/router";

const Pokemon = ({ data, id, gender, characteristic }) => {
  return (
    <div>
      <h1>
        {data.name.charAt(0).toUpperCase() + data.name.slice(1)} #{id}
      </h1>

      <div>
        <h3>Height</h3>
        <p>{data.height}</p>
      </div>
      <div>
        <h3>Weight</h3>
        <p>{data.weight}</p>
      </div>
      <div>
        <h3>Gender</h3>
        <p>
          {gender.map((gender, i) => {
            return <span key={i}>{gender} </span>;
          })}
        </p>
      </div>
      <div>
        <h3>Characteristic</h3>
        <p>
          {characteristic
            ? characteristic.descriptions.at(-1).description
            : "N/A"}
        </p>
      </div>
    </div>
  );
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
  const id = params.id;

  let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  const data = await response.json();

  response = await fetch(`https://pokeapi.co/api/v2/characteristic/${id}/`);
  const characteristic = response.status == 200 ? await response.json() : null;

  response = await fetch(`https://pokeapi.co/api/v2/gender/1/`);
  const female = JSON.stringify(await response.json());
  response = await fetch(`https://pokeapi.co/api/v2/gender/2/`);
  const male = JSON.stringify(await response.json());
  response = await fetch(`https://pokeapi.co/api/v2/gender/3/`);
  const genderless = JSON.stringify(await response.json());

  const gender = [];
  if (male.includes(data.name)) gender.push("Male");
  if (female.includes(data.name)) gender.push("Female");
  if (genderless.includes(data.name)) gender.push("Genderless");

  return {
    props: {
      data: data,
      id: id,
      characteristic: characteristic,
      gender: gender,
    },
  };
};

export default Pokemon;
