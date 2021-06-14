import {
  ComponentLike, ComponentPropsWithNode,
} from 'rehype-react';
import NextLink from './NextLink';


type EditLinkProps = {
  line?: number,
}

/**
 * Inner FC to display edit link icon
 * @param props
 * @returns
 */
const EditLink = (props: EditLinkProps): JSX.Element => {
  const isDisabled = props.line == null;

  return (
    <span className="revision-head-edit-button">
      <a href="#edit" aria-disabled={isDisabled} onClick={() => console.log(`TODO: Jump to the line '${props.line}'`)}>
        <i className="icon-note"></i>
      </a>
    </span>
  );
};


type HeaderProps = ComponentPropsWithNode & {
  children?: JSX.Element[],
  id?: string,
}

type CustomHeaderProps = HeaderProps & {
  headerClass: keyof JSX.IntrinsicElements,
}

/**
 * Inner FC to display Header
 * @param props
 * @returns
 */
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
      <EditLink line={unistNode.position?.start.line} />
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
