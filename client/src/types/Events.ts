export interface EventData {
  event_id: number;
  event_name: string;
  event_date_start: string;
  event_date_end: string;
  event_host_id: number | null;
  event_picture: string;
  event_description: string;
  event_location: string;
  event_link_key: string;
}

export interface CardEventsProps {
  event_id: number;
  event_host_id: number | null;
  image: string;
  imageAlt: string;
  dateStart: string;
  dateEnd: string;
  title: string;
  description: string;
  location: string;
  onEventDeleted?: (deletedId: number) => void;
  reservation_id_user?: number | null; 
  onEditReservation?: (reservationId: number) => void;
  onReservationDeleted?: (deletedId: number) => void;
}

export interface ButtonAddEventProps {
  onClick: () => void;
}

export interface ModalAddEventProps {
  isOpen: boolean;
  onClose: () => void;
  onEventCreated: (event: EventData) => void;
}

export interface CreateFormProps {
  onClose: () => void;
  onEventCreated: (event: EventData) => void;
}

export interface JoinFormProps {
  onClose: () => void;
  onEventCreated: (event: EventData) => void;
}

export type FilterType = "all" | "ongoing" | "finished";

export interface FilterProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export interface ModalEditEventProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventData;
  onEventUpdated: (updatedEvent: EventData) => void;
}
