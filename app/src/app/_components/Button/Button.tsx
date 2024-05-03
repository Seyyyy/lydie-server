interface ButtonProps {
  /**
   * Button contents
   */
  label: string;
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({ label, ...props }: ButtonProps) => {
  return (
    <button
      type="button"
      className={`bg-blue-500 text-white font-bold py-2 px-4 rounded text-size`}
      {...props}
    >
      {label}
    </button>
  );
};

export const temp = () => {
  return "success";
};
