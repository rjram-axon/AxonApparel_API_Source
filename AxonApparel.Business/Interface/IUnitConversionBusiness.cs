using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IUnitConversionBusiness
    {
        Response<IEnumerable<UnitConversion>> GetUC();
        Response<UnitConversion> GetId(int Id);
        Response<int> CreateUC(UnitConversion UCAdd);
        Response<bool> UpdateUC(UnitConversion UCUpd);
        Response<bool> DeleteUC(int Id);
    
    }
}
