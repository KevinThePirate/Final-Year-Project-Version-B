import { ImageOptions } from "./ImageOptions";
import {
  collection,
  getDocs,
  where,
  doc,
  getDoc,
  query,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import React, { useEffect, useState, useRef } from "react";
import { db } from "../../firebase";

export default function CreatePet(props) {
  const [petName, setPetName] = useState("");
  //let imageArray = [];
  const [imageArray, setImageArray] = useState([]);
  const [chosenPet, setChosenPet] = useState("");
  const [sliderVal, setSliderVal] = useState(0);
  const inputRef = useRef(null);
  const handleChange = (obj) => {
    //console.log(obj);
    setChosenPet(obj);
    /*console.log(typeof e.target.value);
    console.log(imageArray);
    setChosenPet(e.target.value);*/
  };
  const handleSlider = (e) => {
    setSliderVal(e.target.value);
  };
  const handleNameChange = (e) => {
    // console.log(e.target.value);
    setPetName(e.target.value);
    //console.log(inputRef);
    if (inputRef !== null) {
      inputRef.current.focus();
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (petName !== "") {
      await addDoc(props.petCol, {
        petName,
        imageUrl: chosenPet,
        happy: chosenPet.happy,
        sad: chosenPet.sad,
        neutral: chosenPet.neutral,
        siting: chosenPet.sitting,
        level: 5,
        exp: 0,
        sliderVal,
      });
      //setPetName("");
      props.setPetExists(true);
    }
    //console.log("Submitted");
  };
  const getImages = () => {
    let petImagesCol = collection(db, "petImages");
    let arr = [];
    getDocs(petImagesCol).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        arr.push(doc.data());
      });
      setImageArray(arr);
      //  console.log({ imageArray });
    });
  };
  useEffect(getImages, []);
  return (
    <main>
      <form onSubmit={handleSubmit}>
        <section>
          <div>
            Name:{" "}
            <input
              type="text"
              placeholder="Fido"
              value={petName}
              key="petName-input"
              onChange={handleNameChange}
              ref={inputRef}
            />
          </div>
          <div>
            {imageArray.length > 0 &&
              imageArray.map((image, index) => (
                <div
                  className="image-choices"
                  style={{
                    filter: `hue-rotate(${sliderVal}deg)`,
                  }}>
                  <ImageOptions
                    image={image}
                    handleChange={() => handleChange(image)}
                    index={index}
                    key={index}
                  />
                </div>
              ))}
          </div>
          <p>Change The Colour</p>
          <button
            className="test-button"
            onClick={handleSlider}
            value="0"
            style={{ filter: `hue-rotate(0deg)` }}></button>
          <button
            className="test-button"
            onClick={handleSlider}
            value="60"
            style={{ filter: `hue-rotate(60deg)` }}></button>
          <button
            className="test-button"
            onClick={handleSlider}
            value="120"
            style={{ filter: `hue-rotate(120deg)` }}></button>
          <button
            className="test-button"
            onClick={handleSlider}
            value="180"
            style={{ filter: `hue-rotate(180deg)` }}></button>
          <button
            className="test-button"
            onClick={handleSlider}
            value="240"
            style={{ filter: `hue-rotate(240deg)` }}></button>
          <button
            className="test-button"
            onClick={handleSlider}
            value="300"
            style={{ filter: `hue-rotate(300deg)` }}></button>
          <br />
          <button>Create Pet!</button>
        </section>
      </form>
    </main>
  );
}
