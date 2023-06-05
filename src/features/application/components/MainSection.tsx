import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';

interface MainSectionProps {
  title: string;
  description: string;
  image: string;
  alt: string;
  reversed?: boolean;
}

export default function MainSection({
  title,
  description,
  image,
  alt,
  reversed,
}: MainSectionProps) {
  return (
    <article
      className={clsx(
        'mt-12 flex w-full flex-col items-center gap-12 md:flex-row',
        reversed && 'md:flex-row-reverse'
      )}
    >
      <div
        className={clsx(
          'max-w-[400px] flex-grow text-center',
          reversed ? 'md:text-right' : 'md:text-left'
        )}
      >
        <h2 className="mb-2 text-lg font-semibold">{title}</h2>
        <p>{description}</p>
      </div>
      <Image
        alt={alt}
        src={image}
        width={400}
        height={500}
        className="rounded-md border shadow-sm"
      />
    </article>
  );
}
