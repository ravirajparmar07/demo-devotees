import React from "react";
import View from "@/assets/svg/View";
import AIEdit from "@/assets/svg/AIEdit";
import AIDelete from "@/assets/svg/AIDelete";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ReusableTable = ({
  columns,
  rows,
  onViewClick,
  onEditClick,
  onDeleteClick,
  buttonConfig,
  isLoading,
}) => {
  console.log("rows = ", rows);

  return (
    <div className="overflow-x-auto max-xs:w-[400px]">
      <div className="bg-white pt-5 overflow-x-auto rounded shadow-md">
        <table className="table-auto w-full border border-gray-300">
          <thead className="bg-customGray">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="text-left py-4 px-4 border-b border-gray-300"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                {columns.map((_, index) => (
                  <td
                    key={index}
                    className="py-4 px-4 border-b border-gray-300 whitespace-nowrap"
                  >
                    <Skeleton width="100%" height={20} />
                  </td>
                ))}
              </tr>
            ) : (
              rows?.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className={`py-4 px-4 border-b border-gray-300 whitespace-normal break ${columns[colIndex].width}`}
                    >
                      {column.field === "status" ? (
                        <span
                          className={`px-2 py-1 rounded text-sm font-medium ${
                            row.status
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {row.status ? "ACTIVE" : "OFFLINE"}
                        </span>
                      ) : column.field === "action" ? (
                        <div className="flex gap-2.5">
                          {buttonConfig.view && (
                            <button onClick={() => onViewClick(row)}>
                              <View />
                            </button>
                          )}
                          {buttonConfig.edit && (
                            <button onClick={() => onEditClick(row)}>
                              <AIEdit />
                            </button>
                          )}
                          {buttonConfig.delete && (
                            <button onClick={() => onDeleteClick(row)}>
                              <AIDelete />
                            </button>
                          )}
                        </div>
                      ) : (
                        row[column.field]
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReusableTable;
