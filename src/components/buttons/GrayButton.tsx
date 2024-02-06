type GrayButtonProps = {
  label: string;
  onClick?: () => void;
};

const GrayButton: React.FC<GrayButtonProps> = ({ label, onClick }) => {
  return (
    <button
      className="flex justify-center text-gray01 text-mdBold px-4 py-1 bg-[#E4E4E4] hover:bg-[#CECACA] hover:text-gray00 rounded inline-flex"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default GrayButton;
