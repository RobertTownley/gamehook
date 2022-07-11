import { Dispatch, SetStateAction } from "react";

import { ConnectionStatus } from "../types";

export interface ConnectionUIProps {
  setStatus: Dispatch<SetStateAction<ConnectionStatus>>;
}
