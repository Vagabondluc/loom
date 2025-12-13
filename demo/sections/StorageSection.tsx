import React, { useEffect } from 'react';
import { Card, CardTitle, Button, CodeLabel } from '../../ui';
import { useBuilderStore } from '../builder/store';
import { Save, Trash2, FolderOpen, Database } from 'lucide-react';

export const StorageSection: React.FC = () => {
  const savedProjects = useBuilderStore(s => s.savedProjects);
  const refreshProjects = useBuilderStore(s => s.refreshProjects);
  const deleteProject = useBuilderStore(s => s.deleteProject);
  const loadProjectFromDB = useBuilderStore(s => s.loadProjectFromDB);
  const saveCurrentProject = useBuilderStore(s => s.saveCurrentProject);

  useEffect(() => {
    refreshProjects();
  }, []);

  const handleSaveDemo = () => {
    saveCurrentProject(`Snapshot ${new Date().toLocaleTimeString()}`);
  };

  return (
    <section id="storage" className="space-y-6 scroll-mt-24">
      <div className="prose max-w-none">
        <h2 className="text-3xl font-bold border-b pb-2">Persistence (Dexie.js)</h2>
        <p className="text-base-content/70">
          This section demonstrates <strong>IndexedDB</strong> integration using Dexie.js. 
          Projects saved here are persistent across browser refreshes and sessions.
        </p>
      </div>

      <Card bordered>
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-primary" />
            <span>Local Projects</span>
          </div>
          <Button size="sm" variant="primary" onClick={handleSaveDemo}>
            <Save className="w-4 h-4 mr-2" /> Save Snapshot
          </Button>
        </CardTitle>
        
        <div className="overflow-x-auto mt-4">
          {savedProjects.length === 0 ? (
             <div className="text-center py-8 opacity-50 bg-base-200 rounded-lg border border-dashed border-base-content/20">
                <p>No saved projects found in local storage.</p>
                <p className="text-xs mt-2">Click "Save Snapshot" to create a test record.</p>
             </div>
          ) : (
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Project Name</th>
                  <th>Last Modified</th>
                  <th>Nodes</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {savedProjects.map((proj) => (
                  <tr key={proj.id}>
                    <td className="font-mono text-xs opacity-50">#{proj.id}</td>
                    <td className="font-bold">{proj.name}</td>
                    <td className="text-sm opacity-70">{proj.updatedAt.toLocaleString()}</td>
                    <td><div className="badge badge-sm badge-ghost">{Object.keys(proj.nodes).length} nodes</div></td>
                    <td className="flex justify-end gap-2">
                      <button 
                        className="btn btn-sm btn-ghost gap-2"
                        onClick={() => proj.id && loadProjectFromDB(proj.id)}
                      >
                        <FolderOpen className="w-4 h-4" /> Load
                      </button>
                      <button 
                        className="btn btn-sm btn-ghost text-error"
                        onClick={() => proj.id && deleteProject(proj.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="mt-4">
            <CodeLabel label="db.projects.add({ ... })" />
            <CodeLabel label="db.projects.toArray()" className="ml-2" />
        </div>
      </Card>
    </section>
  );
};