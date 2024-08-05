using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface  ISubStoreIssueRepository
    {
        IEnumerable<Domain.StoreTransferDet> GetSubStoreStockAdd(int Compid, int Styleid, string JobNo, string OrderNo, string RefNo, int Storeid, int itemid, int itemgrpid, int processid, string Ordtype);
        bool Create(StoreTransferMas Mas,List<StoreTransferDet> Storedet);
        bool Update(StoreTransferMas Mas, List<StoreTransferDet> Storedet,string Type,string IType);
        bool Delete(StoreTransferMas Mas, List<StoreTransferDet> Storedet, string Type, string IType);
        IEnumerable<Domain.StoreTransferMas> GetMainList(int Companyid, int IsuStoreid, int RcptStoreid, string OrderNo, string RefNo, string JobNo, int masid, string ordtype, string Frmdate, string Todate);
        IEnumerable<Domain.StoreTransferDet> GetSubStoreStockEdit(int Masid);
        IEnumerable<Domain.StoreTransferMas> LoadIssueNo();
    }
}
