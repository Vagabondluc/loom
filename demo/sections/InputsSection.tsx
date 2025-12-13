
import React from 'react';
import { BasicInputs } from './inputs/BasicInputs';
import { ValidationForm } from './inputs/ValidationForm';
import { SpecializedInputs } from './inputs/SpecializedInputs';

export const InputsSection: React.FC = () => {
  return (
    <section id="inputs" className="space-y-6 scroll-mt-24">
      <div className="prose max-w-none">
        <h2 className="text-3xl font-bold border-b pb-2">Inputs</h2>
        <p className="text-base-content/70">
          Form controls for capturing user data. Includes standard text inputs, selections, 
          files, and specialized controls like ranges and ratings.
        </p>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <BasicInputs />
        <ValidationForm />
        <SpecializedInputs />
      </div>
    </section>
  );
};
