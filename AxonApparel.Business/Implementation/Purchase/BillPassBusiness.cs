using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Repository;


namespace AxonApparel.Business
{

    public class BillPassBusiness : IBillPassBusiness
    {
        IBillPassRepository repo = new BillPassRepository();


        public Response<IEnumerable<Domain.BillPass>> LoadListData(int CmpId, string Order_No, string Ref_No, string SuppInvNo, int BuyId, int Suppid, string frmDate, string ToDate, string OrderType, string POType, string OSType, string OPType)
        {
            try
            {
                var ProductWO = repo.LoadListData(CmpId, Order_No, Ref_No, SuppInvNo, BuyId, Suppid, frmDate, ToDate, OrderType, POType, OSType, OPType);

                return new Response<IEnumerable<Domain.BillPass>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IEnumerable<Domain.BillPass>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IEnumerable<Domain.BillPass>> Grnview(String GrnNo, int Itemid, int Colorid, int sizeid, string Type)
        {
            try
            {
                var purGrn = repo.Grnview(GrnNo, Itemid, Colorid, sizeid, Type);

                return new Response<IEnumerable<Domain.BillPass>>(purGrn, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IEnumerable<Domain.BillPass>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> Update(Domain.BillPass Det)
        {
            return new Response<bool>(repo.Update(Det), Status.SUCCESS, "Deleted Successfully");
        }
        public Response<IEnumerable<Domain.BillPass>> GetSupplierInvNo(string type)
        {
            return new Response<IEnumerable<Domain.BillPass>>(repo.GetSupplierInvNo(type), Status.SUCCESS, "Deleted Successfully");
        }
    }
}
