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
import { Button, Card, TextField, TextareaAutosize } from "@mui/material";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p>Date: {payload[0].payload.createdAt}</p>
        <p>Mood: {payload[0].payload.mood}</p>
        <p>Mood Disp: {payload[0].payload.moodDisp}</p>
        <p>Numerical Score: {payload[0].payload.moodValue}</p>
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

  const logMood = (e) => {
    getDocs(sortedItemsQuery)
      .then((snapshot) => {
        totalIndex = snapshot.docs.length;
        console.log(totalIndex);
      })
      .then(() => {
        console.log({ totalIndex });
        const mood = e.target.textContent;
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
        checkInToday(true);
      });
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
                <Line type="monotone" dataKey="moodValue" stroke="#f9bc60" />
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
              <div>
                <p class="triangle-right">How Are You Feeling Today? </p>
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
                rows="4"
                cols="50"
                style={{ width: "100%" }}
                name="feelings"
                multiline
                placeholder="I saw a really cute cat today"
                onChange={(e) => setJournalEntry(e.target.value)}
              />
              <br />
              <Card id="mood-enter-card">
                <div className="mood-buttons">
                  <img src="https://i.imgur.com/UAyXGtN.png" />
                  <br />
                  <Button
                    variant="text"
                    onClick={logMood}
                    className="mood-button-element">
                    <p id="random-button">Great</p>
                  </Button>{" "}
                </div>
                <div className="mood-buttons">
                  <img src="https://i.imgur.com/iC8yrmj.png" />
                  <br />
                  <Button
                    variant="text"
                    onClick={logMood}
                    className="mood-button-element">
                    Good
                  </Button>{" "}
                </div>
                <div className="mood-buttons">
                  <img src="https://i.imgur.com/rBTztNW.png" />
                  <br />
                  <Button
                    variant="text"
                    onClick={logMood}
                    className="mood-button-element">
                    Eh
                  </Button>{" "}
                </div>
                <div className="mood-buttons">
                  <img src="https://i.imgur.com/XjvisxP.png" />
                  <br />
                  <Button
                    variant="text"
                    onClick={logMood}
                    className="mood-button-element">
                    Not Great
                  </Button>{" "}
                </div>
                <div className="mood-buttons">
                  <img src="https://i.imgur.com/B09Ihcf.png" />
                  <br />
                  <Button
                    variant="text"
                    onClick={logMood}
                    className="mood-button-element">
                    Terrible
                  </Button>{" "}
                </div>
              </Card>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div>
            <img src={props.petInfoRef.siting} id="mood-image" />
          </div>
          <TextField
            id="outlined-basic"
            label="Write About Today"
            variant="outlined"
            rows="4"
            cols="50"
            style={{ width: "100%" }}
            name="feelings"
            multiline
            placeholder="I saw a really cute cat today"
            onChange={(e) => setJournalEntry(e.target.value)}
          />
          <br />
          <Card id="mood-enter-card">
            <div className="mood-buttons">
              <img src="https://i.imgur.com/UAyXGtN.png" />
              <br />
              <Button
                variant="text"
                onClick={logMood}
                className="mood-button-element">
                <p id="random-button">Great</p>
              </Button>{" "}
            </div>
            <div className="mood-buttons">
              <img src="https://i.imgur.com/iC8yrmj.png" />
              <br />
              <Button
                variant="text"
                onClick={logMood}
                className="mood-button-element">
                Good
              </Button>{" "}
            </div>
            <div className="mood-buttons">
              <img src="https://i.imgur.com/rBTztNW.png" />
              <br />
              <Button
                variant="text"
                onClick={logMood}
                className="mood-button-element">
                Eh
              </Button>{" "}
            </div>
            <div className="mood-buttons">
              <img src="https://i.imgur.com/XjvisxP.png" />
              <br />
              <Button
                variant="text"
                onClick={logMood}
                className="mood-button-element">
                Not Great
              </Button>{" "}
            </div>
            <div className="mood-buttons">
              <img src="https://i.imgur.com/B09Ihcf.png" />
              <br />
              <Button
                variant="text"
                onClick={logMood}
                className="mood-button-element">
                Terrible
              </Button>{" "}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
