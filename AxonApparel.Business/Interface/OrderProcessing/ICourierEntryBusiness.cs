using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;


namespace AxonApparel.Business
{
    public interface ICourierEntryBusiness
    {
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        Response<IQueryable<CourierEntryList>> GetCourierEntry(int? companyId, string EntryNo, string fromDate, string toDate, int? DespLocationId, string DespType);
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        Response<IQueryable<CourierEntryList>> GetCourierDetDetails(int Courier_MasId);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="Courier_MasId"></param>
        /// <returns></returns>

        Response<CourierEntry> GetDataById(int Courier_MasId);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="CourierEntry"></param>
        /// <returns></returns>

        Response<bool> CreateCourierEntry(CourierEntry CEnty);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="CourierEntry"></param>
        /// <returns></returns>

        Response<bool> UpdateCourierEntry(CourierEntry CEnty);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="Courier_MasId"></param>
        /// <returns></returns>

        Response<bool> DeleteCourierEntry(int Courier_MasId);
        Response<IQueryable<CourierEntry>> GetEntryNoList(); 
    }
}
