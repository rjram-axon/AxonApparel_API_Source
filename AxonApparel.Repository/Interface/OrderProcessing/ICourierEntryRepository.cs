using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;


namespace AxonApparel.Repository
{
   public interface ICourierEntryRepository
    {
        int AddData(Courier_Mas objCmas);
        bool DeleteData(int Id);
        bool UpdateData(Courier_Mas objAd);
        bool UpdateDetData(List<Courier_Det> objAdDet);
        Courier_Mas GetDataById(int Courier_MasId);
       // IQueryable<Courier_Mas> GetDataList();
        IQueryable<CourierEntryList> GetDataList(int? companyId, string EntryNo, string fromDate, string toDate, int? DespLocationId, string DespType);
        IQueryable<CourierEntryList> GetDataDetList(int Courier_MasId);
        //List<CourierEntry> GetDataList();
       //
        bool AddDetData(List<Courier_Det> objCDet);
        IQueryable<Courier_Mas> GetEntryNoDataList();
    }
}
