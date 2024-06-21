import { Header } from "../Header";
import { Footer } from "../Footer";
import { Link, Outlet } from "react-router-dom";
import { AssistanceAside } from "../AssistanceAside";
import AssistantContent from "../AssistantContent";

export function Assistance() {
  return (
    <main className="min-h-screen  flex flex-col">
      <Header />
      <main className="pt-20 flex flex-grow relative  ">
        <AssistanceAside />
        <section className="w-auto flex-grow">
          <Outlet />
        </section>
      </main>
      <Footer />
    </main>
  );
}
