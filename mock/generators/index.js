export * from './config';

export const contractGenerator = num =>
  Array.from(new Array(num)).map((val, idx) => ({
    id: `${idx}`,
    contractNum: `HD/200/2000${idx}`,
    contractName: 'Xây thô tòa nhà S1,S2SD3',
    capitalSource: {
      name: 'Vốn vay',
      id: '1',
    },
    package: {
      name: 'Xây thô',
      id: 'rawBuilding',
    },
    category: {
      name: 'Xây dựng',
      id: '1',
    },
    partner: {
      id: '1',
      name: 'Hòa Bình Construction',
    },
    contractType: {
      id: '1',
      name: 'Hợp đồng nội bộ',
    },
    contractState: {
      id: '1',
      name: 'Đang thực hiện',
    },
    addendum: {
      num: 3,
      items: [],
    },
    liquidateDate: '10/10/2019',
    signingDate: '10/10/2019',
    implementDate: '10/10/2019',
    expectStartDate: '10/10/2019',
    realStartDate: '10/10/2019',
    expectFinishDate: '10/10/2019',
    takeOverDate: '10/10/2019',
    contractValue: '100,000,000,000',
    adjustContractValue: '100,000,000,000',
    appendix: '(3)',
    code: '00001',
    activity: 'Xây dựng',
    accountNumber: '111111',
    bank: 'BIDV',
    address: 'Hai Bà Trưng, Hà Nội',
  }));

export const weight = num =>
  Array.from(new Array(num)).map((val, idx) => ({
    id: `${idx}`,
    categoryId: 'tuongvay',
    weight: 77841.53,
    unitPrice: 128320,
    totalRawPrice: 9988625130,
    calUnitId: 'm3',
    vat: 12345200,
    totalAfterTax: 124341130,
    content: 'Trát tường trong, dày 1.5cm, vữa XM mác 50',
    costCategoryId: 'thinghiemcockhoannhoi',
  }));

export const fileAttachmentGenerator = num =>
  Array.from(new Array(Math.round(num / 3))).reduce(
    (acc, val, idx) => [
      ...acc,
      {
        link:
          'https://drive.google.com/file/d/0B-lLPLXHCcp4dTE5aE1Lcmt6VHM/view?usp=sharing',
        title: 'Hop-dong-kinh-te-HD1087980p.pdf',
        uploadedAt: '10/07/2019 10:30 PM',
        author: {
          id: `54fd5f4fdfdf45fd${idx * 3}`,
          username: 'minhnv',
        },
        size: '2,0 MB',
        type: 'pdf',
        id: 'fdsfdsf554fd',
      },
      {
        link:
          'https://drive.google.com/file/d/0B-lLPLXHCcp4dTE5aE1Lcmt6VHM/view?usp=sharing',
        title: 'Phu-luc-HD1087980p.pdf',
        uploadedAt: '10/07/2019 10:30 PM',
        author: {
          id: '54fd5f4fdfdf45fd',
          username: 'minhnv',
        },
        size: '2,0 MB',
        type: 'pdf',
        id: `54fd5f4fdfdf45fd${idx * 3 + 1}`,
      },
      {
        link:
          'https://drive.google.com/file/d/0B-lLPLXHCcp4dTE5aE1Lcmt6VHM/view?usp=sharing',
        title: 'Ke hoach giao hang lan 1.pdf',
        uploadedAt: '10/07/2019 10:30 PM',
        author: {
          id: '54fd5f4fdfdf45fd',
          username: 'minhnv',
        },
        size: '2,0 MB',
        type: 'pdf',
        id: `54fd5f4fdfdf45fd${idx * 3 + 2}`,
      },
    ],
    [],
  );

export const contractAttachmentGenerator = num =>
  Array.from(new Array(Math.round(num / 2))).reduce(
    (acc, val, idx) => [
      ...acc,
      {
        title: 'Dự toán chi phí gói thầu',
        uploadedAt: '10/07/2019 10:30 PM',
        author: {
          id: '54fd5f4fdfdf45fd',
          username: 'minhnv',
        },
        type: 'folder',
        id: `15fd15f5d8ef${idx * 2}`,
      },
      {
        id: `15fd15f5d8ef${idx * 2 + 1}`,
        link:
          'https://drive.google.com/file/d/0B-lLPLXHCcp4dTE5aE1Lcmt6VHM/view?usp=sharing',
        title: 'Phu-luc-HD1087980p.pdf',
        uploadedAt: '10/07/2019 10:30 PM',
        author: {
          id: '54fd5f4fdfdf45fd',
          username: 'minhnv',
        },
        size: '2,0 MB',
        type: 'pdf',
      },
    ],
    [],
  );

export const weightGenerator = num =>
  Array.from(new Array(num)).map((val, idx) => ({
    id: `${idx}`,
    content: 'Trát tường trong, dày 1,5 cm, vữa XM mác 50',
    calUnit: 'm3',
    weight: '77,841.53',
    unitPrice: '128,320',
    totalRawPrice: '9,988,625,130',
    category: {
      id: '54u8fddf',
      name: 'Hạng mục tường vây',
    },
  }));

export const constructionGenerator = num =>
  Array.from(new Array(num)).map((val, idx) => ({
    id: `${idx}`,
    catalogJob: 'Xây thô tòa nhà S1',
    group: {
      name: 'Xây thô',
      id: '1',
    },
    package: {
      name: 'Gói thầu thi công phần thân thô',
      id: '1',
    },
    contractor: {
      name: 'Hòa Bình Construction',
      id: '1',
    },
    constructionState: {
      id: '4',
      name: 'Đang thực hiện',
    },
    interactive: {
      cmtNum: 10,
      attachNum: 3,
    },
    isInterested: false,
  }));
export const ConstructionProgessGenerator = num =>
  Array.from(new Array(num)).map((val, idx) => ({
    id: `${idx}`,
    isOk: false,
    realStartDate: '10/10/2019',
    expectFinishDate: '10/10/2019',
    realEditDate: '10/10/2019',
    realNumbers: '1090',
    realNumbersCommit: '2000',
    suppliesProvided: '<Vật tư cung cấp>',
    progressAchieved: '<Tóm tắt tiến độ>',
    requestment: '<Các kiến nghị>',
    requestmentUnit: {
      name: 'Ban vật tư',
      id: '1',
    },
    imageConstruction: [],
  }));
