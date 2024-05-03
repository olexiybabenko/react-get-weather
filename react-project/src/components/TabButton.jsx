// TabButton component
export default function TabButton({ text, isSelected, onClick }) {
  // JSX Output
  return (
    <button
      onClick={onClick}
      className={
        isSelected
          ? "border-b-2 border-blue-500  py-1 px-2 text-sm md:text-base "
          : "hover:bg-blue-100 py-1 px-2 text-sm md:text-base "
      }
    >
      {text}
    </button>
  );
}
