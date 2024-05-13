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
        'mt-12 flex w-full flex-col items-center justify-between gap-x-12 gap-y-6 lg:flex-row',
        reversed && 'lg:flex-row-reverse'
      )}
    >
      <div
        className={clsx(
          'max-w-[400px] flex-grow text-center',
          reversed ? 'lg:text-right' : 'lg:text-left'
        )}
      >
        <h2 className="mb-2 text-lg font-semibold text-secondary-800">
          {title}
        </h2>
        <p className="text-md">{description}</p>
      </div>
      <Image
        alt={alt}
        src={image}
        width={500}
        height={265}
        priority
        className="rounded-md border shadow-sm"
      />
    </article>
  );
}
