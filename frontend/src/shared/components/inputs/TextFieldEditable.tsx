import { Close as CloseIcon, Edit as EditIcon } from "@mui/icons-material";
import { 
  IconButton, 
  InputAdornment, 
  TextField,
  TextFieldProps,
  InputProps as MuiInputProps
} from "@mui/material";
import { useCallback, useState } from "react";

export interface TextFieldEditableProps extends Omit<TextFieldProps, 'InputProps'> {
  canEdit: boolean
  InputProps?: Omit<MuiInputProps, 'endAdornment' | 'readOnly'>
}

export const TextFieldEditable = ({
  canEdit,
  InputProps = {},
  ...props
}: TextFieldEditableProps) => {
  const [isEdit, setIsEdit] = useState(false);

  const toggleEdit = useCallback(() => {
    setIsEdit((val) => !val)
  }, [])

  return (
    <TextField
      {...props}
      InputProps={{
        ...InputProps,
        readOnly: (canEdit && !isEdit) || !canEdit,
        endAdornment: canEdit ? (
          <InputAdornment position="end">
            <IconButton size="small" onClick={toggleEdit}>
              {isEdit ? <CloseIcon fontSize="small" /> : <EditIcon fontSize="small" />}
            </IconButton>
          </InputAdornment>
        ) : null
      }}
      />
  );
};