using AxonApparel.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public interface IOpeningStockBusiness
    {
       Response<IQueryable<Domain.ItmStkDet>> GetItem(int itmgrpid, string itmcat);
       Response<IQueryable<Domain.ItmStkDet>> GetUom(int itmid);
       Response<bool> CreateEntry(Domain.ItemStockDom Entry);
       Response<bool> Update(Domain.ItemStockDom obj);
       Response<IQueryable<Domain.ItmStkDet>> GetDataMainList(string ordertype,  string transno, int? companyid, string orderno, string refno, int? styleid, string fromDate, string todate);
       Response<IQueryable<Domain.ItmStkDet>> GetDataMain(string ordertype, string transno, int? companyid, string orderno, string refno, int? styleid, string fromDate, string todate);
       Response<IQueryable<Domain.ItmStkDet>> Geteditgrid(string transno);
       Response<bool> Delete(string transno);
       Response<IQueryable<Domain.ItmStkDet>> GetOrdno(string ordtype);
       Response<IQueryable<Domain.ItmStkDet>> ChkPlanned(string OrderNo, int Styleid, int Itemid, int Colorid, int Sizeid);
    }
}
