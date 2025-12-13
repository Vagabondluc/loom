import React, { useState } from 'react';
import { Card, CardTitle, Button, Alert, Checkbox } from '../../ui';
import { SCHEMAS, SchemaId } from '../../utils/schemaRegistry';
import { ShieldCheck, Sparkles, AlertTriangle } from 'lucide-react';
import { z } from 'zod';

export const ZodSection: React.FC = () => {
  const [selectedSchema, setSelectedSchema] = useState<SchemaId>('login');
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  
  const currentSchemaDef = SCHEMAS[selectedSchema];

  const handleValidation = () => {
    const result = currentSchemaDef.schema.safeParse(formData);
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
    } else {
      setErrors({});
      alert("Validation Passed!");
    }
  };

  const generateMockData = () => {
     // Very basic mock generation based on field name logic for demo
     const mock: Record<string, any> = {};
     const fields = Object.keys(currentSchemaDef.schema.shape);
     
     fields.forEach(field => {
       if (field.includes('email')) mock[field] = 'demo@example.com';
       else if (field.includes('password')) mock[field] = 'secret123';
       else if (field === 'age') mock[field] = 25;
       else if (field === 'terms' || field === 'accept') mock[field] = true;
       else mock[field] = 'Sample Text';
     });
     setFormData(mock);
     setErrors({});
  };

  const renderField = (key: string, type: any) => {
     // Simple type inference for demo
     const isBoolean = type instanceof z.ZodBoolean || (type instanceof z.ZodOptional && type._def.innerType instanceof z.ZodBoolean);
     
     if (isBoolean) {
       return (
         <div key={key} className="form-control">
           <label className="cursor-pointer label justify-start gap-2">
             <Checkbox 
               variant="primary"
               checked={!!formData[key]}
               onChange={e => setFormData({...formData, [key]: e.target.checked})} 
             />
             <span className="label-text capitalize">{key}</span>
           </label>
           {errors[key] && <span className="text-error text-xs">{errors[key][0]}</span>}
         </div>
       );
     }

     return (
       <div key={key} className="form-control w-full">
         <label className="label">
           <span className="label-text capitalize">{key}</span>
         </label>
         <input 
           type={key.includes('password') ? 'password' : 'text'}
           className={`input input-bordered w-full ${errors[key] ? 'input-error' : ''}`} 
           value={formData[key] || ''}
           onChange={e => setFormData({...formData, [key]: e.target.value})}
         />
         {errors[key] && (
           <label className="label">
             <span className="label-text-alt text-error">{errors[key][0]}</span>
           </label>
         )}
       </div>
     );
  };

  return (
    <section id="zod" className="space-y-6 scroll-mt-24">
      <div className="prose max-w-none">
        <h2 className="text-3xl font-bold border-b pb-2">Zod Schema Playground</h2>
        <p className="text-base-content/70">
          Superpower #5: Define schemas in <code>utils/schemaRegistry.ts</code> and bind them to forms.
          This playground infers UI directly from the Zod definitions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Playground Controls */}
        <Card bordered className="h-fit">
          <CardTitle className="flex items-center gap-2">
             <ShieldCheck className="w-5 h-5 text-primary" /> Schema Selection
          </CardTitle>
          
          <div className="form-control mb-6">
            <label className="label">Choose a defined schema</label>
            <select 
              className="select select-bordered w-full"
              value={selectedSchema}
              onChange={(e) => {
                  setSelectedSchema(e.target.value as SchemaId);
                  setFormData({});
                  setErrors({});
              }}
            >
              {Object.values(SCHEMAS).map(s => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </div>

          <div className="mockup-code text-xs">
            <pre data-prefix=">"><code>// Zod Definition</code></pre>
            <pre className="text-warning"><code>{`z.object({
${Object.keys(currentSchemaDef.schema.shape).map(k => `  ${k}: ...`).join('\n')}
})`}</code></pre>
          </div>
          
          <div className="divider"></div>
          
          <Button variant="ghost" className="w-full gap-2" onClick={generateMockData}>
             <Sparkles className="w-4 h-4" /> Generate Mock Data
          </Button>
        </Card>

        {/* Dynamic Form */}
        <Card bordered>
          <CardTitle>Generated Form</CardTitle>
          <div className="space-y-4">
             {Object.entries(currentSchemaDef.schema.shape).map(([key, type]) => renderField(key, type))}
             
             <div className="card-actions justify-end mt-6">
                <Button variant="primary" onClick={handleValidation}>
                   Validate
                </Button>
             </div>
          </div>
          
          {Object.keys(errors).length > 0 && (
             <Alert variant="error" className="mt-4 text-xs">
               Validation failed. Please check fields.
             </Alert>
          )}
        </Card>

      </div>
    </section>
  );
};