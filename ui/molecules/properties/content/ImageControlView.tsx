import React from 'react';
import { Input, FormField } from '../../../../index';

type Props = {
  src: string;
  alt: string;
  onUpdateSrc: (src: string) => void;
  onUpdateAlt: (alt: string) => void;
  onSnapshot?: () => void;
};

export const ImageControlView: React.FC<Props> = ({ src, alt, onUpdateSrc, onUpdateAlt }) => {
  return (
    <div className="space-y-2">
      <FormField label="Image URL">
        <Input size="sm" value={src || ''} onChange={(e) => onUpdateSrc(e.target.value)} />
      </FormField>
      <FormField label="Alt Text">
        <Input size="sm" value={alt || ''} onChange={(e) => onUpdateAlt(e.target.value)} />
      </FormField>
    </div>
  );
};

export default ImageControlView;
