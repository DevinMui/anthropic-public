import { FiPlus, FiSend } from "react-icons/fi";
import IntegrationProvider from "../IntegrationProvider";

const ingesterProviderDisplay = {
  [IntegrationProvider.EMAIL]: {
    name: "Email",
    icon: FiSend,
    title: "Draft Email",
  },
  [IntegrationProvider.ASANA]: {
    name: "Asana",
    icon: FiPlus,
    title: "Add task",
  },
};

export default ingesterProviderDisplay;
