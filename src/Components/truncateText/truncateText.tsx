import React, { useEffect, useState } from "react";

interface TextTruncateProps {
  text: string;
  maxLength: number;
  className : string
}

const TextTruncate: React.FC<TextTruncateProps> = ({
  className,
  text,
  maxLength,
}) => {
  const [truncatedText, setTruncatedText] = useState<string>(text);

  useEffect(() => {
    if (text.length > maxLength) {
      const truncated = text.substring(0, maxLength) + "...";
      setTruncatedText(truncated);
    } else {
      setTruncatedText(text);
    }
  }, [text, maxLength]);

  return <span className={className}>{truncatedText}</span>;
};

export default TextTruncate;
