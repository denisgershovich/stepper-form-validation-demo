import { lazy } from "react";

import { createFormHook } from "@tanstack/react-form";

import { fieldContext, formContext } from "./form-context";

const TextField = lazy(() => import("../components/stepperForm/TextField"));
const FileField = lazy(() => import("../components/stepperForm/FileField"));

export const { useAppForm, withFieldGroup } = createFormHook({
  fieldComponents: {
    TextField,
    FileField,
  },
  formComponents: {},
  fieldContext,
  formContext,
});
