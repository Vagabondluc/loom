import React, { useState } from 'react';
import { Card, CardTitle, Button, Alert, Checkbox, Input, FormField } from '../../ui';
import { validateWithSchema, generateMockData } from '../../services/form';
import { SCHEMAS, SchemaId } from '../../utils/schemaRegistry';
import { ShieldCheck, Sparkles, AlertTriangle } from 'lucide-react';
import { z } from 'zod';

export const ZodSection: React.FC = () => {
  const [selectedSchema, setSelectedSchema] = useState<SchemaId>('login');
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  
  const currentSchemaDef = SCHEMAS[selectedSchema];

  const handleValidation = () => {
    const result = validateWithSchema(currentSchemaDef.schema, formData);
    if (!result.success) {
      setErrors(result.errors as Record<string, string[]>);
    } else {
      setErrors({});
      alert('Validation Passed!');
    }
  };

  const handleGenerateMockData = () => {
    const mock = generateMockData(currentSchemaDef.schema);
    setFormData(mock);
    setErrors({});
  };

    const renderField = (key: string, type: any) => {
      // Basic inference for demonstration
     const isBoolean = type instanceof z.ZodBoolean || (type instanceof z.ZodOptional && type._def.innerType instanceof z.ZodBoolean);
     
    if (isBoolean) {
      return (
        <FormField key={key} label={key}>
          <label className="cursor-pointer label justify-start gap-2">
            <Checkbox
              variant="primary"
              checked={!!formData[key]}
              onChange={(e) => setFormData({ ...formData, [key]: e.target.checked })}
            />
            <span className="label-text capitalize">{key}</span>
          </label>
          {errors[key] && <span className="text-error text-xs">{errors[key][0]}</span>}
        </FormField>
      );
    }

    return (
      <FormField key={key} label={key} error={errors[key] ? errors[key][0] : undefined}>
        <Input
          type={key.includes('password') ? 'password' : 'text'}
          className="w-full"
          value={formData[key] || ''}
          onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
        />
      </FormField>
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
          
          <Button variant="ghost" className="w-full gap-2" onClick={handleGenerateMockData}>
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