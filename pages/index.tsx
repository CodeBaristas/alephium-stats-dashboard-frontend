import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';
import { AlephiumWalletProvider } from '@alephium/web3-react';
import { Container } from '@mantine/core';
import {
    Icon360, IconBuildingBank,
    IconChartArrowsVertical,
    IconHash, IconLink, IconLock,
    IconPool,
    IconTransactionBitcoin
} from '@tabler/icons-react';
import type { InferGetStaticPropsType, GetStaticProps } from 'next';
import { HeaderSimple } from '../components/Header/HeaderSimple';

import StatsGrid, { IStatGridData } from '../components/StatsGrid/StatsGrid';
import FooterCentered from '../components/Footer/FooterCentered';
import { apiClient } from '../utils/apiClient';
import React from 'react';
import {
    StatsAlphSupply,
    StatsAverageBlockTimes,
    StatsCurrentDifficultyOut,
    StatsCurrentHashrateOut,
    StatsInfoHeightsOut,
    StatsTotalTransactions, SupplyType,
} from "../client";



type Repo = {
    alphSupplyTotal:StatsAlphSupply,
    alphSupplyCirculating:StatsAlphSupply,
    alphSupplyReserved:StatsAlphSupply,
    alphSupplyLocked:StatsAlphSupply,
    averageBlockTimes: StatsAverageBlockTimes[];
    chainHeightsInfoData: StatsInfoHeightsOut[];
    difficulty: StatsCurrentDifficultyOut;
    hashrate: StatsCurrentHashrateOut;
    totalTransactions: StatsTotalTransactions;
};
async function getAlphSupply(type: SupplyType): Promise<StatsAlphSupply> {
    return apiClient.getAlphSupplyStatsAlphSupplyGet(type).then((r) => r.data);
}
export const getStaticProps: GetStaticProps = (async () => {

    // Fetch api
    const [alphSupplyTotal, alphSupplyCirculating, alphSupplyReserved, alphSupplyLocked] = await Promise.all([
        getAlphSupply("total"),
        getAlphSupply("circulating"),
        getAlphSupply("reserved"),
        getAlphSupply("locked"),
    ]);
    const hashrate = await apiClient
        .getCurrentHashrateStatsInfoHashrateCurrentGet()
        .then((r) => r.data);
    const difficulty = await apiClient
        .getCurrentDifficultyStatsInfoCurrentDifficultyGet()
        .then((r) => r.data);
    const totalTransactions: StatsTotalTransactions  = await apiClient
        .getTotalTransactionsStatsTotalTransactionsGet()
        .then((r) => r.data);
    const chainHeightsInfoData= await apiClient
        .getInfoHeightsStatsInfoHeightsGet()
        .then((r) =>
        r.data);
    const averageBlockTimes= await apiClient
        .getAverageBlockTimesStatsAverageBlocktimesGet()
        .then((r) =>
            r.data);

    const repo: Repo = {
        alphSupplyTotal,
        alphSupplyCirculating,
        alphSupplyReserved,
        alphSupplyLocked,
        averageBlockTimes,
        hashrate,
        difficulty,
        chainHeightsInfoData,
        totalTransactions };


    return {
        props: {
            repo,
        },
        revalidate: 10, // In seconds
    };
}) satisfies GetStaticProps<{
    repo: Repo;
}>;

export default function Page({ repo }: InferGetStaticPropsType<typeof getStaticProps>) {

    let combinedData: IStatGridData[] = [];
    repo.averageBlockTimes.forEach((averageTimeItem: StatsAverageBlockTimes) => {
        const heightItem = repo.chainHeightsInfoData.find((heightItem: StatsInfoHeightsOut) =>
            heightItem.chain_from === averageTimeItem.chain_from && heightItem.chain_to === averageTimeItem.chain_to);

        if (heightItem) {
            const obj: IStatGridData = {
                title: `From: ${averageTimeItem.chain_from} -> To: ${averageTimeItem.chain_to}`,
                icon: IconLink,
                value: `${(averageTimeItem.value / 1000).toString()}s`,
                optionalValue: heightItem.value.toString(),
                diff: 0,

            };
            combinedData.push(obj);
        }
    });

    const alphSupplyData: IStatGridData[] = [
        {
            title: 'Total',
            icon: IconPool,
            value:repo.alphSupplyTotal.supply,
            diff: 0,
        },
        {
            title: 'Circulating',
            icon: Icon360,
            value: repo.alphSupplyCirculating.supply,
            diff: 0,
        },
        {
            title: 'Reserved',
            icon: IconBuildingBank,
            value: repo.alphSupplyReserved.supply,
            diff: 0,
        },
        {
            title: 'Locked',
            icon: IconLock,
            value: repo.alphSupplyLocked.supply,
            diff: 0,
        },
    ]
    const data: IStatGridData[] = [
        {
            title: 'Current Hashrate',
            icon: IconHash,
            value: repo.hashrate.hashrate,
            diff: 0,
        },
        {
            title: 'Current Difficulty',
            icon: IconChartArrowsVertical,
            value: repo.difficulty.difficulty,
            diff: 0,
        },
        {
            title: 'Total Tx',
            icon: IconTransactionBitcoin,
            value: repo.totalTransactions.amount,
            diff: 0,
        },
    ];

    return (
        <AlephiumWalletProvider network="mainnet">
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <HeaderSimple />

            <Container>
                <StatsGrid gridTitle={'Hashrates & Transactions'} gridData={data} />
                <StatsGrid gridTitle={'Alph Supply'} gridData={alphSupplyData}/>
                <StatsGrid gridTitle={'Avg. Blocktimes & Chain Heights'} gridData={combinedData}/>
            </Container>
            <FooterCentered />
        </AlephiumWalletProvider>
    );
}
