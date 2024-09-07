const InformationText: React.FC<{title: string, content: string}> = ({title,content}) => {
    return (
        <div className="w-full">
              <p className="text-xl font-medium text-blue-600">{title}</p>
              <p className="text-md font-medium text-gray-500">{content || "Undefined"}</p>
        </div>
    )
}

export default InformationText