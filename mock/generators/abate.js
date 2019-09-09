import faker from 'faker';
import { contractMockData } from '../contract';

const abateState = [1, 0];
const abateName = [
  'Tạm ứng lần 1',
  'Tạm ứng lần 2',
  'Quyết toán lần 1',
  'Tạm ứng lần 4',
  'Tạm ứng lần 7',
  'Quyết toán lần 9',
];

const firstPageContract = contractMockData.slice(0, 18);

const abateGenerator = num =>
  Array.from(new Array(num)).map((val, idx) => ({
    id: `${idx}`,
    contractId: faker.random.arrayElement(firstPageContract),
    name: faker.random.arrayElement(abateName),
    state: faker.random.arrayElement(abateState),
    abateDate: faker.date.past(),
    total: faker.random.number({ max: 120782241000, min: 1000000 }),
  }));

export default abateGenerator;
