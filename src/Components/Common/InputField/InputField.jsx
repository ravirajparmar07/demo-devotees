import React, { useState } from "react";
import { useField, ErrorMessage } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";

const InputField = ({ label, name, placeholder, children, type, ...rest }) => {
  const [field, meta] = useField(name);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="mb-4 relative">
      {label && (
        <label
          htmlFor={name}
          className=" text-sm font-normal text-gray-900 mb-2 flex items-center"
        >
          {label}
          {meta.touched && meta.error && (
            <span className="text-red-600 ml-1">*</span>
          )}
        </label>
      )}
      {type === "password" ? (
        <FormControl variant="outlined" className="w-full">
          <OutlinedInput
            type={showPassword ? "text" : "password"}
            id={name}
            name={name}
            placeholder={placeholder}
            {...field}
            {...rest}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: meta.touched && meta.error ? "#DC2626" : "#c7c7c7",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#c7c7c7",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: meta.touched && meta.error ? "#DC2626" : "#000",
              },
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {!showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      ) : (
        <>
          <input
            id={name}
            name={name}
            placeholder={placeholder}
            {...field}
            {...rest}
            className={`w-full py-2.5 px-15 text-sm text-black border rounded-4 shadow-sm ${
              meta.touched && meta.error ? "border-red-600" : "border-[#c7c7c7]"
            }`}
          />
          {children && (
            <div className="absolute inset-y-0 right-3 flex items-center">
              {children}
            </div>
          )}
        </>
      )}

      <ErrorMessage
        name={name}
        component="p"
        className="text-red-600 text-xs mt-1"
      />
    </div>
  );
};

export default InputField;
