
import { StateCreator } from 'zustand';
import { BuilderState, ProjectSlice } from './types';
import { db } from '../../../utils/db';
import { useToastStore } from '../../../stores/toastStore';

export const createProjectSlice: StateCreator<BuilderState, [], [], ProjectSlice> = (set, get) => ({
  savedProjects: [],

  refreshProjects: async () => {
    try {
      const projects = await db.projects.orderBy('updatedAt').reverse().toArray();
      set({ savedProjects: projects });
    } catch (e) {
      console.error('Failed to load projects', e);
    }
  },

  saveCurrentProject: async (name: string) => {
    const { nodes, rootNodeId } = get();
    try {
      await db.projects.add({
        name,
        nodes: JSON.parse(JSON.stringify(nodes)), // Deep copy to ensure serializable
        rootId: rootNodeId,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      await get().refreshProjects();
      useToastStore.getState().addToast({ message: `Project "${name}" saved!`, type: 'success' });
    } catch (e) {
      console.error('Failed to save project', e);
      useToastStore.getState().addToast({ message: 'Failed to save project', type: 'error' });
    }
  },

  deleteProject: async (id: number) => {
    try {
      await db.projects.delete(id);
      await get().refreshProjects();
      useToastStore.getState().addToast({ message: 'Project deleted', type: 'info' });
    } catch (e) {
      console.error('Failed to delete project', e);
    }
  },

  loadProjectFromDB: async (id: number) => {
    try {
      const project = await db.projects.get(id);
      if (project) {
        get().loadProject(project.nodes, project.rootId);
        useToastStore.getState().addToast({ message: `Loaded "${project.name}"`, type: 'success' });
      }
    } catch (e) {
      console.error('Failed to load project', e);
      useToastStore.getState().addToast({ message: 'Failed to load project', type: 'error' });
    }
  }
});
