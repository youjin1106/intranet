type PrimaryButtonProps = {
  label:string
  size:string
}

const PrimaryButton:React.FC<PrimaryButtonProps> = ({label, size}) => {
  if(size === "md"){
    return (
      <button className="w-[83px]">{label}</button>
    )
  }else if(size === "lg"){
    return (
      <button className="w-[120px]">{label}</button>
    )
  }
  
}

export default PrimaryButton