using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
namespace AxonApparel.Repository
{
    public interface IAllowanceRepository
    {
        IList<AllowanceSetup> GetRepAllowanceLoad(int? ItemGroupId, int? ItemId);
        IList<AllowanceSetup> GetRepAllowanceCLoad(int? ItemId);
        bool UpdateDetData(List<Item> objPEID);
        IList<AllowanceSetup> GetRepProcessAllowanceLoad(int? ProcessId);
        bool UpdateProcessDetData(List<Process_Tolerance> objPEID);
    }
}
