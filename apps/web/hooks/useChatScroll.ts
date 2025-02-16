import { useEffect, useRef } from "react";

function useChatScroll(message: any) {
  const ref = useRef<HTMLElement>(undefined);

  useEffect(() => {
    setTimeout(() => {
      if (ref.current) {
        ref.current.scrollTop = ref.current.scrollHeight;
      }
    }, 100);
  }, [message]);

  return ref;
}

export default useChatScroll;
