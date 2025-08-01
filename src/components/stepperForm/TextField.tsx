import { TextField as MuiTextField } from "@mui/material";
import { useStore } from "@tanstack/react-store";

import { useFieldContext } from "../../hooks/form-context";

const TextField = ({ label }: { label: string }) => {
  const field = useFieldContext<string>();

  const errors = useStore(field.store, (state) => state.meta.errors);

  return (
    <MuiTextField
      label={label}
      value={field.state.value}
      onChange={(e) => field.handleChange(e.target.value)}
      onBlur={field.handleBlur}
      error={errors.length > 0}
      helperText={errors.join(", ")}
      fullWidth
    />
  );
};

export default TextField;
