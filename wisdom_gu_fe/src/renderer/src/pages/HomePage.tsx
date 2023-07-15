import { JSX, createEffect, createSignal, onCleanup, onMount } from "solid-js";
import { FaRegularFaceDizzy } from "solid-icons/fa";
import { BsChatLeftDots } from "solid-icons/bs";
import { AiOutlineSetting } from "solid-icons/ai";
import { BiRegularBrain } from "solid-icons/bi";
import FilesTreeComponent from "../components/FilesTreeComponent";
import ConversationPage from "./ConversationPage";
import EditorPage from "./EditorPage";
import { ipcRenderer } from "electron";

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

  createEffect(() => {
    // window.electron.ipcRenderer.on("msg1-reply", (event, arg) => {
    //   console.log(arg); // prints "pong"
    // });
  });

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
        {/* Tab */}
        <div class="w-full h-8 bg-[#1B1D22] flex flex-row items-center justify-between">
          <div
            class="w-1/2 whitespace-nowrap overflow-x-hidden"
            ref={setContainerRef}
          >
            <button
              class="btn btn-xs"
              onclick={() => {
                setIsEditor(false);
              }}
            >
              conversation1
            </button>{" "}
            <button
              class="btn btn-xs"
              onclick={() => {
                setIsEditor(false);
              }}
            >
              conversation1
            </button>
            <button
              class="btn btn-xs"
              onclick={() => {
                setIsEditor(false);
              }}
            >
              conversation1
            </button>
            <button
              class="btn btn-xs"
              onclick={() => {
                setIsEditor(false);
              }}
            >
              conversation1
            </button>
            <button
              class="btn btn-xs"
              onclick={() => {
                setIsEditor(false);
              }}
            >
              conversation1
            </button>
            <button
              class="btn btn-xs"
              onclick={() => {
                setIsEditor(false);
              }}
            >
              conversation1
            </button>
            <button
              class="btn btn-xs"
              onclick={() => {
                setIsEditor(false);
              }}
            >
              conversation1
            </button>
            <button
              class="btn btn-xs"
              onclick={() => {
                setIsEditor(false);
              }}
            >
              conversation1
            </button>
            <button
              class="btn btn-xs"
              onclick={() => {
                setIsEditor(false);
              }}
            >
              conversation1
            </button>
            <button
              class="btn btn-xs"
              onclick={() => {
                setIsEditor(false);
              }}
            >
              conversation1
            </button>
            <button
              class="btn btn-xs"
              onclick={() => {
                setIsEditor(false);
              }}
            >
              conversation1
            </button>
            <button
              class="btn btn-xs"
              onclick={() => {
                setIsEditor(false);
              }}
            >
              conversation1
            </button>
            <button
              class="btn btn-xs"
              onclick={() => {
                setIsEditor(false);
              }}
            >
              conversation1
            </button>
          </div>
          <button
            class="btn btn-xs"
            onclick={() => {
              // setIsEditor(true);
              window.electron.ipcRenderer.send("msg1", "ping1");
            }}
          >
            editor
          </button>
        </div>
        {isEditor() ? (
          <EditorPage></EditorPage>
        ) : (
          <ConversationPage></ConversationPage>
        )}
      </div>

      <div class="w-[256px] bg-gray-200">
        <FilesTreeComponent></FilesTreeComponent>
      </div>
    </div>
  );
}

function MainMenu(): JSX.Element {
  return (
    <ul class="menu bg-base-200 rounded-box">
      <li>
        <a
          class="tooltip tooltip-right flex items-center justify-center"
          data-tip="Histroy Chat"
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

export default HomePage;
