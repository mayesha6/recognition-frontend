export interface RecipientUser {
  id: string;
  name: string;
  email: string;
  departmentId: string;
  departmentName: string;
  points: number; // e.g., 50, 100, etc.
}
export interface SenderUser {
  id: string;
  name: string;
  email: string;
  departmentId: string;
  departmentName: string;
  points: number; // e.g., 50, 100, etc.
  tone: string; // e.g., "Appreciative", "Encouraging", etc.
  recognitionValue: number; // e.g., 10, 20, etc.
  category: string; // e.g., "Teamwork", "Innovation", etc.
  message: string; // The message content of the recognition
}