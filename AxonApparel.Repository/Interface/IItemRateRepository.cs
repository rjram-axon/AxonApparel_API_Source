using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface IItemRateRepository
    {
        bool AddData(List<Item_Rate> objPoAddDet);
        IQueryable<Domain.ItemRate> GetDataMainList();
        IList<Domain.ItemRate> GetRepItemRate(int id);
        bool UpdateDetData(List<Item_Rate> objPoEADet);
      
        bool DeleteData(int id);
        bool DeleteDataInv(int id);
    }
}
