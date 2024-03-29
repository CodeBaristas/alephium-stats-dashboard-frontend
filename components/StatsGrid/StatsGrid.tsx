import { Group, Paper, SimpleGrid, Text } from '@mantine/core';
import { IconArrowUpRight, IconArrowDownRight } from '@tabler/icons-react';
import { ElementType } from 'react';
import classes from './StatsGrid.module.css';

export interface IStatGridData {
  title: string;
  icon: ElementType;
  value: string;
  optionalValue?: string;
  diff: number;
}
interface Props {
  gridTitle:string,
  gridData: IStatGridData[];
}

const StatsGrid = (props: Props) => {

  const stats = props.gridData.map((stat) => {
    const Icon = stat.icon;
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;
    console.log(props.gridData);
    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group justify="space-between">
          <Text size="xs" c="dimmed" className={classes.title}>
            {stat.title}
          </Text>
          <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
        </Group>
          <Group align="flex-end" gap="xs" mt={25}>
              <Text className={classes.value}>{stat.value}</Text>
          </Group>
          {stat.optionalValue &&  <Group align="flex-end">

                <Text className={classes.value}>{stat.optionalValue}</Text>

          {/*  Build a database which contains previous month values*/}
          {/*<Text c={stat.diff > 0 ? 'teal' : 'red'} fz="sm" fw={500} className={classes.diff}>*/}
          {/*  <span>{stat.diff}%</span>*/}
          {/*  <DiffIcon size="1rem" stroke={1.5} />*/}
          {/*</Text>*/}
        </Group>}
        {/*<Text fz="xs" c="dimmed" mt={7}>*/}
        {/*  Compared to previous month*/}
        {/*</Text>*/}
      </Paper>
    );
  });
  return (
    <div className={classes.root}>
      <h1>{props.gridTitle}</h1>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>{stats}</SimpleGrid>
    </div>
  );
};
export default StatsGrid;
