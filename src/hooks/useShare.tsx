import { useContext } from 'react';

import ShareContext from '../contexts/share';

interface ILink {
  link?: string;
}

interface IShareContext {
  link?: ILink;
  handleSetShare?(value: ILink): any;
  handleShareNews?(): void;
}

function useShare(): IShareContext {

    const context = useContext(ShareContext);
  
    if (!context) {
      throw new Error('Share must be used within a ShareProvider');
    }
  
    return context;
  }
  
export default useShare;