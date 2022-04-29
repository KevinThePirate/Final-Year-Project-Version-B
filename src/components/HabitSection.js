import { collection, getDocs, query, where } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { MdAddCircle, MdAddCircleOutline } from "react-icons/md";
import { db } from "../firebase";
import AddItem from "./AddItem";
import LineItem from "./LineItem";

export default function HabitSection(props) {
  const [sentences, setSentences] = useState([]);
  const handleSignOut = () => {
    //console.log(props.userInfo.displayName);
    props.signUserOut();
    //console.log(props.userInfo.displayName);
  };

  const [modalOpen, setModalOpen] = useState(false);
  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  const getSentence = (habit) => {
    const currentLevelQ = query(
      collection(db, "standardHabits"),
      where("habitTitle", "==", habit)
    );
    let sentence;
    getDocs(currentLevelQ).then((snapshot) => {
      //console.log(snapshot.docs[0].data().sentence);
      sentence = snapshot.docs[0].data().sentence;
      //console.log(sentence);
      return sentence;
      setSentences([...sentences, sentence]);
      //console.log(sentences);
    });
  };
  return (
    <div className="core-section" id="Habit-Section">
      <img
        src={props.petInfoRef.siting}
        className="mood-pet-corner"
        style={{
          filter: `hue-rotate(${parseInt(props.petInfoRef.sliderVal)}deg)`,
        }}
      />
      {props.userItems.map((item) => (
        <LineItem
          key={item.id}
          item={item}
          handleDelete={props.handleDelete}
          handleCheckIn={props.handleCheckIn}
          getUserData={props.getUserData}
          xpUp={props.xpUp}
          getSentence={() => getSentence(item.title)}
        />
      ))}
      <MdAddCircle onClick={open} id="add-button" />
      {modalOpen && (
        <div>
          <AddItem
            user={props.userInfo}
            getUserData={props.getUserData}
            userItems={props.userItems}
            modalOpen={modalOpen}
            handleClose={close}
            standHabits={props.standHabits}
            petInfoRef={props.petInfoRef}
            closestNumber={props.closestNumber}
          />
        </div>
      )}
    </div>
  );
}
