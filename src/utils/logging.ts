import pino, { Logger } from "pino";
import pretty from "pino-pretty";

const logLevelData = {
  "*": "silent",
  home: "info",
};

const logLevels = new Map<string, string>(Object.entries(logLevelData));

export function getLogLevel(logger: string): string {
  return logLevels.get(logger) || logLevels.get("*") || "info";
}

const stream = pretty({
  colorize: true,
});

export function getLogger(name: string): Logger {
  return pino(
    {
      name,
      level: getLogLevel(name),
    },
    stream
  );
}
