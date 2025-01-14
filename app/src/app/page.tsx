import { HomePage } from "./_static/HomePage";
import { useImage } from "@/app/_models/image/useImage";
import { useStore } from "@/app/_models/store/useStore";

export default function Home() {
  return <HomePage useImage={useImage} useStore={useStore} />;
}
