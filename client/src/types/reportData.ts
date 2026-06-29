export type ReportData = {
  reported_bug_description?: string;
  reported_event_description?: string;
  reported_user_description?: string;

  reported_bug_date?: string;
  reported_event_date?: string;
  reported_user_date?: string;

  images?: string[];

  reported_bug_is_done?: number;
  reported_event_is_done?: number;
  reported_user_is_done?: number;

  user_username?: string;
  user_mail?: string;
  user_profile_picture?: string;

  author_username?: string;
  author_mail?: string;
  author_picture?: string;
  target_username?: string;
  target_picture?: string;
};
