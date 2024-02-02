type IconButtonProps = {
  iconName: string;
  onClick?: () => void;
};

const IconButton: React.FC<IconButtonProps> = ({ iconName, onClick }) => {
  return (
    <button className="p-1.5 h-8 rounded group hover:bg-[#E4E4E4]">
      <span
        className="material-symbols-outlined text-lg leading-5 text-gray01 inline-flex"
        onClick={onClick}
      >
        {iconName}
      </span>
    </button>
  );
};

export default IconButton;
