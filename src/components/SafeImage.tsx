import React, { useState } from 'react';
import { APP_ASSETS } from '../data/assets';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Imagem local usada quando a URL remota não carrega (ex.: demo offline) */
  fallbackSrc?: string;
}

/**
 * <img> que troca automaticamente para uma imagem local do app quando a
 * URL remota (Unsplash etc.) falha — mantém a demo funcionando offline.
 */
export const SafeImage: React.FC<SafeImageProps> = ({
  fallbackSrc = APP_ASSETS.storeFacade,
  onError,
  ...rest
}) => {
  const [failed, setFailed] = useState(false);
  return (
    <img
      {...rest}
      src={failed ? fallbackSrc : rest.src}
      onError={(e) => {
        setFailed(true);
        onError?.(e);
      }}
    />
  );
};
