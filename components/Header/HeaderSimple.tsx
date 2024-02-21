'use client';

import { Container, Group, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import Image from 'next/image';
import cx from 'clsx';
import Link from 'next/link';
import AlphStatsLogoLight from '../../public/alphstats-logo-light.svg';
import AlphStatsLogo from '../../public/alphstats-logo.svg';
import classes from './HeaderSimple.module.css';
import CustomWalletConnectButton from '../../components/AlephiumWalletConnectButton/AlephiumWalletConnectButton';
import DarkLightToggle from '../../components/DarkLightToggle/DarkLightToggle';

export function HeaderSimple() {
  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Link href="/">
          <Image
            src={AlphStatsLogoLight}
            alt="Logo"
            width={200}
            height={80}
            className={cx(classes.icon, classes.light)}
          />
          <Image
            src={AlphStatsLogo}
            alt="Logo"
            width={200}
            height={80}
            className={cx(classes.icon, classes.dark)}
          />
        </Link>
        <Group>
          <DarkLightToggle />
          {/*<CustomWalletConnectButton />*/}
        </Group>
      </Container>
    </header>
  );
}
