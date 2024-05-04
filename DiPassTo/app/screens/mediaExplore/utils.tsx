import {useEffect, useState} from 'react';
import {AppState, Dimensions} from 'react-native';
import {AppStateStatus} from 'react-native';
import {PostInfoType} from './types';
import RNFS from 'react-native-fs';
export const SCREEN_WIDTH = Dimensions.get('window').width;

export const useIsForeground = (): boolean => {
  const [isForeground, setIsForeground] = useState(true);

  useEffect(() => {
    const onChange = (state: AppStateStatus): void => {
      setIsForeground(state === 'active');
    };
    const listener = AppState.addEventListener('change', onChange);
    return () => listener.remove();
  }, [setIsForeground]);

  return isForeground;
};

const timeout = (prom: Promise<any>, time: number, exception: symbol) => {
  let timer: number;
  return Promise.race([
    prom,
    new Promise((_r, rej) => (timer = setTimeout(rej, time, exception))),
  ]).finally(() => clearTimeout(timer));
};

export const saveFile = async (
  fileUrl: string,
  fileType: string,
): Promise<string> => {
  try {
    const filename = fileUrl.substring(
      fileUrl.lastIndexOf('/') + 1,
      fileUrl.length,
    );
    const path_name =
      RNFS.DocumentDirectoryPath + '/' + `${fileType}-` + filename;
    const isExists = await RNFS.exists(path_name);
    if (!isExists) {
      const {jobId, promise} = await RNFS.downloadFile({
        fromUrl: fileUrl,
        toFile: path_name.replace(/%20/g, '_'),
        background: true,
      });
      const timeoutError = Symbol();

      const downloadResult = await timeout(promise, 30 * 1000, timeoutError);
      if (downloadResult.statusCode == 200) {
        return path_name;
      } else {
        return '';
      }
    } else {
      return path_name;
    }
  } catch (error) {
    throw error;
  }
};

const saveVideoFile = async (
  post: PostInfoType,
): Promise<PostInfoType | null> => {
  const videoPath = await saveFile(post.videoUrl, 'video');
  return {...post, videoUrl: `file://${videoPath}`};
};

export const getRendererVideos = async (
  posts: PostInfoType[],
): Promise<PostInfoType[]> => {
  const downloadPostsPromise = posts.map(post => saveVideoFile(post));
  const updateData: PostInfoType[] = [];
  const lastPost = await downloadPostsPromise.reduce(
    async (previousPromise, currentPromise) => {
      const tempRenderPost = await previousPromise;
      if (tempRenderPost) {
        updateData.push(tempRenderPost);
      }
      return currentPromise;
    },
  );
  if (lastPost) {
    updateData.push(lastPost);
  }
  return updateData;
};
