import { HomePage } from "@/app/_static/HomePage";
import { useImage } from "./_models/image/useImage";

export default function Home() {
  return <HomePage useImage={useImage} />;
}
