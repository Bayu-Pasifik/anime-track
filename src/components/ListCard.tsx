interface ListCardProps {
  image: string,
  title: string,
  description?: string
}
const ListCard: React.FC<ListCardProps> = ({ image, title, description }) => {
  return (
    <div className="p-4 h-72 w-48">
      <img src={image} alt={title} className="h-52 w-40 rounded-lg object-cover"/>
      <h2 className="text-lg font-bold text-white">{title}</h2>
      <p className="text-sm text-white">{description}</p>
    </div>
  )
}

export default ListCard