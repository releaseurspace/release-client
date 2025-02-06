import { useEffect, useRef, useState } from "react";

interface AutoScrollDivProps {
  children: React.ReactNode;
}

export default function AutoScrollDiv({ children }: AutoScrollDivProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const atBottom = scrollHeight - scrollTop - clientHeight < 10;
      setIsAutoScroll(atBottom);
    }
  };

  useEffect(() => {
    if (isAutoScroll && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [children, isAutoScroll]);

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      className="h-full flex flex-col overflow-y-scroll pb-4 scrollbar-hide"
    >
      {children}
    </div>
  );
}
