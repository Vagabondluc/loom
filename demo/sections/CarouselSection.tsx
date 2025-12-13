import React, { useRef } from 'react';
import { Card, CardTitle, CodeLabel } from '../../ui';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const CarouselSection: React.FC = () => {
  const snapScrollRef = useRef<HTMLDivElement>(null);

  const scrollSnap = (direction: 'left' | 'right') => {
    if (snapScrollRef.current) {
      const container = snapScrollRef.current;
      // Scroll by 75% of the container width for a natural page-turn feel
      const scrollAmount = container.clientWidth * 0.75; 
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="carousel" className="space-y-6 scroll-mt-24">
      <div className="prose max-w-none">
        <h2 className="text-3xl font-bold border-b pb-2">Carousel</h2>
        <p className="text-base-content/70">
          Scrollable areas for displaying media or content series.
        </p>
      </div>

      <Card bordered>
        <CardTitle>Snap Carousel</CardTitle>
        <div className="relative group">
          <div 
            ref={snapScrollRef}
            className="carousel rounded-box w-full space-x-4 p-4 bg-neutral-content/10 scroll-smooth"
          >
            {[1040, 1050, 1060, 1070, 1080, 1041, 1051, 1061].map((id) => (
               <div key={id} className="carousel-item">
                  <img src={`https://picsum.photos/id/${id}/300/200`} alt="Carousel Item" className="rounded-box h-48 w-72 object-cover shadow-md" />
               </div>
            ))}
          </div>
          
          {/* Scroll Controls - Enhanced for better UX/Touch */}
          <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
            <button 
              onClick={() => scrollSnap('left')}
              className="btn btn-circle btn-neutral bg-base-100/90 border-none shadow-xl pointer-events-auto opacity-70 hover:opacity-100 hover:scale-105 transition-all z-10"
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-6 h-6 text-base-content" />
            </button>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <button 
              onClick={() => scrollSnap('right')}
              className="btn btn-circle btn-neutral bg-base-100/90 border-none shadow-xl pointer-events-auto opacity-70 hover:opacity-100 hover:scale-105 transition-all z-10"
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-6 h-6 text-base-content" />
            </button>
          </div>
        </div>
        <CodeLabel label="carousel carousel-item" />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card bordered>
            <CardTitle>Center & Spacing</CardTitle>
            <div className="carousel carousel-center max-w-md p-4 space-x-4 bg-neutral rounded-box">
              {[1011, 1012, 1013].map((id) => (
                <div key={id} className="carousel-item">
                  <img src={`https://picsum.photos/id/${id}/200/300`} className="rounded-box w-32" />
                </div>
              ))}
            </div>
            <CodeLabel label="carousel-center space-x-4" />
        </Card>

        <Card bordered>
            <CardTitle>Vertical</CardTitle>
            <div className="carousel carousel-vertical rounded-box h-64 border border-base-300">
              {[1015, 1016, 1018].map((id) => (
                <div key={id} className="carousel-item h-full w-full">
                  <img src={`https://picsum.photos/id/${id}/400/300`} className="w-full object-cover" />
                </div>
              ))}
            </div>
            <CodeLabel label="carousel-vertical" />
        </Card>
      </div>
    </section>
  );
};