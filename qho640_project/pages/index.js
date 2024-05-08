import React from "react";
import { useEffect } from "react";
import { UserAuth } from "../app/auth/AuthContext";

function IndexPage() {
    const { user } = UserAuth();
  useEffect(() => {
    console.log("Current user in Index:", user);
}, [user]);
    return (
        <section className="section is-large">
          <h1 className="title">INDEX PAGE</h1>
        <p>This is the index Page</p>
      </section>
    );
  }
  
  export default IndexPage;