import { useStore } from "@tanstack/react-store";
import { useFieldContext } from "../../hooks/form-context";

const FileField = ({ label }: { label: string }) => {
  const field = useFieldContext<File | null>();

  const errors = useStore(field.store, (state) => state.meta.errors);
  const isDirty = useStore(field.store, (state) => state.meta.isDirty);

  const shouldShowError = isDirty && errors.length > 0;

  return (
    <div>
      <label className="block mb-2">{label}</label>
      <input
        type="file"
        onChange={(e) =>
          field.handleChange(e.target.files ? e.target.files[0] : null)
        }
        onBlur={field.handleBlur}
      />

      {field.state.value && (
        <p className="mt-2 text-sm text-gray-600">
          Selected file: {field.state.value.name}
        </p>
      )}

      {shouldShowError && (
        <p className="mt-1 text-sm text-red-600">{errors.join(", ")}</p>
      )}
    </div>
  );
};

export default FileField;
