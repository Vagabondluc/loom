
import React, { useState, useEffect } from 'react';
import { Card, CardTitle, CodeLabel, Alert, SectionHeaderView } from '../ui';
import { Map, Link as LinkIcon, AlertTriangle } from 'lucide-react';

interface ImportMap {
  imports: Record<string, string>;
}

export const Inspector: React.FC = () => {
  const [importMap, setImportMap] = useState<ImportMap | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const mapScript = document.querySelector('script[type="importmap"]');
      if (!mapScript) {
        throw new Error('No import map found in document.');
      }
      const map = JSON.parse(mapScript.innerHTML);
      setImportMap(map);
    } catch (e: any) {
      setError(e.message);
    }
  }, []);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <SectionHeaderView title={"Inspector"} subtitle={<p className="text-base-content/70">Developer-focused tools for inspecting the application's runtime environment.</p>} />

      <Card bordered>
        <CardTitle className="flex items-center gap-2">
           <Map className="w-5 h-5 text-primary"/> Import Map Inspector
        </CardTitle>
        <p className="text-sm text-base-content/70 mt-2">
            This table shows the live mappings from module specifiers to CDN URLs, as defined in <code>index.html</code>.
            It's how this app loads modules without a build step.
        </p>
        
        {error && (
          <Alert variant="error" onClose={() => setError(null)} className="mt-4" icon={<AlertTriangle className="w-5 h-5" />}>
            {error}
          </Alert>
        )}
        
        {importMap && (
          <div className="overflow-x-auto mt-4">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>Module Specifier</th>
                  <th>Resolved URL</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(importMap.imports).map(([key, value]) => (
                  <tr key={key} className="hover">
                    <td className="font-mono text-primary">{key}</td>
                    <td className="font-mono text-xs opacity-70 truncate max-w-xs">
                      <a href={value} target="_blank" rel="noopener noreferrer" className="link link-hover flex items-center gap-2">
                         {value} <LinkIcon className="w-3 h-3 flex-shrink-0" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        <div className="mt-4">
          <CodeLabel label={`document.querySelector('script[type="importmap"]')`} />
        </div>
      </Card>
    </div>
  );
};