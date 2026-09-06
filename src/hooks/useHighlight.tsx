import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from 'react';

interface HighlightContextType {
  highlightedId: string | null;
  highlight: (id: string) => void;
}

const HighlightContext = createContext<HighlightContextType>({
  highlightedId: null,
  highlight: () => {},
});

export function HighlightProvider({ children }: { children: ReactNode }) {
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const highlight = useCallback((id: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setHighlightedId(id);
    timerRef.current = setTimeout(() => setHighlightedId(null), 3000);
  }, []);

  return (
    <HighlightContext.Provider value={{ highlightedId, highlight }}>
      {children}
    </HighlightContext.Provider>
  );
}

export function useHighlight() {
  return useContext(HighlightContext);
}

/**
 * HighlightTarget wraps a section that can be highlighted by the assistant.
 * Usage: <HighlightTarget id="monthlyRepayment">...</HighlightTarget>
 */
export function HighlightTarget({
  id,
  children,
  className = '',
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  const { highlightedId } = useHighlight();
  const isHighlighted = highlightedId === id;

  return (
    <div
      className={`transition-all duration-300 rounded-2xl ${isHighlighted ? 'animate-highlight' : ''} ${className}`}
      style={{
        outline: isHighlighted ? '2px solid #2C9C78' : 'none',
        outlineOffset: isHighlighted ? '4px' : '0px',
      }}
    >
      {children}
    </div>
  );
}
