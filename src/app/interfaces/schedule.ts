import { Document } from 'mongoose';

export interface ScheduleDocument extends Document {
  userId: string;
  day: string;
  subjects: Subject[];
}

export interface Subject {
  subjectId: string;
  subjectName: string;
  subjectIcon?: string;
  subjectColor?: string;
  location?: string;
  locationIcon?: string;
  locationColor?: string;
  start: string;
  end: string;
  timeIcon?: string;
  timeColor?: string;
  reminders: string[];
}
