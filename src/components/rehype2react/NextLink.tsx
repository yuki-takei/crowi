import { FC } from 'react';
import Link from 'next/link';

type Props = any & {
  children: JSX.Element[],
  href: string,
  className?: string,
}

const NextLink: FC<Props> = ({ href, className, children }: Props) => {
  const anchor = <a href={href} className={className}>{children}</a>;

  // when href is an anchor link
  if (href.length > 0 && href[0] === '#') {
    return anchor;
  }

  return (
    <Link href={href}>{anchor}</Link>
  );
};

export default NextLink;
