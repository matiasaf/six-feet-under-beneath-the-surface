"use client"

/* eslint-disable @next/next/no-img-element */

import { useState } from "react"

type ArchiveImageProps = {
  src: string
  alt: string
  label?: string
  className?: string
  imageClassName?: string
}

export function ArchiveImage({
  src,
  alt,
  label,
  className = "",
  imageClassName = "",
}: ArchiveImageProps) {
  const [failed, setFailed] = useState(false)
  const showFallback = failed || src.length === 0

  return (
    <div className={`relative overflow-hidden bg-[#141312] ${className}`}>
      {!showFallback ? (
        <img
          src={src}
          alt={alt}
          className={`h-full w-full object-cover ${imageClassName}`}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="flex h-full min-h-[inherit] items-end bg-[linear-gradient(135deg,rgba(92,26,27,0.36),rgba(74,90,60,0.28)_45%,rgba(10,10,10,0.92))] p-5">
          <p className="font-[family-name:var(--font-playfair)] text-xl text-neutral-300">
            {label ?? alt}
          </p>
        </div>
      )}
    </div>
  )
}
