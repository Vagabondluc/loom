import React from 'react';
import { Card, CardTitle, Input, CodeLabel, FormField } from '../../index';

export const BasicInputs: React.FC = () => {
  return (
    <Card bordered>
      <CardTitle>Basic Inputs</CardTitle>
      <div className="space-y-6">
        <div>
          <FormField label="Text Input">
            <Input placeholder="Type here..." />
          </FormField>
          <div className="mt-1"><CodeLabel label="input input-bordered" className="ml-2" /></div>
        </div>

        <div>
          <FormField label="Error State" error="Invalid email address">
            <Input error="Invalid email address" placeholder="email@site" />
          </FormField>
          <div className="mt-1"><CodeLabel label="input-error" className="ml-2" /></div>
        </div>

        <div>
          <div className="form-control w-full">
            <label className="label"><span className="label-text">Select</span></label>
            <select className="select select-bordered" defaultValue="">
              <option disabled value="">Pick one</option>
              <option>Star Wars</option>
              <option>Harry Potter</option>
              <option>Lord of the Rings</option>
            </select>
          </div>
          <div className="mt-1"><CodeLabel label="select select-bordered" className="ml-2" /></div>
        </div>

        <div>
          <div className="form-control w-full">
            <label className="label"><span className="label-text">File Input</span></label>
            <input type="file" className="file-input file-input-bordered w-full" />
          </div>
          <div className="mt-1"><CodeLabel label="file-input" className="ml-2" /></div>
        </div>
      </div>
    </Card>
  );
};
