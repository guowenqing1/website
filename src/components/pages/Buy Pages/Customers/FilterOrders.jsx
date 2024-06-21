import { NavLink } from "react-router-dom";
import { useFilter } from "../../../../Hooks/useFilter";

export default function FilterOrders() {
  const { setFilter, filter } = useFilter();
  const handleFilter = (e, word) => {
    e.preventDefault();
    setFilter({ subStatus: word });
  };
  const status = [
    {
      name: "   所有",
      status: "all",
    },
    {
      name: "    已支付",
      status: "paid",
    },
    {
      name: "   生产中",
      status: "In production",
    },
    {
      name: "   已发货",
      status: "delivered",
    },
    {
      name: "   已收到",
      status: "Received",
    },
  ];
  return (
    <ul className="flex w-full max-w-[950px] p-4 gap-4 bg-inherit sticky top-32">
      {status.map((item) => (
        <li
          key={item.name}
          className={
            item.status == filter.subStatus
              ? "font-bold text-black border-b-2 border-black  "
              : " hover:text-black text-zinc-500"
          }
        >
          <NavLink
            to={`#${item.name}`}
            className={
              item.status == filter.subStatus
                ? "font-bold text-black border-b-2 p-1  "
                : " hover:text-black text-zinc-500 p-1"
            }
            onClick={(e) => handleFilter(e, item.status)}
          >
            {item.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
