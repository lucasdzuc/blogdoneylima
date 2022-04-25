import { useContext } from 'react';

import ShareContext from '../contexts/share';

interface ITitle {
  rendered?: string;
}

interface ILink {
  title?: ITitle;
  link?: string;
}

interface IShareContext {
  shareNews?: ILink;
  handleSetShare(item: ILink): void;
  handleShareNews(): void;
}

function useShare(): IShareContext {

    const context = useContext(ShareContext);
  
    if (!context) {
      throw new Error('Share must be used within a ShareProvider');
    }
  
    return context;
  }
  
export default useShare;