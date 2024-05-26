const Navbar : React.FC = () => {
    return (
        <div className="navbar h-20 w-full bg-slate-900 flex flex-row p-4">
          <h2 className=" w-2/12 text-2xl flex justify-center items-center  text-white">Anime Track</h2>
          <div className="flex flex-row w-9/12 justify-around items-center">
          <p className="text-2xl text-white ml-12">Home</p>
          <p className="text-2xl text-white ml-6">🎞</p>
          <p className="text-2xl text-white ml-6">🎬</p>
          <p className="text-2xl text-white ml-6">🎭</p>
          </div>
          <div className="  fle w-1/12 rounded-lg justify-center items-center">Search</div>
        </div>
    )
}

export default Navbar;