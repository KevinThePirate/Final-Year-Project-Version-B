import React from "react";
export function ImageOptions({ image, handleChange, index }) {
  return (
    <>
      {" "}
      <input
        type="radio"
        name="petPics"
        value={image}
        onChange={handleChange}
        key={index + "-Radio"}
      />
      <img
        src={image.happy}
        key={index + "image-url"}
        alt="Pet Option"
        className="selection-images"
      />
    </>
  );
}
