using AxonApparel.Common;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace AxonApparel.Business
{
    public interface ISubStoreIssueBusiness
    {
        Response<IEnumerable<Domain.StoreTransferDet>> GetSubStoreStockAdd(int Compid, int Styleid, string JobNo, string OrderNo, string RefNo, int Storeid, int itemid, int itemgrpid, int processid, string Ordtype);
        Response<bool> Create(StoreTransferMas SectionAdd);
        Response<bool> Update(StoreTransferMas SectionAdd);
        Response<bool> Delete(StoreTransferMas SectionAdd);
        Response<IEnumerable<Domain.StoreTransferMas>> GetMainList(int Companyid, int IsuStoreid, int RcptStoreid, string OrderNo, string RefNo, string JobNo, int masid, string ordtype, string Frmdate, string Todate);
        Response<IEnumerable<Domain.StoreTransferDet>> GetSubStoreStockEdit(int Masid);
        Response<IEnumerable<Domain.StoreTransferMas>> LoadIssueNo();
    }
}
