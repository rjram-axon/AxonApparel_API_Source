using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;
using AxonApparel.Repository;

namespace AxonApparel.Business
{
    public class TestingDCCancelBusiness : ITestingDCCancelBusiness
    {
        private ITestingDCCancelRepository strrep = new TestingDCCancelRepository();

        public Response<IQueryable<AxonApparel.Domain.TestingDCMas>> GetTestingDC()
        {
            try
            {
                var strlist = strrep.GetDataList();

                return new Response<IQueryable<Domain.TestingDCMas>>(strlist.Select(m => new Domain.TestingDCMas
                {
                    TestingDCId = m.TestingDCId,
                    DCNo = m.DCNo,
                    DCDate = (DateTime)m.DCDate,
                    OrderId = (int)m.OrderId,
                    OrderNo = m.Buy_Ord_Mas.Order_No,
                    SupplierId = (int)m.SupplierId,
                    Supplier = m.Supplier.Supplier1,
                    BuyerId = (int)m.BuyerId,
                    Buyer = m.Buyer.Buyer1
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Domain.TestingDCMas>>(null, Status.ERROR, "OOPS error occured. Please try again later");
            }
        }

        public Response<bool> Update(Domain.TestingDCMas obj)
        {
            try
            {
                var TMID = strrep.UpdateData(new AxonApparel.Repository.TestingDCMas
                {
                    TestingDCId = obj.TestingDCId,                    
                    CancelNarr = obj.CancelNarr,
                    ModifyBy = obj.ModifyBy,
                    Modify_Date = DateTime.Now
                });

                if (TMID)
                {
                    //var result = stkRep.AddDetData(ItmList, yarnList, processList, bomList, cmtList, commList, "Update");
                    return new Response<bool>(true, Status.SUCCESS, "Updated Successfully");
                }
                else
                {
                    return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
                }
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> GetTestingDCReceiptDetails(int id)
        {
            return new Response<bool>(strrep.CheckReceiptData(id), Status.SUCCESS, "Deleted Successfully");
        }
    }
}
