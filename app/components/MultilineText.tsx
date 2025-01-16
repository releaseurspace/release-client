export default function MultilineText({ text }: { text: string }) {
  return text.split("\n").map((line, idx) => (
    <span key={idx}>
      {line}
      <br />
    </span>
  ));
}
