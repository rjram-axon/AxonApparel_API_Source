using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IVendorBusiness
    {
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        Response<IQueryable<Vendor>> MainGetVendor(int? companyId, string orderNo, string RefNo, string EntryNo, int? Supplierid, string fromDate, string toDate, string OType);
        Response<IQueryable<Vendor>> GetOrderNoList();
        Response<bool> DeleteVen(int ID);
    }
}
