import logger from "pino";
import { useTranslation } from "react-i18next";

// graphql-codegenから参照するContextの型定義
export interface Context {
  logger: logger.Logger;
  sessionId: string;
}
