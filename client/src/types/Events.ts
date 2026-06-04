export interface CardEventsProps {
  image: string;
  imageAlt: string;
  date: string;
  title: string;
  description: string;
  location: string;
}

export interface ButtonAddEventProps {
  onClick: () => void;
}

export interface ModalAddEventProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface CreateFormProps {
  onClose: () => void;
}

export interface JoinFormProps {
  onClose: () => void;
}

export type FilterType = "all" | "ongoing" | "finished";

export interface FilterProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}
