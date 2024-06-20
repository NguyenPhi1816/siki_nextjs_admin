import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

interface UploadImageProps {
  value: string;
  defaultFile?: File | null;
  onChange: (file: File) => void;
}

const UploadImage: React.FC<UploadImageProps> = ({
  value,
  defaultFile = null,
  onChange,
}) => {
  const [image, setImage] = useState<string>(value);

  const convertFromFileToURL = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onChange(file);
      convertFromFileToURL(file);
    }
  };

  useEffect(() => {
    if (defaultFile) {
      convertFromFileToURL(defaultFile);
    }
  }, [defaultFile]);

  return (
    <Box
      sx={{
        width: "7rem",
        height: "7rem",
        color: "var(--text-grey)",
        border: "1px solid var(--outline-light-grey)",
        borderRadius: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <input
        accept="image/*"
        id="icon-button-file"
        type="file"
        style={{ display: "none" }}
        onChange={handleUpload}
      />
      <label htmlFor="icon-button-file">
        {image ? (
          <img
            src={image}
            alt="Uploaded"
            style={{ width: "100px", height: "100px", objectFit: "contain" }}
          />
        ) : (
          <PhotoCamera />
        )}
      </label>
    </Box>
  );
};

export default UploadImage;
