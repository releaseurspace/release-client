import React, { JSX, useEffect, useState } from "react";

interface TypingTextProps {
  text: string;
  typingSpeed?: number;
}

const TypingText: React.FC<TypingTextProps> = ({ text, typingSpeed = 100 }) => {
  const [displayedText, setDisplayedText] = useState<JSX.Element[]>([]);
  const [showCursor, setShowCursor] = useState<boolean>(true);
  const [typingComplete, setTypingComplete] = useState<boolean>(false);

  useEffect(() => {
    const fragments = text.split("\n");
    const newDisplayedText: JSX.Element[] = [];

    const typeNextFragment = async () => {
      for (let i = 0; i < fragments.length; i++) {
        const fragment = fragments[i];
        for (let charIndex = 0; charIndex < fragment.length; charIndex++) {
          newDisplayedText.push(
            <span key={`${i}-${charIndex}`}>{fragment[charIndex]}</span>
          );
          setDisplayedText([...newDisplayedText]); 
          await new Promise((resolve) => setTimeout(resolve, typingSpeed));
        }
        if (i < fragments.length - 1) {
          newDisplayedText.push(<br key={`br-${i}`} />);
          setDisplayedText([...newDisplayedText]);
        }
      }
      setTypingComplete(true);
    };

    typeNextFragment();
  }, [text, typingSpeed]);

  useEffect(() => {
    if (!typingComplete) {
      const cursorInterval = setInterval(() => {
        setShowCursor((prev) => !prev);
      }, 500);
      return () => clearInterval(cursorInterval);
    }
  }, [typingComplete]);

  return (
    <div>
      {displayedText}
      {!typingComplete && showCursor && <span className="cursor">|</span>}
    </div>
  );
};

export default TypingText;
