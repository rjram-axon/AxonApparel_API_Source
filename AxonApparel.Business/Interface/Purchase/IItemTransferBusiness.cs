using AxonApparel.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public interface IItemTransferBusiness
    {
        Response<IList<Domain.ItemTransDet>> LoadItemtransList(int? compid, int? storeid, int? processid, int? itemid, int? colorid, int? sizeid, string ordtype, string Ordno, string jobno,
             string Transno, string Transtype, string Itemtype);
        Response<IList<Domain.ItemTransDet>> LoadItemtransMainList(int? masid, int? compid, int? fromitemid, int? Toitemid, string ordtype, string frmdate, string todate, string orderno, string refno);
        Response<IList<Domain.ItemTransDet>> LoadItemtransEditList(int? masid);
        Response<IList<Domain.ItemTransMas>> LoadItemtransStatementList();
        Response<int> AddItemtranfer(Domain.ItemTransMas ProdMasAdd);
        Response<int> UpdateItemtranfer(Domain.ItemTransMas ProdMasAdd);
        Response<int> DeleteItemtranfer(Domain.ItemTransMas ProdMasAdd);

    }
}
