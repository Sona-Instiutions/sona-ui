/**
 * Comment Types
 *
 * Type definitions for Event Comments.
 * Follows ADR 005 naming conventions.
 */

import { IPaginationMeta } from "./common.types";

/** Comment status enumeration */
export enum ECommentStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  SPAM = "spam",
}

/** Comment structure from API */
export interface IEventComment {
  id: number;
  documentId: string;
  authorName: string;
  authorEmail: string; // Usually not exposed in public list, but good to have in type
  content: string;
  status: ECommentStatus;
  createdAt: string; // ISO string
  updatedAt: string;
  publishedAt: string;
  likes?: number;
  replies?: IEventComment[];
}

/** Payload for submitting a new comment */
export interface ICommentSubmission {
  event: number | string; // ID or Document ID of the event
  authorName: string;
  authorEmail: string;
  content: string;
  parentComment?: number | string | null; // ID of parent comment for replies
}

/** API Response for comments list */
export interface IEventCommentsResponse {
  data: IEventComment[];
  meta: IPaginationMeta;
}

/** API Response for single comment (submission result) */
export interface IEventCommentResponse {
  data: IEventComment;
  meta: Record<string, unknown>;
}
