import Dexie, { Table } from 'dexie';
import { BuilderNode } from '../types';

export interface Project {
  id?: number;
  name: string;
  nodes: Record<string, BuilderNode>;
  rootId: string;
  thumbnail?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class ProjectDatabase extends Dexie {
  projects!: Table<Project>;

  constructor() {
    super('LoomDB');
    (this as any).version(1).stores({
      projects: '++id, name, createdAt, updatedAt'
    });
  }
}

export const db = new ProjectDatabase();