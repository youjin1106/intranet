type ProfileImageProps = {
  size?: string;
  isOnline?: boolean;
};

export const ProfileImage = ({ size, isOnline }: ProfileImageProps) => {
  return (
    <div className="relative w-fit">
      <div
        className={` rounded-[999px] overflow-hidden aspect-square ${
          size === "lg" ? "w-[116px]" : "w-[50px]"
        }`}
      >
        <img
          className="size-full object-cover"
          src="https://hackspirit.com/wp-content/uploads/2021/06/Copy-of-Rustic-Female-Teen-Magazine-Cover.jpg"
          alt="profile"
        />
      </div>
      <div
        className={`border border-solid border-white rounded-[999px] overflow-hidden aspect-square absolute  right-0 ${
          size === "lg"
            ? "w-[24px] border-[4px] bottom-1.5"
            : "w-[14px] border-[2px] bottom-0"
        } ${isOnline ? "bg-primary" : "bg-[#ccc]"}`}
      ></div>
    </div>
  );
};
