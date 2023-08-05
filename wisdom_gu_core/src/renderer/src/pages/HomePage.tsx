import { useEffect, useRef, useState } from "react";
import { BsTextParagraph, BsChatLeftDots } from "react-icons/bs";
import { BiBrain } from "react-icons/bi";
import { AiOutlineSetting } from "react-icons/ai";
import { GiBearFace } from "react-icons/gi";
import ConversationPage from "./ConversationPage";
import DataPage from "./DataPage";
import FilesTreeComponent from "@renderer/components/FilesTreeComponent";

function HomePage(): JSX.Element {
  const [isEditor, setIsEditor] = useState(false);
  // const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  // const containerElementRef = useRef<>();

  // useEffect(() => {
  //   // 获取 DOM 元素的引用
  //   const containerElement = containerElementRef.current;

  //   if (containerElement) {
  //     containerElement.addEventListener("wheel", handleWheel);
  //   }

  //   // 在组件卸载时移除事件监听
  //   return () => {
  //     if (containerElement) {
  //       containerElement.removeEventListener("wheel", handleWheel);
  //     }
  //   };
  // }, []);

  // function handleWheel(event: WheelEvent) {
  //   console.log(event.deltaY);
  //   event.preventDefault();
  //   if (containerRef() !== null && containerRef() !== undefined) {
  //     containerRef()!.scrollLeft += event.deltaY;
  //   }
  // }

  // onCleanup(() => {
  //   if (containerRef() !== null && containerRef() !== undefined) {
  //     containerRef()!.removeEventListener("wheel", handleWheel);
  //   }
  // });

  function MainMenu(): JSX.Element {
    return (
      <ul className="menu bg-base-200 rounded-box">
        <li>
          <a
            className="tooltip tooltip-right flex items-center justify-center"
            data-tip="Data"
            onClick={() => {
              setIsEditor(false);
            }}
          >
            <BsTextParagraph
              size={20}
              fill="currentcolor"
              color="#585C70"
            ></BsTextParagraph>
          </a>
          <a
            className="tooltip tooltip-right flex items-center justify-center"
            data-tip="Chat"
            onClick={() => {
              setIsEditor(true);
            }}
          >
            <BsChatLeftDots
              size={20}
              fill="currentcolor"
              color="#585C70"
            ></BsChatLeftDots>
          </a>
        </li>
        <li>
          <a
            className="tooltip tooltip-right flex items-center justify-center"
            data-tip="Models"
          >
            <BiBrain size={20} fill="currentcolor" color="#585C70"></BiBrain>
          </a>
        </li>
        <li>
          <a
            className="tooltip tooltip-right flex items-center justify-center"
            data-tip="Setting"
          >
            <AiOutlineSetting
              size={20}
              fill="currentcolor"
              color="#585C70"
            ></AiOutlineSetting>
          </a>
        </li>
      </ul>
    );
  }

  return (
    <div className="flex flex-row h-screen bg-[#1B1D22]  overflow-y-hidden">
      <div className="w-[96px] flex flex-col items-center justify-between pt-2 pb-3 bg-[#1B1D22]">
        <div className="flex flex-col items-center">
          <GiBearFace
            size={24}
            fill="currentcolor"
            color="#E6E1DF"
          ></GiBearFace>
          <MainMenu></MainMenu>
        </div>
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <img
            src="https://api.dicebear.com/6.x/initials/svg?seed=Ginger"
            alt="avatar"
          />
        </div>
      </div>
      <div className="flex flex-col w-full h-full">
        {isEditor ? (
          <ConversationPage></ConversationPage>
        ) : (
          <DataPage></DataPage>
        )}
      </div>
    </div>
  );
}

export default HomePage;
