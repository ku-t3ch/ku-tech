import clsx from "clsx";
import { FC, ReactNode } from "react";

interface Props {
  className?: string;
  colorStyled?: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: ReactNode;
}

const Button: FC<Props> = ({
  className,
  colorStyled = "",
  onClick,
  disabled,
  children,
}) => {
  return (
    <button
      className={clsx(
        "flex h-[2rem] w-auto items-center justify-center rounded-[1rem]",
        className,
        colorStyled.length > 0
          ? colorStyled
          : "bg-[#0ab0ee] px-[1.2rem] hover:bg-[#0994c7] disabled:bg-[#06688b] disabled:text-gray-400"
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
