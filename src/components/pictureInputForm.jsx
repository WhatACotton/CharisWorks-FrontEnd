import React from "react";
import { MuiFileInput } from "../../node_modules/mui-file-input";
import { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Image } from "react-bootstrap";

function CropDemo({ src }) {
  const [crop, setCrop] = useState("");
  return (
    <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
      <Image src={src} alt="image" />
    </ReactCrop>
  );
}
export const PictureInput = () => {
  const [value, setValue] = useState(null);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <MuiFileInput
        value={value}
        onChange={handleChange}
        inputProps={{ accept: ".png, .jpeg" }}
        placeholder="画像を選択してください"
        variant="standard"
      />
      <CropDemo
        src={"/home/cotton/codes/charisworksfrontend/public/vercel.svg"}
      />
    </div>
  );
};
