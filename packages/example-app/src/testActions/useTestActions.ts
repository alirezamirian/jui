// @ts-expect-error caf doesn't have typing :/
import { CAF } from "caf";
import { ActionDefinition } from "@intellij-platform/core";
import { useRunTask } from "../tasks";

export function useTestActions(): ActionDefinition[] {
  const runTask = useRunTask();
  return [
    {
      id: "AddTestProcessAction",
      title: "Add Test Process",
      actionPerformed: () => {
        runTask(
          { title: "Test process", isCancelable: true },
          async ({ setText, setSecondaryText, setFraction }, abortSignal) => {
            setText("Welcome!");
            await CAF(function* () {
              for (let each = 0; each < 1000; each++) {
                setText(getProcessName(each));
                setFraction(each / 1000.0);
                yield sleep(100);
                setSecondaryText("Bla bla bla");
              }
            })(abortSignal);
          }
        );
      },
    },
  ];
}

async function sleep(durationInMs: number) {
  return new Promise((resolve) => setTimeout(resolve, durationInMs));
}

function getProcessName(num: number) {
  if (num / 10.0 == Math.round(num / 10.0)) {
    return "";
  }
  return "Found: " + num / 20 + 1;
}
