import logger from "pino";

// graphql-codegenから参照するContextの型定義
export interface Context {
  logger: logger.Logger;
  sessionId: string;
}
