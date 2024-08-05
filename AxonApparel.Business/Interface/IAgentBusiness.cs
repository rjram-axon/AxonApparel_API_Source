using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IAgentBusiness
    {
        Response<IEnumerable<Agent>> GetAgent();
        Response<IEnumerable<Agent>> GetSAgent();
        Response<Agent> GetAgentId(int AgentId);
        Response<int> CreateAgent(Agent AgentAdd);
        Response<bool> UpdateAgent(Agent AgentUpd);
        Response<bool> DeleteAgent(int AgentId);

        Response<IEnumerable<Agent>> GetBAgent();
        Response<IList<Agent>> GetAgentCheckItemDetails(int AgentId); 
    
    }
}
