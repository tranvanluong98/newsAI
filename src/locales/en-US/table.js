import flattenObjKey from '@/utils/flattenObjKey';

export default flattenObjKey({
  tables: {
    weightList: {
      columnHeaders: {
        jobName: 'Tên công việc',
        unit: 'Đơn vị tính',
        weight: 'khối lượng',
        unitPrice: 'Đơn giá',
        totalRawPrice: 'Thành tiền',
      },
    },
    activityList: {
      columnHeaders: {
        contractName: 'Tên hợp đồng',
        contractNum: 'Số hợp đồng',
        contractValue: 'Giá trị hợp đồng',
        abated: 'Đã thanh toán',
        awating: 'Chờ thanh toán',
        proposedDate: 'Ngày đề nghị',
      },
    },
  },
});
