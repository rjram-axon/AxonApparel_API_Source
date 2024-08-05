using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IBoxConversionBusiness
    {
        Response<IQueryable<BoxConversionMas>> GetBussSknDetails();
        Response<IQueryable<BoxConversionDet>> Loaditmsgrid(int masid);
        Response<IQueryable<BulkOrder>> GeRefNoBussDetails(int OrdNo);
        Response<IQueryable<BulkOrder>> GeOrdNoBussDetails(int OrdNo);
        Response<IQueryable<BoxConversionStock>> LoadBussitmsgrid(int masid, int SknMasId);
        Response<bool> CreateBoxEntry(BoxConversionMas BxEntry);
        Response<IQueryable<BoxConversionMas>> LoadMaingrid(int? CompanyId, int? StoreId, string BoxConNo, string OrderNo, string FromDate, string ToDate,int? BoxMasId);
        Response<IQueryable<BoxConversionDet>> GetitmEditGrid(int masid);
        Response<IQueryable<BoxConversionStock>> GetitmEditStockGrid(int masid);
        Response<bool> UpdateBoxEntry(BoxConversionMas BxUEntry);
        Response<bool> DeleteBoxEntry(BoxConversionMas BxDEntry);
    }
}
