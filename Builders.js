import React from "react";
import Navbar from "./Navbar"; // import Navbar component
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import "./styles.css";

function Builders() {
  const [builders, setBuilders] = useState([]);

  useEffect(() => {
    const fetchBuilders = async () => {
      const buildersCollection = collection(db, "users");
      const buildersSnapshot = await getDocs(buildersCollection);
      const buildersList = buildersSnapshot.docs.map((doc) => doc.data());
      setBuilders(buildersList);
    };

    fetchBuilders();
  }, []);

  return (
    <>
      <Navbar current="Builders" />
      <div className="flex flex-wrap justify-center gap-4 p-4">
        {builders.map((person) => (
          <div
            key={person.email}
            className="flex flex-col gap-y-5 py-5 max-w-xs bg-white rounded-xl shadow-md overflow-hidden md:max-w-sm w-[320px] h-[290px] p-5"
          >
            <div className="flex justify-between">
              <p>Owner</p>
              <p className="text-md leading-6 text-gray-900">
                {person.firstNameLastName}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Email</p>
              <p className="text-md leading-6 text-gray-900">{person.email}</p>
            </div>
            <div className="flex justify-between">
              <p>Company</p>
              <p className="text-md leading-6 text-gray-900">
                {person.builder}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Website</p>
              <p className="text-md leading-6 text-gray-900">
                {person.website}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Address</p>
              <p className="text-md leading-6 text-gray-900">
                {person.address},<br></br> {person.city}, {person.region}{" "}
                {person.postalCode}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Builders;
