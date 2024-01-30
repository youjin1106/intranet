type IconButtonProps = {
  iconName:string
}

const IconButton:React.FC<IconButtonProps> = ({iconName}) => {
  return (
    <button>
      <span className="material-symbols-outlined">{iconName}</span>
    </button>
  )
}

export default IconButton