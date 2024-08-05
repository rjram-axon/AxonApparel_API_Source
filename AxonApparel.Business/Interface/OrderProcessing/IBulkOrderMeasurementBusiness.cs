using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IBulkOrderMeasurementBusiness
    {
        Response<IQueryable<BulkOrderMeasurement>> GetDataByOrderMeasu(int Id);
        Response<IQueryable<BuyOrdImg>> GetOrderMeasuImg(int Id);
        Response<IList<BulkOrderMeasurementItemDet>> ListEntryItemDetails(int Id,string OrdNo);
        Response<IList<BulkOrderMeasurementItemDet>> ListEntrySizeItemDetails(int Id, string OrdNo);
        Response<bool> CreateMOrderEntry(BulkOrderMeasurement MEntry);
        Response<bool> UpdateMeaEntry(BulkOrderMeasurement MUEntry);
        Response<bool> DeleteMeas(BulkOrderMeasurement MDEntry);
        Response<IList<BulkOrderMeasurementItemDet>> ListEntryCompEditItemDetails(int Id);
        Response<IList<BulkOrderMeasurementItemDet>> ListEntryEditSizeItemDetails(int Id);
    }
}
