import { collection, getDocs, query, where } from "firebase/firestore";
import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import "./componentStyling/LineItem.css";

export default function LineItem(props) {
  const dateObj = new Date();
  const todaysDate = dateObj.toDateString();
  let classes = "";
  const [classList, setClassList] = useState("");
  const [equation, setEquation] = useState("");

  const styling = () => {
    if (props.item.lastCheckInDate == todaysDate) {
      setClassList("checked-in");
    }
  };
  const deleteSelf = () => {
    console.log("Run Delete Self");
    console.log(props.item.id);
    props.handleDelete(props.item.id);
    props.getUserData();
  };
  const checkInSelf = () => {
    if (props.item.lastCheckInDate == todaysDate) {
      console.log("Already Checked This In, Buddy!");
    } else {
      props.handleCheckIn(props.item.id, props.item.checkInCounter);
      console.log(props.item.checkInCounter);
      props.xpUp(props.item.checkInCounter);
    }
    styling();
  };
  const getSentence = (habit) => {
    const currentLevelQ = query(
      collection(db, "standardHabits"),
      where("habitTitle", "==", habit)
    );
    getDocs(currentLevelQ).then((snapshot) => {
      //console.log(snapshot.docs[0].data().sentence);
      setEquation(snapshot.docs[0].data().sentence);
      //console.log(sentences);
    });
  };
  useEffect(() => styling());
  useEffect(() => {
    getSentence(props.item.title);
  }, []);
  return (
    <div className={classList + " line-item"}>
      <p>{props.item.title} </p>
      {props.item.precreated && (
        <>
          <p>Today: {equation.replace("X", props.item.checkInCounter)}</p>
        </>
      )}
      <p>Total Count: {props.item.checkInCounter}</p>
      <button onClick={checkInSelf} className="complete-button">
        {" "}
        Completed{" "}
      </button>
      <button onClick={deleteSelf} className="delete-button">
        Remove{" "}
      </button>
    </div>
  );
}
