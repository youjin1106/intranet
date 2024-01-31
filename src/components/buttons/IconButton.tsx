type IconButtonProps = {
  iconName:string
}

const IconButton:React.FC<IconButtonProps> = ({iconName}) => {
  return (
    <button className="p-1.5 h-8 rounded group hover:bg-[#E4E4E4]">
      <span className="material-symbols-outlined text-lg leading-5 text-gray01 inline-flex">{iconName}</span>
    </button>
  )
}

export default IconButton