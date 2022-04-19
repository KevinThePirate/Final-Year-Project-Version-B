import { collection, getDocs, query, where } from "firebase/firestore";
import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import "./componentStyling/LineItem.css";
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdDeleteForever,
  MdExpandMore,
} from "react-icons/md";
import {
  Accordion,
  AccordionSummary,
  ExpandMoreIcon,
  Typography,
  AccordionDetails,
} from "@mui/material";

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
    <Accordion
      className={" line-item"}
      style={{
        borderRadius: "20px",
        border: "none",
        display: "flex",
        alignItems: "center",
      }}>
      <AccordionSummary
        aria-controls="panel1a-content"
        id="panel1a-header"
        expandIcon={<MdExpandMore />}
        style={{
          alignSelf: "center",
          height: "75px",
        }}>
        <Typography>{props.item.title}</Typography>
      </AccordionSummary>
      <AccordionDetails className={classList}>
        {props.item.precreated && (
          <>
            <p>Today: {equation.replace("X", props.item.checkInCounter)}</p>
          </>
        )}
        <p>Total Check-Ins: {props.item.checkInCounter}</p>
        {classList == "checked-in" ? (
          <MdCheckBox onClick={checkInSelf} className="line-button" />
        ) : (
          <MdCheckBoxOutlineBlank
            onClick={checkInSelf}
            className="line-button"
          />
        )}
        <MdDeleteForever onClick={deleteSelf} className="line-button" />
      </AccordionDetails>
    </Accordion>
  );
}
