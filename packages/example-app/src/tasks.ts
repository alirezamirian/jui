// @ts-expect-error caf doesn't have typing :/
import { CAF } from "caf";
import { atom, Getter, Setter } from "jotai";
import { useAtomCallback } from "jotai/utils";
import { useCallback } from "react";

interface ProgressIndicator {
  /**
   * Sets the primary text, usually shown above the progress bar.
   * @param text
   */
  setText(text: string): void;

  /**
   * Sets the secondary text, usually shown below the primary text.
   * @param secondaryText
   */
  setSecondaryText(secondaryText: string): void;

  /**
   * Sets the fraction: a number between 0.0 and 1.0 reflecting the ratio of work that has already been done (0.0 for nothing, 1.0 for all).
   * Only works for determinate indicator. The fraction should provide the user with a rough estimation of the time left;
   * if that's impossible, consider making the progress indeterminate.
   *
   * @see ProgressIndicator#setIndeterminate
   */
  setFraction(progress: number): void;

  /**
   * sets `indeterminate` state of the associated progress bar.
   * @param indeterminate
   */
  setIndeterminate(indeterminate: boolean): void;
}

interface Progress {
  text: string;
  secondaryText: string;
  isIndeterminate: boolean;
  fraction: number;
}

export interface Task {
  id: number;
  title: string;
  isCancelable: boolean;
  abortController: AbortController;
  progress: Progress;
}

export const tasksAtom = atom<Task[]>([]);

/**
 * Selector that gives the first task. Optimized for use cases like in the statusbar where only the first task is shown.
 * While tasks state can update as tasks progress, this only changes when the first task does.
 */
export const firstTaskAtom = atom<Task | null>((get) => get(tasksAtom)[0]);

/**
 * Optimized state of the number of tasks, if the tasks are not needed.
 */
export const taskCountAtom = atom<number>((get) => get(tasksAtom).length);

let progressSeq = 0;

export type TaskRunFn = (
  progressIndicator: ProgressIndicator,
  abortSignal: AbortSignal /* FIXME: refine type*/
) => void | Promise<void>;

type TaskDefinition = TaskRunFn | { run: TaskRunFn; onFinished?: () => void };

type TaskOptions = { title: string; isCancelable?: boolean };

export const createTaskCallback = (
  _get: Getter,
  set: Setter,
  options: TaskOptions, // TODO: why separate options and task definition? maybe merge?
  task: TaskDefinition
): Task["id"] => {
  const { title, isCancelable = false } = options;
  const abortController: AbortController = new CAF.cancelToken();
  const id = ++progressSeq;
  set(tasksAtom, (tasks) => [
    ...tasks,
    {
      id: progressSeq++,
      title,
      abortController,
      isCancelable,
      progress: {
        fraction: 0,
        text: "",
        secondaryText: "",
        isIndeterminate: false,
      },
    },
  ]);
  const setTaskProgressState = (updates: Partial<Progress>) => {
    set(tasksAtom, (tasks) => {
      return tasks.map((task) =>
        task.id === id
          ? { ...task, progress: { ...task.progress, ...updates } }
          : task
      );
    });
  };
  const taskDefinition = typeof task === "function" ? { run: task } : task;
  Promise.resolve(
    taskDefinition.run(
      {
        setFraction(fraction: number) {
          setTaskProgressState({ fraction });
        },
        setText(text: string) {
          setTaskProgressState({ text });
        },
        setSecondaryText(secondaryText: string) {
          setTaskProgressState({ secondaryText });
        },
        setIndeterminate(isIndeterminate: boolean) {
          setTaskProgressState({ isIndeterminate });
        },
      },
      abortController.signal
    )
  ).finally(() => {
    set(tasksAtom, (tasks) => tasks.filter((task) => task.id !== id));
    taskDefinition.onFinished?.();
  });
  return id;
};
/**
 * Returns a function which can be used to run a task.
 * Tasks are shown in the toolbar or as a modal window.
 */
export const useRunTask = () => {
  return useAtomCallback(createTaskCallback);
};

/**
 * Returns a function to cancel a task based on id.
 */
export const useCancelTask = () =>
  useAtomCallback(
    useCallback((get, _set, id: Task["id"]) => {
      const task = get(tasksAtom).find((task) => task.id === id);
      if (task) {
        task.abortController.abort();
      }
    }, [])
  );
