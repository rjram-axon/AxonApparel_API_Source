using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
   public interface IAgentRepository:IBaseRepository<Agent>
    {
       IEnumerable<Domain.Agent> SGetDataList();
       IEnumerable<Domain.Agent> BGetDataList();
       IEnumerable<Domain.Agent> GetDataListAll();
       IList<Domain.Agent> GetRepAgentCheckItemDetails(int AgentId);
    }
}
