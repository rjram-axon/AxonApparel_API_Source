using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
//using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;
using AxonApparel.Repository;

namespace AxonApparel.Business
{
    public class TestingDCReceiptApprovalBusiness : ITestingDCReceiptApprovalBusiness
    {
        private ITestingDCReceiptApprovalRepository strrep = new TestingDCReceiptApprovalRepository();

        public Response<IQueryable<AxonApparel.Domain.TestingDCReceiptMas>> GetTestingDCReceiptApproval()
        {
            try
            {
                var strlist = strrep.GetDataList();

                return new Response<IQueryable<Domain.TestingDCReceiptMas>>(strlist.Select(m => new Domain.TestingDCReceiptMas
                {
                    TestingDCReceiptId = m.TestingDCReceiptId,
                    DCReceiptNo = m.DCReceiptNo,
                    DCReceiptDate = (DateTime)m.DCReceiptDate,
                    TestingDCId = m.TestingDCId,
                    TestingDCNo = m.TestingDCMas.DCNo,
                    SupplierId = (int)m.SupplierId,
                    Supplier = m.Supplier.Supplier1,
                    OrderId = (int)m.OrderId,
                    OrderNo = m.Buy_Ord_Mas.Order_No,
                    OrderRefNo = m.OrderRefNo,
                    BillNo = m.BillNo,
                    BillDate = (DateTime)m.BillDate,
                    Remarks = m.Remarks,
                    GSTTaxID = (int)m.GSTtaxId,
                    TestValue = (decimal)m.TestValue,
                    CGSTPer = (decimal)m.CGST_Per,
                    CGSTValue = (decimal)m.CGSTValue,
                    SGSTPer = (decimal)m.SGST_Per,
                    SGSTValue = (decimal)m.SGSTValue,
                    IGSTPer = (decimal)m.IGST_Per,
                    IGSTValue = (decimal)m.IGSTValue,
                    TotalValue = (decimal)m.TotalValue,
                    CreatedBy = (int)m.CreatedBy
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Domain.TestingDCReceiptMas>>(null, Status.ERROR, "OOPS error occured. Please try again later");
            }
        }

        public Response<bool> ApproveBus(int id)
        {
            return new Response<bool>(strrep.UpdateData(id), Status.SUCCESS, "Deleted Successfully");
        }

    }
}
