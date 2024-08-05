using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
   public  interface IUnit_of_measurementBusiness
    {
       Response<IEnumerable<Unit_of_measurement>> GetUom();
        Response<Unit_of_measurement> GetUomId(int UomId);
        Response<int> CreateUom(Unit_of_measurement UomAdd);
        Response<bool> UpdateUom(Unit_of_measurement UomUpd);
        Response<bool> DeleteUom(int UomId);

        Response<IList<Unit_of_measurement>> GetUomCheckItemDetails(int UomId);
    }
}
