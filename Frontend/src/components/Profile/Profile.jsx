import React from "react";

import "./Styles/Profile.css";
import { useSelector } from "react-redux";

function Profile() {
  const profileInfo = useSelector((state) => state.auth);
  return (
    <>
      {profileInfo.isAuthenticated || localStorage.getItem('auth') ? (

        <section className="profile">
          <h1 className="username"> Username:</h1>
          <section> Number of posts:
          </section>
        </section>
      ) : (
        <section className="profile">
          <h1>Need to be Loged In to view the profile</h1>
        </section>
      )}
    </>
  );
}

export default Profile;
