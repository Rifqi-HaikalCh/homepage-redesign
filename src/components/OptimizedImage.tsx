'use client';

import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  quality?: number;
  sizes?: string;
  onLoad?: () => void;
  fallbackSrc?: string;
}

/**
 * OptimizedImage Component
 *
 * Features:
 * - Automatic WebP conversion (handled by Next.js Image)
 * - Lazy loading by default (unless priority is set)
 * - Blur placeholder while loading
 * - Error handling with fallback
 * - Responsive image sizing
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  fill = false,
  objectFit = 'cover',
  quality = 75,
  sizes,
  onLoad,
  fallbackSrc = '/placeholder-image.png'
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    console.warn(`Failed to load image: ${src}`);
    setHasError(true);
    setIsLoading(false);
    if (fallbackSrc !== src) {
      setImageSrc(fallbackSrc);
    }
  };

  // For fill images (responsive containers)
  if (fill) {
    return (
      <div className={`relative ${className}`}>
        <Image
          src={imageSrc}
          alt={alt}
          fill
          style={{ objectFit }}
          quality={quality}
          sizes={sizes || '100vw'}
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          } ${hasError ? 'grayscale' : ''}`}
        />
        {isLoading && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 animate-pulse" />
        )}
      </div>
    );
  }

  // For fixed size images
  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        quality={quality}
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${hasError ? 'grayscale' : ''}`}
        style={{ objectFit }}
      />
      {isLoading && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 animate-pulse"
          style={{ width, height }}
        />
      )}
    </div>
  );
}

/**
 * OptimizedAvatar Component
 * Specialized for circular avatar images
 */
export function OptimizedAvatar({
  src,
  alt,
  size = 100,
  className = '',
  priority = false,
}: {
  src: string;
  alt: string;
  size?: number;
  className?: string;
  priority?: boolean;
}) {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className={`relative rounded-full overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={imageSrc}
        alt={alt}
        width={size}
        height={size}
        quality={80}
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setImageSrc('/placeholder-avatar.png');
          setIsLoading(false);
        }}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } rounded-full`}
        style={{ objectFit: 'cover' }}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-blue-200 dark:from-purple-700 dark:to-blue-700 animate-pulse rounded-full" />
      )}
    </div>
  );
}
