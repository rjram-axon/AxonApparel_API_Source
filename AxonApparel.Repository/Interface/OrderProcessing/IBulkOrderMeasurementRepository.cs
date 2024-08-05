
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface IBulkOrderMeasurementRepository
    {
        IQueryable<BulkOrderMeasurement> GetDataRepOrderDetails(int Id);
        IQueryable<BuyOrdImg> GetOrderMeasuImg(int Id);

        IList<BulkOrderMeasurementItemDet> GetRepMeasItemLoad(int Id, string OrdNo);
        IList<BulkOrderMeasurementItemDet> GetRepMeasSizeItemLoad(int Id, string OrdNo);
        bool AddDetData(Buy_Ord_MeasureMas objPoEntry, List<Buy_ord_MeasureDet> objPoDet, List<Buy_ord_MeasureSizedet> objPoOrd,List<Ord_Mesurement_Img> OrdMesurImg);
        bool UpdateDetData(Buy_Ord_MeasureMas objPoEntry, List<Buy_ord_MeasureDet> objPoDet, List<Buy_ord_MeasureSizedet> objPoOrd, List<Ord_Mesurement_Img> OrdMesurImg);
        bool DeleteDetData(Buy_Ord_MeasureMas objPoEntry, List<Buy_ord_MeasureDet> objPoDet, List<Buy_ord_MeasureSizedet> objPoOrd);
        IList<BulkOrderMeasurementItemDet> GetRepMeascompEditItemLoad(int Id);
        IList<BulkOrderMeasurementItemDet> GetRepMeasEditSizeItemLoad(int Id);
    }
}
