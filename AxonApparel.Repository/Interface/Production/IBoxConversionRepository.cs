using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface IBoxConversionRepository
    {
        IQueryable<Domain.BoxConversionMas> GetRepSknDetails();
        IQueryable<Domain.BoxConversionDet> Loaditmsgrid(int masid);
        IQueryable<Domain.BulkOrder> GetDataRepRefNoDetails(int OrdNo);
        IQueryable<Domain.BulkOrder> GetDataRepOrdNoDetails(int OrdNo);
        IQueryable<Domain.BoxConversionStock> LoadRepitmStockgrid(int masid, int SknMasId);
        bool AddDetData(Box_Con_Mas objPoEntry, List<Box_Con_Det> objPoDet, List<Box_Con_Stock> objPoStk,decimal Brate);
        IQueryable<Domain.BoxConversionMas> LoadMaingrid(int? CompanyId, int? StoreId, string BoxConNo, string OrderNo, string FromDate, string ToDate, int? BoxMasId);
        IQueryable<Domain.BoxConversionDet> GetitmRepEditGrid(int masid);
        IQueryable<Domain.BoxConversionStock> GetitmRepEditStockGrid(int masid);
        bool UpdateDetData(Box_Con_Mas objEPoEntry, List<Box_Con_Det> objEPoDet, List<Box_Con_Stock> objEPoStk, decimal Brate);
        bool DeleteDetData(Box_Con_Mas objDPoEntry, List<Box_Con_Det> objDPoDet, List<Box_Con_Stock> objDPoStk, decimal Brate);
    }
}
