import React from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "../styles/PokeCard.module.css";

function PokeCard({ id, name }) {
  return (
    <Link href={`/pokemon/${id}`}>
      <div className={styles.card}>
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          width="128px"
          height="128px"
        />
        <p>{name.charAt(0).toUpperCase() + name.slice(1)}</p>
      </div>
    </Link>
  );
}

export default PokeCard;
