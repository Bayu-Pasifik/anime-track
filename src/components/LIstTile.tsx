interface ListTileProps {
  leading?: JSX.Element;
  title?: JSX.Element;
  subtitle?: JSX.Element;
  trailing?: JSX.Element;
}

const ListTile: React.FC<ListTileProps> = ({
  leading,
  title,
  subtitle,
  trailing,
}) => {
  return (
    <div className="flex flex-row items-center justify-between bg-slate-800 h-auto w-full rounded-lg  shadow-lg">
      {leading && <div className="mr-4 flex-shrink-0">{leading}</div>}
      <div className="flex flex-col flex-grow space-y-1 text-white">
        {title && (
          <div className="text-sm  text-white">{title}</div>
        )}
        {subtitle && <div className="text-sm text-white">{subtitle}</div>}
      </div>
      {trailing && (
        <div className="ml-4 flex flex-row items-center space-x-4 text-white">
          {trailing}
        </div>
      )}
    </div>
  );
};

export default ListTile;
