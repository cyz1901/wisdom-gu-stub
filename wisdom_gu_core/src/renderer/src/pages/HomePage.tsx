import { JSX, createEffect, createSignal, onCleanup, onMount } from "solid-js";
import { FaRegularFaceDizzy } from "solid-icons/fa";
import { BsChatLeftDots } from "solid-icons/bs";
import { AiOutlineSetting } from "solid-icons/ai";
import { BiRegularBrain } from "solid-icons/bi";
import { BsTextParagraph } from "solid-icons/bs";
import FilesTreeComponent from "../components/FilesTreeComponent";
import ConversationPage from "./ConversationPage";
import DataPage from "./DataPage";
import { ChatAnthropic } from "langchain/chat_models/anthropic";
import { HumanMessage } from "langchain/schema";

function HomePage(): JSX.Element {
  const [isEditor, setIsEditor] = createSignal(false);
  const [containerRef, setContainerRef] = createSignal<HTMLDivElement | null>(
    null
  );

  onMount(() => {
    const containerElement = containerRef();
    if (containerElement) {
      containerElement.addEventListener("wheel", handleWheel);
    }
  });

  function handleWheel(event: WheelEvent) {
    console.log(event.deltaY);
    event.preventDefault();
    if (containerRef() !== null && containerRef() !== undefined) {
      containerRef()!.scrollLeft += event.deltaY;
    }
  }

  onCleanup(() => {
    if (containerRef() !== null && containerRef() !== undefined) {
      containerRef()!.removeEventListener("wheel", handleWheel);
    }
  });

  function MainMenu(): JSX.Element {
    return (
      <ul class="menu bg-base-200 rounded-box">
        <li>
          <a
            class="tooltip tooltip-right flex items-center justify-center"
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
            class="tooltip tooltip-right flex items-center justify-center"
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
            class="tooltip tooltip-right flex items-center justify-center"
            data-tip="Models"
          >
            <BiRegularBrain
              size={20}
              fill="currentcolor"
              color="#585C70"
            ></BiRegularBrain>
          </a>
        </li>
        <li>
          <a
            class="tooltip tooltip-right flex items-center justify-center"
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
    <div class="flex flex-row h-screen bg-[#1B1D22]  overflow-y-hidden">
      <div class="w-[96px] flex flex-col items-center justify-between pt-2 pb-3 bg-[#1B1D22]">
        <div class="flex flex-col items-center">
          <FaRegularFaceDizzy
            size={24}
            fill="currentcolor"
            color="#E6E1DF"
          ></FaRegularFaceDizzy>
          <MainMenu></MainMenu>
        </div>
        <div class="w-8 h-8 rounded-full overflow-hidden">
          <img
            src="https://api.dicebear.com/6.x/initials/svg?seed=Ginger"
            alt="avatar"
          />
        </div>
      </div>
      <div class="flex flex-col w-full h-full">
        {isEditor() ? (
          <ConversationPage></ConversationPage>
        ) : (
          <DataPage></DataPage>
        )}
      </div>

      <div class="w-[256px] bg-gray-200">
        <FilesTreeComponent></FilesTreeComponent>
      </div>
    </div>
  );
}

export default HomePage;
