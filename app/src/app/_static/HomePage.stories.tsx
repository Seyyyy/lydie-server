import { HomePage } from "./HomePage";
import { useStore } from "@/app/_models/store/useStore";
import { useImage } from "@/app/_models/image/useImage";

const Template = () => {
  return (
    <div className="w-full h-[800px]">
      <HomePage useImage={useImage} useStore={useStore} />
    </div>
  );
};

export default {
  title: "Page/HomePage",
  component: HomePage,
};

export const Prototype = () => <Template />;
