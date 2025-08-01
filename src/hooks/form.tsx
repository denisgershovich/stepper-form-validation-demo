import { lazy } from "react";

import { createFormHook } from "@tanstack/react-form";

import { fieldContext, formContext } from "./form-context";

const TextField = lazy(() => import("../components/stepperForm/TextField"));
const SubscribeButton = lazy(
  () => import("../components/stepperForm/SubscribeButton"),
);

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: {
    TextField,
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
});
