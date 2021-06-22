import { useState } from "react";

type UseModalHook = [boolean, () => void, () => void];

export default function useModal(): UseModalHook {
  const [state, setState] = useState(false);

  function openModal() {
    setState(true);
  }

  function closeModal() {
    setState(false);
  }

  return [state, openModal, closeModal];
}
