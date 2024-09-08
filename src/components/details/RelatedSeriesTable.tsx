import React from "react";
import { AnimeDetail } from "../../config/data";

interface RelatedSeriesTableProps {
  relations: AnimeDetail["relations"];
}

const RelatedSeriesTable: React.FC<RelatedSeriesTableProps> = ({ relations }) => (
  <div className="text-white">
    <table className="table-auto w-full border-collapse border border-gray-800 text-center">
      <thead>
        <tr>
          <th className="border border-gray-600 px-4 py-2">Relation</th>
          <th className="border border-gray-600 px-4 py-2">Type</th>
          <th className="border border-gray-600 px-4 py-2">Name</th>
        </tr>
      </thead>
      <tbody>
        {relations.map((relation, relationIndex) => (
          <React.Fragment key={relationIndex}>
            {relation.entry.map((entry, entryIndex) => (
              <tr key={entry.mal_id}>
                {entryIndex === 0 && (
                  <td
                    rowSpan={relation.entry.length}
                    className="border border-gray-600 px-4 py-2 align-top"
                  >
                    {relation.relation}
                  </td>
                )}
                <td className="border border-gray-600 px-4 py-2">{entry.type}</td>
                <td className="border border-gray-600 px-4 py-2">
                  <a
                    href={entry.type === "manga" ? `/manga/detail/${entry.mal_id}` : `/anime/detail/${entry.mal_id}`}
                    className="text-blue-400 hover:underline"
                  >
                    {entry.name}
                  </a>
                </td>
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  </div>
);

export default RelatedSeriesTable;
