import { useEffect, useMemo, useState } from "react";
import {
  useMaterialReactTable,
  type MRT_ColumnDef,
  MaterialReactTable,
  MRT_PaginationState,
} from "material-react-table";
import { MRT_Localization_HE } from "material-react-table/locales/he";
//example data type
type Plan = {
  PL_NUMBER: string;
  PL_NAME: string;
  plan_display_name: string;
  status: string;
  distance: number;
  tags: string;
  updated_at: string;
  data: {
    PL_DATE_8: string;
    LAST_UPDATE: string;
  };
};

interface Props {
  point: string;
}
function Example({ point }: Props) {
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<Plan>[]>(
    () => [
      {
        accessorKey: "PL_NUMBER", //access nested data with dot notation
        header: "מספר תוכנית",
        enableSorting: false,
      },
      {
        accessorKey: "plan_display_name",
        header: "שם התוכנית",
        enableSorting: false,
      },
      {
        accessorKey: "status", //normal accessorKey
        header: "סטטוס",
        filterVariant: "multi-select",
        enableSorting: false,
      },
      {
        accessorKey: "distance",
        header: "מרחק מנקודה",
        filterVariant: "range-slider",
        Cell: ({ cell }) => Math.round(cell.getValue<number>()) + " מטרים",
        muiFilterSliderProps: {
          marks: true,
          valueLabelFormat: (value) => value + " מטרים",
        },
      },
      {
        header: "עדכון",
        accessorFn: (originalRow) =>
          originalRow?.data?.PL_DATE_8
            ? new Date(originalRow.data.PL_DATE_8)
            : null,
        Cell: ({ cell }) =>
          cell.getValue<Date>()
            ? cell.getValue<Date>().toLocaleDateString()
            : null,
        filterVariant: "date-range",
      },
    ],
    []
  );
  const [data, setData] = useState<Plan[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState(0);

  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });
  useEffect(() => {
    const fetchData = async () => {
      if (!data.length) {
        setIsLoading(true);
      } else {
        setIsRefetching(true);
      }

      const url = new URL("/api/plan/", "https://api.meirim.org/");
      url.searchParams.set("page", `${pagination.pageIndex + 1}`);
      url.searchParams.set("distancePoint", point);

      try {
        const response = await fetch(url.href);
        const json = await response.json();
        const d = json["data"] as Plan[];

        setData(d);
        setRowCount(json["pagination"]["rowCount"]);
      } catch (error) {
        setIsError(true);
        console.error(error);
        return;
      }
      setIsError(false);
      setIsLoading(false);
      setIsRefetching(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    pagination.pageIndex, //re-fetch when page index changes
    pagination.pageSize, //re-fetch when page size changes
    point,
  ]);
  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    columnResizeDirection: "rtl",
    enableColumnResizing: false,
    layoutMode: "grid",
    enableFacetedValues: true,
    enableDensityToggle: false,
    initialState: { showColumnFilters: true, density: "comfortable" },
    manualPagination: true, //turn off built-in client-side pagination
    localization: MRT_Localization_HE,
    muiToolbarAlertBannerProps: isError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    onPaginationChange: setPagination,
    // columnFilterDisplayMode: "popover",
    rowCount,
    state: {
      isLoading,
      pagination,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
    },
    paginationDisplayMode: "pages",
  });

  return (
    <div>
      <MaterialReactTable table={table} />
    </div>
  );
}

export default Example;
