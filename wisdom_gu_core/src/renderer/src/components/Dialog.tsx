interface DialogProps {
  name: string;
  content: string;
}

const Dialog = (prpos: DialogProps) => {
  const { name, content } = prpos;
  const isMe = name === "me";

  return (
    <div
      className={`flex ${isMe ? "justify-start" : " justify-end"} space-x-2`}
    >
      <div
        className={`flex flex-col  ${isMe ? "justify-start" : " justify-end"}`}
      >
        <div
          className={`bg-gray-200 p-2 rounded-lg ${
            isMe ? "ml-auto" : "mr-auto"
          }`}
        >
          <p className="text-sm">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
