import { csInterface } from "@/lib/illustrator/core";

export const saveActiveDocument = () => {
  csInterface.evalScript("saveActiveDocument()");
};
