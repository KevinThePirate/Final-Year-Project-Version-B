import { collection, getDocs, addDoc, doc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { forwardRef } from "react/cjs/react.development";
import { useRef } from "react/cjs/react.production.min";
import { db } from "../../firebase";
import CreatePet from "./CreatePet";
import VirtualPetHUD from "./VirtualPetHUD";
function VirtualPet(props) {
  const petCol = collection(db, `users/${props.userInfo.uid}/virtualPet`);
  const [petExists, setPetExists] = useState(false);
  const [petInfo, setPetInfo] = useState({});

  const getSetPetInfo = () => {
    return getDocs(petCol).then((snapshot) => {
      setPetInfo(snapshot.docs[0].data());
      props.petInfoRef.current = snapshot.docs[0].data();
    });
  };
  useEffect(() => {
    getDocs(petCol).then((snapshot) => {
      console.log(snapshot.docs);
      if (snapshot.docs.length > 0) {
        console.log("Pet Found");
        setPetExists(true);
      } else {
        console.log("Pet Not Found");
        setPetExists(false);
      }
    });
  }, []);

  //console.log(props.petInfoRef.current);
  useEffect(() => {
    getSetPetInfo();
  }, [petExists]);
  return (
    <div className="core-section" id="pet-section">
      {petExists == true ? (
        <VirtualPetHUD
          petCol={petCol}
          petInfo={petInfo}
          setPetInfo={setPetInfo}
          userInfo={props.userInfo}
          petRef={props.petRef}
        />
      ) : (
        <CreatePet petCol={petCol} setPetExists={setPetExists} />
      )}
    </div>
  );
}
export default VirtualPet;
