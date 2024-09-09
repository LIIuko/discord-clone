import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "../../../components/providers/mode-toggle";

export default function Home() {
  return (
    <div>
      <UserButton afterSwitchSessionUrl="/"/>
      <ModeToggle/>
    </div>
  );
}
