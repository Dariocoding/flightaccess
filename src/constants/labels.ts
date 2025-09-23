import { FeedbackCategory, Role } from /*   WebhookTrigger */ '@prisma/client';

export const roleLabels: Record<Role, string> = {
  [Role.MEMBER]: 'Miembro',
  [Role.ADMIN]: 'Administrador'
};

export const feedbackCategoryLabels: Record<FeedbackCategory, string> = {
  [FeedbackCategory.SUGGESTION]: 'Sugerencia',
  [FeedbackCategory.PROBLEM]: 'Problema',
  [FeedbackCategory.QUESTION]: 'Question'
};

export const webhookTriggerLabels: Record<string, string> = {};
