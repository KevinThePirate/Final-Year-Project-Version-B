import React from "react";
import "../../App.css";
import { Button, Card, TextField, TextareaAutosize } from "@mui/material";
export function MoodInput({ e, setJournalEntry, logMood }, props) {
  return (
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
        style={{
          width: "100%",
        }}
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
  );
}
