import { HomePage } from "./_static/HomePage";
import { useImage } from "@/app/_models/image/useImage";

export default function Home() {
  return <HomePage useImage={useImage} />;
}
