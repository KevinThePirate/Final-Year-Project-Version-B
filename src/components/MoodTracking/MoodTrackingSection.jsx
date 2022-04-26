import { MoodInput } from "./MoodInput";
import {
  addDoc,
  collection,
  query,
  orderBy,
  getDocs,
  startAt,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Label,
  Tooltip,
  Legend,
} from "recharts";

import "../../App.css";
import { button, Card, TextField, TextareaAutosize } from "@mui/material";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p>Date: {payload[0].payload.createdAt}</p>
        <p>Mood: {payload[0].payload.mood}</p>
        {payload[0].payload.log && <p>Log: {payload[0].payload.log}</p>}
      </div>
    );
  }

  return null;
};

export default function MoodTrackingSection(props) {
  const moodCol = collection(db, `users/${props.userInfo.uid}/moods`);
  let totalIndex = 0;
  let moodVal = "";
  let moodDisp = "";
  let todaysDate = new Date().toDateString();
  const [todaysCheckin, checkInToday] = useState(false);

  let [moodLog, setMoodLog] = useState([]);
  const [journalEntry, setJournalEntry] = useState("");

  const sortedItemsQuery = query(
    moodCol,
    orderBy("index"),
    startAt(totalIndex - 30)
  );

  const updateLog = () => {
    let localArr = [];
    getDocs(sortedItemsQuery).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        //console.log(typeof doc.data().createdAt);
        localArr.push(doc.data());
      });
    });
    setMoodLog(localArr);
  };

  const logMood = (moodInput) => {
    if (todaysCheckin == false) {
      checkInToday(true);
      getDocs(sortedItemsQuery)
        .then((snapshot) => {
          totalIndex = snapshot.docs.length;
          console.log({ totalIndex });
        })
        .then(() => {
          console.log({ totalIndex });
          const mood = moodInput;
          switch (mood) {
            case "Great":
              moodVal = 5;
              moodDisp = "happy";
              break;
            case "Good":
              moodVal = 4;
              moodDisp = "happy";
              break;
            case "Eh":
              moodVal = 3;
              moodDisp = "neutral";
              break;
            case "Not Great":
              moodVal = 2;
              moodDisp = "sad";
              break;
            case "Terrible":
              moodVal = 1;
              moodDisp = "sad";
              break;
            default:
              moodVal = 3;
          }
          addDoc(moodCol, {
            name: mood,
            mood: mood,
            moodValue: moodVal,
            moodDisp: moodDisp,
            createdAt: todaysDate,
            log: journalEntry,
            index: totalIndex + 1,
          });
          updateLog();
        });
    } else {
      console.log("Already Checked");
    }
  };

  useEffect(() => {
    updateLog();
    const q = query(moodCol, where("createdAt", "==", todaysDate));
    getDocs(q).then((snapshot) => {
      // console.log(snapshot.docs);
      if (snapshot.docs.length > 0) {
        //console.log("Found");
        checkInToday(true);
      } else {
        console.log("Not Found");
        checkInToday(false);
      }
    });
    console.log(q);
  }, []);
  // console.log(props.petInfoRef.siting);
  return (
    <div className="core-section" id="mood-section">
      {moodLog.length > 0 ? (
        <div>
          {todaysCheckin == true ? (
            <div id="mood-chart">
              <LineChart
                id="mood-chart"
                width={
                  document.getElementById("mood-section").offsetWidth * 0.9
                }
                height={300}
                data={moodLog}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="moodValue" stroke="#496ECB" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="Mood">
                  <Label
                    value="Your Mood Over The Last 30 Days"
                    offset={0}
                    position="insideBottom"
                  />
                </XAxis>
                <YAxis domain={[0, "dataMax"]} hide={true}></YAxis>
                <Tooltip
                  content={<CustomTooltip />}
                  viewBox={{ x: 0, y: 0, width: 400, height: 400 }}
                  itemStyle={{
                    width: "75%",
                    height: "100px",
                    border: "1px solid black",
                    backgroundColor: "white",
                  }}
                />
              </LineChart>
            </div>
          ) : (
            <div id="mood-input">
              <div id="mood-header">
                <p class="triangle-right">
                  <p>How Are You Feeling Today? </p>
                </p>
                <img
                  src={props.petInfoRef.siting}
                  style={{
                    filter: `hue-rotate(${parseInt(
                      props.petInfoRef.sliderVal
                    )}deg)`,
                  }}
                  id="mood-image"
                />
              </div>
              <TextField
                id="outlined-basic"
                label="Write About Today"
                variant="outlined"
                rows="1"
                cols="50"
                style={{ width: "100%", background: "white" }}
                name="feelings"
                multiline
                placeholder="I saw a really cute cat today"
                onChange={(e) => setJournalEntry(e.target.value)}
              />
              <br />
              <div id="mood-enter-card">
                <button
                  value="Great"
                  variant="text"
                  onClick={() => logMood("Great")}
                  className="mood-button-element">
                  <img src="https://i.imgur.com/UAyXGtN.png" />
                  <br />
                  <br />
                  Great
                </button>{" "}
                <button
                  value="Good"
                  variant="text"
                  onClick={() => logMood("Good")}
                  className="mood-button-element">
                  <img src="https://i.imgur.com/iC8yrmj.png" />
                  <br />
                  <br />
                  Good
                </button>{" "}
                <button
                  value="Eh"
                  variant="text"
                  onClick={() => logMood("Eh")}
                  className="mood-button-element">
                  <img src="https://i.imgur.com/rBTztNW.png" />
                  <br />
                  <br />
                  Eh
                </button>{" "}
                <button
                  value="Not Great"
                  variant="text"
                  onClick={() => logMood("Not Great")}
                  className="mood-button-element">
                  <img src="https://i.imgur.com/XjvisxP.png" />
                  <br />
                  <br />
                  Not Great
                </button>{" "}
                <button
                  value="Terrible"
                  variant="text"
                  onClick={() => logMood("Terrible")}
                  className="mood-button-element">
                  <img src="https://i.imgur.com/B09Ihcf.png" />
                  <br />
                  <br />
                  Terrible
                </button>{" "}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div id="mood-input">
          <div id="mood-header">
            <p class="triangle-right">
              <p>How Are You Feeling Today? </p>
            </p>
            <img
              src={props.petInfoRef.siting}
              style={{
                filter: `hue-rotate(${parseInt(
                  props.petInfoRef.sliderVal
                )}deg)`,
              }}
              id="mood-image"
            />
          </div>
          <TextField
            id="outlined-basic"
            label="Write About Today"
            variant="outlined"
            rows="1"
            cols="50"
            style={{ width: "100%", background: "white" }}
            name="feelings"
            multiline
            placeholder="I saw a really cute cat today"
            onChange={(e) => setJournalEntry(e.target.value)}
          />
          <br />
          <div id="mood-enter-card">
            <button
              value="Great"
              variant="text"
              onClick={() => logMood("Great")}
              className="mood-button-element">
              <img src="https://i.imgur.com/UAyXGtN.png" />
              <br />
              <br />
              Great
            </button>{" "}
            <button
              value="Good"
              variant="text"
              onClick={() => logMood("Good")}
              className="mood-button-element">
              <img src="https://i.imgur.com/iC8yrmj.png" />
              <br />
              <br />
              Good
            </button>{" "}
            <button
              value="Eh"
              variant="text"
              onClick={() => logMood("Eh")}
              className="mood-button-element">
              <img src="https://i.imgur.com/rBTztNW.png" />
              <br />
              <br />
              Eh
            </button>{" "}
            <button
              value="Not Great"
              variant="text"
              onClick={() => logMood("Not Great")}
              className="mood-button-element">
              <img src="https://i.imgur.com/XjvisxP.png" />
              <br />
              <br />
              Not Great
            </button>{" "}
            <button
              value="Terrible"
              variant="text"
              onClick={() => logMood("Terrible")}
              className="mood-button-element">
              <img src="https://i.imgur.com/B09Ihcf.png" />
              <br />
              <br />
              Terrible
            </button>{" "}
          </div>
        </div>
      )}
    </div>
  );
}
