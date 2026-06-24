export type ReportBug = {
  reported_bug_id: number;
  reported_bug_by_id_user: number;
  reported_bug_description: string;
  reported_bug_date: string;
  reported_bug_image: string | null;
  reported_bug_is_done: 0 | 1;
  username: string;
  email: string;
};

export type ReportUser = {
  reported_user_id: number;
  reported_user_id_user: number;
  reported_user_by_id_user: number;
  reported_user_description: string;
  reported_user_date: string;
  reported_user_image: string | null;
  reported_user_is_done: 0 | 1;
  username: string;
  email: string;
};

export type ReportEvent = {
  reported_event_id: number;
  reported_event_id_event: number;
  reported_event_by_id_user: number;
  reported_event_description: string;
  reported_event_date: string;
  reported_event_image: string | null;
  reported_event_is_done: 0 | 1;
  username: string;
  email: string;
};

export type UnifiedReport = {
  id: number;
  type: "bug" | "user" | "event";
  username: string; // nécessite un JOIN côté backend
  email: string;
  date: string;
  is_done: 0 | 1;
};

export type ReportPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};
