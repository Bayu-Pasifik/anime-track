import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa"; // Menggunakan ikon eksternal

interface ExternalLink {
  name: string;
  url: string;
}

interface ExternalLinksProps {
  externals: ExternalLink[];
}

const ExternalLinks: React.FC<ExternalLinksProps> = ({ externals }) => {
  if (!externals || externals.length === 0) {
    return <p className="text-white">No external links available.</p>;
  }

  return (
    <div className="space-y-4">
      {externals.map((external, index) => (
        <div
          key={index}
          className="flex items-center space-x-2 bg-gray-800 p-3 rounded-md hover:bg-gray-700 transition duration-300"
        >
          {/* Ikon eksternal */}
          <FaExternalLinkAlt className="text-blue-500" />

          {/* Tautan eksternal */}
          <a
            href={external.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-semibold text-blue-400 hover:text-blue-300 hover:underline transition duration-300"
          >
            {external.name}
          </a>
        </div>
      ))}
    </div>
  );
};

export default ExternalLinks;
