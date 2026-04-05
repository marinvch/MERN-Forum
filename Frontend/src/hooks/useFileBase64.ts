import { useState, useCallback } from "react";

interface UseFileBase64Result {
  base64: string | null;
  error: string | null;
  convert: (file: File) => void;
  reset: () => void;
}

export const useFileBase64 = (): UseFileBase64Result => {
  const [base64, setBase64] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const convert = useCallback((file: File) => {
    const reader = new FileReader();

    reader.onload = () => {
      setBase64(reader.result as string);
      setError(null);
    };

    reader.onerror = () => {
      setError("Failed to read file.");
      setBase64(null);
    };

    reader.readAsDataURL(file);
  }, []);

  const reset = useCallback(() => {
    setBase64(null);
    setError(null);
  }, []);

  return { base64, error, convert, reset };
};
