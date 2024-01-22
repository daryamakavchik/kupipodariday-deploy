import { useState, useContext, useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";

import { Button } from "../ui/button/button";
import { Textarea } from "../ui";
import { Modal } from "../ui/modal/modal";
import { Input } from "../ui/input/input";

import logo from "../../images/icons/logo.svg";
import giftIcon from "../../images/icons/gift.svg";
import likeIcon from "../../images/icons/like.svg";
import profileIcon from "../../images/icons/profile.svg";

import { pluckEmptyFormFields } from "../../utils/functions";
import { logoutUser, createCard } from "../../utils/api";
import { UserContext } from "../../utils/context";

import styles from "./header.module.css";

export const Header = ({ extraClass = "" }) => {
  const [userCtx, setUserCtx] = useContext(UserContext);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [isGiftPopupOpen, setIsGiftPopupOpen] = useState(false);

  const history = useHistory();
  const isLoggedIn = !!userCtx?.id;

  const onSubmit = () => {
    if (isLoggedIn) {
      handleGiftPopupOpen();
    } else {
      history.push("/signin");
    }
  };

  const handleProfilePopupOpen = () => {
    setIsProfilePopupOpen(true);
  };

  const handleGiftPopupOpen = () => {
    setIsGiftPopupOpen(true);
  };

  const handlePopupClose = () => {
    isProfilePopupOpen && setIsProfilePopupOpen(false);
    isGiftPopupOpen && setIsGiftPopupOpen(false);
  };

  const logout = () => {
    logoutUser();
    setUserCtx({});
    handlePopupClose();
    history.push({ pathname: "/" });
  };

  return (
    <header className={`${styles.header} ${extraClass}`}>
      <NavLink className={styles.nav} to="/">
        <img className={styles.logo} src={logo} alt="Logo." />
      </NavLink>
      {isLoggedIn && (
        <HeaderLinks
          handleProfilePopupOpen={handleProfilePopupOpen}
          userName={userCtx.name}
        />
      )}
      <Button
        type="button"
        kind="primary"
        text={`${isLoggedIn ? "Add gift" : "Profile"}`}
        onClick={onSubmit}
      />
      {isProfilePopupOpen && (
        <ProfileOptionsPopup closePopup={handlePopupClose} logout={logout} />
      )}
      {isGiftPopupOpen && <GiftAddModal onClose={handlePopupClose} />}
    </header>
  );
};

const HeaderLinks = ({ handleProfilePopupOpen, userName }) => {
  const profileLabel = userName ? `Profile ${userName}` : `Profile`;

  const setInactive = (isActive) => {
    const inactiveClassName = `${styles.nav} ${styles.nav_inactive}`;

    return isActive ? inactiveClassName : styles.nav;
  };

  return (
    <ul className={styles.nav_box}>
      <li className={styles.nav_link}>
        <NavLink className={setInactive} to="/gifts/line">
          <img src={giftIcon} alt="Gift icon." />
          <p className="text text_type-main text_color_primary ml-3">Gifts</p>
        </NavLink>
      </li>
      <li className={styles.nav_link}>
        <NavLink className={setInactive} to="/wishlist">
          <img src={likeIcon} alt="Like icon." />
          <p className="text text_type-main text_color_primary ml-3">
            My wishlist
          </p>
        </NavLink>
      </li>
      <li className={styles.nav_link}>
        <button className={styles.nav} onClick={handleProfilePopupOpen}>
          <img src={profileIcon} alt="Profile icon." />
          <p className="text text_type_main text_color_primary ml-3">
            {profileLabel}
          </p>
        </button>
      </li>
    </ul>
  );
};

const GiftAddModal = ({ onClose }) => {
  const history = useHistory();
  const [giftData, setGiftData] = useState({});
  const [valid, setValid] = useState(false);

  const formRef = useRef(null);

  const submitGift = (e) => {
    e.preventDefault();
    const plucked = pluckEmptyFormFields(giftData);
    createCard(plucked).then(() => {
      onClose();
      history.replace({ pathname: "/wishlist" });
    });
  };

  const onFormChange = (e) => {
    e.preventDefault();
    const isValid = formRef.current.checkValidity();
    setValid(isValid);
    setGiftData({
      ...giftData,
      [e.target.name]:
        e.target.name === "price" ? parseInt(e.target.value) : e.target.value,
    });
  };

  return (
    <Modal onClose={onClose} extraClass={styles.gift_modal} isCloseBtn={true}>
      <form className={styles.gift_form} onSubmit={submitGift} ref={formRef}>
        <h2 className="text text_type_h2 mb-16">Add gift</h2>
        <Input
          type="text"
          id={20}
          extraClass="mb-12"
          label="Gift name"
          name="name"
          onChange={onFormChange}
          placeholder="Add gift name"
          required
        />
        <Input
          type="url"
          extraClass="mb-12"
          name="link"
          label="Store link"
          onChange={onFormChange}
          placeholder="Add store link"
          required
        />
        <Input
          type="url"
          extraClass="mb-12"
          name="image"
          label="Image link"
          onChange={onFormChange}
          placeholder="Add image link"
          required
        />
        <Textarea
          name="description"
          id={23}
          placeholder="A bit about your wish"
          label="Briefly desctibe your gift"
          onChange={onFormChange}
          maxLength={1024}
          required
        />
        <Input
          type="number"
          name="price"
          id={24}
          extraClass={`mb-16 ${styles.price_input}`}
          label="Gift price (RUB.)"
          onChange={onFormChange}
          placeholder="Add price"
          required
          min={0}
        />
        <Button
          type="submit"
          extraClass={styles.gift_btn}
          text="Add gift"
          kind="secondary"
          disabled={!valid}
        />
      </form>
    </Modal>
  );
};

const ProfileOptionsPopup = ({ closePopup, logout }) => {
  return (
    <Modal onClose={closePopup} extraClass={styles.modal}>
      <div className={styles.popup}>
        <button
          className={`text text_type_button text_color_primary ${styles.popup_btn} ${styles.logout}`}
          type="button"
          onClick={logout}
        >
          Exit profile
        </button>
        <div className={styles.line} />
        <NavLink
          to="/profile"
          className={`text text_type_button text_color_primary ${styles.popup_btn} ${styles.edit}`}
          onClick={closePopup}
        >
          Edit profile
        </NavLink>
      </div>
    </Modal>
  );
};
