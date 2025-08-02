import { lazy } from "react";

import { createFormHook } from "@tanstack/react-form";

import { fieldContext, formContext } from "./form-context";

const TextField = lazy(() => import("../components/stepperForm/TextField"));

export const { useAppForm, withFieldGroup } = createFormHook({
  fieldComponents: {
    TextField,
  },
  formComponents: {},
  fieldContext,
  formContext,
});
