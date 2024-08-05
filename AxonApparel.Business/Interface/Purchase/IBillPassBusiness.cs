using AxonApparel.Common;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public interface IBillPassBusiness
    {
        Response<bool> Update(Domain.BillPass Det);
        Response<IEnumerable<Domain.BillPass>> LoadListData(int CmpId, string Order_No, string Ref_No, string SuppInvNo, int BuyId, int Suppid, string frmDate, string ToDate, string OrderType, string POType, string OSType, string OPType);
        Response<IEnumerable<Domain.BillPass>> Grnview(String GrnNo, int Itemid, int Colorid, int sizeid, string Type);
        Response<IEnumerable<Domain.BillPass>> GetSupplierInvNo(string Type);
    }
}
