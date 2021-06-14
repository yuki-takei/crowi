import {
  ComponentLike, ComponentPropsWithNode,
} from 'rehype-react';
import NextLink from './NextLink';

type HeaderProps = ComponentPropsWithNode & {
  children?: JSX.Element[],
  id?: string,
}

type CustomHeaderProps = HeaderProps & {
  headerClass: keyof JSX.IntrinsicElements,
}

const CustomHeader: ComponentLike<JSX.Element, CustomHeaderProps> = (props: CustomHeaderProps) => {

  const {
    id, children, headerClass: HeaderClass, node: unistNode,
  } = props;

  return (
    <HeaderClass id={id} className="revision-head">
      {children}
      <NextLink href={`#${id}`} className="revision-head-link">
        <span className="icon-link"></span>
      </NextLink>
    </HeaderClass>
  );
};

export const Header1 = (props: HeaderProps): JSX.Element => {
  return <CustomHeader headerClass="h2" {...props} />;
};

export const Header2 = (props: HeaderProps): JSX.Element => {
  return <CustomHeader headerClass="h2" {...props} />;
};

export const Header3 = (props: HeaderProps): JSX.Element => {
  return <CustomHeader headerClass="h3" {...props} />;
};
