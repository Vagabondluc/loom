import React, { useState } from 'react';
import { Card, CardTitle, TextArea, CodeLabel, FormField, Checkbox, Radio, Toggle } from '../../index';

export const SpecializedInputs: React.FC = () => {
  const [rating, setRating] = useState(3);

  return (
    <Card bordered className="xl:col-span-2">
      <CardTitle>Specialized Inputs</CardTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="space-y-6">
            <div>
              <FormField label="Textarea">
                <TextArea placeholder="Bio..." />
              </FormField>
              <div className="mt-1"><CodeLabel label="textarea" className="ml-2" /></div>
            </div>
            
            <div className="form-control p-2 border border-base-200 rounded-lg">
              <label className="label cursor-pointer justify-start gap-4">
                <Checkbox defaultChecked variant="primary" />
                <span className="label-text">Checkbox Primary</span>
                <CodeLabel label="checkbox-primary" className="ml-2" />
              </label>
            </div>

            <div className="form-control p-2 border border-base-200 rounded-lg">
              <label className="label cursor-pointer justify-start gap-4">
                <Radio name="radio-10" variant="secondary" defaultChecked />
                <span className="label-text">Radio 1</span>
                <Radio name="radio-10" variant="secondary" />
                <span className="label-text">Radio 2</span>
                <CodeLabel label="radio-secondary" className="ml-2" />
              </label>
            </div>
         </div>

         <div className="space-y-6">
            <div className="form-control p-2 border border-base-200 rounded-lg">
              <label className="label cursor-pointer justify-start gap-4">
                <Toggle variant="accent" defaultChecked />
                <span className="label-text">Toggle Switch</span>
                <CodeLabel label="toggle-accent" className="ml-2" />
              </label>
            </div>

            <div className="flex flex-col gap-2 p-2 border border-base-200 rounded-lg">
               <label className="text-sm">Range</label>
               <input type="range" min={0} max="100" defaultValue="40" className="range range-xs range-info" />
               <div><CodeLabel label="range range-xs range-info" className="ml-2" /></div>
            </div>

            <div className="flex flex-col gap-2 p-2 border border-base-200 rounded-lg">
               <label className="text-sm">Rating</label>
               <div className="rating">
                 {[1,2,3,4,5].map(i => (
                   <input key={i} type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked={rating === i} onChange={() => setRating(i)} />
                 ))}
               </div>
               <div><CodeLabel label="rating mask-star-2" className="ml-2" /></div>
            </div>
         </div>
      </div>
    </Card>
  );
};
