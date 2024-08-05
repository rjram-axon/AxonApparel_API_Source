using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface IStockRequestRepository
    {
        IQueryable<Domain.StockRequestDet> Loadgrid(int? Reqstno, int? Entryno);
        IQueryable<Domain.BoxDespatchMas> LoadMaingrid(int Companyid, int Despatchid, string fromdate, string Todate);
        IQueryable<Domain.StockRequestDet> LoadQntygrid(string SkuNo);
        bool Add(Box_Despatch_mas despmas, List<Box_Despatch_Det> stkreqList, List<Box_Despatch_Stock> ItmskList);
        IQueryable<Domain.ItmStkDet> LoadgridItmstock(string SkuNo); 
        IQueryable<Domain.StockRequestDet> GetRepSknDetails();
        IQueryable<Domain.BoxDespatchMas> GetRepDespatchNo();      
        IQueryable<Domain.StockRequestDet> GetRepReqstDetails();
        IQueryable<Domain.StockRequestDet> GetitmRepEditGrid(int masid);
        IQueryable<Domain.ItmStkDet> GetitmRepEditStockGrid(int masid);
        bool UpdateDetData(Box_Despatch_mas despmas, List<Box_Despatch_Det> stkreqList, List<Box_Despatch_Stock> ItmskList);
        bool DeleteDetData(Box_Despatch_mas despmas, List<Box_Despatch_Det> stkreqList, List<Box_Despatch_Stock> ItmskList);
    }
}
