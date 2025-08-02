import { Steps } from "./constants";

export const defaultFormValues = {
  [Steps.stepOne]: { fullName: "", phone: "" },
  [Steps.stepTwo]: { email: "", zip: "" },
};
