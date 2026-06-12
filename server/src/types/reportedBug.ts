type RepBug = {
  reported_bug_id: number;
  reported_bug_description: string;
  reported_bug_image: string;
  reported_bug_by_id_user: number;
  reported_bug_date: string | null;
  reported_bug_is_done: boolean;
};
export default RepBug;
