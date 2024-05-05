import { HomePage } from "./HomePage";

const Template = () => {
  return (
    <div className="w-full h-[800px]">
      <HomePage />
    </div>
  );
};

export default {
  title: "Page/HomePage",
  component: HomePage,
};

export const Prototype = () => <Template />;
