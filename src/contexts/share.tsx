import React, { createContext, useState, useCallback } from 'react';
import { Share } from 'react-native';

interface ILink {
  link?: string;
}

interface IShareContext {
  link?: ILink;
  handleSetShare?(value: ILink): any;
  handleShareNews?(): void;
}

const ShareContext = createContext<IShareContext>(null as unknown as IShareContext);

export const ShareProvider: React.FC<IShareContext> = ({ children }): JSX.Element => {

  const [link, setLink] = useState<ILink>();

  const handleSetShare = useCallback((value: ILink) => {
    // console.log(value);
    setLink(value);
  }, []);

  const handleShareNews = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ShareContext.Provider value={{ link, handleSetShare, handleShareNews }}>
      {children}
    </ShareContext.Provider>
  );
}

export default ShareContext;