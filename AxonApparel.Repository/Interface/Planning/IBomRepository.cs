using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using  AxonApparel.Domain;

namespace AxonApparel.Repository
{
   public interface IBomRepository
    {

       IQueryable<Bom> GetItemList();
       IQueryable<Bom> Getitemgrouplist();
       IList<Bom> GetDetList(string orderno, int styleid, string OType, string IGId);
       bool UpdateData(IList<Buy_Ord_BOMDet> objAd, int StyRowId, string OType);
       IQueryable<Bom> GetUCList(int uomid);
       IQueryable<Bom> GetUomList(string baseunit);
    }
}
