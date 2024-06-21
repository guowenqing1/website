import { useContext } from "react";
import { FiltersContext } from "../Context/FilterContext";

export function useFilter() {
  const context = useContext(FiltersContext);
  console.log(context);
  const { filter, setFilter } = useContext(FiltersContext);

  const filterQuotes = (mappedQuotes) => {
    return mappedQuotes?.filter((quote) => {
      return (
        quote?.sub_status === filter.subStatus || filter.subStatus == "all"
      );
    });
  };

  return { filter, filterQuotes, setFilter };
}
