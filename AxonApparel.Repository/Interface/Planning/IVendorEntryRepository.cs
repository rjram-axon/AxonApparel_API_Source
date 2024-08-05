using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
namespace AxonApparel.Repository
{
    public interface IVendorEntryRepository
    {
        int AddData(VendorQuoteMas objCmas);  
     
        bool AddDetData(List<VendorQuoteDet> objCDet);

        IList<VendorEntry> GetDataRepItemDetails(string MasID);
        IQueryable<Vendor> GetDataVenDetails(int QMasId);
        IList<VendorEntry> GetDataEditVenDetails(int QMasId);
        IList<VendorEntry> GetPurQuoteforPlan(string WorkordNo, int itemid, int Colorid, int Sizeid, int Compid);

        bool UpdateData(VendorQuoteMas objAd);
        bool UpdateDetData(List<VendorQuoteDet> objAdDet);
        bool AddEditDetData(List<VendorQuoteDet> objCDet);
    }
}
