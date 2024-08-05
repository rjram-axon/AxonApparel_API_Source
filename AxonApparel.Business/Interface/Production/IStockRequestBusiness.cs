using AxonApparel.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public interface IStockRequestBusiness
    {
        Response<IQueryable<Domain.StockRequestDet>> Loadgrid( int? Reqstno, int? Entryno);
        Response<IQueryable<Domain.BoxDespatchMas>> LoadMaingrid(int Companyid, int Despatchid, string fromdate, string Todate);
        Response<IQueryable<Domain.StockRequestDet>> LoadQntygrid(string SkuNo);
        Response<bool> AddBuss(Domain.BoxDespatchMas opj);
        Response<IQueryable<Domain.ItmStkDet>> LoadgridItmstock(string SkuNo);
        Response<IQueryable<Domain.StockRequestDet>> GetBussSknDetails();
        Response<IQueryable<Domain.BoxDespatchMas>> GetBussDespatchNo();       
        Response<IQueryable<Domain.StockRequestDet>> GetBussReqstDetails();
        Response<IQueryable<Domain.StockRequestDet>> GetitmEditGrid(int masid);
        Response<IQueryable<Domain.ItmStkDet>> GetitmEditStockGrid(int masid);
        Response<bool> UpdateBoxEntry(Domain.BoxDespatchMas BxUEntry);
        Response<bool> DeleteBoxEntry(Domain.BoxDespatchMas BxDEntry);
    }
}
