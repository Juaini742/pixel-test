import { createContext, useContext, useState } from "react";

interface PopVisibleContextType {
  popVisible: { [key: string]: boolean };
  setPopVisible: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >;
  resetPopVisible: () => void;
}

const PopVisibleContext = createContext<PopVisibleContextType | undefined>(
  undefined
);

export const PopVisibleProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [popVisible, setPopVisible] = useState<{ [key: string]: boolean }>({});

  const resetPopVisible = () => {
    setPopVisible({});
  };

  return (
    <PopVisibleContext.Provider
      value={{ popVisible, setPopVisible, resetPopVisible }}
    >
      {children}
    </PopVisibleContext.Provider>
  );
};

export const usePopVisible = () => {
  const context = useContext(PopVisibleContext);
  if (context === undefined) {
    throw new Error("usePopVisible must be used within a bool");
  }
  return context;
};
