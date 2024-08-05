using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
using AxonApparel.Common;

namespace AxonApparel.Business
{
    public interface IBomBusiness
    {
        Response<IQueryable<Bom>> GetItemList();
        Response<IQueryable<Bom>> Getitemgrouplist();
        Response<IList<Bom>> GetList(string orderno, int styleid, string OType,string IGId);
        Response<bool> Update(Bom obj, int stylerowid, string OType);
        Response<IQueryable<Bom>> GetUCList(int uomid);
        Response<IQueryable<Bom>> GetUomList(string baseunit);
    }
}
