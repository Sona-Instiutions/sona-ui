/**
 * Industry Collaboration Lead form data
 */
export interface IIndustryCollaborationFormData {
  companyName: string;
  industry: string;
  companySize: string;
  website: string;
  companyDescription: string;

  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;

  collaborationTypes: string[];
  timeline: string;
  budgetRange: string;

  projectDescription: string;
  skills: string;
  successMetrics: string;
  additionalRequirements: string;
}
