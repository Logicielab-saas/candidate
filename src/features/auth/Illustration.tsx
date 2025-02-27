import Image from "next/image";

interface IllustrationProps {
  src: string;
  alt: string;
  isFixedDimension?: boolean;
}

export function Illustration({
  src,
  alt,
  isFixedDimension = false,
}: IllustrationProps) {
  return (
    <div className="relative hidden md:flex justify-end mr-2 dark:brightness-[0.8]">
      <Image
        src={src}
        alt={alt}
        height={isFixedDimension ? 400 : undefined}
        width={isFixedDimension ? 400 : undefined}
        layout={isFixedDimension ? "fixed" : "fill"}
        objectFit="contain"
        className="mx-auto my-4"
      />
    </div>
  );
}
