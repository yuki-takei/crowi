import { FC } from 'react';
import NextLink from './NextLink';

type CustomHeaderProps = any & Props & {
  headerClass: string,
}

const CustomHeader: FC<Props> = (props: CustomHeaderProps) => {
  const { id, children, headerClass: HeaderClass } = props;

  return (
    <HeaderClass id={id} className="revision-head">
      {children}
      <NextLink href={`#${id}`} className="revision-head-link">
        <span className="icon-link"></span>
      </NextLink>
    </HeaderClass>
  );
};

type Props = any & {
  children: JSX.Element[],
  id: string,
}

export const Header1: FC<Props> = (props: Props) => {
  return <CustomHeader headerClass="h1" {...props} />;
};

export const Header2: FC<Props> = (props: Props) => {
  return <CustomHeader headerClass="h2" {...props} />;
};

export const Header3: FC<Props> = (props: Props) => {
  return <CustomHeader headerClass="h3" {...props} />;
};
