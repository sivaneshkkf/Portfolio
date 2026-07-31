import type { ReactNode } from "react";

export interface FeatureItem {
  icon: ReactNode;
  label: string;
}

export interface StatItem {
  icon: ReactNode;
  label: string;
}

export interface ProjectCardProps {
  name: string;
  subtitle?: string;
  description: string;
  image: string;
  video?: string;
  category?: string;
  techs: string[];
  features?: FeatureItem[];
  liveUrl?: string;
  githubUrl?: string;
  delay?: number;
}
