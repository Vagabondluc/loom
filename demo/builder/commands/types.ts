
import React from 'react';

export interface CommandAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  shortcut?: string;
  perform: () => void;
  keywords?: string[];
  section?: string;
}
