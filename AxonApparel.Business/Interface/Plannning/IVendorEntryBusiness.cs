using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IVendorEntryBusiness
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="CourierEntry"></param>
        /// <returns></returns>

        Response<bool> CreateVendorEntry(Vendor VEnt);
        Response<IList<VendorEntry>> GetDataOrdItemList(string MasId);
        Response<IQueryable<Vendor>> GetDataVenBusDetails(int QMId);
        Response<IList<VendorEntry>> GetEditDetList(int MasId);

        Response<IList<VendorEntry>> GetPurQuoteforPlan(string WorkordNo, int itemid, int Colorid, int Sizeid, int Compid);
        Response<bool> UpdateVendorEntry(Vendor CEnty);
       
       
    }
}
