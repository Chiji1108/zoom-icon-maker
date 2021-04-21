import { useState } from "react";

export const MainForm = () => {
  const [imageSrc, setImageSrc] = useState<string>(null); // before crop image src
  const [croppedImage, setCroppedImage] = useState<string>(null); // after crop image src
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  return (
    <div className="bg-darkGray flex flex-col items-center">
      {/* if src show modal & avatar crop */}
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-transparent text-white"
          placeholder="名前を入力"
        />
      </div>

      <div>
        <input
          type="text"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="bg-transparent text-white"
          placeholder="BIOを入力"
        />
      </div>
    </div>
  );
};