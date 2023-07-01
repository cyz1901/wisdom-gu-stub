import Dialog from "../components/Dialog";
import { JSX } from "solid-js";

function Home(): JSX.Element {
  return (
    <div class="flex flex-row h-screen">
      <div class="w-[96px] bg-gray-200"></div>
      <div class="flex flex-col w-full">
        <div class="bg-gray-300 h-full flex flex-col">
          <Dialog name="me" content="aaaa"></Dialog>
          <Dialog name="hh" content="aaaa"></Dialog>
        </div>
        <div class="bg-gray-100 h-[100px] flex items-center w-full">
          <input
            type="text"
            placeholder="Type here"
            class="input w-full mx-4"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
