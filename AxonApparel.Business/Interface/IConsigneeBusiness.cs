using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using AxonApparel.Common;
using AxonApparel.Domain;


namespace AxonApparel.Business
{
    public interface IConsigneeBusiness
    {
        Response<IEnumerable<Consignee>> GetConsignee();
        Response<Consignee> GetConsigneeId(int ConsigneeId);
        Response<int> CreateConsignee(Consignee ConsigneeAdd);
        Response<bool> UpdateConsignee(Consignee ConsigneeUpd);
        Response<bool> DeleteConsignee(int ConsigneeId);
    
    }
}
