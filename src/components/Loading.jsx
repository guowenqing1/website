import "./sections/loader.css";
export function Loading() {
  return (
    <span className="fixed flex justify-center items-center z-[70] top-0 left-0 w-full h-full bg-slate-700 opacity-70">
      <div className="loader"></div>
    </span>
  );
}
