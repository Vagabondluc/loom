import React, { useState } from 'react';
import { Card, CardTitle, Input, Button, CodeLabel, FormField, Alert, Checkbox } from '../../index';
import { z } from 'zod';
import { CheckCircle2 } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  terms: z.boolean().refine(val => val === true, { message: "You must accept the terms" })
});

type LoginForm = z.infer<typeof loginSchema>;

export const ValidationForm: React.FC = () => {
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: '',
    terms: false
  });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginForm, string[]>>>({});
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = loginSchema.safeParse(formData);
    
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      setStatus('idle');
    } else {
      setErrors({});
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <Card bordered>
       <CardTitle>Interactive Validation (Zod)</CardTitle>
       <form onSubmit={handleSubmit} className="space-y-4">
         {status === 'success' && (
           <Alert variant="success" className="text-sm py-2">
             Form submitted successfully!
           </Alert>
         )}
         
         <FormField label="Email" error={errors.email?.[0]}>
            <Input 
              placeholder="jane@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              error={errors.email?.[0]}
            />
         </FormField>
         
         <FormField label="Password" error={errors.password?.[0]}>
            <Input 
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              error={errors.password?.[0]}
            />
         </FormField>

         <div className="form-control">
           <label className="label cursor-pointer justify-start gap-4">
             <Checkbox 
               variant={errors.terms ? 'error' : 'primary'}
               checked={formData.terms}
               onChange={(e) => setFormData({...formData, terms: e.target.checked})}
             />
             <span className={`label-text ${errors.terms ? 'text-error' : ''}`}>
               I accept the terms and conditions
             </span>
           </label>
           {errors.terms && (
             <span className="text-error text-xs ml-1">{errors.terms[0]}</span>
           )}
         </div>

         <div className="card-actions justify-end mt-4">
           <Button type="submit" variant="primary" wide>Submit</Button>
         </div>
       </form>
       <CodeLabel label="z.object({ ... })" className="ml-2" />
    </Card>
  );
};
