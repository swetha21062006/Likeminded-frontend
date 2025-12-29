export const USER_TYPES = {
  STUDENT: "student",
  VENDOR: "vendor",
};

export const PROBLEM_STATUS = {
  OPEN: "open",
  IN_REVIEW: "in_review",
  CLOSED: "closed",
};

export const SOLUTION_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
};

export const PROBLEM_DIFFICULTY = {
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard",
};

export const PROBLEM_CATEGORIES = [
  "Marketing",
  "Web Design",
  "App Development",
  "Graphic Design",
  "Business Strategy",
  "Content Writing",
  "Data Analysis",
  "Other",
];

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
  },
  PROBLEMS: "/problems",
  SOLUTIONS: "/solutions",
  USERS: "/users",
  TEAMS: "/teams",
};

export const ROUTES = {
  LANDING: "/",
  USER_LOGIN: "/login/student",
  VENDOR_LOGIN: "/login/vendor",
  USER_DASHBOARD: "/dashboard/student",
  VENDOR_DASHBOARD: "/dashboard/vendor",
  PROBLEM_LIST: "/problems",
  TEAM: "/team",
  SUBMISSION: "/submission",
  POST_PROBLEM: "/post-problem",
  REVIEW_SOLUTIONS: "/review-solutions",
  PAYMENT_FEEDBACK: "/payment-feedback",
};
