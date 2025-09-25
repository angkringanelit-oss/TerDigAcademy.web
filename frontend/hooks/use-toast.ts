// src/hooks/use-toast.ts
import * as React from "react";
import type { ToastActionElement, ToastProps } from "@/components/ui/toast";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 5000;

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  icon?: React.ReactNode;
  loading?: boolean;
  onDismiss?: () => void;
};

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

let count = 0;
const genId = () => (count = (count + 1) % Number.MAX_SAFE_INTEGER, count.toString());

type Action =
  | { type: typeof actionTypes.ADD_TOAST; toast: ToasterToast }
  | { type: typeof actionTypes.UPDATE_TOAST; toast: Partial<ToasterToast> }
  | { type: typeof actionTypes.DISMISS_TOAST; toastId?: string }
  | { type: typeof actionTypes.REMOVE_TOAST; toastId?: string };

interface State {
  toasts: ToasterToast[];
}

let memoryState: State = { toasts: [] };
const listeners: Array<(state: State) => void> = [];
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (id: string) => {
  if (toastTimeouts.has(id)) return;
  const timeout = setTimeout(() => {
    toastTimeouts.delete(id);
    dispatch({ type: "REMOVE_TOAST", toastId: id });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(id, timeout);
};

function dispatch(action: Action) {
  memoryState = (function reducer(state: State, action: Action): State {
    switch (action.type) {
      case "ADD_TOAST":
        return { ...state, toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT) };
      case "UPDATE_TOAST":
        return { ...state, toasts: state.toasts.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t)) };
      case "DISMISS_TOAST":
        if (action.toastId) addToRemoveQueue(action.toastId);
        else state.toasts.forEach((t) => addToRemoveQueue(t.id));
        return {
          ...state,
          toasts: state.toasts.map((t) =>
            t.id === action.toastId || action.toastId === undefined ? { ...t, open: false } : t
          ),
        };
      case "REMOVE_TOAST":
        if (action.toastId === undefined) return { ...state, toasts: [] };
        return { ...state, toasts: state.toasts.filter((t) => t.id !== action.toastId) };
    }
  })(memoryState, action);
  listeners.forEach((l) => l(memoryState));
}

type Toast = Omit<ToasterToast, "id">;
function toast({ ...props }: Toast) {
  const id = genId();
  const update = (p: ToasterToast) => dispatch({ type: "UPDATE_TOAST", toast: { ...p, id } });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: { ...props, id, open: true, onOpenChange: (o) => !o && dismiss() },
  });
  return { id, dismiss, update };
}

export function useToast() {
  const [state, setState] = React.useState(memoryState);
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const idx = listeners.indexOf(setState);
      if (idx > -1) listeners.splice(idx, 1);
    };
  }, []);
  return { ...state, toast, dismiss: (id?: string) => dispatch({ type: "DISMISS_TOAST", toastId: id }) };
}

export { toast };