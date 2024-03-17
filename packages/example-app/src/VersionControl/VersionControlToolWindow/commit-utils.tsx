import React from "react";

export const parseCommitMessage = (commitMessage: string) => {
  const lines = commitMessage.split("\n");
  const bodyLines = lines.slice(1);
  return {
    subject: lines[0],
    bodyAsString: bodyLines.join("\n"),
    body: (
      <>
        {bodyLines.map((line, index) => (
          <React.Fragment key={index}>
            {index > 0 && <br />}
            {line}
          </React.Fragment>
        ))}
      </>
    ),
  };
};

export function shortenOid(oid: string) {
  return oid.slice(0, 8);
}

const commitDateTimeFormatter = new Intl.DateTimeFormat([], {
  day: "numeric",
  month: "numeric",
  year: "2-digit",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
});

const commitTimeFormatter = new Intl.DateTimeFormat([], {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
});

const commitDateFormatter = new Intl.DateTimeFormat([], {
  day: "numeric",
  month: "numeric",
  year: "2-digit",
});

export function formatCommitDateTime(date: Date | number) {
  return commitDateTimeFormatter.format(date).replace(" ", " ");
}

export function formatCommitDate(date: Date | number) {
  return commitDateFormatter.format(date);
}

export function formatCommitTime(date: Date | number) {
  return commitTimeFormatter.format(date).replace(" ", " ");
}
