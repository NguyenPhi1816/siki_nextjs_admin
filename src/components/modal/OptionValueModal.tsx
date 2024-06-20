import { Clear } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { MouseEvent, useState } from "react";

interface IOptionValueModal {
  open: boolean;
  setOpen: () => void;
  onSave: (option: string, values: string[]) => void;
}

const OptionValueModal: React.FC<IOptionValueModal> = ({
  open,
  setOpen,
  onSave,
}) => {
  const [option, setOption] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [values, setValues] = useState<string[]>([]);

  const handleSetValues = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setValues((prev) => {
      const index = prev.findIndex((item) => item === value);

      if (index === -1) {
        return [...prev, value];
      }

      return prev;
    });
    setValue("");
  };

  const handleClose = () => {
    setOption("");
    setValue("");
    setValues([]);
    setOpen();
  };

  const handleSave = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSave(option, values);
    handleClose();
  };

  const handleDeleteValue = (myValue: string) => {
    setValues((prev) => {
      const newValue = prev.filter((item) => item !== myValue);
      return newValue;
    });
  };

  return (
    <Modal
      open={open}
      onClose={setOpen}
      aria-labelledby="modal-modal-add-category"
      aria-describedby="modal-modal-add-category-to-db"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          padding: "1rem",
          maxWidth: "30rem",
          bgcolor: "var(--bg-white)",
          display: "flex",
          flexDirection: "column",
          borderRadius: 1,
        }}
      >
        <Box
          sx={{
            marginBottom: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: "1.25rem" }}>
            Thêm tùy chọn
          </Typography>
          <IconButton onClick={handleClose}>
            <Clear />
          </IconButton>
        </Box>
        <form>
          <TextField
            required
            fullWidth
            id="option"
            label="Tùy chọn"
            name="option"
            value={option}
            onChange={(e) => setOption(e.target.value)}
            sx={{ marginBottom: "0.5rem" }}
          />
          <TextField
            required
            fullWidth
            id={`value`}
            label={`Giá trị`}
            name={`value`}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            sx={{ marginBottom: "0.5rem" }}
          />
          <Box
            sx={{
              marginBottom: "0.5rem",
              maxHeight: "40vh",
              overflowY: "scroll",
            }}
          >
            {values.map((item) => (
              <Chip
                key={item}
                sx={{ margin: "0.25rem" }}
                label={item}
                onDelete={() => handleDeleteValue(item)}
              />
            ))}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              sx={{
                width: "48%",
              }}
              variant="outlined"
              onClick={(e) => handleSetValues(e)}
            >
              Thêm giá trị
            </Button>
            <Button
              variant="contained"
              sx={{
                width: "48%",
                color: "var(--text-white)",
              }}
              onClick={(e) => handleSave(e)}
            >
              Lưu
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default OptionValueModal;
