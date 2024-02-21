import { ActionIcon, Group, rem } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons-react';
import Link from 'next/link';
import classes from './FooterCentered.module.css';

const FooterCentered = () => {
  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <Group gap="xs" justify="flex-center" wrap="nowrap">
          <Link href="https://github.com/codebaristas/alphstats-frontend">
            <ActionIcon size="lg" variant="default" radius="xl">
              <IconBrandGithub style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
          </Link>
        </Group>
      </div>
    </div>
  );
};
export default FooterCentered;
