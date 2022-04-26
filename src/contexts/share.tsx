import React, { createContext, useState, useCallback } from 'react';
import { Share } from 'react-native';
// import Share from 'react-native-share';

interface ITitle {
  rendered?: string;
}

interface INews {
  title?: ITitle;
  link?: any;
}

interface IShareContext {
  news?: INews | null;
  url?: any;
  handleSetShare(item: INews): void;
  handleShareNews(): void;
}

interface IComponentProps {
  children?: React.ReactNode;
}

const ShareContext = createContext<IShareContext>({} as unknown as IShareContext);

export const ShareProvider: React.FC<IComponentProps> = ({ children }): JSX.Element => {

  const [news, setNews] = useState<INews | null>(null);

  const handleSetShare = useCallback((value: INews) => {
    // console.log(value.link, value.title.rendered);
    setNews(value);
  }, []);

  const handleShareNews = async () => {
    try {
      const result = await Share.share({
        title: news?.title?.rendered,
        message: news?.link,
        url: news?.link,
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
      setNews(null),
      console.log(error);
    }
  };

  return (
    <ShareContext.Provider value={{ news, handleSetShare, handleShareNews }}>
      {children}
    </ShareContext.Provider>
  );
}

export default ShareContext;