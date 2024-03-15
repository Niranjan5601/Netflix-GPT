import { onAuthStateChanged, signOut } from "firebase/auth";
import React from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";

const Header = () => {
  const navigate  = useNavigate();
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();
  const handleSignout = () => {
    signOut(auth)
      .then(() => {

      
      })
      .catch((error) => {
        navigate("/error");
      });
  };


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user)
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
        navigate("/browse")
      } else {
        dispatch(removeUser());
        navigate("/")
      }
    });
  }, []);

  return (
    <div className="absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        className="w-44"
        alt="logo"
        src="https://assets.nflxext.com/ffe/siteui/acquisition/home/nflxlogo.png"
      />

    { user && <div className="flex p-2">
        <img
          className="w-12 h-12"
          alt="usericon"
          src={user?.photoURL}
        />
        <button onClick={handleSignout} className="font-bold text-white">
          (Sign Out)
        </button>
      </div>}
    </div>
  );
};

export default Header;
