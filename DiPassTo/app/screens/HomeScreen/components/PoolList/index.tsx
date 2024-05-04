import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {addDay} from '../../../../helpers/time';
import {IPoolInfo} from '../../../../types';
import PoolItem from '../PoolItem';

const mockData: IPoolInfo[] = [
  {
    id: '1',
    imageUrl:
      'https://img.freepik.com/premium-photo/gift-box-cyberpunk-style-dark-background_969965-42879.jpg',
    createdBy: '0xDdf269bF44f86570beD9A7ef514620A31eB634D6',
    title:
      'Est nisi sint aute et cupidatat quis aute minim amet laboris excepteur qui minim.',
    endTime: addDay(new Date(), 10),
    startTime: new Date(),
    ticketPrice: '10',
    totalMinted: '10',
    totalTicket: '100',
  },
  {
    id: '2',
    imageUrl:
      'https://png.pngtree.com/background/20230526/original/pngtree-square-box-lit-up-in-a-dark-place-picture-image_2748744.jpg',
    createdBy: '0xDdf269bF44f86570beD9A7ef514620A31eB634D6',
    title: 'laboris excepteur qui minim.',

    endTime: addDay(new Date(), 15),
    startTime: new Date(),
    ticketPrice: '15',
    totalMinted: '166',
    totalTicket: '1200',
  },
  {
    id: '3',
    imageUrl:
      'https://img.pikbest.com/wp/202408/surprise-gift-box-in-3d-rendering-on-a-dark-background_9726738.jpg!w700wp',
    createdBy: '0xDdf269bF44f86570beD9A7ef514620A31eB634D6',
    title: 'cupidatat quis aute',
    endTime: addDay(new Date(), 20),
    startTime: addDay(new Date(), 10),
    ticketPrice: '100',
    totalMinted: '25',
    totalTicket: '150',
  },
  {
    id: '4',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVAbhsaDo8kU_yyT1k_T1Zn_fJgtZ9um0s5jmf3ZzkMx8n_DhfD4uyoWBrj3aYVVA_niU&usqp=CAU',
    createdBy: '0xDdf269bF44f86570beD9A7ef514620A31eB634D6',
    title: 'cupidatat quis aute',
    endTime: new Date(),
    startTime: new Date(),
    ticketPrice: '100',
    totalMinted: '15',
    totalTicket: '300',
  },
];

export default function PoolList() {
  const renderItem = ({item}: {item: IPoolInfo}) => {
    return <PoolItem data={item} />;
  };

  return (
    <FlatList
      style={styles.container}
      data={mockData}
      renderItem={renderItem}
      contentContainerStyle={styles.contentContainerStyle}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    // display: 'flex',
    // rowGap: 16,
  },
  contentContainerStyle: {
    display: 'flex',
    rowGap: 32,
  },
});
