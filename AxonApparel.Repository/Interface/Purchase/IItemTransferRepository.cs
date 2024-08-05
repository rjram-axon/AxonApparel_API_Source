using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{

    public interface IItemTransferRepository
    {
        IList<Domain.ItemTransDet> LoadItemtransList(int? compid, int? storeid, int? processid, int? itemid, int? colorid, int? sizeid, string ordtype, string Ordno, string jobno,
             string Transno, string Transtype, string Itemtype);

        IList<Domain.ItemTransDet> LoadItemtransMainList(int? masid, int? compid, int? fromitemid, int? Toitemid, string ordtype, string frmdate, string todate, string orderno, string refno);
        IList<Domain.ItemTransDet> LoadItemtransEditList(int? masid);
        IList<Domain.ItemTransMas> LoadItemtransStatementList();
        bool AddDetData(ItemTransMas itemtransmasInsert, List<ItemTransDet> TransDet, string Mode);
        bool UpdateDetData(ItemTransMas itemtransmasInsert, List<ItemTransDet> TransDet, string Mode);
        bool DeleteDetData(ItemTransMas itemtransmasInsert, List<ItemTransDet> TransDet, string Mode);
    }
}
