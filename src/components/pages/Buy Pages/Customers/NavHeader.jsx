import { NavLink } from "react-router-dom";

export default function NavHeader() {
  return (
    <div className="fixed top-20 w-screen  bg-white shadow-md z-10 -translate-x-1/2 left-1/2">
      <nav className="grid grid-cols-2 max-w-[1420px] gap-2 mx-auto rounded-b-sm">
        <ul className="flex justify-between p-2 items-center">
          <ol className="flex gap-4">
            <li className="p-2 ">
              <NavLink
                to="/panel"
                className={({ isActive }) => [
                  isActive
                    ? "font-bold flex border-b-2 border-blue-950"
                    : " font-medium flex ",
                ]}
              >
                报价
              </NavLink>
            </li>
            <li className="p-2 ">
              <NavLink
                to="/panel/my-orders"
                className={({ isActive }) => [
                  isActive
                    ? "font-bold flex border-b-2 border-blue-950"
                    : " font-medium flex ",
                ]}
              >
                我的订单
              </NavLink>
            </li>
          </ol>
        </ul>

        <ul className="flex justify-end p-2 items-center">
          <ol className="flex gap-4">
            <li className="p-2  border-blue-950">
              <NavLink className="font-semibold">上传图纸</NavLink>
            </li>
            <li className="p-2  border-blue-950">
              <NavLink className="font-semibold">选择工艺</NavLink>
            </li>
            <li className="p-2  border-blue-950">
              <NavLink className="font-semibold">确认订单</NavLink>
            </li>
          </ol>
        </ul>
      </nav>
    </div>
  );
}
