//...

import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./firebase"; // import your Firebase auth and db from "./firebase"
import { useEffect, useState } from "react";
import "./styles.css";
export default function Profile() {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchData();
  }, [user]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-xl mx-auto">
      {" "}
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-3 text-gray-900">
          Profile
        </h3>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
          Company details and Information.
        </p>
      </div>
      <div className="mt-2 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="flex justify-between">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Builder
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {userData.builder}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Website
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {userData.website}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Owner
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {userData.firstNameLastName}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Phone Number
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {userData.phoneNumber}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Email
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {userData.email}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Address
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {userData.address}
              <br></br>
              {userData.city}, {userData.region} {userData.postalCode}
            </dd>
          </div>
          <div className="blockcompany">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Company Description
            </dt>
            <dd className="mt-3 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {userData.description}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
