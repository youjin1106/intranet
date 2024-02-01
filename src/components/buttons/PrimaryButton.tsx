type PrimaryButtonProps = {
  label: string;
  size: string;
  onClick?: () => void;
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  size,
  onClick,
}) => {
  if (size === "md") {
    return (
      <button
        className="text-white text-mdBold px-4 py-1 bg-primary hover:bg-primaryDark rounded inline-flex"
        onClick={onClick}
      >
        {label}
      </button>
    );
  } else if (size === "lg") {
    return (
      <button
        className="w-full text-white text-mdBold px-4 py-3 bg-primary hover:bg-primaryDark rounded-button inline-flex justify-center"
        onClick={onClick}
      >
        {label}
      </button>
    );
  }
};

export default PrimaryButton;
