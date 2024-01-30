type GrayButtonProps = {
  label:string
}

const GrayButton:React.FC<GrayButtonProps> = ({label}) => {
  return (
    <button>{label}</button>
  )  
}

export default GrayButton