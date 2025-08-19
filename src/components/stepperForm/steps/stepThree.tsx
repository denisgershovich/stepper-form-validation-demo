import { withFieldGroup } from "../../../hooks/form";

export const StepThree = withFieldGroup({
  render: function Render({ group }) {
    return (
      <group.AppField name="file">
        {(field) => <field.FileField label="Upload File" />}
      </group.AppField>
    );
  },
});
