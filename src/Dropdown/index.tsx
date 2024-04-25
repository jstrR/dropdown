import { createContext, useContext, useRef, useState } from "react";
import { createPortal } from "react-dom";

const DropdownContext = createContext<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  triggerRef: React.RefObject<HTMLButtonElement> | null;
}>({
  isOpen: false,
  triggerRef: null,
  setIsOpen: () => {},
});

export const Dropdown = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen, triggerRef }}>
      <div
        className="relative"
        role="presentation"
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

export const DropdownTrigger = ({
  className,
  children,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  const { isOpen, setIsOpen, triggerRef } = useContext(DropdownContext);
  const handleClick = () => {
    setIsOpen(!isOpen);
    onClick && onClick();
  };

  return (
    <button
      className={className}
      aria-expanded={isOpen}
      aria-controls="dropdown-menu"
      aria-haspopup="menu"
      data-state={isOpen ? "open" : "closed"}
      onClick={handleClick}
      ref={triggerRef}
    >
      {children}
    </button>
  );
};

export const DropdownMenu = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { isOpen, triggerRef } = useContext(DropdownContext);

  if (!isOpen) return null;

  const getOriginBounds = () => {
    if (!triggerRef?.current) return { top: 0, left: 0 };

    const origin = triggerRef?.current as HTMLElement;
    const originBounds = origin.getBoundingClientRect();
    return {
      top: originBounds.top + originBounds.height,
      left: originBounds.left,
    };
  };

  const { top, left } = getOriginBounds();

  return createPortal(
    <div
      id="dropdown-menu"
      className="absolute"
      style={{ top, left }}
    >
      <div
        className={`bg-white border border-gray-200 rounded-lg shadow-md ${
          className || ""
        }`}
        role="menu"
        data-state={isOpen ? "open" : "closed"}
        aria-orientation="vertical"
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export const DropdownItem = ({ children }: { children: React.ReactNode }) => {
  const { setIsOpen } = useContext(DropdownContext);
  return (
    <button
      className="block w-full px-4 py-2 text-left text-gray-900 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
      role="menuitem"
      onClick={() => setIsOpen(false)}
    >
      {children}
    </button>
  );
};
