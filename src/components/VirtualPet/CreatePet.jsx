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
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";

export default function CreatePet(props) {
  const [petName, setPetName] = useState("");
  //let imageArray = [];
  const [imageArray, setImageArray] = useState([]);
  const [chosenPet, setChosenPet] = useState("");
  const [sliderVal, setSliderVal] = useState(0);
  const handleChange = (obj) => {
    console.log(obj);
    setChosenPet(obj);
    /*console.log(typeof e.target.value);
    console.log(imageArray);
    setChosenPet(e.target.value);*/
  };
  const handleSlider = (e) => {
    setSliderVal(e.target.value);
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
    console.log("Submitted");
  };
  const getImages = () => {
    let petImagesCol = collection(db, "petImages");
    let arr = [];
    getDocs(petImagesCol).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        arr.push(doc.data());
      });
      setImageArray(arr);
      console.log({ imageArray });
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
              key={petName}
              onChange={(e) => setPetName(e.target.value)}
            />
          </div>
          <div>
            {imageArray.length > 0 &&
              imageArray.map((image, index) => (
                <div
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
          <input
            type="range"
            min="1"
            max="360"
            value={sliderVal}
            onChange={handleSlider}
          />
          <br />
          <button>Create Pet!</button>
        </section>
      </form>
    </main>
  );
}
