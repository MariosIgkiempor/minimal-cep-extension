import { CSInterface } from "@/lib/packages/CSInterface";

export const csInterface = new CSInterface();

interface IllustratorEvent {
  type: string;
  data: string;
  extensionId: string;
  appId: string;
  scope: string;
}

csInterface.addEventListener("documentAfterActivate", ({ data }: IllustratorEvent) => {
  const customEvent = new CustomEvent("illustratorActiveDocumentChanged", { detail: data });
  document.dispatchEvent(customEvent);
});

csInterface.addEventListener("documentAfterDeactivate", ({ data }: IllustratorEvent) => {
  const customEvent = new CustomEvent("illustratorActiveDocumentChanged", { detail: data });
  document.dispatchEvent(customEvent);
});
