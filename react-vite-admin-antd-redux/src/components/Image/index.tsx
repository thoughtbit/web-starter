import React, { useCallback } from "react";

type SourceSet = {
  source: string;
  descriptor?: string;
};

type CrossOrigin = "anonymous" | "use-credentials" | "" | undefined;

export interface ImageProps extends React.HTMLProps<HTMLImageElement> {
  alt: string;
  source: string;
  crossOrigin?: CrossOrigin;
  sourceSet?: SourceSet[];
  onLoad?(): void;
  onError?(): void;
}

function Image({ alt, sourceSet, source, crossOrigin, onLoad, className, ...rest }: ImageProps) {
  const finalSourceSet = sourceSet
    ? sourceSet.map(({ source: subSource, descriptor }) => `${subSource} ${descriptor}`).join(",")
    : null;

  const handleLoad = useCallback(() => {
    if (onLoad) onLoad();
  }, [onLoad]);

  return (
    <img
      alt={alt}
      src={source}
      crossOrigin={crossOrigin}
      className={className}
      onLoad={handleLoad}
      {...(finalSourceSet ? { srcSet: finalSourceSet } : {})}
      {...rest}
    />
  );
}

export default Image;

/*
    const src = 'https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg';
    <Image alt="alt text" source={src} crossOrigin="anonymous" />

    const src = 'https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg';
    const srcSet = [
        {
          source:
            'https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg',
          descriptor: '1x',
        },
    ];
    <Image
        alt="alt text"
        source={src}
        sourceSet={srcSet}
        crossOrigin="anonymous"
    />

    function fn() {}

    <Image alt="alt text" source="404" onError={fn} />
    <Image alt="alt text" source="/path/to/image" onLoad={fn} />
 */
