import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage, changeToggleUserSetting } from "../utils/configSlice";
import "boxicons";
const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const toggleUserSettings = useSelector(
    (store) => store.config.toggleUserSetting
  );

  const handleSignout = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unSubscribe();
  }, []);

  const handleGptSearchLink = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  const handleToggleUserSettings = () => {
    dispatch(changeToggleUserSetting());
  };
  //md-desktop
  return (
    <div className="absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row  md:justify-around  ">
      <img className="w-44 mx-auto md:mx-0" alt="logo" src={LOGO} />

      {user && (
        <div className="flex p-2 justify-between">
          {showGptSearch && (
            <select
              className="p-2 m-2 bg-gray-900 text-white"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="py-2 px-4 m-2 mx-4 my-2 bg-purple-800 text-white rounded-lg "
            onClick={handleGptSearchLink}
          >
            {showGptSearch ? "Homepage" : "GPT Search"}
          </button>
          <div>
            <img
              onClick={handleToggleUserSettings}
              className=" md:block w-10 h-10 mt-2"
              alt="usericon"
              src={user?.photoURL}
            />
            {/* <button onClick={handleSignout} className="font-bold text-white">
            (Sign Out)
          </button> */}
            {toggleUserSettings && (
              <div className="w-40 absolute rounded-lg mt-2 m-2 bg-gray-500 bg-opacity-20 text-white ">
                <div className="m-4 p-4">
                  <button className="flex gap-2">
                    <box-icon
                      color="white"
                      name="user-account"
                      type="solid"
                    ></box-icon>
                    Account
                  </button>
                  <button className=" flex gap-2 pt-2">
                  <box-icon type='solid' color="white" name='cog'></box-icon> Settings
                  </button>
                  <button className="pt-2 flex gap-2" onClick={handleSignout}>
                    <box-icon color="white" name="exit"></box-icon> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
