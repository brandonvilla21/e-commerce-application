import React from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/styles';

interface ButtonLink {
  classNames?: string[],
  href: string,
  hrefAs: string,
  children: React.ReactNode,
  prefetch?: boolean,
}

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

const ButtonLink = ({ classNames = [], href, hrefAs, children, prefetch = false } : ButtonLink) => {
  const classes = useStyles();
  return (
    <Link href={href} as={hrefAs} prefetch={prefetch}>
      <a className={`${classes.link} ${classNames.join(' ')}`}>
        {children}
      </a>
    </Link>
  )
};

export default ButtonLink;