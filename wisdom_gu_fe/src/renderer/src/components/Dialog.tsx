interface DialogProps {
  name: string;
  content: string;
}

const Dialog = (prpos: DialogProps) => {
  const { name, content } = prpos;
  const isMe = name === "me";

  return (
    <div class={`flex ${isMe ? "justify-start" : " justify-end"} space-x-2`}>
      <div class={`flex flex-col  ${isMe ? "justify-start" : " justify-end"}`}>
        <div
          class={`bg-gray-200 p-2 rounded-lg ${isMe ? "ml-auto" : "mr-auto"}`}
        >
          <p class="text-sm">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
