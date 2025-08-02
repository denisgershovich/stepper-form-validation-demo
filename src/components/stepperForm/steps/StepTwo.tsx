import { withFieldGroup } from "../../../hooks/form";

export const StepTwo = withFieldGroup({
  render: function Render({ group }) {
    return (
      <>
        <group.AppField
          name="email"
          children={(field) => <field.TextField label="email" />}
        />
        <group.AppField
          name="zip"
          children={(field) => <field.TextField label="zip" />}
        />
      </>
    );
  },
});
