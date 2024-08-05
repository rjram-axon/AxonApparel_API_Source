using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
namespace AxonApparel.Repository
{
    public interface IItemRepository:IBaseRepository<Item>
    {
        string GetFItemid(string[] FIG);
        IEnumerable<Domain.Item> GetItemlistOthersAll();
        IEnumerable<Domain.Item> GetComponentDataList();
        IEnumerable<Domain.Item> GetFabricDataList();
        IEnumerable<Domain.Item> GetYarnDataList();
        IEnumerable<Domain.Item> GetAccessoryDataList();
        IEnumerable<Domain.Item> GetGeneralItemDataList();
        IEnumerable<Domain.Item> GetGarmentDataList();
        IEnumerable<Shift> GetshiftList();
        IEnumerable<Domain.Item> GetDropItemDataList();
        IEnumerable<Domain.Item> GetHsnList();
        IList<Domain.Item> GetRepItemCheckItemDetails(int Itemid);
        IList<Domain.Item> GetRepGstDetails(string Hsncode);
        IEnumerable<Domain.Item> GetItembygrpid(string Itemgrpid);
    }
}
