import { withFieldGroup } from "../../../hooks/form";

export const StepOne = withFieldGroup({
  render: function Render({ group }) {
    return (
      <>
        <group.AppField
          name="fullName"
          children={(field) => <field.TextField label="Full Name" />}
        />
        <group.AppField
          name="phone"
          children={(field) => <field.TextField label="Phone" />}
        />
      </>
    );
  },
});
