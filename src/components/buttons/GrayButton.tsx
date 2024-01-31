type GrayButtonProps = {
  label:string
}

const GrayButton:React.FC<GrayButtonProps> = ({label}) => {
  return (
    <button className="text-gray01 text-mdBold px-4 py-1 bg-[#E4E4E4] hover:bg-[#CECACA] hover:text-gray00 rounded inline-flex">{label}</button>
  )  
}

export default GrayButton