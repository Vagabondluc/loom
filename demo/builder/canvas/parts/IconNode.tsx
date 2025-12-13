
import React from 'react';
// Explicitly import all icons that are commonly used or set via `iconName`
import { 
  Star, Smile, Bell, User, Settings, Heart, AlertCircle, Check, X, Menu, 
  Search, ArrowRight, ChevronDown 
} from 'lucide-react';
import { BuilderNode } from '../../../../types';
import { StructureVisuals } from './StructureVisuals';

// Map icon names to their imported components for reliable access
const iconMap: { [key: string]: React.ComponentType<any> } = {
  Star: Star,
  Smile: Smile,
  Bell: Bell,
  User: User,
  Settings: Settings,
  Heart: Heart,
  AlertCircle: AlertCircle,
  Check: Check,
  X: X,
  Menu: Menu,
  Search: Search,
  ArrowRight: ArrowRight,
  ChevronDown: ChevronDown,
  // Add other Lucide icons here if you expand the list of COMMON_ICONS in ContentEditor.tsx
  // For example: Home: Home, Plus: Plus, etc.
};

interface IconNodeProps {
  node: BuilderNode;
  classes: string;
  isVisible: boolean;
  isPreviewMode: boolean;
  isStructureMode: boolean;
  handlers: any;
  depth: number;
}

export const IconNode: React.FC<IconNodeProps> = ({ 
  node, classes, isVisible, isPreviewMode, isStructureMode, handlers, depth 
}) => {
  // Resolve the icon component from the map, falling back to Star if not explicitly found
  const IconCmp = iconMap[node.data.iconName as string] || Star;
  
  return (
    <div 
       id={node.id}
       className={classes}
       style={node.data.style}
       {...handlers}
    >
        {isStructureMode && <StructureVisuals node={node} depth={depth} />}
        
        <IconCmp 
          size={node.data.size || 24} 
          strokeWidth={node.data.strokeWidth || 2} 
        />
        {!isVisible && !isPreviewMode && (
          <div className="absolute top-0 right-0 bg-warning text-warning-content rounded-bl text-[8px] px-1 pointer-events-none">
            HIDDEN
          </div>
        )}
    </div>
  );
};
