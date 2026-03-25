import { createContext, useContext, type ReactNode } from 'react';
import { useCollection } from '../hooks/useCollection';

type CollectionContextType = ReturnType<typeof useCollection>;

const CollectionContext = createContext<CollectionContextType | null>(null);

export function CollectionProvider({ children }: { children: ReactNode }) {
  const collection = useCollection();
  return (
    <CollectionContext.Provider value={collection}>
      {children}
    </CollectionContext.Provider>
  );
}

export function useCollectionContext(): CollectionContextType {
  const ctx = useContext(CollectionContext);
  if (!ctx) throw new Error('useCollectionContext must be within CollectionProvider');
  return ctx;
}
