import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./user-supported-card.module.css";

export const UserSupportedCard = ({
  name = "",
  img,
  amount,
  date,
  extraClass = "",
}) => {
  return (
    <article className={`${styles.content} ${extraClass}`}>
      <img className={styles.img} src={img} />
      <div className={`ml-8 ${styles.data_name_box}`}>
        <p
          className={`text text_type_small text_color_primary mb-2 ${styles.label}`}
        >
          Name
        </p>
        <NavLink
          to="/user"
          className={`text text_type_main text_color_primary ${styles.link}`}
        >
          {`${name} ${"\u{2197}"}`}
        </NavLink>
      </div>
      <div className={`ml-10 ${styles.data_box}`}>
        <p
          className={`text text_type_small text_color_primary mb-2 ${styles.label}`}
        >
          Sum
        </p>
        <p
          className={`text text_type_main text_color_primary`}
        >{`${amount} RUB.`}</p>
      </div>
      <div className={`ml-10 ${styles.data_box}`}>
        <p
          className={`text text_type_small text_color_primary mb-2 ${styles.label}`}
        >
          Date
        </p>
        <p className={`text text_type_main text_color_primary`}>{date}</p>
      </div>
    </article>
  );
};
