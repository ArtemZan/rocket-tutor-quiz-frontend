import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, TextField, TextFieldProps } from "@mui/material";
import { useState } from "react";

export function PasswordInput(props: TextFieldProps) {
    const [isVisible, setIsVisible] = useState(false)

    return <TextField
        {...props}
        type={isVisible ? "text" : "password"}
        InputProps={{
            endAdornment: <IconButton onClick={() => setIsVisible(!isVisible)}>
                {isVisible ? <VisibilityOff /> : <Visibility />}
            </IconButton>,
            ...(props.InputProps || {})
        }}
    />
}