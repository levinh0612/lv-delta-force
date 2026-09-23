import { useEffect } from "react";

const SUFFIX = "Delta Force · Team WP";

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} – ${SUFFIX}` : `${SUFFIX} – Hướng dẫn tân binh`;
  }, [title]);
}
